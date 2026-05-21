/* ─── TFO One PWA — app.js ─── */

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const empDB = [
  { id:'E001', name:'Murugan K.',  ini:'MK', shift:'morning', sal:'₹2,400', type:'bag',   rate:28,  bags:86, status:'P', col:'#3B82F6', bg:'#EFF6FF', blood:'B+',  mob:'+91 98765 43210', aadh:'XXXX XXXX 4321', addr:'42, Gandhi Nagar, Erode',   join:'01 Jan 2024', father:'Krishnan K.', mother:'Meena K.',   adv:1500 },
  { id:'E002', name:'Selvam R.',   ini:'SR', shift:'morning', sal:'₹2,100', type:'bag',   rate:28,  bags:75, status:'P', col:'#10B981', bg:'#ECFDF5', blood:'O+',  mob:'+91 87654 32109', aadh:'XXXX XXXX 5432', addr:'15, NGO Nagar, Tirupur',   join:'15 Mar 2023', father:'Raman S.',    mother:'Chitra S.',  adv:2000 },
  { id:'E003', name:'Raju P.',     ini:'RP', shift:'night',   sal:'₹1,980', type:'bag',   rate:28,  bags:70, status:'A', col:'#F59E0B', bg:'#FFFBEB', blood:'A+',  mob:'+91 76543 21098', aadh:'XXXX XXXX 6543', addr:'8, Periyar St, Coimbatore',join:'20 Jun 2023', father:'Prakash P.',  mother:'Rani P.',    adv:1000 },
  { id:'E004', name:'Karthi M.',   ini:'KM', shift:'morning', sal:'₹2,200', type:'bag',   rate:28,  bags:79, status:'P', col:'#8B5CF6', bg:'#F5F3FF', blood:'AB+', mob:'+91 65432 10987', aadh:'XXXX XXXX 7654', addr:'22, Ring Rd, Salem',       join:'10 Sep 2022', father:'Mani K.',     mother:'Geetha K.',  adv:0    },
  { id:'E005', name:'Vijay S.',    ini:'VS', shift:'night',   sal:'₹2,050', type:'shift', rate:350, bags:6,  status:'P', col:'#EF4444', bg:'#FEF2F2', blood:'O−',  mob:'+91 54321 09876', aadh:'XXXX XXXX 8765', addr:'7, Main Road, Karur',      join:'5 Feb 2024',  father:'Senthil S.',  mother:'Lakshmi S.', adv:0    },
  { id:'E006', name:'Suresh D.',   ini:'SD', shift:'morning', sal:'₹1,900', type:'bag',   rate:28,  bags:68, status:'P', col:'#06B6D4', bg:'#ECFEFF', blood:'B−',  mob:'+91 43210 98765', aadh:'XXXX XXXX 9876', addr:'33, East St, Namakkal',    join:'28 Nov 2023', father:'Durai S.',    mother:'Valli S.',   adv:0    },
];

const stockDB = [
  { name:'Blue 40s',   col:'#3B82F6', kg:1740, bags:28, pct:72 },
  { name:'White 30s',  col:'#94A3B8', kg:1120, bags:18, pct:48 },
  { name:'Red 40s',    col:'#EF4444', kg:745,  bags:12, pct:32 },
  { name:'Yellow 20s', col:'#F59E0B', kg:622,  bags:10, pct:25 },
  { name:'Green 30s',  col:'#10B981', kg:593,  bags:9,  pct:20 },
];

let attState = {};
empDB.forEach(e => attState[e.id] = e.status);

let curEmpId  = null;
let curLang   = 'en';
let payType   = 'bag';
let curAttShift = 'morning';
let curRepTitle = '';
let curRepRange = 'today';

// ═══════════════════════════════════════
// LANGUAGE
// ═══════════════════════════════════════
function setLang(l) {
  curLang = l;
  document.getElementById('lb-en').classList.toggle('on', l === 'en');
  document.getElementById('lb-ta').classList.toggle('on', l === 'ta');
  document.getElementById('lchk-en').classList.toggle('on', l === 'en');
  document.getElementById('lchk-ta').classList.toggle('on', l === 'ta');
  document.body.classList.toggle('ta', l === 'ta');
  const labels = {
    en: { home:'Home', stock:'Stock', staff:'Staff', payroll:'Payroll', reports:'Reports', welcome:'Welcome,', synced:'Synced' },
    ta: { home:'முகப்பு', stock:'சரக்கு', staff:'ஊழியர்', payroll:'சம்பளம்', reports:'அறிக்கை', welcome:'வணக்கம்,', synced:'ஒத்திசைவு' }
  };
  const lb = labels[l];
  ['home','stock','staff','payroll','reports'].forEach(k => {
    const el = document.querySelector(`#nav-${k} .nlbl`);
    if (el) el.textContent = lb[k];
  });
  document.getElementById('fac-greet').textContent = lb.welcome;
  document.getElementById('sync-lbl').textContent  = lb.synced;
}

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
function goPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('on'));
  document.querySelectorAll('.ni').forEach(el => el.classList.remove('on'));
  const pg = document.getElementById('pg-' + p);
  if (!pg) return;
  pg.classList.add('on');
  const nv = document.getElementById('nav-' + p);
  if (nv) nv.classList.add('on');
  document.getElementById('pcontent').scrollTop = 0;
  hideSub();
}

// ═══════════════════════════════════════
// SHEETS
// ═══════════════════════════════════════
function openSheet(id) {
  if (id === 'sh-att') buildAtt();
  document.getElementById(id).classList.add('open');
}
function closeSheet(id) { document.getElementById(id).classList.remove('open'); }
function closeBg(e, id) { if (e.target === document.getElementById(id)) closeSheet(id); }
function confBg(e, id)  { if (e.target === document.getElementById(id)) document.getElementById(id).classList.remove('open'); }

// ═══════════════════════════════════════
// TAB SWITCHERS
// ═══════════════════════════════════════
function invTab(btn, id) {
  btn.closest('.tabbar').querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  ['it-stock','it-inward','it-outward'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = s === id ? 'block' : 'none';
  });
}

function empTab(btn, id) {
  btn.closest('.tabbar').querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  ['et-all','et-mor','et-nig'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = s === id ? 'block' : 'none';
  });
}

// ═══════════════════════════════════════
// WEIGHT CALCULATOR
// ═══════════════════════════════════════
function calcWt(p) {
  const b = parseFloat(document.getElementById(p + '-b').value) || 0;
  const w = parseFloat(document.getElementById(p + '-w').value) || 62.25;
  const t = document.getElementById(p + '-t');
  t.value = b > 0 ? ((b * w).toFixed(3) + ' KG') : '';
}

// ═══════════════════════════════════════
// STOCK LIST
// ═══════════════════════════════════════
function buildStockList() {
  const el = document.getElementById('stock-list');
  if (!el) return;
  el.innerHTML = stockDB.map((s, i) => `
    <div class="clrow" ${i === stockDB.length - 1 ? 'style="border-bottom:none"' : ''}>
      <div class="cldot" style="background:${s.col}"></div>
      <div class="clname">${s.name}</div>
      <div class="prog"><div class="progbg"><div class="progfill" style="width:${s.pct}%;background:${s.col}"></div></div></div>
      <div class="clkg">${s.kg.toLocaleString()} KG</div>
      <div class="clbags">${s.bags}bg</div>
      <button class="edit-ico" onclick="openEditStock(${i})" aria-label="Edit stock">
        <i class="ti ti-pencil"></i>
      </button>
    </div>`).join('');
}

function openEditStock(i) {
  const s = stockDB[i];
  document.getElementById('es-dot').style.background = s.col;
  document.getElementById('es-name').textContent     = s.name;
  document.getElementById('es-kg').value             = s.kg;
  document.getElementById('es-bg').value             = s.bags;
  openSheet('sh-editstock');
}

// ═══════════════════════════════════════
// EMPLOYEE LISTS
// ═══════════════════════════════════════
function buildEmpLists() {
  ['all','mor','nig'].forEach(tab => {
    const filtered = tab === 'all' ? empDB
      : empDB.filter(e => e.shift === (tab === 'mor' ? 'morning' : 'night'));
    const el = document.getElementById('el-' + tab);
    if (!el) return;
    if (filtered.length === 0) {
      el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--T2);font-size:13px">No employees in this shift</div>';
      return;
    }
    el.innerHTML = filtered.map(e => `
      <div class="li" onclick="openEmp('${e.id}')">
        <div class="lav" style="background:${e.bg};color:${e.col};width:42px;height:42px">${e.ini}</div>
        <div class="linf">
          <div class="lname">${e.name}</div>
          <div class="ldet">
            <i class="ti ti-${e.shift === 'morning' ? 'sun' : 'moon'}" style="font-size:11px;margin-right:3px"></i>
            ${e.shift === 'morning' ? 'Morning' : 'Night'} ·
            ${e.type === 'bag' ? e.bags + ' bags · ₹' + e.rate + '/bag' : 'Shift-based'} ·
            <span style="color:#B91C1C;font-weight:700">
              <i class="ti ti-droplet" style="font-size:10px"></i>${e.blood}
            </span>
          </div>
        </div>
        <div class="lrt">
          <div class="badge ${e.status === 'P' ? 'bg' : 'br'}">${e.status === 'P' ? 'Present' : 'Absent'}</div>
          <div class="ltm">${e.type === 'bag' ? e.bags + ' bags' : 'Shift'}</div>
        </div>
      </div>`).join('');
  });
}

function openEmp(id) {
  curEmpId = id;
  const e = empDB.find(x => x.id === id);
  if (!e) return;

  const ph = document.getElementById('ep-photo');
  ph.textContent        = e.ini;
  ph.style.background   = e.col + '33';
  ph.style.color        = e.col;

  document.getElementById('ep-name').textContent    = e.name;
  document.getElementById('ep-role').textContent    = 'Machine Operator · ' + e.id;
  document.getElementById('ep-shift').textContent   = e.shift === 'morning' ? 'Morning Shift' : 'Night Shift';
  document.getElementById('ep-blood').textContent   = e.blood;
  document.getElementById('ep-status').textContent  = e.status === 'P' ? 'Present Today' : 'Absent Today';
  document.getElementById('ep-mobile').textContent  = e.mob;
  document.getElementById('ep-aadh').textContent    = e.aadh;
  document.getElementById('ep-bloodval').textContent= e.blood;
  document.getElementById('ep-addr').textContent    = e.addr;
  document.getElementById('ep-join').textContent    = e.join;
  document.getElementById('ep-saltype').textContent = e.type === 'bag' ? 'Bag Production' : 'Shift-based';
  document.getElementById('ep-salrate').textContent = e.type === 'bag' ? '₹' + e.rate + '/bag' : '₹' + e.rate + '/shift';
  document.getElementById('ep-adv').textContent     = e.adv > 0 ? '₹' + e.adv.toLocaleString() : 'None';
  document.getElementById('ep-father').textContent  = e.father;
  document.getElementById('ep-mother').textContent  = e.mother;

  const days = ['M','T','W','T','F','S','S'];
  const att  = ['P','P','P','P', e.status, 'H', 'H'];
  document.getElementById('ep-att').innerHTML = days.map((d, i) =>
    `<div class="atd ${att[i] === 'P' ? 'atp' : att[i] === 'A' ? 'ata' : 'ath'}">${d}</div>`
  ).join('');

  goPage('empprofile');
}

function openConfirmDel() { document.getElementById('conf-del').classList.add('open'); }

function doDeleteEmployee() {
  const i = empDB.findIndex(e => e.id === curEmpId);
  if (i > -1) empDB.splice(i, 1);
  document.getElementById('conf-del').classList.remove('open');
  buildEmpLists();
  buildPayroll();
  goPage('employees');
  showToast('Employee removed');
}

// ═══════════════════════════════════════
// ATTENDANCE
// ═══════════════════════════════════════
function buildAtt() {
  updateAttCounts();
  const filtered = empDB.filter(e => e.shift === curAttShift);
  document.getElementById('att-list').innerHTML = filtered.map((e, i) => `
    <div class="att-row" ${i === filtered.length - 1 ? 'style="border-bottom:none"' : ''}>
      <div style="display:flex;align-items:center;gap:9px">
        <div class="lav" style="background:${e.bg};color:${e.col};width:34px;height:34px;font-weight:700;font-size:11px;flex-shrink:0">${e.ini}</div>
        <span style="font-size:14px;font-weight:500;color:var(--T)">${e.name}</span>
      </div>
      <div class="att-btns">
        <button class="att-p-btn ${attState[e.id] === 'P' ? 'sel' : ''}"
          onclick="setAtt('${e.id}','P',this)"><i class="ti ti-check"></i> P</button>
        <button class="att-a-btn ${attState[e.id] === 'A' ? 'sel' : ''}"
          onclick="setAtt('${e.id}','A',this)"><i class="ti ti-x"></i> A</button>
      </div>
    </div>`).join('');
}

function selAttShift(sh) {
  curAttShift = sh;
  const mb = document.getElementById('sbtn-morning');
  const nb = document.getElementById('sbtn-night');
  mb.classList.toggle('active', sh === 'morning');
  nb.classList.toggle('active', sh === 'night');
  buildAtt();
}

function setAtt(id, s, btn) {
  attState[id] = s;
  const row = btn.closest('.att-row');
  row.querySelector('.att-p-btn').classList.toggle('sel', s === 'P');
  row.querySelector('.att-a-btn').classList.toggle('sel', s === 'A');
  updateAttCounts();
}

function updateAttCounts() {
  let p = 0, a = 0;
  empDB.forEach(e => { if (attState[e.id] === 'P') p++; else a++; });
  const pc = document.getElementById('att-pc');
  const ac = document.getElementById('att-ac');
  if (pc) pc.textContent = 'P: ' + p;
  if (ac) ac.textContent = 'A: ' + a;
}

// ═══════════════════════════════════════
// PAYROLL
// ═══════════════════════════════════════
function setPayType(t) {
  payType = t;
  document.getElementById('pay-type-bag').classList.toggle('on', t === 'bag');
  document.getElementById('pay-type-shift').classList.toggle('on', t === 'shift');
  buildPayroll();
}

function confirmStartPayroll() { document.getElementById('conf-payroll').classList.add('open'); }

function doStartPayroll() {
  document.getElementById('conf-payroll').classList.remove('open');
  const banner = document.getElementById('payroll-start-banner');
  if (banner) banner.style.display = 'none';
  buildPayroll();
  showToast('Payroll calculated!');
}

function buildPayroll() {
  const el = document.getElementById('payroll-list');
  if (!el) return;
  el.innerHTML = empDB.map(e => {
    const gross = payType === 'bag' ? (e.bags * e.rate) : (e.rate * 6);
    const net   = gross - e.adv;
    return `
    <div class="paycard">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="lav" style="background:${e.bg};color:${e.col};width:40px;height:40px;font-weight:700;font-size:13px;flex-shrink:0">${e.ini}</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:var(--T)">${e.name}</div>
          <div style="font-size:12px;color:var(--T2);margin-top:2px">
            <i class="ti ti-${e.shift === 'morning' ? 'sun' : 'moon'}" style="font-size:11px;margin-right:3px"></i>
            ${e.shift === 'morning' ? 'Morning' : 'Night'} ·
            ${payType === 'bag' ? e.bags + ' bags × ₹' + e.rate : '6 shifts × ₹' + e.rate}
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:700;color:var(--N)">₹${net.toLocaleString()}</div>
          ${e.adv > 0
            ? `<div style="font-size:11px;color:var(--A);margin-top:2px"><i class="ti ti-minus" style="font-size:10px"></i> Adv ₹${e.adv.toLocaleString()}</div>`
            : `<div style="font-size:11px;color:var(--T3);margin-top:2px">No advance</div>`}
        </div>
      </div>
      <div class="pbrkd">
        <div class="pbitem"><div class="pblbl">${payType === 'bag' ? 'Bags' : 'Shifts'}</div><div class="pbval">${payType === 'bag' ? e.bags : 6}</div></div>
        <div class="pbitem"><div class="pblbl">Gross</div><div class="pbval">₹${gross.toLocaleString()}</div></div>
        <div class="pbitem"><div class="pblbl">Net Pay</div><div class="pbval" style="color:var(--N)">₹${net.toLocaleString()}</div></div>
      </div>
      <button class="pay-edit-btn" onclick="openPayEdit('${e.id}')">
        <i class="ti ti-pencil"></i> Edit Payroll
      </button>
    </div>`;
  }).join('');
}

function openPayEdit(id) {
  const e = empDB.find(x => x.id === id);
  if (!e) return;
  const gross = payType === 'bag' ? (e.bags * e.rate) : (e.rate * 6);
  document.getElementById('pay-edit-content').innerHTML = `
    <div style="background:var(--NL);border-radius:var(--rad2);padding:11px;margin-bottom:13px;display:flex;align-items:center;gap:10px">
      <div style="width:36px;height:36px;border-radius:50%;background:${e.bg};color:${e.col};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">${e.ini}</div>
      <div style="font-size:15px;font-weight:700;color:var(--N)">${e.name}</div>
    </div>
    <div class="frow">
      <div class="fgrp">
        <label class="flbl"><i class="ti ti-packages"></i> ${payType === 'bag' ? 'Bags Produced' : 'Shifts Worked'}</label>
        <input type="number" class="finp" value="${payType === 'bag' ? e.bags : 6}" inputmode="decimal">
      </div>
      <div class="fgrp">
        <label class="flbl"><i class="ti ti-coins"></i> Rate (₹)</label>
        <input type="number" class="finp" value="${e.rate}" inputmode="decimal">
      </div>
    </div>
    <div class="fgrp">
      <label class="flbl"><i class="ti ti-alert-circle" style="color:var(--A)"></i> Advance Deduction (₹)</label>
      <input type="number" class="finp" value="${e.adv}" inputmode="decimal">
    </div>
    <div style="background:var(--NL);border-radius:var(--rad2);padding:11px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:13px;color:var(--T2)">Net Payable</span>
      <span style="font-size:18px;font-weight:700;color:var(--N)">₹${(gross - e.adv).toLocaleString()}</span>
    </div>`;
  openSheet('sh-payedit');
}

// ═══════════════════════════════════════
// REPORTS — PDF DOWNLOAD
// ═══════════════════════════════════════
function openRepPicker(title) {
  curRepTitle = title;
  document.getElementById('rep-title-disp').textContent = title;
  document.querySelectorAll('.dopt').forEach(d => d.classList.remove('sel'));
  document.getElementById('dopt-today').classList.add('sel');
  curRepRange = 'today';
  document.getElementById('custom-range-row').classList.remove('show');
  openSheet('sh-report');
}

function selDateOpt(opt, el) {
  curRepRange = opt;
  document.querySelectorAll('.dopt').forEach(d => d.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('custom-range-row').classList.toggle('show', opt === 'custom');
}

function doDownloadReport() {
  closeSheet('sh-report');
  const rangeMap = { today:'Today', week:'1 Week', month:'1 Month', custom:'Custom Range' };
  downloadPDF(curRepTitle, rangeMap[curRepRange] || 'Today');
}

function downloadPDF(title, range) {
  const sep  = '═'.repeat(50);
  const sep2 = '─'.repeat(50);
  const now  = '21 May 2026';

  let body = '';

  if (title.includes('Stock')) {
    body = [
      'COLOR-WISE STOCK REPORT', sep2,
      'Color            KG          Bags',
      sep2,
      ...stockDB.map(s => padR(s.name, 17) + padL(s.kg.toLocaleString() + ' KG', 12) + padL(s.bags + ' bags', 10)),
      sep2,
      padR('TOTAL', 17) + padL('4,820 KG', 12) + padL('77 bags', 10),
    ].join('\n');
  } else if (title.includes('Payroll')) {
    body = [
      'PAYROLL REPORT — Week 21', sep2,
      'Name              Bags   Rate   Gross    Advance  Net',
      sep2,
      ...empDB.map(e => {
        const g = payType === 'bag' ? e.bags * e.rate : e.rate * 6;
        return padR(e.name, 18) + padL(String(e.bags), 7) + padL('₹' + e.rate, 7) +
               padL('₹' + g, 9) + padL('₹' + e.adv, 9) + '₹' + (g - e.adv).toLocaleString();
      }),
      sep2,
      'Total Net Payable: ₹' + empDB.reduce((s, e) => s + (e.bags * e.rate - e.adv), 0).toLocaleString(),
    ].join('\n');
  } else if (title.includes('Employee')) {
    body = [
      'EMPLOYEE MASTER LIST', sep2,
      ...empDB.map((e, i) => [
        `${i+1}. ${e.name}  (${e.id})`,
        `   Shift    : ${e.shift === 'morning' ? 'Morning' : 'Night'}`,
        `   Blood    : ${e.blood}`,
        `   Mobile   : ${e.mob}`,
        `   Pay Type : ${e.type === 'bag' ? 'Bag Production — ₹' + e.rate + '/bag' : 'Shift-based — ₹' + e.rate + '/shift'}`,
        `   Joined   : ${e.join}`,
        `   Address  : ${e.addr}`,
        `   Status   : ${e.status === 'P' ? 'Present' : 'Absent'}`,
        '',
      ].join('\n')),
    ].join('\n');
  } else {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const vals = [320, 410, 290, 380, 440, 500];
    body = [
      'PRODUCTION SUMMARY', sep2,
      ...days.map((d, i) => padR(d, 12) + padL(vals[i] + ' KG', 10)),
      sep2,
      'Total   : 2,340 KG',
      'Average : 390 KG/day',
    ].join('\n');
  }

  const content = [
    sep,
    `  TFO ONE — ${title.toUpperCase()}`,
    sep,
    `Factory  : Guna's TFO, Erode, Tamil Nadu`,
    `Period   : ${range}`,
    `Generated: ${now}  |  v1.1.0`,
    sep,
    '',
    body,
    '',
    sep,
    'Generated by TFO One PWA  |  tfoone.app',
    sep,
  ].join('\n');

  const blob = new Blob([content], { type: 'application/octet-stream' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = title.replace(/ /g, '_') + '_' + range.replace(/ /g, '_') + '.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(title + ' downloaded!');
}

function padR(s, n) { return String(s).padEnd(n, ' ').slice(0, n); }
function padL(s, n) { return String(s).padStart(n, ' ').slice(-n); }

// ═══════════════════════════════════════
// PROFILE SUB-SCREENS
// ═══════════════════════════════════════
function showSub(id) {
  document.getElementById('prof-main-wrap').style.display = 'none';
  document.querySelectorAll('.subscreen').forEach(s => s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
}

function hideSub() {
  document.querySelectorAll('.subscreen').forEach(s => s.classList.remove('on'));
  const mw = document.getElementById('prof-main-wrap');
  if (mw) mw.style.display = '';
}

// ═══════════════════════════════════════
// AUTH FLOW
// ═══════════════════════════════════════
function chkPh() {
  const ph  = document.getElementById('ph-inp').value;
  const chk = document.getElementById('terms').checked;
  const btn = document.getElementById('send-otp-btn');
  btn.disabled = !(ph.length === 10 && chk);
}

function showStep(id) {
  document.querySelectorAll('.auth-step').forEach(s => s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
}

let otpTimer;
function doSendOTP() {
  const ph = document.getElementById('ph-inp').value;
  document.getElementById('ph-disp').textContent = ph.replace(/(\d{5})(\d{5})/, '$1 $2');
  showStep('st-otp');
  ['o1','o2','o3','o4','o5','o6'].forEach(id => {
    const el = document.getElementById(id);
    el.value = ''; el.classList.remove('ok','err');
  });
  let s = 30;
  clearInterval(otpTimer);
  const wrap = document.getElementById('otp-timer-wrap');
  if (wrap) wrap.innerHTML = 'Resend in <span id="otp-cd">30s</span>';
  otpTimer = setInterval(() => {
    s--;
    const cd = document.getElementById('otp-cd');
    if (cd) cd.textContent = s + 's';
    if (s <= 0) {
      clearInterval(otpTimer);
      if (wrap) wrap.innerHTML = '<span class="oresend" onclick="doSendOTP()">Resend OTP</span>';
    }
  }, 1000);
  setTimeout(() => document.getElementById('o1').focus(), 100);
}

function oNext(el, nxt) {
  el.value = el.value.slice(-1);
  if (el.value) {
    el.classList.add('ok'); el.classList.remove('err');
    if (nxt) document.getElementById(nxt).focus();
  }
}

function oKey(e, el, prev) {
  if (e.key === 'Backspace' && !el.value && prev) {
    const p = document.getElementById(prev);
    if (p) { p.focus(); p.value = ''; p.classList.remove('ok'); }
  }
}

function oTryV() {
  const otp = ['o1','o2','o3','o4','o5','o6'].map(i => document.getElementById(i).value).join('');
  if (otp.length === 6) setTimeout(doVerify, 150);
}

function doVerify() {
  const otp = ['o1','o2','o3','o4','o5','o6'].map(i => document.getElementById(i).value).join('');
  if (otp === '123456' || otp.length === 6) {
    clearInterval(otpTimer); enterApp();
  } else {
    ['o1','o2','o3','o4','o5','o6'].forEach(i => {
      const el = document.getElementById(i);
      el.classList.add('err'); el.classList.remove('ok');
    });
  }
}

function enterApp() {
  document.getElementById('scr-auth').classList.remove('on');
  document.getElementById('scr-main').classList.add('on');
}

function doLogout() {
  document.getElementById('scr-main').classList.remove('on');
  document.getElementById('scr-auth').classList.add('on');
  showStep('st-phone');
}

// ═══════════════════════════════════════
// CAMERA
// ═══════════════════════════════════════
function capturePhoto() {
  document.getElementById('cam-ph').style.display  = 'none';
  document.getElementById('cam-cap').style.display = 'block';
}
function retakePhoto() {
  document.getElementById('cam-cap').style.display = 'none';
  document.getElementById('cam-ph').style.display  = 'block';
}

// ═══════════════════════════════════════
// CHART
// ═══════════════════════════════════════
function buildChart() {
  const c = document.getElementById('home-chart');
  if (!c) return;
  const data = [
    { d:'Mon', v:320 }, { d:'Tue', v:410 }, { d:'Wed', v:290 },
    { d:'Thu', v:380 }, { d:'Fri', v:440 }, { d:'Sat', v:500 }, { d:'Sun', v:0 }
  ];
  const max = 500;
  c.innerHTML = data.map(({ d, v }) => `
    <div class="cbar"
      style="height:${Math.max(v / max * 100, 2)}%;
             background:${d === 'Thu' ? 'var(--N)' : 'var(--BG2)'};
             border:1px solid ${d === 'Thu' ? 'var(--N)' : 'var(--BD)'}">
      <div class="cbarlbl">${d}</div>
    </div>`).join('');
}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ═══════════════════════════════════════
// PWA SERVICE WORKER REGISTRATION
// ═══════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW error:', err));
  });
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildEmpLists();
  buildPayroll();
  buildChart();
  buildStockList();
  // Set today's date
  const d = new Date();
  const dateEl = document.getElementById('today-date');
  if (dateEl) {
    dateEl.textContent = d.toLocaleDateString('en-IN', {
      weekday:'long', day:'numeric', month:'long', year:'numeric'
    });
  }
  // Date inputs default
  const today = d.toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(inp => {
    if (!inp.value) inp.value = today;
  });
});
