// Short keys on purpose: every character ends up inside the QR code.
export const FIELDS = {
  n: { kind: 'text', max: 60 },
  ag: { kind: 'text', max: 20 },
  bt: { kind: 'select', options: ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  al: { kind: 'area', max: 160, critical: true },
  md: { kind: 'area', max: 160, critical: true },
  cd: { kind: 'area', max: 160, critical: true },
  hw: { kind: 'area', max: 260 },
  lg: { kind: 'text', max: 60 },
  ad: { kind: 'text', max: 100 },
  gp: { kind: 'text', max: 80 },
  dr: { kind: 'text', max: 80 },
  sp: { kind: 'text', max: 30 },
  br: { kind: 'text', max: 60 },
  ch: { kind: 'text', max: 30 },
  nat: { kind: 'text', max: 40 },
  idn: { kind: 'text', max: 30 },
  od: { kind: 'check' },
  rw: { kind: 'check' },
};

export const TYPES = {
  m: { color: '#e5372a', icon: 'cross', fields: ['n', 'ag', 'bt', 'al', 'md', 'cd', 'hw', 'lg', 'dr', 'od'] },
  c: { color: '#f08c00', icon: 'child', fields: ['n', 'ag', 'lg', 'hw', 'cd', 'al', 'md', 'ad'] },
  e: { color: '#7b5cff', icon: 'heart', fields: ['n', 'ag', 'hw', 'cd', 'md', 'al', 'bt', 'lg', 'ad'] },
  p: { color: '#0e9f8e', icon: 'paw', fields: ['n', 'sp', 'br', 'hw', 'cd', 'md', 'ch', 'ad', 'rw'] },
  j: { color: '#1f8a4c', icon: 'globe', fields: ['n', 'ag', 'nat', 'gp', 'ad', 'lg', 'bt', 'al', 'md', 'cd', 'hw', 'idn'] },
};

export const MAX_CONTACTS = 3;

// Ambulance-capable number per country. 112 reaches emergency services from most GSM phones.
export const EMERGENCY = {
  SA: '911', AE: '999', KW: '112', QA: '999', BH: '999', OM: '9999', JO: '911', EG: '123',
  US: '911', CA: '911', MX: '911', GB: '999', IE: '112', FR: '112', DE: '112', ES: '112',
  IT: '112', NL: '112', BE: '112', SE: '112', NO: '113', DK: '112', FI: '112', PL: '112',
  PT: '112', AT: '112', CH: '144', GR: '112', TR: '112', RU: '112', IN: '112', PK: '1122',
  BD: '999', ID: '112', MY: '999', SG: '995', PH: '911', TH: '1669', JP: '119', KR: '119',
  CN: '120', HK: '999', TW: '119', AU: '000', NZ: '111', ZA: '112', NG: '112', KE: '999',
  BR: '192', AR: '107', CL: '131', CO: '123',
};

const TZ = {
  'Asia/Riyadh': 'SA', 'Asia/Dubai': 'AE', 'Asia/Kuwait': 'KW', 'Asia/Qatar': 'QA', 'Asia/Bahrain': 'BH',
  'Asia/Muscat': 'OM', 'Asia/Amman': 'JO', 'Africa/Cairo': 'EG', 'Europe/London': 'GB', 'Europe/Dublin': 'IE',
  'Europe/Paris': 'FR', 'Europe/Berlin': 'DE', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT',
  'Europe/Amsterdam': 'NL', 'Europe/Brussels': 'BE', 'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK', 'Europe/Helsinki': 'FI', 'Europe/Warsaw': 'PL', 'Europe/Lisbon': 'PT',
  'Europe/Vienna': 'AT', 'Europe/Zurich': 'CH', 'Europe/Athens': 'GR', 'Europe/Istanbul': 'TR',
  'Europe/Moscow': 'RU', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Karachi': 'PK', 'Asia/Dhaka': 'BD',
  'Asia/Jakarta': 'ID', 'Asia/Makassar': 'ID', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Singapore': 'SG',
  'Asia/Manila': 'PH', 'Asia/Bangkok': 'TH', 'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR', 'Asia/Shanghai': 'CN',
  'Asia/Hong_Kong': 'HK', 'Asia/Taipei': 'TW', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
  'Australia/Perth': 'AU', 'Australia/Brisbane': 'AU', 'Pacific/Auckland': 'NZ', 'Africa/Johannesburg': 'ZA',
  'Africa/Lagos': 'NG', 'Africa/Nairobi': 'KE', 'America/Sao_Paulo': 'BR', 'America/Argentina/Buenos_Aires': 'AR',
  'America/Santiago': 'CL', 'America/Bogota': 'CO', 'America/Mexico_City': 'MX', 'America/Toronto': 'CA',
  'America/Vancouver': 'CA', 'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US', 'Pacific/Honolulu': 'US',
};

// Timezone reflects where the helper physically is better than their UI language does.
export function guessCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TZ[tz]) return TZ[tz];
  } catch { /* ignore */ }
  for (const l of navigator.languages || []) {
    const region = l.split('-')[1]?.toUpperCase();
    if (region && EMERGENCY[region]) return region;
  }
  return '';
}

export const SAMPLES = {
  m: {
    t: 'm', n: 'Layla Hassan', ag: '34', bt: 'O-', al: 'Penicillin, peanuts (anaphylaxis — EpiPen in left jacket pocket)',
    md: 'Levetiracetam 500 mg twice daily', cd: 'Epilepsy',
    hw: 'If I am shaking it is a seizure: time it, cushion my head, nothing in my mouth. Call an ambulance if it lasts over 5 minutes.',
    lg: 'Arabic, English', od: 1, ct: [['Omar Hassan', 'Husband', '+966500000001'], ['Dr. Sara Malik', 'Neurologist', '+966500000002']],
  },
  c: {
    t: 'c', n: 'Yusuf', ag: '6', lg: 'Arabic, a little English',
    hw: 'I am autistic and may not answer you. Please speak softly and stay with me. I love trains.',
    al: 'Tree nuts', ct: [['Mona', 'Mother', '+966500000003'], ['Khalid', 'Father', '+966500000004']],
  },
  e: {
    t: 'e', n: 'Ibrahim Al-Farsi', ag: '78', cd: 'Alzheimer’s disease (moderate), type 2 diabetes',
    hw: 'He may believe it is 1985 and that he is late for work. Don’t argue — tell him his daughter Noura is on her way. Offer juice if he is shaky.',
    md: 'Metformin, Donepezil', lg: 'Arabic', ad: 'Al Olaya, Riyadh', ct: [['Noura', 'Daughter', '+966500000005']],
  },
  p: {
    t: 'p', n: 'Simba', sp: 'Cat', br: 'Orange tabby, white chest', hw: 'Friendly but scared of dogs. Please keep me indoors.',
    md: 'Thyroid tablet daily', ch: '982000411234567', rw: 1, ct: [['Reem', 'Owner', '+966500000006']],
  },
  j: {
    t: 'j', n: 'Siti Rahmawati', ag: '61', nat: 'Indonesian', gp: 'Al-Hidayah Hajj group, bus 14', ad: 'Hotel Dar Al Eiman, Makkah',
    lg: 'Bahasa Indonesia, a little Arabic', bt: 'B+', cd: 'High blood pressure', md: 'Amlodipine 5 mg',
    hw: 'I may be tired and lost. Please take me to the nearest group office or call my group leader.',
    ct: [['Ahmad', 'Group leader', '+966500000007'], ['Budi', 'Son', '+6281200000008']],
  },
};
