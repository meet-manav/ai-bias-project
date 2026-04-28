// ── AUTH GUARD ──
if (!sessionStorage.getItem('fairloan_token')) window.location.href = 'login.html';

// ── TRANSLATIONS ──
const T = {
  en: {
    urban:'Urban',rural:'Rural',logout:'Logout',home_loan:'Home Loan',personal_loan:'Personal Loan',
    lap_loan:'LAP',gender:'Gender',male:'Male',female:'Female',other:'Other',
    monthly_income:'Monthly Income (₹)',loan_amount:'Loan Amount (₹)',cibil_score:'CIBIL Score',
    existing_emi:'Existing EMI (₹)',job_type:'Job Type',salaried:'Salaried',business:'Self-Employed',
    existing_loans:'Existing Loans',missed_payments:'Missed Payments',occupation:'Occupation',
    farmer:'Farmer',labour:'Labour',small_business:'Small Business',approx_income:'Monthly Income (₹)',
    land_ownership:'Land Ownership',yes:'Yes',no:'No',land_acres:'Land (Acres)',
    savings_habit:'Savings Habit',payment_behavior:'Payment Behavior',good:'Good',bad:'Bad / Delayed',
    property_estimator:'Property Value Estimator',estimation_method:'Estimation Method',
    enter_manually:'Enter manually',estimate_area:'Estimate by City & Area',select_range:'Select range',
    prop_disclaimer:'*Estimates are approximate and subject to verification.',
    bank_simulator:'Bank Data Simulator',bank_desc:'Simulate bank data to compute Financial Health Score.',
    monthly_expenses:'Expenses (₹)',monthly_savings:'Savings (₹)',financial_health:'Financial Health Score',
    analyze_profile:'Analyze Financial Profile',analyzing:'Analyzing with FairLoan AI...',
    fill_form:'Fill the form to see AI Prediction',
    fill_desc:'Our bias-aware model will analyze your data and provide explainable results.',
    top_reasons:'Top Factors',feature_impact:'Feature Impact Visualization',
    bias_panel:'Bias Detection Panel',fair_comparison:'Model Comparison',
    what_if:'What-If Simulator',recalculate:'Recalculate Prediction',
    gov_schemes:'Government Schemes',ai_advisor:'AI Financial Advisor',download_report:'Download PDF Report'
  },
  hi: {
    urban:'शहरी',rural:'ग्रामीण',logout:'लॉगआउट',home_loan:'होम लोन',personal_loan:'पर्सनल लोन',
    lap_loan:'LAP',gender:'लिंग',male:'पुरुष',female:'महिला',other:'अन्य',
    monthly_income:'मासिक आय (₹)',loan_amount:'लोन राशि (₹)',cibil_score:'सिबिल स्कोर',
    existing_emi:'मौजूदा ईएमआई (₹)',job_type:'नौकरी का प्रकार',salaried:'वेतनभोगी',business:'स्व-रोजगार',
    existing_loans:'मौजूदा लोन',missed_payments:'चूकी किस्त',occupation:'व्यवसाय',
    farmer:'किसान',labour:'मज़दूर',small_business:'छोटा व्यापार',approx_income:'मासिक आय (₹)',
    land_ownership:'जमीन का स्वामित्व',yes:'हाँ',no:'नहीं',land_acres:'जमीन (एकड़)',
    savings_habit:'बचत की आदत',payment_behavior:'भुगतान व्यवहार',good:'अच्छा',bad:'खराब / देरी',
    property_estimator:'संपत्ति मूल्य अनुमानक',estimation_method:'अनुमान विधि',
    enter_manually:'मैन्युअल दर्ज करें',estimate_area:'शहर व क्षेत्र से अनुमान',select_range:'मूल्य सीमा चुनें',
    prop_disclaimer:'*अनुमान अनुमानित हैं।',bank_simulator:'बैंक डेटा सिम्युलेटर',
    bank_desc:'वित्तीय स्वास्थ्य स्कोर की गणना के लिए बैंक डेटा दर्ज करें।',
    monthly_expenses:'मासिक खर्च (₹)',monthly_savings:'मासिक बचत (₹)',financial_health:'वित्तीय स्वास्थ्य स्कोर',
    analyze_profile:'वित्तीय प्रोफ़ाइल का विश्लेषण करें',analyzing:'FairLoan AI के साथ विश्लेषण...',
    fill_form:'AI भविष्यवाणी देखने के लिए फॉर्म भरें',fill_desc:'हमारा मॉडल डेटा का विश्लेषण करेगा।',
    top_reasons:'शीर्ष कारण',feature_impact:'फ़ीचर प्रभाव',bias_panel:'पूर्वाग्रह पैनल',
    fair_comparison:'मॉडल तुलना',what_if:'व्हाट-इफ सिम्युलेटर',recalculate:'पुनर्गणना करें',
    gov_schemes:'सरकारी योजनाएं',ai_advisor:'AI वित्तीय सलाहकार',download_report:'PDF रिपोर्ट डाउनलोड करें'
  },
  gu: {
    urban:'શહેરી',rural:'ગ્રામીણ',logout:'લૉગઆઉટ',home_loan:'હોમ લોન',personal_loan:'પર્સનલ લોન',
    lap_loan:'LAP',gender:'લિંગ',male:'પુરુષ',female:'સ્ત્રી',other:'અન્ય',
    monthly_income:'માસિક આવક (₹)',loan_amount:'લોનની રકમ (₹)',cibil_score:'સિબિલ સ્કોર',
    existing_emi:'હાલની EMI (₹)',job_type:'નોકરીનો પ્રકાર',salaried:'પગારદાર',business:'સ્વ-રોજગાર',
    existing_loans:'હાલના લોન',missed_payments:'ચૂકી ગયેલ હપ્તા',occupation:'વ્યવસાય',
    farmer:'ખેડૂત',labour:'મજૂર',small_business:'નાનો વ્યાપાર',approx_income:'માસિક આવક (₹)',
    land_ownership:'જમીન માલિકી',yes:'હા',no:'ના',land_acres:'જમીન (એકર)',
    savings_habit:'બચત ટેવ',payment_behavior:'ચુકવણી વર્તણૂક',good:'સારું',bad:'ખરાબ / વિલંબ',
    property_estimator:'સંપત્તિ મૂલ્ય અંદાજ',estimation_method:'અંદાજ પદ્ધતિ',
    enter_manually:'જાતે દાખલ કરો',estimate_area:'શહેર અને વિસ્તાર દ્વારા',select_range:'મૂલ્ય શ્રેણી',
    prop_disclaimer:'*અંદાજો આશરે છે.',bank_simulator:'બેંક ડેટા સિમ્યુલેટર',
    bank_desc:'નાણાકીય આરોગ્ય સ્કોર ગણવા ડેટા દાખલ કરો.',
    monthly_expenses:'માસિક ખર્ચ (₹)',monthly_savings:'માસિક બચત (₹)',financial_health:'નાણાકીય આરોગ્ય સ્કોર',
    analyze_profile:'નાણાકીય પ્રોફાઇલ વિશ્લેષણ',analyzing:'FairLoan AI સાથે વિશ્લેષણ...',
    fill_form:'AI આગાહી જોવા ફોર્મ ભરો',fill_desc:'અમારું મોડલ ડેટાનું વિશ્લેષણ કરશે.',
    top_reasons:'ટોચના કારણો',feature_impact:'ફ઼ીચર અસર',bias_panel:'પૂર્વગ્રહ પેનલ',
    fair_comparison:'મોડેલ સરખામણી',what_if:'What-If સિમ્યુલેટર',recalculate:'ફરી ગણો',
    gov_schemes:'સરકારી યોજનાઓ',ai_advisor:'AI નાણાકીય સલાહકાર',download_report:'PDF રિપોર્ટ ડાઉનલોડ'
  }
};

// ── STATE ──
const state = {
  lang: 'en', mode: 'urban', loanType: 'home',
  healthScore: 0, currentData: null, lastResult: null
};

// ── DOM SHORTCUTS ──
const $ = id => document.getElementById(id);

// ── INIT ──
function init() {
  setupListeners();
  updateTranslations();
  updateModeUI();
  loadBiasData();
}

// ── LISTENERS ──
function setupListeners() {
  $('language-select').addEventListener('change', e => { state.lang = e.target.value; updateTranslations(); });
  $('mode-switch').addEventListener('change', e => { state.mode = e.target.checked ? 'rural' : 'urban'; updateModeUI(); });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.loanType = btn.dataset.tab;
      $('property-estimator').classList.toggle('hidden', state.loanType === 'personal');
    });
  });

  ['bank-expenses','bank-savings','u-income','r-income'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', calcHealthScore);
  });

  $('loan-form').addEventListener('submit', e => { e.preventDefault(); submitForm(); });

  $('sim-income').addEventListener('input', e => { $('sim-income-val').textContent = '₹' + Number(e.target.value).toLocaleString('en-IN'); });
  $('sim-emi').addEventListener('input', e => { $('sim-emi-val').textContent = '₹' + Number(e.target.value).toLocaleString('en-IN'); });
  $('sim-cibil').addEventListener('input', e => { $('sim-cibil-val').textContent = e.target.value; });
  $('sim-missed').addEventListener('input', e => { $('sim-missed-val').textContent = e.target.value; });
}

// ── TRANSLATIONS ──
function updateTranslations() {
  const d = T[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!d[key]) return;
    if (el.tagName === 'INPUT' && el.type !== 'submit') { el.placeholder = d[key]; return; }
    const icon = el.querySelector('.material-icons-round');
    el.textContent = d[key];
    if (icon) el.prepend(icon);
  });
}

// ── MODE UI ──
function updateModeUI() {
  const rural = state.mode === 'rural';
  $('label-urban').classList.toggle('active', !rural);
  $('label-rural').classList.toggle('active', rural);
  $('urban-inputs').classList.toggle('hidden', rural);
  $('rural-inputs').classList.toggle('hidden', !rural);
  $('sim-cibil-group').classList.toggle('hidden', rural);

  // Urban required fields
  ['u-income','u-amount','u-cibil','u-emi','u-gender','u-job'].forEach(id => {
    const el = $(id);
    if (el) rural ? el.removeAttribute('required') : el.setAttribute('required','true');
  });
  // Rural required fields
  ['r-income','r-amount'].forEach(id => {
    const el = $(id);
    if (el) rural ? el.setAttribute('required','true') : el.removeAttribute('required');
  });
  calcHealthScore();
}

// ── CONDITIONAL INPUTS ──
window.toggleLandAcres = () => {
  $('r-acres-group').classList.toggle('hidden', $('r-land').value !== 'yes');
};

window.togglePropMethod = () => {
  ['manual','estimate','range'].forEach(m => $('prop-'+m).classList.add('hidden'));
  $('prop-' + $('prop-method').value).classList.remove('hidden');
};

window.calculatePropValue = () => {
  const rates = { tier1: 15000, tier2: 7000, tier3: 3000 };
  const area = Number($('prop-area').value) || 0;
  const rate = rates[$('prop-city').value] || 0;
  $('prop-calc-result').textContent = 'Estimated: ₹' + (area * rate).toLocaleString('en-IN');
};

// ── PROPERTY VALUE HELPER ──
function getPropertyValue() {
  const method = $('prop-method').value;
  if (method === 'manual') return Number($('prop-val-manual').value) || 0;
  if (method === 'range') return Number($('prop-val-range').value) || 0;
  const rates = { tier1: 15000, tier2: 7000, tier3: 3000 };
  return (Number($('prop-area').value) || 0) * (rates[$('prop-city').value] || 0);
}

// ── HEALTH SCORE ──
function calcHealthScore() {
  const income = Number(state.mode === 'urban' ? $('u-income').value : $('r-income').value) || 0;
  const exp = Number($('bank-expenses').value) || 0;
  const sav = Number($('bank-savings').value) || 0;
  let score = 0;
  if (income > 0) {
    score = (sav / income) * 150;
    const er = exp / income;
    if (er > 0.8) score -= 40;
    else if (er > 0.6) score -= 20;
    score = Math.min(100, Math.max(0, Math.round(score)));
  }
  state.healthScore = score;
  $('health-score-fill').style.width = score + '%';
  $('health-score-fill').style.background = score > 70 ? 'var(--success)' : score > 40 ? 'var(--warning)' : 'var(--danger)';
  $('health-score-text').textContent = score + '/100';
  $('health-score-label').textContent = score > 70 ? 'Excellent' : score > 40 ? 'Moderate' : score > 0 ? 'Poor' : '';
}

// ── STATEMENT MOCK ANALYZE ──
window.analyzeStatement = () => {
  const f = $('bank-statement-file');
  if (!f.files.length) { showToast('Please select a PDF or CSV file first.','error'); return; }
  const loading = $('statement-loading');
  loading.classList.remove('hidden');
  setTimeout(() => {
    const income = Number(state.mode === 'urban' ? $('u-income').value : $('r-income').value) || 50000;
    $('bank-expenses').value = Math.floor(income * (0.4 + Math.random() * 0.25));
    $('bank-savings').value = Math.floor(income * (0.1 + Math.random() * 0.2));
    calcHealthScore();
    loading.classList.add('hidden');
    showToast('Statement analyzed successfully!', 'success');
  }, 2000);
};

// ── FORM SUBMIT ──
async function submitForm() {
  const urban = state.mode === 'urban';
  // Basic validation
  if (urban) {
    if (!$('u-income').value || !$('u-amount').value || !$('u-cibil').value) {
      showToast('Please fill all required fields.', 'error'); return;
    }
  } else {
    if (!$('r-income').value || !$('r-amount').value) {
      showToast('Please fill all required fields.', 'error'); return;
    }
  }

  const payload = {
    username: sessionStorage.getItem('fairloan_user') || 'anonymous',
    mode: state.mode,
    loan_type: state.loanType,
    gender: urban ? $('u-gender').value : $('r-gender').value,
    income: urban ? Number($('u-income').value) : Number($('r-income').value),
    loan_amount: urban ? Number($('u-amount').value) : Number($('r-amount').value),
    cibil: urban ? Number($('u-cibil').value) : 650,
    emi: urban ? Number($('u-emi').value) : 0,
    job_type: urban ? $('u-job').value : 'business',
    existing_loans: urban ? Number($('u-existing-loans').value) : 0,
    missed_payments: urban ? Number($('u-missed-payments').value) : 0,
    occupation: urban ? 'salaried' : $('r-occupation').value,
    land_ownership: urban ? 'no' : $('r-land').value,
    savings_habit: urban ? 'yes' : $('r-savings').value,
    payment_behavior: urban ? 'good' : $('r-payment').value,
    financial_health: state.healthScore,
    property_value: state.loanType !== 'personal' ? getPropertyValue() : 0
  };

  state.currentData = payload;

  // Show loading
  $('empty-state').classList.add('hidden');
  $('dashboard-content').classList.add('hidden');
  $('loading-overlay').classList.remove('hidden');

  try {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API error');
    const result = await res.json();
    state.lastResult = result;

    // Sync sliders
    $('sim-income').value = payload.income;
    $('sim-income-val').textContent = '₹' + payload.income.toLocaleString('en-IN');
    $('sim-emi').value = payload.emi;
    $('sim-emi-val').textContent = '₹' + payload.emi.toLocaleString('en-IN');
    $('sim-cibil').value = payload.cibil;
    $('sim-cibil-val').textContent = payload.cibil;
    $('sim-missed').value = payload.missed_payments;
    $('sim-missed-val').textContent = payload.missed_payments;

    renderDashboard(result, payload);
    loadBiasData();
    showToast('Analysis complete!', 'success');
  } catch (err) {
    showToast('Server error. Please make sure the server is running.', 'error');
    $('empty-state').classList.remove('hidden');
  } finally {
    $('loading-overlay').classList.add('hidden');
  }
}

// ── RENDER DASHBOARD ──
function renderDashboard(res, data) {
  $('loading-overlay').classList.add('hidden');
  $('dashboard-content').classList.remove('hidden');
  $('dashboard-content').style.display = 'flex';

  // Status
  $('loan-status').textContent = res.approved ? 'Approved ✓' : 'Rejected ✗';
  $('loan-status').className = 'status-text ' + (res.approved ? 'approved' : 'rejected');
  $('status-icon').className = 'status-icon ' + (res.approved ? 'approved' : 'rejected');

  // Rejection box
  const rbox = $('rejection-reason-container');
  if (!res.approved) {
    rbox.classList.remove('hidden');
    const neg = res.reasons.filter(r => r.type === 'negative').map(r => r.text).join('; ');
    $('rejection-reason-text').textContent = 'Not approved due to: ' + (neg || 'multiple risk factors') + '. See AI Advisor tips below.';
  } else {
    rbox.classList.add('hidden');
  }

  // Reasons
  $('reason-list').innerHTML = '';
  res.reasons.forEach(r => {
    const li = document.createElement('li');
    const icon = r.type === 'positive' ? 'check_circle' : 'cancel';
    const cls = r.type === 'positive' ? 'text-success' : 'text-danger';
    li.innerHTML = `<span class="material-icons-round ${cls}">${icon}</span> ${r.text}`;
    $('reason-list').appendChild(li);
  });

  // Feature chart
  $('feature-chart').innerHTML = '';
  res.features.forEach(f => {
    const abs = Math.abs(f.val);
    const cls = f.val >= 0 ? 'positive' : 'negative';
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `<span>${f.name}</span>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:0%"></div></div>
      <span class="${f.val >= 0 ? 'text-success' : 'text-danger'}" style="font-weight:700;font-size:0.82rem">${f.val > 0 ? '+' : ''}${f.val}</span>`;
    $('feature-chart').appendChild(row);
    setTimeout(() => row.querySelector('.bar-fill').style.width = abs + '%', 80);
  });

  // Fair model comparison
  $('std-result').textContent = res.std_approved ? 'Approved ✓' : 'Rejected ✗';
  $('std-result').className = res.std_approved ? 'text-success bold' : 'text-danger bold';
  $('fair-result').textContent = res.fair_approved ? 'Approved ✓' : 'Rejected ✗';
  $('fair-result').className = res.fair_approved ? 'text-success bold' : 'text-danger bold';

  // Schemes
  $('scheme-container').innerHTML = '';
  res.schemes.forEach(s => {
    const d = document.createElement('div');
    d.className = 'scheme-card';
    d.innerHTML = `<div class="scheme-icon"><span class="material-icons-round">${s.icon}</span></div>
      <div><strong style="font-size:0.9rem">${s.title}</strong><br><span class="text-sm text-muted">${s.desc}</span></div>`;
    $('scheme-container').appendChild(d);
  });

  // Advisor
  $('advisor-tips').innerHTML = '';
  res.advisor.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    $('advisor-tips').appendChild(li);
  });
}

// ── BIAS DATA ──
async function loadBiasData() {
  try {
    const res = await fetch('/api/bias');
    const b = await res.json();
    if (b.total_predictions === 0) return;

    const fmt = v => v !== null ? v + '%' : 'N/A';
    $('bias-male').textContent = fmt(b.gender.male);
    $('bias-female').textContent = fmt(b.gender.female);
    $('bias-urban').textContent = fmt(b.mode.urban);
    $('bias-rural').textContent = fmt(b.mode.rural);

    $('bias-gender-pct').textContent = b.gender.bias_pct + '% gap' + (b.gender.bias_detected ? ' ⚠️' : ' ✓');
    $('bias-gender-pct').className = b.gender.bias_detected ? 'text-xs text-warning' : 'text-xs text-success';
    $('bias-gender-bar').style.width = Math.min(b.gender.bias_pct * 3, 100) + '%';
    $('bias-gender-bar').style.background = b.gender.bias_detected ? 'var(--warning)' : 'var(--success)';

    $('bias-mode-pct').textContent = b.mode.bias_pct + '% gap' + (b.mode.bias_detected ? ' ⚠️' : ' ✓');
    $('bias-mode-pct').className = b.mode.bias_detected ? 'text-xs text-warning' : 'text-xs text-success';
    $('bias-mode-bar').style.width = Math.min(b.mode.bias_pct * 3, 100) + '%';
    $('bias-mode-bar').style.background = b.mode.bias_detected ? 'var(--warning)' : 'var(--success)';
  } catch (_) { /* server not ready yet */ }
}

// ── WHAT-IF SIMULATOR ──
window.simulateWhatIf = async () => {
  if (!state.currentData) { showToast('Run an analysis first.', 'error'); return; }
  const sim = { ...state.currentData };
  sim.income = Number($('sim-income').value);
  sim.emi = Number($('sim-emi').value);
  sim.cibil = Number($('sim-cibil').value);
  sim.missed_payments = Number($('sim-missed').value);

  try {
    const res = await fetch('/api/predict', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sim)
    });
    const result = await res.json();
    state.lastResult = result;
    renderDashboard(result, sim);
    showToast('Simulation updated!', 'info');
  } catch (_) {
    showToast('Could not reach the server.', 'error');
  }
};

// ── DOWNLOAD REPORT ──
window.downloadReport = () => {
  if (!state.lastResult || !state.currentData) {
    showToast('Please run an analysis first.', 'error'); return;
  }
  const r = state.lastResult, d = state.currentData;
  const lines = [
    'FairLoan AI – Loan Assessment Report',
    '=====================================',
    `Date: ${new Date().toLocaleString()}`,
    `Username: ${d.username}`,
    `Mode: ${d.mode} | Loan Type: ${d.loan_type}`,
    `Income: ₹${Number(d.income).toLocaleString('en-IN')} | Loan Amount: ₹${Number(d.loan_amount).toLocaleString('en-IN')}`,
    d.mode === 'urban' ? `CIBIL: ${d.cibil} | EMI: ₹${d.emi} | Existing Loans: ${d.existing_loans} | Missed Payments: ${d.missed_payments}` : '',
    '',
    `DECISION: ${r.approved ? 'APPROVED ✓' : 'REJECTED ✗'}`,
    `Standard Model: ${r.std_approved ? 'Approved' : 'Rejected'} | FairLoan AI: ${r.fair_approved ? 'Approved' : 'Rejected'}`,
    '',
    'TOP FACTORS:',
    ...r.reasons.map(x => `  [${x.type === 'positive' ? '+' : '-'}] ${x.text}`),
    '',
    'RECOMMENDED SCHEMES:',
    ...r.schemes.map(s => `  • ${s.title}: ${s.desc}`),
    '',
    'AI ADVISOR TIPS:',
    ...r.advisor.map(t => `  → ${t}`),
    '',
    'Financial Health Score: ' + state.healthScore + '/100',
  ].join('\n');

  const blob = new Blob([lines], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `FairLoan_Report_${Date.now()}.txt`;
  a.click();
  showToast('Report downloaded!', 'success');
};

// ── TOAST ──
function showToast(msg, type = 'info') {
  const c = $('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success: 'check_circle', error: 'error', info: 'info' };
  t.innerHTML = `<span class="material-icons-round" style="font-size:1.1rem">${icons[type]}</span> ${msg}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

// ── LOGOUT ──
window.logout = () => {
  sessionStorage.removeItem('fairloan_token');
  sessionStorage.removeItem('fairloan_user');
  window.location.href = 'login.html';
};

// ── START ──
init();
