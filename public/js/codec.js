// A Beacon lives entirely in the URL fragment, which browsers never send to a server.
// Payload = version char + base43 bytes. Base43 is the QR "alphanumeric" alphabet minus
// space and %, so the fragment packs into QR alphanumeric mode (~25% denser than bytes)
// while staying a valid, unescaped URL fragment.

const B43 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$*+-./:';
const enc = new TextEncoder();
const dec = new TextDecoder();

export const PAYLOAD_RE = /^[AB][0-9A-Z$*+\-./:]{6,}$/;

export function b43encode(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 2) {
    if (i + 1 < bytes.length) {
      let x = bytes[i] * 256 + bytes[i + 1];
      out += B43[x % 43]; x = Math.floor(x / 43);
      out += B43[x % 43]; x = Math.floor(x / 43);
      out += B43[x];
    } else {
      out += B43[bytes[i] % 43] + B43[Math.floor(bytes[i] / 43)];
    }
  }
  return out;
}

export function b43decode(s) {
  const out = [];
  for (let i = 0; i < s.length; i += 3) {
    const chunk = s.slice(i, i + 3);
    let x = 0;
    for (let j = chunk.length - 1; j >= 0; j--) {
      const v = B43.indexOf(chunk[j]);
      if (v < 0) throw new Error('bad character');
      x = x * 43 + v;
    }
    if (chunk.length === 3 && x <= 0xffff) out.push(x >> 8, x & 255);
    else if (chunk.length === 2 && x <= 0xff) out.push(x);
    else throw new Error('bad length');
  }
  return new Uint8Array(out);
}

async function pipe(bytes, stream) {
  const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
  return new Uint8Array(await res.arrayBuffer());
}

const canDeflate = typeof CompressionStream === 'function';
const deflate = (b) => pipe(b, new CompressionStream('deflate-raw'));
const inflate = (b) => pipe(b, new DecompressionStream('deflate-raw'));

export async function encodeProfile(obj) {
  const raw = enc.encode(JSON.stringify(obj));
  if (canDeflate) {
    const packed = await deflate(raw);
    if (packed.length < raw.length) return 'A' + b43encode(packed);
  }
  return 'B' + b43encode(raw);
}

export async function decodeProfile(payload) {
  if (!PAYLOAD_RE.test(payload)) throw new Error('not a Beacon');
  let bytes = b43decode(payload.slice(1));
  if (payload[0] === 'A') bytes = await inflate(bytes);
  const obj = JSON.parse(dec.decode(bytes));
  if (!obj || typeof obj !== 'object' || !'mcepj'.includes(obj.t)) throw new Error('not a Beacon');
  return obj;
}

const b64u = {
  enc: (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  dec: (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)),
};

async function pinKey(pin, salt) {
  const base = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'],
  );
}

export async function encryptText(text, pin) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await pinKey(pin, salt);
  const plain = canDeflate ? await deflate(enc.encode(text)) : enc.encode(text);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain));
  const out = new Uint8Array(1 + salt.length + iv.length + ct.length);
  out[0] = canDeflate ? 1 : 0;
  out.set(salt, 1); out.set(iv, 17); out.set(ct, 29);
  return b64u.enc(out);
}

export async function decryptText(blob, pin) {
  const bytes = b64u.dec(blob);
  const key = await pinKey(pin, bytes.slice(1, 17));
  const plain = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(17, 29) }, key, bytes.slice(29)));
  return dec.decode(bytes[0] === 1 ? await inflate(plain) : plain);
}
