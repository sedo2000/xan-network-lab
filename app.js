const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

$('#menuToggle').addEventListener('click', () => $('.desktop-nav').classList.toggle('open'));
$$('.desktop-nav a').forEach(a => a.addEventListener('click', () => $('.desktop-nav').classList.remove('open')));

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  $('#themeGlyph').textContent = document.body.classList.contains('light-theme') ? '☾' : '☼';
});

const translations = {
  navAbout:'من أنا',navExpertise:'الخبرات',navWork:'المشاريع',navTools:'أدوات الشبكات',navContact:'تواصل',
  letsTalk:'لنتحدث',available:'هندسة البنية التحتية الرقمية',heroKicker:'الشبكات · الأنظمة · البرمجيات',
  heroHi:'أبني',heroFuture:'ما يربط',heroWorld:'العالم.',heroLead:'أصمم معماريات شبكات مرنة وأطوّر برمجيات تجعل البنية التحتية المعقدة أكثر بساطة.',
  exploreWork:'استكشف الأعمال',years:'سنوات من الخبرة',stack:'تقنيات أساسية',curiosity:'فضول لا محدود',
  aboutTitle:'هندسة <span class="gradient-text">بهدف.</span>',aboutNote:'عقلية عملية، ورؤية شمولية للأنظمة، وشغف دائم بفهم ما يحدث خلف الواجهات.',
  aboutText:'أعمل في هندسة الشبكات والأنظمة المعزولة والبنية التحتية السحابية وتطوير التطبيقات. أركز على بناء أنظمة يمكن الاعتماد عليها، من مسارات الحزم والأتمتة إلى الواجهات المفيدة والواضحة.',
  principleOne:'فكّر بمنظومة كاملة.',principleOneText:'افهم المعمارية بالكامل، وليس الجزء الذي أمامك فقط.',principleTwo:'صمّم للاعتمادية.',principleTwoText:'اجعل الأداء والمراقبة والموثوقية جزءاً من التصميم.',
  expertiseTitle:'ترسانة <span class="gradient-text">التقنيات.</span>',expertiseNote:'مجموعة أدوات متعددة التخصصات لتصميم البنية التحتية الحديثة وأتمتتها وتشغيلها.',
  networkDesc:'تصميم الشبكات والتوجيه والطبقات الافتراضية ومعالجة الحزم عالية الأداء.',systemsDesc:'بيئات لينكس، والبنية التحتية ككود، وأتمتة العمليات.',softwareDesc:'خدمات خلفية وواجهات API وتطبيقات عملية لحل مشكلات حقيقية.',qualityDesc:'سير عمل قابل للتكرار واختبارات ومراقبة لضمان التسليم الموثوق.',
  workTitle:'من الأفكار إلى <span class="gradient-text">الأنظمة.</span>',workNote:'مجالات هندسية ونماذج أعمال أولية. يمكن استبدالها بدراسات حالة لمشاريع منشورة عند توفرها.',
  workNetwork:'تصميم هياكل شبكات قابلة للتوسع، وشبكات Overlay، وأنماط اتصال موثوقة.',workAutomation:'تحويل المهام التشغيلية المتكررة إلى إجراءات موثقة وقابلة للإصدار.',workSoftware:'بناء أدوات وخدمات مركزة تجعل سير العمل التقني أسهل.',
  toolsTitle:'أدوات <span class="gradient-text">الشبكات الميدانية.</span>',toolsNote:'أدوات بسيطة تعمل من المتصفح للفحوصات السريعة. تعتمد النتائج على شبكتك والخدمات العامة المستخدمة.',
  contactTitle:'لديك مشكلة<br><span class="gradient-text">معقدة تحتاج حلاً؟</span>',contactText:'لنتحدث عن هندسة الشبكات أو البنية التحتية أو الأتمتة أو المنتج الذي تعمل على بنائه.',
  rights:'صُنع بفضول ودقة.'
};
let isArabic = false;
const originalContent = new Map();
$$('[data-i18n]').forEach(el => originalContent.set(el, el.innerHTML));
$('#langToggle').addEventListener('click', () => {
  isArabic = !isArabic;
  document.documentElement.lang = isArabic ? 'ar' : 'en';
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  $('#langToggle').textContent = isArabic ? 'EN' : 'عربي';
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = isArabic && translations[key] ? translations[key] : originalContent.get(el);
  });
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const toolTitles = {ip:'IP Intelligence',dns:'DNS Lookup',latency:'Latency Check'};
$$('.tool-tab').forEach(tab => tab.addEventListener('click', () => {
  $$('.tool-tab').forEach(t => {t.classList.remove('active');t.setAttribute('aria-selected','false')});
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  $$('.tool-pane').forEach(p => p.classList.remove('active'));
  $('#pane-'+tab.dataset.tool).classList.add('active');
  $('#toolTitle').textContent = toolTitles[tab.dataset.tool];
}));
function showLoading(el, message='QUERYING PUBLIC SERVICE…') { el.innerHTML = `<span class="output-placeholder">${message}</span>`; }
function showError(el, message) { el.textContent = 'ERROR / ' + message; }
function safe(v) { return String(v ?? '—').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function resultRows(items) {
  return `<div class="result-grid">${items.map(([k,v])=>`<div class="result-item"><small>${safe(k)}</small><strong>${safe(v)}</strong></div>`).join('')}</div>`;
}
$('#ipRun').addEventListener('click', async () => {
  const out=$('#ipOutput'), ip=$('#ipInput').value.trim();
  if (ip && !/^[0-9a-fA-F:.]+$/.test(ip)) return showError(out,'Enter a valid IPv4 or IPv6 address.');
  showLoading(out);
  try {
    const url = ip ? `https://ipapi.co/${encodeURIComponent(ip)}/json/` : 'https://ipapi.co/json/';
    const r=await fetch(url); if(!r.ok) throw new Error('IP service returned '+r.status);
    const d=await r.json(); if(d.error) throw new Error(d.reason || 'Lookup failed');
    out.innerHTML=resultRows([['IP ADDRESS',d.ip],['VERSION',d.version],['CITY',d.city],['REGION',d.region],['COUNTRY',d.country_name],['ISP / ORG',d.org],['ASN',d.asn],['TIMEZONE',d.timezone]]);
  } catch(e) { showError(out,e.message+' — the service may be unavailable or rate-limited.'); }
});
$('#dnsRun').addEventListener('click', async () => {
  const out=$('#dnsOutput'), domain=$('#dnsInput').value.trim().replace(/^https?:\/\//,'').replace(/\/.*$/,'').replace(/\.$/,'');
  const type=$('#dnsType').value;
  if(!domain || !/^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(\.([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/.test(domain)) return showError(out,'Enter a valid domain name.');
  showLoading(out);
  try {
    const r=await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,{headers:{accept:'application/dns-json'}});
    if(!r.ok) throw new Error('DNS service returned '+r.status);
    const d=await r.json();
    const answers=d.Answer||[];
    if(!answers.length) { out.textContent=`NO ANSWER / ${domain} / ${type} / status ${d.Status}`; return; }
    out.innerHTML=`<div class="result-item"><small>DOMAIN / TYPE / ANSWERS</small><strong>${safe(domain)} · ${type} · ${answers.length}</strong></div><div style="margin-top:12px;display:grid;gap:8px">${answers.map(a=>`<div style="padding:9px;background:#101d2d;border-radius:5px"><small style="color:#7d94ac">${safe(a.name)} · TTL ${safe(a.TTL)}</small><div>${safe(a.data)}</div></div>`).join('')}</div>`;
  } catch(e) { showError(out,e.message+' — check your connection and try again.'); }
});
$('#latencyRun').addEventListener('click', async () => {
  const out=$('#latencyOutput'), url=$('#latencyTarget').value;
  showLoading(out,'MEASURING ROUND-TRIP REQUEST TIME…');
  try {
    const start=performance.now();
    await fetch(url+(url.includes('?')?'&':'?')+'_='+Date.now(),{mode:'no-cors',cache:'no-store'});
    const ms=Math.round(performance.now()-start);
    out.innerHTML=resultRows([['ROUND-TRIP TIME',`${ms} ms`],['TARGET',new URL(url).hostname],['METHOD','Browser fetch'],['NOTE','Not ICMP ping']]);
  } catch(e) { showError(out,'Request failed or blocked by the browser/network.'); }
});
$('#ipInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#ipRun').click()});
$('#dnsInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#dnsRun').click()});
