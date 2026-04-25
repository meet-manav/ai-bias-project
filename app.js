// Check Authentication
if (!sessionStorage.getItem('fairloan_token')) {
    window.location.href = 'login.html';
}

// ==========================================
// TRANSLATIONS DICTIONARY
// ==========================================
const translations = {
    en: {
        home_loan: "Home Loan",
        personal_loan: "Personal Loan",
        lap_loan: "Loan Against Property",
        gender: "Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        monthly_income: "Monthly Income (₹)",
        loan_amount: "Loan Amount (₹)",
        cibil_score: "CIBIL Score",
        existing_emi: "Existing EMI (₹)",
        job_type: "Job Type",
        salaried: "Salaried",
        business: "Self-Employed / Business",
        occupation: "Occupation",
        farmer: "Farmer",
        labour: "Labour",
        small_business: "Small Business",
        approx_income: "Approx. Monthly Income (₹)",
        land_ownership: "Land Ownership",
        yes: "Yes",
        no: "No",
        land_acres: "Land (Acres)",
        savings_habit: "Savings Habit",
        payment_behavior: "Past Payment Behavior",
        good: "Good",
        bad: "Bad / Delayed",
        property_estimator: "Property Value Estimator",
        estimation_method: "Estimation Method",
        enter_manually: "Enter value manually",
        estimate_area: "Estimate using City & Area",
        select_range: "Select value range",
        prop_disclaimer: "*Estimates are approximate and subject to physical verification.",
        bank_simulator: "Bank Data Simulator",
        bank_desc: "Simulate connected bank account data to calculate Financial Health Score.",
        monthly_expenses: "Monthly Expenses (₹)",
        monthly_savings: "Monthly Savings (₹)",
        financial_health: "Financial Health Score",
        analyze_profile: "Analyze Financial Profile",
        analyzing: "Analyzing financial profile with FairLoan AI...",
        fill_form: "Fill the form to see AI Prediction",
        fill_desc: "Our bias-aware ML model will analyze the data and provide explainable results.",
        top_reasons: "Top Factors",
        feature_impact: "Feature Impact Visualization",
        bias_panel: "Bias Detection Panel",
        what_if: "What-If Simulator",
        recalculate: "Recalculate Prediction",
        gov_schemes: "Government Schemes",
        ai_advisor: "AI Financial Advisor"
    },
    hi: {
        home_loan: "होम लोन",
        personal_loan: "पर्सनल लोन",
        lap_loan: "प्रॉपर्टी पर लोन",
        gender: "लिंग",
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        monthly_income: "मासिक आय (₹)",
        loan_amount: "लोन राशि (₹)",
        cibil_score: "सिबिल स्कोर",
        existing_emi: "मौजूदा ईएमआई (₹)",
        job_type: "नौकरी का प्रकार",
        salaried: "वेतनभोगी",
        business: "स्व-रोजगार / व्यापार",
        occupation: "व्यवसाय",
        farmer: "किसान",
        labour: "मज़दूर",
        small_business: "छोटा व्यापार",
        approx_income: "लगभग मासिक आय (₹)",
        land_ownership: "जमीन का स्वामित्व",
        yes: "हाँ",
        no: "नहीं",
        land_acres: "जमीन (एकड़)",
        savings_habit: "बचत की आदत",
        payment_behavior: "पिछला भुगतान व्यवहार",
        good: "अच्छा",
        bad: "खराब / देरी",
        property_estimator: "संपत्ति मूल्य अनुमानक",
        estimation_method: "अनुमान विधि",
        enter_manually: "मैन्युअल रूप से दर्ज करें",
        estimate_area: "शहर और क्षेत्र का उपयोग करके अनुमान",
        select_range: "मूल्य सीमा चुनें",
        prop_disclaimer: "*अनुमान अनुमानित हैं और भौतिक सत्यापन के अधीन हैं।",
        bank_simulator: "बैंक डेटा सिम्युलेटर",
        bank_desc: "वित्तीय स्वास्थ्य स्कोर की गणना करने के लिए कनेक्टेड बैंक खाते के डेटा का अनुकरण करें।",
        monthly_expenses: "मासिक खर्च (₹)",
        monthly_savings: "मासिक बचत (₹)",
        financial_health: "वित्तीय स्वास्थ्य स्कोर",
        analyze_profile: "वित्तीय प्रोफ़ाइल का विश्लेषण करें",
        analyzing: "फेयरलोन एआई के साथ वित्तीय प्रोफ़ाइल का विश्लेषण...",
        fill_form: "एआई भविष्यवाणी देखने के लिए फॉर्म भरें",
        fill_desc: "हमारा पूर्वाग्रह-जागरूक एमएल मॉडल डेटा का विश्लेषण करेगा और व्याख्या योग्य परिणाम प्रदान करेगा।",
        top_reasons: "शीर्ष कारण",
        feature_impact: "फ़ीचर प्रभाव विज़ुअलाइज़ेशन",
        bias_panel: "पूर्वाग्रह का पता लगाने वाला पैनल",
        what_if: "व्हाट-इफ सिम्युलेटर",
        recalculate: "भविष्यवाणी की पुनर्गणना करें",
        gov_schemes: "सरकारी योजनाएं",
        ai_advisor: "एआई वित्तीय सलाहकार"
    },
    gu: {
        home_loan: "હોમ લોન",
        personal_loan: "પર્સનલ લોન",
        lap_loan: "પ્રોપર્ટી પર લોન",
        gender: "લિંગ",
        male: "પુરુષ",
        female: "સ્ત્રી",
        other: "અન્ય",
        monthly_income: "માસિક આવક (₹)",
        loan_amount: "લોનની રકમ (₹)",
        cibil_score: "સિબિલ સ્કોર",
        existing_emi: "હાલની ઇએમઆઇ (₹)",
        job_type: "નોકરીનો પ્રકાર",
        salaried: "પગારદાર",
        business: "સ્વ-રોજગાર / વ્યાપાર",
        occupation: "વ્યવસાય",
        farmer: "ખેડૂત",
        labour: "મજૂર",
        small_business: "નાનો વ્યાપાર",
        approx_income: "આશરે માસિક આવક (₹)",
        land_ownership: "જમીન માલિકી",
        yes: "હા",
        no: "ના",
        land_acres: "જમીન (એકર)",
        savings_habit: "બચત કરવાની ટેવ",
        payment_behavior: "ભૂતકાળની ચુકવણી વર્તણૂક",
        good: "સારું",
        bad: "ખરાબ / વિલંબ",
        property_estimator: "સંપત્તિ મૂલ્ય અંદાજક",
        estimation_method: "અંદાજ પદ્ધતિ",
        enter_manually: "જાતે દાખલ કરો",
        estimate_area: "શહેર અને વિસ્તારનો ઉપયોગ કરીને અંદાજ",
        select_range: "મૂલ્ય શ્રેણી પસંદ કરો",
        prop_disclaimer: "*અંદાજો આશરે છે અને ભૌતિક ચકાસણીને આધીન છે.",
        bank_simulator: "બેંક ડેટા સિમ્યુલેટર",
        bank_desc: "નાણાકીય આરોગ્ય સ્કોરની ગણતરી કરવા માટે કનેક્ટેડ બેંક એકાઉન્ટ ડેટાનું અનુકરણ કરો.",
        monthly_expenses: "માસિક ખર્ચ (₹)",
        monthly_savings: "માસિક બચત (₹)",
        financial_health: "નાણાકીય આરોગ્ય સ્કોર",
        analyze_profile: "નાણાકીય પ્રોફાઇલનું વિશ્લેષણ કરો",
        analyzing: "ફેરલોન એઆઈ સાથે નાણાકીય પ્રોફાઇલનું વિશ્લેષણ...",
        fill_form: "એઆઈ આગાહી જોવા માટે ફોર્મ ભરો",
        fill_desc: "અમારું પૂર્વગ્રહ-જાગૃત એમએલ મોડલ ડેટાનું વિશ્લેષણ કરશે અને સમજાવી શકાય તેવા પરિણામો પ્રદાન કરશે.",
        top_reasons: "ટોચના કારણો",
        feature_impact: "લક્ષણ પ્રભાવ વિઝ્યુલાઇઝેશન",
        bias_panel: "પૂર્વગ્રહ શોધ પેનલ",
        what_if: "વ્હોટ-ઇફ સિમ્યુલેટર",
        recalculate: "આગાહીની ફરીથી ગણતરી કરો",
        gov_schemes: "સરકારી યોજનાઓ",
        ai_advisor: "એઆઈ નાણાકીય સલાહકાર"
    }
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
const state = {
    language: 'en',
    mode: 'urban',
    loanType: 'home',
    healthScore: 0,
    currentData: null,
    predictedResult: null
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const els = {
    langSelect: document.getElementById('language-select'),
    modeSwitch: document.getElementById('mode-switch'),
    labelUrban: document.getElementById('label-urban'),
    labelRural: document.getElementById('label-rural'),
    urbanInputs: document.getElementById('urban-inputs'),
    ruralInputs: document.getElementById('rural-inputs'),
    propEstimator: document.getElementById('property-estimator'),
    tabs: document.querySelectorAll('.tab-btn'),
    form: document.getElementById('loan-form'),
    
    // Form Inputs (Urban)
    uIncome: document.getElementById('u-income'),
    uAmount: document.getElementById('u-amount'),
    uCibil: document.getElementById('u-cibil'),
    uEmi: document.getElementById('u-emi'),
    
    // Form Inputs (Rural)
    rIncome: document.getElementById('r-income'),
    rAmount: document.getElementById('r-amount'),
    
    // Bank Data
    bankExp: document.getElementById('bank-expenses'),
    bankSav: document.getElementById('bank-savings'),
    healthFill: document.getElementById('health-score-fill'),
    healthText: document.getElementById('health-score-text'),
    
    // Right Panel
    emptyState: document.getElementById('empty-state'),
    loadingOverlay: document.getElementById('loading-overlay'),
    dashboardContent: document.getElementById('dashboard-content'),
    
    // Results
    loanStatus: document.getElementById('loan-status'),
    statusIcon: document.getElementById('status-icon'),
    statusSubtext: document.getElementById('status-subtext'),
    reasonList: document.getElementById('reason-list'),
    featureChart: document.getElementById('feature-chart'),
    schemeContainer: document.getElementById('scheme-container'),
    advisorTips: document.getElementById('advisor-tips'),
    
    // Simulators
    simIncome: document.getElementById('sim-income'),
    simEmi: document.getElementById('sim-emi'),
    simCibil: document.getElementById('sim-cibil'),
    simIncomeVal: document.getElementById('sim-income-val'),
    simEmiVal: document.getElementById('sim-emi-val'),
    simCibilVal: document.getElementById('sim-cibil-val')
};

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    setupEventListeners();
    updateTranslations();
    calculateHealthScore(); // Setup bank data listeners
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Language
    els.langSelect.addEventListener('change', (e) => {
        state.language = e.target.value;
        updateTranslations();
    });

    // Mode Toggle
    els.modeSwitch.addEventListener('change', (e) => {
        state.mode = e.target.checked ? 'rural' : 'urban';
        updateModeUI();
    });

    // Tabs
    els.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            els.tabs.forEach(t => t.classList.remove('active'));
            const btn = e.currentTarget;
            btn.classList.add('active');
            state.loanType = btn.dataset.tab;
            
            // Toggle Property Estimator
            if (state.loanType === 'personal') {
                els.propEstimator.classList.add('hidden');
            } else {
                els.propEstimator.classList.remove('hidden');
            }
        });
    });

    // Bank Data
    els.bankExp.addEventListener('input', calculateHealthScore);
    els.bankSav.addEventListener('input', calculateHealthScore);
    els.uIncome.addEventListener('input', calculateHealthScore);
    els.rIncome.addEventListener('input', calculateHealthScore);

    // Form Submit
    els.form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
    });

    // Simulator Sliders
    els.simIncome.addEventListener('input', (e) => els.simIncomeVal.innerText = `₹${Number(e.target.value).toLocaleString()}`);
    els.simEmi.addEventListener('input', (e) => els.simEmiVal.innerText = `₹${Number(e.target.value).toLocaleString()}`);
    els.simCibil.addEventListener('input', (e) => els.simCibilVal.innerText = e.target.value);
}

// ==========================================
// TRANSLATION ENGINE
// ==========================================
function updateTranslations() {
    const dict = translations[state.language];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = dict[key];
            } else {
                // To preserve icons
                const icon = el.querySelector('.material-icons-round');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + dict[key]));
                } else {
                    el.innerText = dict[key];
                }
            }
        }
    });
}

// ==========================================
// UI UPDATES
// ==========================================
function updateModeUI() {
    if (state.mode === 'rural') {
        els.labelRural.classList.add('active');
        els.labelUrban.classList.remove('active');
        els.urbanInputs.classList.add('hidden');
        els.ruralInputs.classList.remove('hidden');
        document.getElementById('u-income').removeAttribute('required');
        document.getElementById('u-amount').removeAttribute('required');
        document.getElementById('u-cibil').removeAttribute('required');
        document.getElementById('r-income').setAttribute('required', 'true');
        document.getElementById('r-amount').setAttribute('required', 'true');
        document.getElementById('sim-cibil-group').classList.add('hidden'); // Hide CIBIL in rural sim
    } else {
        els.labelUrban.classList.add('active');
        els.labelRural.classList.remove('active');
        els.ruralInputs.classList.add('hidden');
        els.urbanInputs.classList.remove('hidden');
        document.getElementById('r-income').removeAttribute('required');
        document.getElementById('r-amount').removeAttribute('required');
        document.getElementById('u-income').setAttribute('required', 'true');
        document.getElementById('u-amount').setAttribute('required', 'true');
        document.getElementById('u-cibil').setAttribute('required', 'true');
        document.getElementById('sim-cibil-group').classList.remove('hidden');
    }
}

// Conditional inputs
window.toggleLandAcres = function() {
    const land = document.getElementById('r-land').value;
    const acresGroup = document.getElementById('r-acres-group');
    if (land === 'yes') {
        acresGroup.classList.remove('hidden');
    } else {
        acresGroup.classList.add('hidden');
    }
}

window.togglePropMethod = function() {
    const method = document.getElementById('prop-method').value;
    document.getElementById('prop-manual').classList.add('hidden');
    document.getElementById('prop-estimate').classList.add('hidden');
    document.getElementById('prop-range').classList.add('hidden');
    
    document.getElementById(`prop-${method}`).classList.remove('hidden');
}

window.calculatePropValue = function() {
    const city = document.getElementById('prop-city').value;
    const area = Number(document.getElementById('prop-area').value);
    let rate = 0;
    if (city === 'tier1') rate = 15000;
    if (city === 'tier2') rate = 7000;
    if (city === 'tier3') rate = 3000;
    
    const val = area * rate;
    document.getElementById('prop-calc-result').innerText = `Estimated: ₹${val.toLocaleString()}`;
}

function calculateHealthScore() {
    const income = Number(state.mode === 'urban' ? els.uIncome.value : els.rIncome.value) || 0;
    const exp = Number(els.bankExp.value) || 0;
    const sav = Number(els.bankSav.value) || 0;
    
    if (income === 0) {
        state.healthScore = 0;
    } else {
        // Simple logic: (savings / income) * 100 + penalties for high exp
        let score = (sav / income) * 150; 
        let expRatio = exp / income;
        if (expRatio > 0.6) score -= 20;
        if (expRatio > 0.8) score -= 40;
        
        state.healthScore = Math.min(Math.max(Math.round(score), 0), 100);
    }
    
    els.healthFill.style.width = `${state.healthScore}%`;
    els.healthText.innerText = `${state.healthScore}/100`;
    
    if (state.healthScore > 70) els.healthFill.style.background = 'var(--color-success)';
    else if (state.healthScore > 40) els.healthFill.style.background = 'var(--color-warning)';
    else els.healthFill.style.background = 'var(--color-danger)';
}

window.analyzeStatement = function() {
    const fileInput = document.getElementById('bank-statement-file');
    const loading = document.getElementById('statement-loading');
    
    if (!fileInput.files.length) {
        alert("Please select a PDF or CSV file first.");
        return;
    }
    
    // Show loading
    loading.classList.remove('hidden');
    
    // Simulate API delay for parsing
    setTimeout(() => {
        loading.classList.add('hidden');
        
        // Mock extracted data based on current income
        const income = Number(state.mode === 'urban' ? els.uIncome.value : els.rIncome.value) || 50000;
        
        // Generate realistic but random mocked values
        const mockExpenses = Math.floor(income * (0.4 + Math.random() * 0.3)); // 40-70% of income
        const mockSavings = Math.floor(income * (0.1 + Math.random() * 0.2)); // 10-30% of income
        
        els.bankExp.value = mockExpenses;
        els.bankSav.value = mockSavings;
        
        // Re-calculate the health score with the new values
        calculateHealthScore();
        
        // Highlight inputs to show they were auto-filled
        els.bankExp.style.borderColor = 'var(--color-success)';
        els.bankSav.style.borderColor = 'var(--color-success)';
        
        setTimeout(() => {
            els.bankExp.style.borderColor = '';
            els.bankSav.style.borderColor = '';
        }, 2000);
        
    }, 2000);
}

// ==========================================
// MOCK API SIMULATION
// ==========================================
async function submitForm() {
    // Gather data
    const payload = {
        mode: state.mode,
        loanType: state.loanType,
        income: state.mode === 'urban' ? Number(els.uIncome.value) : Number(els.rIncome.value),
        amount: state.mode === 'urban' ? Number(els.uAmount.value) : Number(els.rAmount.value),
        cibil: state.mode === 'urban' ? Number(els.uCibil.value) : null,
        emi: state.mode === 'urban' ? Number(els.uEmi.value) : 0,
        healthScore: state.healthScore
    };
    
    state.currentData = payload;

    // Show loading
    els.emptyState.classList.add('hidden');
    els.dashboardContent.classList.add('hidden');
    els.loadingOverlay.classList.remove('hidden');
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    // Mock Model Logic
    const result = mockPredict(payload);
    state.predictedResult = result;
    
    // Update Simulators
    els.simIncome.value = payload.income;
    els.simIncomeVal.innerText = `₹${payload.income.toLocaleString()}`;
    els.simEmi.value = payload.emi;
    els.simEmiVal.innerText = `₹${payload.emi.toLocaleString()}`;
    if (payload.cibil) {
        els.simCibil.value = payload.cibil;
        els.simCibilVal.innerText = payload.cibil;
    }
    
    renderDashboard(result);
}

function mockPredict(data) {
    let approved = true;
    let reasons = [];
    let features = [];
    
    if (data.mode === 'urban') {
        // Urban Model Rules
        const emiRatio = (data.emi / data.income) || 0;
        
        if (data.cibil < 650) {
            approved = false;
            reasons.push({ text: "Low CIBIL Score (< 650)", type: "negative" });
            features.push({ name: "CIBIL", val: -80 });
        } else {
            reasons.push({ text: "Good Credit History", type: "positive" });
            features.push({ name: "CIBIL", val: 70 });
        }
        
        if (emiRatio > 0.5) {
            approved = false;
            reasons.push({ text: "High EMI to Income Ratio (> 50%)", type: "negative" });
            features.push({ name: "EMI Burden", val: -60 });
        } else {
            features.push({ name: "EMI Burden", val: 40 });
        }
        
        if (data.healthScore < 40) {
            approved = false;
            reasons.push({ text: "Poor Bank Financial Health", type: "negative" });
            features.push({ name: "Health Score", val: -50 });
        } else {
            features.push({ name: "Health Score", val: Math.min(data.healthScore, 80) });
        }
        
    } else {
        // Rural Model Rules (Fair Model adjusted)
        const savingsHabit = document.getElementById('r-savings').value;
        const paymentBehavior = document.getElementById('r-payment').value;
        
        if (paymentBehavior === 'bad') {
            approved = false;
            reasons.push({ text: "History of delayed payments", type: "negative" });
            features.push({ name: "Payment History", val: -70 });
        } else {
            reasons.push({ text: "Good past payment behavior", type: "positive" });
            features.push({ name: "Payment History", val: 80 });
        }
        
        if (savingsHabit === 'no' && data.healthScore < 30) {
            approved = false;
            reasons.push({ text: "Low savings and cash buffers", type: "negative" });
            features.push({ name: "Savings", val: -50 });
        } else {
            reasons.push({ text: "Consistent savings pattern", type: "positive" });
            features.push({ name: "Savings", val: 60 });
        }
        
        const land = document.getElementById('r-land').value;
        if (land === 'yes') {
            reasons.push({ text: "Land ownership acts as collateral", type: "positive" });
            features.push({ name: "Collateral", val: 50 });
        }
    }
    
    // Recommendations
    const schemes = [];
    if (data.mode === 'rural') {
        schemes.push({ title: "Kisan Credit Card (KCC)", desc: "Subsidized interest rate at 4% for farmers." });
        if (data.loanType === 'home') schemes.push({ title: "PM Awas Yojana (Gramin)", desc: "Financial assistance for rural housing." });
    } else {
        if (data.loanType === 'home') schemes.push({ title: "PM Awas Yojana (Urban)", desc: "Credit linked subsidy for urban housing." });
        schemes.push({ title: "Mudra Loan", desc: "Up to ₹10 Lakhs for micro/small enterprises." });
    }

    return { approved, reasons, features, schemes };
}

// ==========================================
// RENDER DASHBOARD
// ==========================================
function renderDashboard(res) {
    els.loadingOverlay.classList.add('hidden');
    els.dashboardContent.classList.remove('hidden');
    
    // Status
    els.loanStatus.innerText = res.approved ? "Approved" : "Rejected";
    els.loanStatus.className = `status-text ${res.approved ? 'approved' : 'rejected'}`;
    els.statusIcon.className = `status-icon ${res.approved ? 'approved' : 'rejected'}`;
    
    // Explicit Rejection Reason
    const rejectionContainer = document.getElementById('rejection-reason-container');
    const rejectionText = document.getElementById('rejection-reason-text');
    if (!res.approved) {
        rejectionContainer.classList.remove('hidden');
        const negativeReasons = res.reasons.filter(r => r.type === 'negative').map(r => r.text.toLowerCase());
        rejectionText.innerText = "Your loan application was not approved due to: " + negativeReasons.join(", ") + ". Please review the AI Advisor tips below to improve your chances in the future.";
    } else {
        rejectionContainer.classList.add('hidden');
    }
    
    // Reasons
    els.reasonList.innerHTML = '';
    res.reasons.forEach(r => {
        const li = document.createElement('li');
        const icon = r.type === 'positive' ? 'check_circle' : 'cancel';
        const colorClass = r.type === 'positive' ? 'text-success' : 'text-danger';
        li.innerHTML = `<span class="material-icons-round ${colorClass}">${icon}</span> ${r.text}`;
        els.reasonList.appendChild(li);
    });
    
    // Feature Impact Chart
    els.featureChart.innerHTML = '';
    res.features.forEach(f => {
        const valAbs = Math.abs(f.val);
        const typeClass = f.val >= 0 ? 'positive' : 'negative';
        
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <span>${f.name}</span>
            <div class="bar-track">
                <div class="bar-fill ${typeClass}" style="width: 0%"></div>
            </div>
            <span class="${f.val >= 0 ? 'text-success' : 'text-danger'}">${f.val > 0 ? '+'+f.val : f.val}</span>
        `;
        els.featureChart.appendChild(row);
        
        // Animate bar
        setTimeout(() => {
            row.querySelector('.bar-fill').style.width = `${valAbs}%`;
            if(f.val < 0) {
                 row.querySelector('.bar-fill').style.right = '0';
                 row.querySelector('.bar-fill').style.left = 'auto';
            }
        }, 100);
    });
    
    // Schemes
    els.schemeContainer.innerHTML = '';
    res.schemes.forEach(s => {
        const div = document.createElement('div');
        div.className = 'scheme-card mb-3';
        div.innerHTML = `<strong>${s.title}</strong><br><span class="text-sm">${s.desc}</span>`;
        els.schemeContainer.appendChild(div);
    });
    
    // AI Advisor
    els.advisorTips.innerHTML = '';
    if (!res.approved) {
        if (state.mode === 'urban') {
            els.advisorTips.innerHTML += `<li>Pay off existing high-interest debt to lower your EMI ratio.</li>`;
            els.advisorTips.innerHTML += `<li>Ensure credit card utilization is below 30% to boost CIBIL.</li>`;
        } else {
            els.advisorTips.innerHTML += `<li>Open a recurring deposit to build a consistent savings track record.</li>`;
            els.advisorTips.innerHTML += `<li>Avoid cash-only transactions; route income through your bank.</li>`;
        }
    } else {
        els.advisorTips.innerHTML += `<li>Consider opting for a shorter tenure to save on total interest.</li>`;
        els.advisorTips.innerHTML += `<li>Automate your EMI payments to avoid late fees and protect your score.</li>`;
    }
}

// ==========================================
// WHAT-IF SIMULATOR
// ==========================================
window.simulateWhatIf = function() {
    if (!state.currentData) return;
    
    // Override current data with simulator inputs
    const simData = { ...state.currentData };
    simData.income = Number(els.simIncome.value);
    simData.emi = Number(els.simEmi.value);
    if (simData.mode === 'urban') {
        simData.cibil = Number(els.simCibil.value);
    }
    
    // Re-run health score mock based on ratio changes
    simData.healthScore = state.healthScore + (simData.income > state.currentData.income ? 10 : -10);
    
    const result = mockPredict(simData);
    renderDashboard(result);
    
    // Highlight update
    els.dashboardContent.classList.remove('slide-up');
    void els.dashboardContent.offsetWidth; // trigger reflow
    els.dashboardContent.classList.add('slide-up');
}

window.logout = function() {
    sessionStorage.removeItem('fairloan_token');
    sessionStorage.removeItem('fairloan_user');
    window.location.href = 'login.html';
}

// Start
init();
