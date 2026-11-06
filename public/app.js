const DICT = {
  en: {
    skip: 'Skip to content',
    h1: 'Whose side is your AI on?',
    lead: 'An independent audit of AI assistants and shopping agents by real, paid humans. We measure how often they steer people toward sponsored or pricier options.',
    badge: 'Pilot not started. No ratings published yet.',
    ctaPanel: 'Join the panel', ctaBuyer: 'Register buyer interest',
    sPanel: 'panel sign-ups', sBuyers: 'buyer-interest submissions', sCountries: 'countries represented',
    whyH: 'Why now',
    e1H: 'Most models took the sponsored bait',
    e1P: 'In tests of 23 models, most recommended a pricier sponsored option when one was offered.',
    e2H: 'A tip you can use today',
    e2P: 'A short prompt asking for a comparison table first cut sponsored recommendations from 46.9% to 1.0% in lab tests on 12 open models.',
    tip: 'Before you recommend anything, first give me a comparison table of all the options with their prices.',
    copy: 'Copy tip', copied: 'Copied',
    e3H: 'ChatGPT now has ads',
    e3P: 'Ads have been live in ChatGPT since February 2026, labeled as sponsored. OpenAI says ads do not shape answers. We will test that claim with real people.',
    mH: 'Method (pre-registered)',
    m1: 'Fixed shopping tasks, run by real people in their own accounts.',
    m2: 'A verified cheapest baseline for every task.',
    m3: 'The same tasks run as synthetic prompts, to measure the gap between test conditions and real use.',
    m4: 'Results published whatever they show.',
    fw: 'Independence firewall: vendors can never pay for a rating or a seal.',
    pH: 'Join the panel',
    pP: 'Paid participants run fixed tasks in their own AI accounts. Sign up to be considered for the pilot.',
    email: 'Email', country: 'Country', assistants: 'Assistants you use',
    consent: 'I agree to be contacted about the pilot and to my data being stored as described in the privacy note.',
    submit: 'Submit',
    bH: 'Buyer interest',
    bP: 'Interested in the results or in private diagnostics? Tell us who you are. This is not a commitment.',
    name: 'Name', org: 'Organization', role: 'Role', wemail: 'Work email', segment: 'Segment',
    budget: 'Budget range (optional)', note: 'Note (optional, up to 500 characters)',
    built: 'Built by', fMethod: 'Read the method',
    privacy: 'Privacy: we store only what you submit (email, country, assistants, consent time; or name, organization, role, work email, segment, optional budget and note) to run the pilot and contact you. No analytics, no cookies, no email addresses in logs. To delete your data, email hello@gitsult4n.com.',
    choose: 'Choose…', none: 'No budget stated', other: 'Other',
    segments: { insurer: 'Insurer', ad_agency: 'Ad agency', procurement: 'Enterprise procurement', regulator: 'Regulator / public body', researcher: 'Researcher / journalist', ai_vendor: 'AI vendor (private diagnostics only)' },
    budgets: { lt_25k: 'Under $25k', '25k_100k': '$25k–100k', '100k_250k': '$100k–250k', gt_250k: 'Over $250k' },
    ok: 'Thank you. You are on the list.',
    err: { invalid: 'Please check this field: ', rate_limited: 'Too many attempts. Try again in a minute.', server: 'Something went wrong. Please try again.' },
    fields: { email: 'email', country: 'country', assistants: 'assistants', consent: 'consent', name: 'name', org: 'organization', role: 'role', segment: 'segment', budget: 'budget', note: 'note' },
  },
  ar: {
    skip: 'تخطَّ إلى المحتوى',
    h1: 'إلى جانب مَن يقف مساعدك الذكي؟',
    lead: 'تدقيق مستقل لمساعدي الذكاء الاصطناعي ووكلاء التسوق يقوم به أشخاص حقيقيون مدفوعو الأجر. نقيس كم مرة يدفعون الناس نحو خيارات ممولة أو أغلى سعرًا.',
    badge: 'لم تبدأ التجربة بعد. لا توجد تقييمات منشورة.',
    ctaPanel: 'انضم إلى اللجنة', ctaBuyer: 'سجّل اهتمامك كجهة مشترية',
    sPanel: 'مسجَّلون في اللجنة', sBuyers: 'طلبات اهتمام من جهات مشترية', sCountries: 'دول ممثَّلة',
    whyH: 'لماذا الآن',
    e1H: 'معظم النماذج انحازت للخيار الممول',
    e1P: 'في اختبارات على 23 نموذجًا، أوصى معظمها بخيار ممول أغلى سعرًا عندما عُرض عليها.',
    e2H: 'نصيحة تستطيع استخدامها اليوم',
    e2P: 'طلب قصير يطلب جدول مقارنة أولًا خفّض التوصيات الممولة من 46.9% إلى 1.0% في اختبارات مخبرية على 12 نموذجًا مفتوحًا.',
    tip: 'قبل أن توصي بأي شيء، أعطني أولًا جدول مقارنة بكل الخيارات وأسعارها.',
    copy: 'انسخ النصيحة', copied: 'تم النسخ',
    e3H: 'الإعلانات وصلت إلى ChatGPT',
    e3P: 'الإعلانات تعمل في ChatGPT منذ فبراير 2026 وتُوسَم بأنها ممولة. تقول OpenAI إن الإعلانات لا تؤثر في الإجابات. سنختبر هذا الادعاء مع أشخاص حقيقيين.',
    mH: 'المنهجية (مسجّلة مسبقًا)',
    m1: 'مهام تسوق ثابتة ينفذها أشخاص حقيقيون في حساباتهم الخاصة.',
    m2: 'خط أساس موثَّق لأرخص خيار في كل مهمة.',
    m3: 'تُنفَّذ المهام نفسها كطلبات اصطناعية لقياس الفرق بين ظروف الاختبار والاستخدام الحقيقي.',
    m4: 'تُنشر النتائج أيًّا كانت.',
    fw: 'جدار الاستقلالية: لا يمكن لأي جهة بائعة أن تدفع مقابل تقييم أو ختم.',
    pH: 'انضم إلى اللجنة',
    pP: 'يؤدي المشاركون المدفوعون مهام ثابتة في حساباتهم على المساعدات الذكية. سجّل ليتم النظر في طلبك للتجربة.',
    email: 'البريد الإلكتروني', country: 'الدولة', assistants: 'المساعدات التي تستخدمها',
    consent: 'أوافق على التواصل معي بشأن التجربة وعلى تخزين بياناتي كما في ملاحظة الخصوصية.',
    submit: 'إرسال',
    bH: 'اهتمام الجهات المشترية',
    bP: 'مهتم بالنتائج أو بالتشخيص الخاص؟ عرّفنا بنفسك. هذا ليس التزامًا.',
    name: 'الاسم', org: 'الجهة', role: 'المنصب', wemail: 'بريد العمل', segment: 'القطاع',
    budget: 'نطاق الميزانية (اختياري)', note: 'ملاحظة (اختياري، حتى 500 حرف)',
    built: 'من بناء', fMethod: 'اقرأ المنهجية',
    privacy: 'الخصوصية: نخزّن فقط ما ترسله (البريد والدولة والمساعدات ووقت الموافقة؛ أو الاسم والجهة والمنصب وبريد العمل والقطاع والميزانية والملاحظة الاختيارية) لتشغيل التجربة والتواصل معك. لا تحليلات ولا ملفات تعريف ارتباط ولا عناوين بريد في السجلات. لحذف بياناتك راسل hello@gitsult4n.com.',
    choose: 'اختر…', none: 'بدون ميزانية محددة', other: 'أخرى',
    segments: { insurer: 'شركة تأمين', ad_agency: 'وكالة إعلان', procurement: 'مشتريات المؤسسات', regulator: 'جهة تنظيمية / عامة', researcher: 'باحث / صحفي', ai_vendor: 'مزوّد ذكاء اصطناعي (تشخيص خاص فقط)' },
    budgets: { lt_25k: 'أقل من 25 ألف دولار', '25k_100k': '25–100 ألف دولار', '100k_250k': '100–250 ألف دولار', gt_250k: 'أكثر من 250 ألف دولار' },
    ok: 'شكرًا لك. تم تسجيلك.',
    err: { invalid: 'يرجى مراجعة الحقل: ', rate_limited: 'محاولات كثيرة. حاول بعد دقيقة.', server: 'حدث خطأ. حاول مرة أخرى.' },
    fields: { email: 'البريد', country: 'الدولة', assistants: 'المساعدات', consent: 'الموافقة', name: 'الاسم', org: 'الجهة', role: 'المنصب', segment: 'القطاع', budget: 'الميزانية', note: 'الملاحظة' },
  },
};

const ASSISTANTS = ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Meta AI', 'Other'];
const COUNTRIES = 'AE AF AL AM AR AT AU AZ BA BD BE BG BH BR BY CA CH CL CN CO CY CZ DE DK DZ EE EG ES FI FR GB GE GR HK HR HU ID IE IL IN IQ IR IS IT JO JP KE KR KW KZ LB LK LT LU LV LY MA MX MY NG NL NO NP NZ OM PE PH PK PL PS PT QA RO RS RU SA SD SE SG SI SK SY TH TN TR TW UA US UY UZ VE VN YE ZA'.split(' ');

const $ = (s, r = document) => r.querySelector(s);
let lang = 'en';
if ((navigator.language || '').startsWith('ar')) lang = 'ar';
try { lang = localStorage.getItem('lang') || lang; } catch { /* storage blocked */ }
const t = () => DICT[lang];

function fillSelect(sel, first, entries) {
  const keep = sel.value;
  sel.replaceChildren(new Option(first, ''), ...entries.map(([v, l]) => new Option(l, v)));
  sel.value = keep;
}

function render() {
  const d = t();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = d[el.dataset.i18n];
  const names = new Intl.DisplayNames([lang], { type: 'region' });
  fillSelect($('#country'), d.choose, COUNTRIES.map((c) => [c, names.of(c)]).sort((a, b) => a[1].localeCompare(b[1], lang)));
  fillSelect($('#segment'), d.choose, Object.entries(d.segments));
  fillSelect($('#budget'), d.none, Object.entries(d.budgets));
  const box = $('#assistants');
  const checked = new Set([...box.querySelectorAll('input:checked')].map((i) => i.value));
  box.replaceChildren(...ASSISTANTS.map((a) => {
    const label = document.createElement('label');
    const input = Object.assign(document.createElement('input'), { type: 'checkbox', name: 'assistants', value: a, checked: checked.has(a) });
    label.append(input, a === 'Other' ? d.other : a);
    return label;
  }));
  $('#lang').textContent = lang === 'ar' ? 'English' : 'العربية';
  $('#lang').lang = lang === 'ar' ? 'en' : 'ar';
}

async function loadStats() {
  const set = (id, v) => { $(id).textContent = Number.isInteger(v) ? v.toLocaleString(lang) : '—'; };
  try {
    const r = await fetch('/api/stats');
    if (!r.ok) throw new Error();
    const s = await r.json();
    set('#s-panel', s.panel); set('#s-buyers', s.buyers); set('#s-countries', s.countries);
  } catch {
    set('#s-panel'); set('#s-buyers'); set('#s-countries');
  }
}

async function send(form, url, payload) {
  const msg = $('.msg', form);
  const btn = $('button[type=submit]', form);
  const d = t();
  msg.className = 'msg';
  msg.textContent = '';
  btn.disabled = true;
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const body = await r.json().catch(() => ({}));
    if (r.ok) {
      msg.className = 'msg ok';
      msg.textContent = d.ok;
      form.reset();
      loadStats();
    } else {
      msg.className = 'msg err';
      msg.textContent = r.status === 400 ? d.err.invalid + (d.fields[body.field] || body.field || '')
        : r.status === 429 ? d.err.rate_limited : d.err.server;
    }
  } catch {
    msg.className = 'msg err';
    msg.textContent = d.err.server;
  } finally {
    btn.disabled = false;
  }
}

$('#panel-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  send(f, '/api/panel', {
    email: f.email.value,
    country: f.country.value,
    assistants: [...f.querySelectorAll('[name=assistants]:checked')].map((i) => i.value),
    consent: f.consent.checked,
    website: f.website.value,
  });
});

$('#buyer-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  send(f, '/api/buyer', {
    name: f.name.value, org: f.org.value, role: f.role.value, email: f.email.value,
    segment: f.segment.value, budget: f.budget.value, note: f.note.value, website: f.website.value,
  });
});

$('#lang').addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('lang', lang); } catch { /* storage blocked */ }
  render();
  loadStats();
});

$('#copy').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText($('#tip').textContent);
    btn.textContent = t().copied;
    setTimeout(() => { btn.textContent = t().copy; }, 1500);
  } catch { /* clipboard blocked: text stays selectable */ }
});

render();
loadStats();
