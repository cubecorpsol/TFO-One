import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

// ═══════════════════════════════════════
// TRANSLATION DICTIONARY
// ═══════════════════════════════════════
const TRANSLATIONS = {
  en: {
    appTitle: "TFO One",
    tagline: "Your factory, in your hands.",
    subtitle: "Yarn · Payroll · Attendance · Reports",
    signIn: "Sign in to continue",
    continueGoogle: "Continue with Google",
    settingUp: "setting up?",
    newFactorySetup: "New factory setup",
    termsCheck: "I agree to Terms & Privacy Policy",
    getStarted: "Get started →",
    freeSecure: "Free to use · Secure sign in.",
    next: "Next →",
    back: "Back",
    ownerName: "Owner's Full Name",
    factoryName: "Factory / TFO Name",
    mobileNumber: "Mobile Number",
    whatsappNumber: "WhatsApp Number",
    numEmployees: "Number of Employees",
    factoryAddress: "Factory Address (City, State, Pincode)",
    city: "City",
    state: "State",
    pincode: "Pincode",
    letsGetStarted: "Let's Get Started",
    
    // Navigation
    home: "Home",
    stock: "Stock",
    staff: "Staff",
    payroll: "Payroll",
    reports: "Reports",
    settings: "Settings",
    profile: "Profile",

    // Dashboard
    welcome: "Welcome",
    todayOverview: "Today's Overview",
    week: "Week",
    totalStock: "Total Stock",
    employees: "Employees",
    weeklyPay: "Weekly Pay",
    production: "Production",
    quickActions: "Quick Actions",
    yarnInward: "Yarn Inward",
    yarnOutward: "Yarn Outward",
    attendance: "Attendance",
    weeklyProduction: "Weekly Production",
    totalThisWeek: "Total this week",
    recentActivity: "Recent Activity",

    // Stock Page
    inventory: "Inventory",
    totalKg: "Total KG",
    totalBags: "Total Bags",
    add: "Add",
    inward: "Inward",
    outward: "Outward",
    colorWiseStock: "Color-wise Stock",
    supplier: "Supplier",
    partyName: "Party / Customer Name",
    bags: "Bags",
    weightBag: "Weight/Bag (KG)",
    totalCalculated: "Total KG (Calculated)",
    notes: "Notes",
    saveInward: "Save Inward Entry",
    saveOutward: "Save Outward Entry",
    editStock: "Edit Stock",
    reason: "Reason for edit",
    removeOption: "Remove Option",
    save: "Save",
    removeColor: "Remove Color",
    colorName: "Yarn Color / Count",
    selectSupplier: "Select Supplier",
    selectColor: "Select Yarn Color",
    
    // Staff Page
    activeToday: "active today",
    all: "All",
    morning: "Morning",
    night: "Night",
    addEmployee: "Add Employee",
    personalDetails: "Personal Details",
    salaryInfo: "Salary Info",
    attendanceWeek: "This Week Attendance",
    familyInfo: "Family Info",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    markAttendance: "Mark Attendance",
    paySalary: "Pay Salary",
    removeEmployee: "Remove Employee",
    ratePerBag: "Rate per bag (₹)",
    ratePerShift: "Rate per shift (₹)",
    joiningDate: "Joining Date",
    fullName: "Full Name",
    dob: "Date of Birth",
    aadhaar: "Aadhaar Number",
    payType: "Salary Pay Type",
    shift: "Shift Type",
    address: "Address",
    docUpload: "Upload Aadhaar Document (PDF/Image)",
    bagProduction: "Bag Production",
    shiftBased: "Shift-based",
    bloodGroup: "Blood Group",

    // Payroll
    totalPayable: "Total Payable",
    advancesTotal: "Advances Total",
    pendingCount: "Pending Count",
    startWeeklyPayroll: "Start Weekly Payroll",
    startPayrollDesc: "Generate weekly payroll cycles with automated advances reductions.",
    startPayrollBtn: "Start",
    grossPay: "Gross Pay",
    advanceDeduction: "Advance Deduction",
    netPay: "Net Pay",
    generatePayroll: "Generate Payroll",
    downloadPdf: "Download PDF",
    editPayroll: "Edit Payroll Entry",
    rate: "Rate (₹)",

    // Reports
    stockReport: "Stock Report",
    payrollReport: "Payroll Report",
    employeeReport: "Employee Report",
    productionSummary: "Production Summary",
    dateRange: "Date Range",
    suppliers: "Suppliers",
    deliveries: "Deliveries",
    downloadPdfBtn: "Download as PDF",
    today: "Today",
    oneWeek: "1 Week",
    oneMonth: "1 Month",
    customRange: "Custom",

    // Settings
    factorySettings: "Factory Settings",
    notifications: "Notifications",
    language: "Language",
    dataBackup: "Data & Backup",
    logout: "Logout",
    syncNow: "Sync Now",
    exportData: "Export All Data",
    downloadPdfBackup: "Download PDF Backup",
    whatsappAlerts: "WhatsApp Alerts",
    smsAlerts: "SMS Alerts",
    payrollReminders: "Payroll Reminders",
    logoUpload: "Upload Factory Logo",

    // Dialogs
    confirmTitle: "Are you sure?",
    confirmDeleteEmp: "Are you sure you want to remove this employee registry? This action cannot be undone.",
    confirmPayroll: "Start weekly payroll calculations for this week?",
    cancel: "Cancel",
    confirm: "Confirm",

    // Toasts
    savedSuccessfully: "Saved successfully!",
    errorOccurred: "An error occurred",
    attendanceSaved: "Attendance saved successfully!",
    stockAdded: "Stock inward entry saved!",
    stockIssued: "Stock outward entry saved!",
    employeeAdded: "Employee profile created!",
    employeeRemoved: "Employee removed successfully!",
    payrollStartedSuccess: "Weekly payroll cycle started!",
    pdfGenerated: "PDF generated and downloaded!",
    syncedSuccessfully: "Data cloud sync completed!",
    offlineMode: "Switched to offline mode",
    onlineMode: "Switched to online mode",
    logoUploaded: "Logo uploaded successfully!",
    dataExported: "Factory database exported successfully!"
  },
  ta: {
    appTitle: "TFO One (டி.எஃப்.ஓ ஒன்)",
    tagline: "உங்கள் தொழிற்சாலை, உங்கள் கைகளில்.",
    subtitle: "நூல் · சம்பளம் · வருகைப்பதிவு · அறிக்கைகள்",
    signIn: "தொடர உள்நுழையவும்",
    continueGoogle: "கூகுள் மூலம் தொடரவும்",
    settingUp: "புதிய தொழிற்சாலையா?",
    newFactorySetup: "புதிய தொழிற்சாலை அமைப்பு",
    termsCheck: "விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஏற்கிறேன்",
    getStarted: "தொடங்குங்கள் →",
    freeSecure: "இலவச பயன்பாடு · பாதுகாப்பான உள்நுழைவு.",
    next: "அடுத்து →",
    back: "பின்னால்",
    ownerName: "உரிமையாளரின் முழுப் பெயர்",
    factoryName: "தொழிற்சாலை / TFO பெயர்",
    mobileNumber: "கைபேசி எண்",
    whatsappNumber: "வாட்ஸ்அப் எண்",
    numEmployees: "பணியாளர்களின் எண்ணிக்கை",
    factoryAddress: "தொழிற்சாலை முகவரி (நகரம், மாநிலம், பின் கோடு)",
    city: "ஊர் / நகரம்",
    state: "மாநிலம்",
    pincode: "அஞ்சல் குறியீடு",
    letsGetStarted: "துவங்குவோம்",

    // Navigation
    home: "முகப்பு",
    stock: "இருப்பு",
    staff: "பணியாளர்கள்",
    payroll: "சம்பளம்",
    reports: "அறிக்கைகள்",
    settings: "அமைப்புகள்",
    profile: "விவரக்குறிப்பு",

    // Dashboard
    welcome: "வரவேற்கிறோம்",
    todayOverview: "இன்றைய கண்ணோட்டம்",
    week: "வாரம்",
    totalStock: "மொத்த இருப்பு",
    employees: "பணியாளர்கள்",
    weeklyPay: "வாராந்திர சம்பளம்",
    production: "உற்பத்தி",
    quickActions: "விரைவான செயல்கள்",
    yarnInward: "நூல் உள்ளீடு",
    yarnOutward: "நூல் வெளியீடு",
    attendance: "வருகைப்பதிவு",
    weeklyProduction: "வாராந்திர உற்பத்தி",
    totalThisWeek: "இந்த வார மொத்தம்",
    recentActivity: "சமீபத்திய நடவடிக்கைகள்",

    // Stock Page
    inventory: "சரக்கு இருப்பு",
    totalKg: "மொத்த கிலோ",
    totalBags: "மொத்த மூடைகள்",
    add: "சேர்",
    inward: "உள்ளீடு",
    outward: "வெளியீடு",
    colorWiseStock: "நிறம் வாரியாக இருப்பு",
    supplier: "சப்ளையர்",
    partyName: "வாடிக்கையாளர் பெயர்",
    bags: "மூடைகள்",
    weightBag: "மூடை எடை (கிலோ)",
    totalCalculated: "மொத்த கிலோ (கணக்கிடப்பட்டது)",
    notes: "குறிப்புகள்",
    saveInward: "உள்ளீட்டைச் சேமி",
    saveOutward: "வெளியீட்டைச் சேமி",
    editStock: "இருப்பைத் திருத்து",
    reason: "திருத்துவதற்கான காரணம்",
    removeOption: "நீக்கு",
    save: "சேமி",
    removeColor: "நிறத்தை நீக்கு",
    colorName: "நூல் நிறம் / கவுண்ட்",
    selectSupplier: "சப்ளையரைத் தேர்ந்தெடு",
    selectColor: "நூல் நிறத்தைத் தேர்ந்தெடு",

    // Staff Page
    activeToday: "இன்று பணிபுரிபவர்கள்",
    all: "அனைவரும்",
    morning: "பகல் ஷிப்ட்",
    night: "இரவு ஷிப்ட்",
    addEmployee: "பணியாளரைச் சேர்",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    salaryInfo: "சம்பள விவரம்",
    attendanceWeek: "இந்த வார வருகை",
    familyInfo: "குடும்ப விவரங்கள்",
    fatherName: "தந்தையின் பெயர்",
    motherName: "தாயின் பெயர்",
    markAttendance: "வருகைப்பதிவு செய்",
    paySalary: "சம்பளம் வழங்கு",
    removeEmployee: "பணியாளரை நீக்கு",
    ratePerBag: "மூடைக்கான வீதம் (₹)",
    ratePerShift: "ஷிப்ட் வீதம் (₹)",
    joiningDate: "சேர்ந்த தேதி",
    fullName: "முழுப் பெயர்",
    dob: "பிறந்த தேதி",
    aadhaar: "ஆதார் எண்",
    payType: "சம்பள முறை",
    shift: "ஷிப்ட் வகை",
    address: "முகவரி",
    docUpload: "ஆதார் ஆவணத்தைப் பதிவேற்றவும் (PDF/படம்)",
    bagProduction: "மூடை உற்பத்தி முறை",
    shiftBased: "ஷிப்ட் முறை",
    bloodGroup: "இரத்த வகை",

    // Payroll
    totalPayable: "மொத்த சம்பளம்",
    advancesTotal: "மொத்த முன்பணம்",
    pendingCount: "நிலுவையில் உள்ளவை",
    startWeeklyPayroll: "வாராந்திர சம்பளத்தை உருவாக்கு",
    startPayrollDesc: "முன்பணக் கழிவுகளுடன் வாராந்திர சம்பளப் பட்டியலை உருவாக்கவும்.",
    startPayrollBtn: "தொடங்கு",
    grossPay: "மொத்த சம்பளம்",
    advanceDeduction: "முன்பணக் கழிவு",
    netPay: "நிகர சம்பளம்",
    generatePayroll: "சம்பளப் பட்டியல் உருவாக்கு",
    downloadPdf: "PDF தரவிறக்கம்",
    editPayroll: "சம்பளத் திருத்தம்",
    rate: "வீதம் (₹)",

    // Reports
    stockReport: "இருப்பு அறிக்கை",
    payrollReport: "சம்பள அறிக்கை",
    employeeReport: "பணியாளர் அறிக்கை",
    productionSummary: "உற்பத்தி விவரம்",
    dateRange: "தேதி வரம்பு",
    suppliers: "சப்ளையர்கள்",
    deliveries: "விநியோகங்கள்",
    downloadPdfBtn: "PDF தரவிறக்கம்",
    today: "இன்று",
    oneWeek: "1 வாரம்",
    oneMonth: "1 மாதம்",
    customRange: "தேதியைத் தேர்ந்தெடு",

    // Settings
    factorySettings: "தொழிற்சாலை அமைப்புகள்",
    notifications: "அறிவிப்புகள்",
    language: "மொழி",
    dataBackup: "தரவு & காப்புநகல்",
    logout: "வெளியேறு",
    syncNow: "இப்போது ஒத்திசை",
    exportData: "அனைத்து தரவையும் ஏற்று",
    downloadPdfBackup: "PDF காப்புநகல் தரவிறக்கம்",
    whatsappAlerts: "வாட்ஸ்அப் அறிவிப்புகள்",
    smsAlerts: "எஸ்எம்எஸ் அறிவிப்புகள்",
    payrollReminders: "சம்பள நினைவூட்டல்கள்",
    logoUpload: "தொழிற்சாலை லோகோ பதிவேற்றம்",

    // Dialogs
    confirmTitle: "நிச்சயமாகவா?",
    confirmDeleteEmp: "இந்தப் பணியாளர் பதிவை நீக்க விரும்புகிறீர்களா? இந்தச் செயலை மாற்ற முடியாது.",
    confirmPayroll: "இந்த வாரத்திற்கான சம்பளக் கணக்கீடுகளைத் தொடங்கவா?",
    cancel: "ரத்து செய்",
    confirm: "உறுதி செய்",

    // Toasts
    savedSuccessfully: "வெற்றிகரமாக சேமிக்கப்பட்டது!",
    errorOccurred: "ஒரு பிழை ஏற்பட்டது",
    attendanceSaved: "வருகைப்பதிவு வெற்றிகரமாக சேமிக்கப்பட்டது!",
    stockAdded: "நூல் உள்ளீடு சேமிக்கப்பட்டது!",
    stockIssued: "நூல் வெளியீடு சேமிக்கப்பட்டது!",
    employeeAdded: "பணியாளர் விவரம் சேர்க்கப்பட்டது!",
    employeeRemoved: "பணியாளர் விவரம் நீக்கப்பட்டது!",
    payrollStartedSuccess: "வாராந்திர சம்பள முறை தொடங்கப்பட்டது!",
    pdfGenerated: "PDF அறிக்கை உருவாக்கப்பட்டது!",
    syncedSuccessfully: "தரவுகள் வெற்றிகரமாக ஒத்திசைக்கப்பட்டது!",
    offlineMode: "இணையமில்லா பயன்முறைக்கு மாற்றப்பட்டது",
    onlineMode: "இணைய பயன்முறைக்கு மாற்றப்பட்டது",
    logoUploaded: "லோகோ வெற்றிகரமாக பதிவேற்றப்பட்டது!",
    dataExported: "தொழிற்சாலை தரவு வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது!"
  }
};

// ═══════════════════════════════════════
// INITIAL DUMMY DATABASE
// ═══════════════════════════════════════
const INITIAL_STOCK = [];

const INITIAL_EMPLOYEES = [];

const INITIAL_INWARD = [];

const INITIAL_OUTWARD = [];

const INITIAL_SUPPLIERS = [];

export default function App() {
  // ═══════════════════════════════════════
  // REACT STATE SIGNATURES
  // ═══════════════════════════════════════
  const [sessionUser, setSessionUser] = useState(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('tfo_lang') || 'en');
  const [currentScreen, setCurrentScreen] = useState(() => localStorage.getItem('tfo_screen') || 'auth');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState(() => {
    const saved = localStorage.getItem('tfo_onboard');
    return saved ? JSON.parse(saved) : {
      ownerName: '',
      factoryName: '',
      phone: '',
      whatsapp: '',
      employeeCount: '',
      city: '',
      state: '',
      pincode: ''
    };
  });

  const [isOffline, setIsOffline] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // App Core Databases
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('tfo_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [stockItems, setStockItems] = useState(() => {
    const saved = localStorage.getItem('tfo_stock');
    return saved ? JSON.parse(saved) : INITIAL_STOCK;
  });

  const [inwardHistory, setInwardHistory] = useState(() => {
    const saved = localStorage.getItem('tfo_inward_hist');
    return saved ? JSON.parse(saved) : INITIAL_INWARD;
  });

  const [outwardHistory, setOutwardHistory] = useState(() => {
    const saved = localStorage.getItem('tfo_outward_hist');
    return saved ? JSON.parse(saved) : INITIAL_OUTWARD;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('tfo_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  // Sheets & Overlays
  const [showSheet, setShowSheet] = useState(null); // 'inward' | 'outward' | 'attendance' | 'add-employee' | 'edit-stock' | 'edit-payroll'
  const [selectedColorToEdit, setSelectedColorToEdit] = useState(null);
  const [selectedPayrollRecord, setSelectedPayrollRecord] = useState(null);
  const [stockTab, setStockTab] = useState('stock'); // 'stock' | 'inward' | 'outward'
  const [staffTab, setStaffTab] = useState('all'); // 'all' | 'morning' | 'night'
  
  // Payroll records
  const [payrollPeriod, setPayrollPeriod] = useState("Week 25, June 2026");
  const [payrollStarted, setPayrollStarted] = useState(() => {
    return localStorage.getItem('tfo_payroll_started') === 'true';
  });
  const [payrollRecords, setPayrollRecords] = useState(() => {
    const saved = localStorage.getItem('tfo_payroll_records');
    return saved ? JSON.parse(saved) : [];
  });

  // Custom UI Overlays
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', message: '', onConfirm: null });
  
  // Date Range Report states
  const [reportRange, setReportRange] = useState('month'); // 'today' | 'week' | 'month' | 'custom'
  const [customRangeFrom, setCustomRangeFrom] = useState('');
  const [customRangeTo, setCustomRangeTo] = useState('');

  // Camera capture states (for Add Employee sheet)
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Form input validation variables
  const [inwardForm, setInwardForm] = useState({ date: new Date().toISOString().split('T')[0], supplier: '', supplierNew: '', color: '', bags: '', weightPerBag: '62.250', notes: '' });
  const [outwardForm, setOutwardForm] = useState({ date: new Date().toISOString().split('T')[0], partyName: '', color: '', bags: '', weightPerBag: '62.250' });
  const [employeeForm, setEmployeeForm] = useState({ name: '', fatherName: '', motherName: '', mobile: '', bloodGroup: 'A+', dob: '', aadhaar: '', payType: 'bag', shift: 'Morning', rate: '', joiningDate: new Date().toISOString().split('T')[0], address: '', docName: '' });
  const [stockEditForm, setStockEditForm] = useState({ kg: '', bags: '', reason: '' });
  const [payrollEditForm, setPayrollEditForm] = useState({ bags: 0, shifts: 0, rate: 0, advance: 0 });
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false);

  // ═══════════════════════════════════════
  // WELCOME EMAIL INTEGRATION
  // ═══════════════════════════════════════
  const sendWelcomeEmailToNewUser = async () => {
    console.log('[Welcome Email] Function called');
    console.log('[Welcome Email] sessionUser:', sessionUser?.email);
    console.log('[Welcome Email] supabase available:', !!supabase);
    console.log('[Welcome Email] welcomeEmailSent flag:', welcomeEmailSent);

    if (!sessionUser || !supabase || welcomeEmailSent) {
      console.warn('[Welcome Email] Skipping - missing required data or already sent');
      console.warn('[Welcome Email] sessionUser:', !!sessionUser, 'supabase:', !!supabase, 'sent:', welcomeEmailSent);
      return;
    }

    try {
      const userEmail = sessionUser.email;
      const userName = onboardingData.ownerName || sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'User';

      console.log(`[Welcome Email] Sending to: ${userEmail}`);
      console.log(`[Welcome Email] User name: ${userName}`);

      if (!userEmail) {
        console.error('[Welcome Email] User email is missing!');
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email: userEmail,
          name: userName,
        },
      });

      if (error) {
        console.error('[Welcome Email] Error invoking edge function:', error);
        console.error('[Welcome Email] Full error:', JSON.stringify(error));
      } else {
        console.log('[Welcome Email] Successfully sent to', userEmail);
        console.log('[Welcome Email] Response data:', data);
        setWelcomeEmailSent(true);
      }
    } catch (err) {
      console.error('[Welcome Email] Exception occurred:', err);
      console.error('[Welcome Email] Error stack:', err.stack);
    }
  };

  // ═══════════════════════════════════════
  // SUPABASE BACKEND INTEGRATION DYNAMICS
  // ═══════════════════════════════════════
  const fetchUserData = async (userId) => {
    try {
      const { data: factoryData } = await supabase
        .from('factories')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (factoryData) {
        setOnboardingData({
          ownerName: factoryData.owner_name,
          factoryName: factoryData.factory_name,
          phone: factoryData.phone,
          whatsapp: factoryData.whatsapp,
          employeeCount: factoryData.employee_count.toString(),
          city: factoryData.city,
          state: factoryData.state,
          pincode: factoryData.pincode
        });
        setCurrentScreen('main');
        setCurrentPage('home');
      } else {
        // New user detected - send welcome email immediately
        console.log('[Welcome Email] New user detected, sending welcome email');
        setCurrentScreen('onboarding');
        setOnboardingStep(1);
        // Send welcome email for new user
        if (sessionUser && !welcomeEmailSent) {
          await sendWelcomeEmailToNewUser();
        }
      }

      const { data: empData } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', userId);
      
      if (empData && empData.length > 0) {
        const mappedEmps = empData.map(e => ({
          id: e.id,
          name: e.name,
          role: e.role,
          shift: e.shift,
          bloodGroup: e.blood_group,
          status: e.status,
          mobile: e.mobile,
          aadhaar: e.aadhaar,
          payType: e.pay_type,
          rate: parseFloat(e.rate),
          joiningDate: e.joining_date,
          address: e.address,
          family: { father: e.father_name, mother: e.mother_name },
          photo: e.photo || "👨",
          attendance: e.attendance || []
        }));
        setEmployees(mappedEmps);
      }

      const { data: stData } = await supabase
        .from('stock_items')
        .select('*')
        .eq('user_id', userId);
      
      if (stData && stData.length > 0) {
        const mappedStocks = stData.map(s => ({
          color: s.color,
          bags: s.bags,
          kg: parseFloat(s.kg)
        }));
        setStockItems(mappedStocks);
      }

      const { data: inData } = await supabase
        .from('inward_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (inData && inData.length > 0) {
        const mappedInward = inData.map(i => ({
          id: i.id,
          supplier: i.supplier,
          color: i.color,
          bags: i.bags,
          weightPerBag: parseFloat(i.weight_per_bag),
          totalKg: parseFloat(i.total_kg),
          date: i.date,
          notes: i.notes
        }));
        setInwardHistory(mappedInward);
      }

      const { data: outData } = await supabase
        .from('outward_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (outData && outData.length > 0) {
        const mappedOutward = outData.map(o => ({
          id: o.id,
          partyName: o.party_name,
          color: o.color,
          bags: o.bags,
          weightPerBag: parseFloat(o.weight_per_bag),
          totalKg: parseFloat(o.total_kg),
          date: o.date
        }));
        setOutwardHistory(mappedOutward);
      }

      const { data: supData } = await supabase
        .from('suppliers')
        .select('*')
        .eq('user_id', userId);
      
      if (supData && supData.length > 0) {
        const mappedSups = supData.map(s => ({
          name: s.name,
          deliveryCount: s.delivery_count,
          totalKg: parseFloat(s.total_kg)
        }));
        setSuppliers(mappedSups);
      }

      const { data: payData } = await supabase
        .from('payroll_records')
        .select('*')
        .eq('user_id', userId);
      
      if (payData && payData.length > 0) {
        const mappedPayroll = payData.map(p => ({
          employeeId: p.employee_id,
          name: p.name,
          payType: p.pay_type,
          bags: p.bags,
          shifts: p.shifts,
          rate: parseFloat(p.rate),
          gross: parseFloat(p.gross),
          advance: parseFloat(p.advance),
          net: parseFloat(p.net),
          periodLabel: p.period_label
        }));
        setPayrollRecords(mappedPayroll);
      }
    } catch (err) {
      console.error("Error loading user data from Supabase:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      // No Supabase credentials — demo mode
      if (onboardingData.ownerName && onboardingData.factoryName) {
        setCurrentScreen('main');
        setCurrentPage('home');
      } else {
        setCurrentScreen('onboarding');
        setOnboardingStep(1);
      }
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.warn("Google Auth simulated - continuing in demo/local mode:", err.message || err);
      if (onboardingData.ownerName && onboardingData.factoryName) {
        setCurrentScreen('main');
        setCurrentPage('home');
      } else {
        setCurrentScreen('onboarding');
        setOnboardingStep(1);
      }
    }
  };

  const handleLogout = async () => {
    try {
      if (supabase) await supabase.auth.signOut();
    } catch (err) {
      console.warn("Error during sign out:", err);
    }
    setSessionUser(null);
    setWelcomeEmailSent(false);
    setEmployees([]);
    setStockItems([]);
    setInwardHistory([]);
    setOutwardHistory([]);
    setSuppliers([]);
    setPayrollRecords([]);
    setPayrollStarted(false);
    setOnboardingData({
      ownerName: '',
      factoryName: '',
      phone: '',
      whatsapp: '',
      employeeCount: '',
      city: '',
      state: '',
      pincode: ''
    });
    setCurrentScreen('auth');
    triggerToast("Logged out successfully");
  };

  const handleSaveFactorySettings = async () => {
    if (sessionUser && supabase) {
      const { error } = await supabase.from('factories').upsert({
        user_id: sessionUser.id,
        owner_name: onboardingData.ownerName,
        factory_name: onboardingData.factoryName,
        phone: onboardingData.phone,
        whatsapp: onboardingData.whatsapp,
        employee_count: parseInt(onboardingData.employeeCount) || 0,
        city: onboardingData.city,
        state: onboardingData.state,
        pincode: onboardingData.pincode
      });
      if (error) {
        console.error("Error updating factory settings:", error);
        triggerToast("Sync Failed");
      } else {
        triggerToast(t('savedSuccessfully'));
      }
    } else {
      triggerToast(t('savedSuccessfully'));
    }
    setShowSheet(null);
  };

  useEffect(() => {
    if (!supabase) {
      if (!localStorage.getItem('tfo_screen')) {
        setCurrentScreen('auth');
      }
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionUser(session.user);
        fetchUserData(session.user.id);
      } else {
        setCurrentScreen('auth');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSessionUser(session.user);
        fetchUserData(session.user.id);
      } else {
        setSessionUser(null);
        setCurrentScreen('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Send welcome email when new user is detected (on initial auth)
  useEffect(() => {
    const checkAndSendWelcomeEmail = async () => {
      if (!sessionUser || !supabase || welcomeEmailSent || currentScreen !== 'onboarding') {
        return;
      }

      try {
        // Check if this is truly a new user (no factory data exists)
        const { data: factoryData, error } = await supabase
          .from('factories')
          .select('user_id')
          .eq('user_id', sessionUser.id)
          .single();

        // If no factory data exists, this is a new user - send welcome email
        if (!factoryData && !error) {
          console.log('[Welcome Email] New user confirmed, sending welcome email');
          await sendWelcomeEmailToNewUser();
        }
      } catch (err) {
        // Expected error when no factory record exists (new user)
        if (err.code === 'PGRST116') {
          console.log('[Welcome Email] New user confirmed (no factory record), sending email');
          await sendWelcomeEmailToNewUser();
        }
      }
    };

    checkAndSendWelcomeEmail();
  }, [sessionUser, currentScreen]);

  // ═══════════════════════════════════════
  // LOCALSTORAGE DYNAMICS
  // ═══════════════════════════════════════
  useEffect(() => {
    localStorage.setItem('tfo_lang', language);
    document.body.className = language === 'ta' ? 'ta' : '';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('tfo_screen', currentScreen);
  }, [currentScreen]);

  useEffect(() => {
    localStorage.setItem('tfo_onboard', JSON.stringify(onboardingData));
  }, [onboardingData]);

  useEffect(() => {
    localStorage.setItem('tfo_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('tfo_stock', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('tfo_inward_hist', JSON.stringify(inwardHistory));
  }, [inwardHistory]);

  useEffect(() => {
    localStorage.setItem('tfo_outward_hist', JSON.stringify(outwardHistory));
  }, [outwardHistory]);

  useEffect(() => {
    localStorage.setItem('tfo_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('tfo_payroll_started', payrollStarted ? 'true' : 'false');
  }, [payrollStarted]);

  useEffect(() => {
    localStorage.setItem('tfo_payroll_records', JSON.stringify(payrollRecords));
  }, [payrollRecords]);

  // ═══════════════════════════════════════
  // UTILITY HELPER LOGIC
  // ═══════════════════════════════════════
  const t = (key) => TRANSLATIONS[language][key] || key;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ta' : 'en';
    setLanguage(nextLang);
  };

  const toggleConnection = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    triggerToast(nextState ? t('offlineMode') : t('onlineMode'));
  };

  // Automated default payroll mapping when period starts
  const initializePayrollRecords = () => {
    const records = employees.map(emp => {
      // Default workloads
      const bags = emp.payType === 'bag' ? 180 : 0;
      const shifts = emp.payType === 'shift' ? 6 : 0;
      const gross = emp.payType === 'bag' ? (bags * emp.rate) : (shifts * emp.rate);
      const advance = 1500; // Simulated active advance deduction
      return {
        employeeId: emp.id,
        name: emp.name,
        payType: emp.payType,
        bags,
        shifts,
        rate: emp.rate,
        gross,
        advance,
        net: gross - advance
      };
    });
    setPayrollRecords(records);
  };

  // CSV/Text download simulation
  const downloadSimulatedFile = (filename, fileContent) => {
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(t('pdfGenerated'));
  };

  // Camera Controls
  const startCamera = async () => {
    setCapturedPhoto(null);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera hardware not available or access blocked. Loading simulated camera feed.");
    }
  };

  const capturePhoto = () => {
    if (streamRef.current && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedPhoto(dataUrl);
      stopCamera();
    } else {
      // Simulation Capture
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      // Create a premium circular textile wheel pattern
      ctx.fillStyle = '#C8541A';
      ctx.fillRect(0, 0, 300, 300);
      ctx.strokeStyle = '#FDF8F3';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(150, 150, 80, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px DM Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("TFO Worker", 150, 150);
      setCapturedPhoto(canvas.toDataURL('image/jpeg'));
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // ═══════════════════════════════════════
  // HANDLERS FOR FORMS
  // ═══════════════════════════════════════
  
  // Yarn Inward Submit
  const handleInwardSubmit = async (e) => {
    e.preventDefault();
    const finalSupplier = inwardForm.supplier === 'new' ? inwardForm.supplierNew : inwardForm.supplier;
    if (!finalSupplier || !inwardForm.color || !inwardForm.bags || !inwardForm.weightPerBag) {
      triggerToast(t('errorOccurred'));
      return;
    }

    const bagsNum = parseInt(inwardForm.bags);
    const weightNum = parseFloat(inwardForm.weightPerBag);
    const totalCalc = bagsNum * weightNum;

    // 1. Update stock levels
    let updatedStock = [...stockItems];
    const existingIndex = stockItems.findIndex(item => item.color.toLowerCase() === inwardForm.color.toLowerCase());
    if (existingIndex > -1) {
      updatedStock[existingIndex].bags += bagsNum;
      updatedStock[existingIndex].kg += totalCalc;
      setStockItems(updatedStock);
    } else {
      updatedStock = [...stockItems, { color: inwardForm.color, bags: bagsNum, kg: totalCalc }];
      setStockItems(updatedStock);
    }

    // 2. Add history log
    const entryId = "INW" + Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      id: entryId,
      supplier: finalSupplier,
      color: inwardForm.color,
      bags: bagsNum,
      weightPerBag: weightNum,
      totalKg: totalCalc,
      date: inwardForm.date
    };
    setInwardHistory([newEntry, ...inwardHistory]);

    // 3. Update supplier deliveries
    let updatedSups = [...suppliers];
    const supIndex = suppliers.findIndex(s => s.name.toLowerCase() === finalSupplier.toLowerCase());
    if (supIndex > -1) {
      updatedSups[supIndex].deliveryCount += 1;
      updatedSups[supIndex].totalKg += totalCalc;
      setSuppliers(updatedSups);
    } else {
      updatedSups = [...suppliers, { name: finalSupplier, deliveryCount: 1, totalKg: totalCalc }];
      setSuppliers(updatedSups);
    }

    if (sessionUser) {
      try {
        const stockItem = existingIndex > -1 ? updatedStock[existingIndex] : { color: inwardForm.color, bags: bagsNum, kg: totalCalc };
        await supabase.from('stock_items').upsert({
          user_id: sessionUser.id,
          color: stockItem.color,
          bags: stockItem.bags,
          kg: stockItem.kg
        }, { onConflict: 'user_id,color' });

        await supabase.from('inward_history').insert({
          id: entryId,
          user_id: sessionUser.id,
          supplier: finalSupplier,
          color: inwardForm.color,
          bags: bagsNum,
          weight_per_bag: weightNum,
          total_kg: totalCalc,
          date: inwardForm.date,
          notes: inwardForm.notes
        });

        const supItem = supIndex > -1 ? updatedSups[supIndex] : { name: finalSupplier, deliveryCount: 1, totalKg: totalCalc };
        await supabase.from('suppliers').upsert({
          user_id: sessionUser.id,
          name: supItem.name,
          delivery_count: supItem.deliveryCount,
          total_kg: supItem.totalKg
        }, { onConflict: 'user_id,name' });

        triggerToast(t('stockAdded'));
      } catch (err) {
        console.error("Error syncing inward stock:", err);
        triggerToast("Sync Failed. Saved locally.");
      }
    } else {
      triggerToast(t('stockAdded'));
    }

    setShowSheet(null);
    setInwardForm({ date: new Date().toISOString().split('T')[0], supplier: '', supplierNew: '', color: '', bags: '', weightPerBag: '62.250', notes: '' });
  };

  // Yarn Outward Submit
  const handleOutwardSubmit = async (e) => {
    e.preventDefault();
    if (!outwardForm.partyName || !outwardForm.color || !outwardForm.bags) {
      triggerToast(t('errorOccurred'));
      return;
    }

    const bagsNum = parseInt(outwardForm.bags);
    const weightNum = parseFloat(outwardForm.weightPerBag);
    const totalCalc = bagsNum * weightNum;

    const stockIndex = stockItems.findIndex(item => item.color === outwardForm.color);
    if (stockIndex === -1 || stockItems[stockIndex].bags < bagsNum) {
      triggerToast("Insufficient yarn stock!");
      return;
    }

    // 1. Deduct stock
    const updatedStock = [...stockItems];
    updatedStock[stockIndex].bags -= bagsNum;
    updatedStock[stockIndex].kg = Math.max(0, updatedStock[stockIndex].kg - totalCalc);
    setStockItems(updatedStock);

    // 2. Add history log
    const entryId = "OUT" + Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      id: entryId,
      partyName: outwardForm.partyName,
      color: outwardForm.color,
      bags: bagsNum,
      weightPerBag: weightNum,
      totalKg: totalCalc,
      date: outwardForm.date
    };
    setOutwardHistory([newEntry, ...outwardHistory]);

    if (sessionUser) {
      try {
        const stockItem = updatedStock[stockIndex];
        await supabase.from('stock_items').upsert({
          user_id: sessionUser.id,
          color: stockItem.color,
          bags: stockItem.bags,
          kg: stockItem.kg
        }, { onConflict: 'user_id,color' });

        await supabase.from('outward_history').insert({
          id: entryId,
          user_id: sessionUser.id,
          party_name: outwardForm.partyName,
          color: outwardForm.color,
          bags: bagsNum,
          weight_per_bag: weightNum,
          total_kg: totalCalc,
          date: outwardForm.date
        });
        
        triggerToast(t('stockIssued'));
      } catch (err) {
        console.error("Error syncing outward stock:", err);
        triggerToast("Sync Failed. Saved locally.");
      }
    } else {
      triggerToast(t('stockIssued'));
    }

    setShowSheet(null);
    setOutwardForm({ date: new Date().toISOString().split('T')[0], partyName: '', color: '', bags: '', weightPerBag: '62.250' });
  };

  // Edit Stock bottom sheet submit
  const handleEditStockSubmit = (e) => {
    e.preventDefault();
    if (!selectedColorToEdit || !stockEditForm.kg || !stockEditForm.bags) return;

    const updated = stockItems.map(item => {
      if (item.color === selectedColorToEdit.color) {
        return {
          ...item,
          kg: parseFloat(stockEditForm.kg),
          bags: parseInt(stockEditForm.bags)
        };
      }
      return item;
    });
    setStockItems(updated);
    setShowSheet(null);
    triggerToast(t('savedSuccessfully'));
  };

  const handleRemoveColor = () => {
    const updated = stockItems.filter(item => item.color !== selectedColorToEdit.color);
    setStockItems(updated);
    setShowSheet(null);
    triggerToast(t('savedSuccessfully'));
  };

  // Save Attendance Grid
  const [attendanceGrid, setAttendanceGrid] = useState({});
  const openAttendanceSheet = () => {
    const initialGrid = {};
    employees.forEach(emp => {
      initialGrid[emp.id] = emp.status;
    });
    setAttendanceGrid(initialGrid);
    setShowSheet('attendance');
  };

  const saveAttendance = () => {
    const updated = employees.map(emp => {
      const newStatus = attendanceGrid[emp.id] || emp.status;
      return {
        ...emp,
        status: newStatus,
        // Append to history list
        attendance: [newStatus, ...emp.attendance.slice(0, 6)]
      };
    });
    setEmployees(updated);
    setShowSheet(null);
    triggerToast(t('attendanceSaved'));
  };

  // Add Employee Submit
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!employeeForm.name || !employeeForm.mobile || !employeeForm.rate) {
      triggerToast(t('errorOccurred'));
      return;
    }

    const newEmpId = "TFO-EMP-" + Math.floor(100 + Math.random() * 900);
    const newEmp = {
      id: newEmpId,
      name: employeeForm.name,
      role: employeeForm.payType === 'bag' ? "Weaver" : "Helper",
      shift: employeeForm.shift,
      bloodGroup: employeeForm.bloodGroup,
      status: "present",
      mobile: employeeForm.mobile,
      aadhaar: employeeForm.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3') || "XXXX-XXXX-XXXX",
      payType: employeeForm.payType,
      rate: parseFloat(employeeForm.rate),
      joiningDate: employeeForm.joiningDate,
      address: employeeForm.address,
      family: { father: employeeForm.fatherName, mother: employeeForm.motherName },
      photo: capturedPhoto || "👨",
      attendance: ["present", "present", "present", "present", "present", "present", "holiday"]
    };

    setEmployees([...employees, newEmp]);
    setShowSheet(null);
    triggerToast(t('employeeAdded'));
    setCapturedPhoto(null);
    setEmployeeForm({ name: '', fatherName: '', motherName: '', mobile: '', bloodGroup: 'A+', dob: '', aadhaar: '', payType: 'bag', shift: 'Morning', rate: '', joiningDate: new Date().toISOString().split('T')[0], address: '', docName: '' });
  };

  // Remove Employee Trigger
  const handleRemoveEmployee = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'delete_employee',
      message: t('confirmDeleteEmp'),
      onConfirm: () => {
        const updated = employees.filter(emp => emp.id !== selectedEmployee.id);
        setEmployees(updated);
        setSelectedEmployee(null);
        setCurrentPage('staff');
        setConfirmDialog({ isOpen: false, type: '', message: '', onConfirm: null });
        triggerToast(t('employeeRemoved'));
      }
    });
  };

  // Start payroll calculations confirmation
  const handleStartPayrollTrigger = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'start_payroll',
      message: `${t('confirmPayroll')} (${payrollPeriod})`,
      onConfirm: () => {
        setPayrollStarted(true);
        initializePayrollRecords();
        setConfirmDialog({ isOpen: false, type: '', message: '', onConfirm: null });
        triggerToast(t('payrollStartedSuccess'));
      }
    });
  };

  // Edit Payroll record entry values
  const handleEditPayrollSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayrollRecord) return;

    const rateNum = parseFloat(payrollEditForm.rate);
    const bagsNum = parseInt(payrollEditForm.bags);
    const shiftsNum = parseInt(payrollEditForm.shifts);
    const advNum = parseFloat(payrollEditForm.advance);

    const gross = selectedPayrollRecord.payType === 'bag' ? (bagsNum * rateNum) : (shiftsNum * rateNum);
    const net = gross - advNum;

    const updated = payrollRecords.map(rec => {
      if (rec.employeeId === selectedPayrollRecord.employeeId) {
        return {
          ...rec,
          rate: rateNum,
          bags: bagsNum,
          shifts: shiftsNum,
          advance: advNum,
          gross,
          net
        };
      }
      return rec;
    });

    setPayrollRecords(updated);
    setShowSheet(null);
    triggerToast(t('savedSuccessfully'));
  };

  // Onboarding Step Flow validation
  const validateOnboardingStep = () => {
    if (onboardingStep === 1) return onboardingData.ownerName.trim().length > 0;
    if (onboardingStep === 2) return onboardingData.factoryName.trim().length > 0;
    if (onboardingStep === 3) return onboardingData.phone.length === 10 && onboardingData.whatsapp.length === 10;
    if (onboardingStep === 4) return parseInt(onboardingData.employeeCount) > 0;
    if (onboardingStep === 5) return onboardingData.city.trim().length > 0 && onboardingData.pincode.length === 6;
    return false;
  };

  // Complete Onboarding Data entries
  const completeOnboarding = async () => {
    if (sessionUser) {
      const { error } = await supabase.from('factories').upsert({
        user_id: sessionUser.id,
        owner_name: onboardingData.ownerName,
        factory_name: onboardingData.factoryName,
        phone: onboardingData.phone,
        whatsapp: onboardingData.whatsapp,
        employee_count: parseInt(onboardingData.employeeCount) || 0,
        city: onboardingData.city,
        state: onboardingData.state,
        pincode: onboardingData.pincode
      });
      if (error) {
        console.error("Error saving onboarding settings:", error);
        triggerToast("Sync Failed. Saved locally.");
      } else {
        triggerToast(t('savedSuccessfully'));
        // Send welcome email after successful onboarding
        await sendWelcomeEmailToNewUser();
      }
    } else {
      triggerToast(t('savedSuccessfully'));
    }
    setCurrentScreen('main');
    setCurrentPage('home');
  };

  // Render components helper for profile details
  const renderProfilePage = () => {
    if (!selectedEmployee) return null;
    const emp = selectedEmployee;
    const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
      <div className="ep-flex">
        <div className="ep-hdr">
          <button className="ep-back-btn" onClick={() => { setSelectedEmployee(null); setCurrentPage('staff'); }}>
            <i className="ti ti-arrow-left"></i>
          </button>
          
          <div className="ep-top-acts">
            <button className="icon-btn ib-edit" onClick={() => {
              setEmployeeForm({
                name: emp.name,
                fatherName: emp.family.father,
                motherName: emp.family.mother,
                mobile: emp.mobile,
                bloodGroup: emp.bloodGroup,
                dob: emp.dob || '1995-06-15',
                aadhaar: emp.aadhaar.replace(/-/g, ''),
                payType: emp.payType,
                shift: emp.shift,
                rate: emp.rate.toString(),
                joiningDate: emp.joiningDate,
                address: emp.address,
                docName: ''
              });
              setCapturedPhoto(emp.photo);
              setShowSheet('add-employee');
            }}>
              <i className="ti ti-pencil"></i>
            </button>
            <button className="icon-btn ib-del" onClick={handleRemoveEmployee}>
              <i className="ti ti-trash"></i>
            </button>
          </div>

          <div className="ep-profile-row">
            <div className="ep-photo">
              {emp.photo && emp.photo.startsWith('data:') ? <img src={emp.photo} className="camera-preview-img" alt="" /> : (emp.photo || initials)}
            </div>
            <div className="ep-details">
              <span className="ep-name">{emp.name}</span>
              <span className="ep-role">{emp.role} · {emp.id}</span>
              <div className="ep-badges">
                <span className="epb epb-s">{emp.shift === 'Morning' ? t('morning') : t('night')}</span>
                <span className="epb epb-b">{emp.bloodGroup}</span>
                <span className={`epb ${emp.status === 'present' ? 'epb-p' : 'epb-b'}`}>
                  {emp.status === 'present' ? '✓ Present' : '✗ Absent'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pbody">
          <div className="psec">
            <div className="pshdr">
              <span className="pstitle">{t('personalDetails')}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-phone"></i> {t('mobileNumber')}</span>
              <span className="pfval">+91 {emp.mobile}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-id"></i> {t('aadhaar')}</span>
              <span className="pfval">{emp.aadhaar}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-droplet"></i> {t('bloodGroup')}</span>
              <span className="pfval">{emp.bloodGroup}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-map-pin"></i> {t('address')}</span>
              <span className="pfval">{emp.address}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-calendar"></i> {t('joiningDate')}</span>
              <span className="pfval">{emp.joiningDate}</span>
            </div>
          </div>

          <div className="psec">
            <div className="pshdr">
              <span className="pstitle">{t('salaryInfo')}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-wallet"></i> {t('payType')}</span>
              <span className="pfval">{emp.payType === 'bag' ? t('bagProduction') : t('shiftBased')}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-currency-rupee"></i> {emp.payType === 'bag' ? t('ratePerBag') : t('ratePerShift')}</span>
              <span className="pfval">₹{emp.rate.toFixed(2)}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-minus"></i> {t('advanceDeduction')} (Avg)</span>
              <span className="pfval">₹1,500.00</span>
            </div>
          </div>

          <div className="psec">
            <div className="pshdr">
              <span className="pstitle">{t('attendanceWeek')}</span>
              <button className="hbtn" style={{ padding: '4px 8px', minHeight: '30px' }} onClick={openAttendanceSheet}>
                <i className="ti ti-pencil"></i>
              </button>
            </div>
            <div className="attweek">
              {emp.attendance.map((dayStatus, idx) => {
                const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                return (
                  <div key={idx} className={`atd ${dayStatus === 'present' ? 'atp' : dayStatus === 'absent' ? 'ata' : 'ath'}`}>
                    <span className="atd-day">{daysOfWeek[idx]}</span>
                    <span>{dayStatus === 'present' ? 'P' : dayStatus === 'absent' ? 'A' : 'H'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="psec">
            <div className="pshdr">
              <span className="pstitle">{t('familyInfo')}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-user"></i> {t('fatherName')}</span>
              <span className="pfval">{emp.family.father}</span>
            </div>
            <div className="pf">
              <span className="pflbl"><i className="ti ti-user"></i> {t('motherName')}</span>
              <span className="pfval">{emp.family.mother}</span>
            </div>
          </div>

          <div className="ep-action-row">
            <button className="ep-act-primary" onClick={openAttendanceSheet}>
              <i className="ti ti-clipboard-list"></i> {t('markAttendance')}
            </button>
            <button className="ep-act-green" onClick={() => { setCurrentPage('payroll'); }}>
              <i className="ti ti-currency-rupee"></i> {t('paySalary')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // RENDER METHOD
  // ═══════════════════════════════════════
  return (
    <div id="APP">

      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. AUTHENTICATION SCREEN                                 */}
      {/* ──────────────────────────────────────────────────────── */}
      {currentScreen === 'auth' && (
        <div className="scr on">
          <div className="auth-container animate-fade-in">
            <div className="auth-header">
              <div className="ltog" onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
                <span className={`lbtn ${language === 'en' ? 'on' : ''}`}>EN</span>
                <span className={`lbtn ${language === 'ta' ? 'on' : ''}`} style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>த</span>
              </div>
            </div>

            <div className="auth-content">
              <div className="auth-hero">
                <div className="auth-logo-badge">
                  <i className="ti ti-building-factory"></i>
                </div>
                <h1 className="auth-wordmark">{t('appTitle')}</h1>
                <p className="auth-tagline">{t('tagline')}</p>
                <p className="auth-subtitle">{t('subtitle')}</p>
              </div>

              <div className="auth-card">
                <h2 className="auth-card-title">{t('signIn')}</h2>
                
                <button className="btn-google" onClick={handleGoogleSignIn}>
                  <svg viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  {t('continueGoogle')}
                </button>

                <div className="auth-privacy-notice">
                  <span>
                    By continuing, you agree to our <a href="#terms">Terms of Service</a> &amp; <a href="#privacy">Privacy Policy</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="auth-footer">
              <i className="ti ti-shield-lock"></i> {t('freeSecure')}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. ONBOARDING FLOW (5 steps)                             */}
      {/* ──────────────────────────────────────────────────────── */}
      {currentScreen === 'onboarding' && (
        <div className="scr on">
          <div className="onboard-container">
            <div className="onboard-top">
              <div className="onboard-nav">
                <button className="btn-back-onboard" onClick={() => {
                  if (onboardingStep > 1) {
                    setOnboardingStep(onboardingStep - 1);
                  } else {
                    setCurrentScreen('auth');
                  }
                }}>
                  <i className="ti ti-arrow-left"></i>
                </button>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${onboardingStep * 20}%` }}></div>
                </div>
                <span className="progress-text">Step {onboardingStep} of 5</span>
              </div>
            </div>

            <div className="onboard-body">
              {onboardingStep === 1 && (
                <>
                  <h2 className="onboard-title">Enter the factory owner's full name</h2>
                  <div className="fgrp">
                    <label className="flbl">{t('ownerName')}</label>
                    <input
                      type="text"
                      className="large-input"
                      placeholder="e.g. Guna Murugan"
                      value={onboardingData.ownerName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, ownerName: e.target.value })}
                    />
                  </div>
                </>
              )}

              {onboardingStep === 2 && (
                <>
                  <h2 className="onboard-title">What is your factory or TFO name?</h2>
                  <div className="fgrp">
                    <label className="flbl">{t('factoryName')}</label>
                    <input
                      type="text"
                      className="large-input"
                      placeholder="e.g. Guna's TFO Mills"
                      value={onboardingData.factoryName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, factoryName: e.target.value })}
                    />
                  </div>
                </>
              )}

              {onboardingStep === 3 && (
                <>
                  <h2 className="onboard-title">Enter your contact numbers</h2>
                  <div className="fgrp">
                    <label className="flbl"><i className="ti ti-phone"></i> {t('mobileNumber')}</label>
                    <div className="phone-row" style={{ display: 'flex', gap: '8px' }}>
                      <div className="cc-box" style={{ background: 'var(--W)', border: '1.5px solid var(--BD)', padding: '12px', borderRadius: '10px', fontWeight: 'bold' }}>+91</div>
                      <input
                        type="tel"
                        maxLength="10"
                        className="large-input"
                        placeholder="98765 43210"
                        value={onboardingData.phone}
                        onChange={(e) => setOnboardingData({ ...onboardingData, phone: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                  </div>
                  <div className="fgrp" style={{ marginTop: '16px' }}>
                    <label className="flbl"><i className="ti ti-brand-whatsapp"></i> {t('whatsappNumber')}</label>
                    <div className="phone-row" style={{ display: 'flex', gap: '8px' }}>
                      <div className="cc-box" style={{ background: 'var(--W)', border: '1.5px solid var(--BD)', padding: '12px', borderRadius: '10px', fontWeight: 'bold' }}>+91</div>
                      <input
                        type="tel"
                        maxLength="10"
                        className="large-input"
                        placeholder="WhatsApp Number"
                        value={onboardingData.whatsapp}
                        onChange={(e) => setOnboardingData({ ...onboardingData, whatsapp: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                  </div>
                </>
              )}

              {onboardingStep === 4 && (
                <>
                  <h2 className="onboard-title">How many employees work at the factory?</h2>
                  <div className="fgrp">
                    <label className="flbl">{t('numEmployees')}</label>
                    <input
                      type="number"
                      className="large-input"
                      placeholder="e.g. 24"
                      value={onboardingData.employeeCount}
                      onChange={(e) => setOnboardingData({ ...onboardingData, employeeCount: e.target.value })}
                    />
                  </div>
                </>
              )}

              {onboardingStep === 5 && (
                <>
                  <h2 className="onboard-title">Factory Address &amp; Location</h2>
                  <div className="fgrp">
                    <label className="flbl">{t('city')}</label>
                    <input
                      type="text"
                      className="large-input"
                      placeholder="City (e.g. Coimbatore)"
                      value={onboardingData.city}
                      onChange={(e) => setOnboardingData({ ...onboardingData, city: e.target.value })}
                      style={{ marginBottom: '12px' }}
                    />
                  </div>
                  <div className="frow">
                    <div className="fgrp">
                      <label className="flbl">{t('state')}</label>
                      <input
                        type="text"
                        className="large-input"
                        placeholder="State"
                        value={onboardingData.state}
                        onChange={(e) => setOnboardingData({ ...onboardingData, state: e.target.value })}
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                    <div className="fgrp">
                      <label className="flbl">{t('pincode')}</label>
                      <input
                        type="tel"
                        maxLength="6"
                        className="large-input"
                        placeholder="641001"
                        value={onboardingData.pincode}
                        onChange={(e) => setOnboardingData({ ...onboardingData, pincode: e.target.value.replace(/\D/g, '') })}
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div className="summary-card" style={{ marginTop: '20px' }}>
                    <div className="summary-row">
                      <span className="summary-label">{t('ownerName')}</span>
                      <span className="summary-value">{onboardingData.ownerName}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">{t('factoryName')}</span>
                      <span className="summary-value">{onboardingData.factoryName}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">{t('mobileNumber')}</span>
                      <span className="summary-value">+91 {onboardingData.phone}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">{t('numEmployees')}</span>
                      <span className="summary-value">{onboardingData.employeeCount} staff</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">{t('factoryAddress')}</span>
                      <span className="summary-value">{onboardingData.city}, {onboardingData.state} - {onboardingData.pincode}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="onboard-bottom">
              {onboardingStep < 5 ? (
                <button className="bpri" onClick={() => setOnboardingStep(onboardingStep + 1)} disabled={!validateOnboardingStep()}>
                  {t('next')}
                </button>
              ) : (
                <button className="bpri" onClick={completeOnboarding} disabled={!validateOnboardingStep()}>
                  <i className="ti ti-check"></i> {t('letsGetStarted')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. MAIN APP STRUCTURE                                    */}
      {/* ──────────────────────────────────────────────────────── */}
      {currentScreen === 'main' && (
        <div className="scr on">
          
          {/* Top Header Bar */}
          <div className="topbar">
            <div className="tbrand">
              <div className="tb-left">
                <div className="tb-logo">
                  <svg viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#FFFFFF" />
                    <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#FFFFFF" opacity=".5" />
                    <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#FFFFFF" opacity=".5" />
                    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="tb-name">{t('appTitle')}</span>
              </div>

              <div className="tb-right">
                {/* Language switch button */}
                <div className="ltog" onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
                  <span className={`lbtn ${language === 'en' ? 'on' : ''}`}>EN</span>
                  <span className={`lbtn ${language === 'ta' ? 'on' : ''}`} style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>த</span>
                </div>
                <div className="tb-icon-btn" onClick={() => { setCurrentPage('settings'); setSelectedEmployee(null); }}>
                  <i className="ti ti-settings"></i>
                </div>
              </div>
            </div>

            <div className="facbar">
              <div>
                <span className="fac-greet">{t('welcome')}, {onboardingData.ownerName}</span>
                <div className="fac-name">{onboardingData.factoryName}</div>
              </div>
              
              {/* Connection Toggle Switch */}
              <div className={`fsync ${isOffline ? 'offline' : ''}`} onClick={toggleConnection} title="Toggle Online Mode">
                <div className="sdot"></div>
                <span>{isOffline ? "Offline" : "Synced"}</span>
              </div>
            </div>
          </div>

          {/* Main Tab Pages Scrollable Area */}
          <div className="pcontent">
            {selectedEmployee ? (
              renderProfilePage()
            ) : (
              <>
                {/* ═══════════════════════════════════════
                    HOME DASHBOARD PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'home' && (
                  <div className="page on">
                    <div className="page-intro">
                      <div>
                        <div className="ptitle">{t('todayOverview')}</div>
                        <div className="psub">Tuesday, 16 June 2026</div>
                      </div>
                      <span className="badge bb">{t('week')} 25</span>
                    </div>

                    {/* Stat Cards 2x2 grid */}
                    <div className="sgrid">
                      <div className="sc pri">
                        <div className="slbl">{t('totalStock')}</div>
                        <div>
                          <span className="sval">
                            {stockItems.reduce((acc, curr) => acc + curr.kg, 0).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                          </span>
                          <span className="sunit">KG</span>
                        </div>
                        <div className="schg">↑ {stockItems.reduce((acc, curr) => acc + curr.bags, 0)} bags total</div>
                      </div>
                      <div className="sc">
                        <div className="slbl">{t('employees')}</div>
                        <div>
                          <span className="sval">{employees.length}</span>
                        </div>
                        <div className="schg up">
                          <span className="badge bg">{employees.filter(e => e.status === 'present').length} {t('activeToday')}</span>
                        </div>
                      </div>
                      <div className="sc">
                        <div className="slbl">{t('weeklyPay')}</div>
                        <div>
                          <span className="sval">₹{payrollRecords.reduce((acc, curr) => acc + curr.net, 0).toLocaleString()}</span>
                        </div>
                        <div className="schg up">₹{payrollRecords.reduce((acc, curr) => acc + curr.advance, 0).toLocaleString()} advances deducted</div>
                      </div>
                      <div className="sc">
                        <div className="slbl">{t('production')}</div>
                        <div>
                          <span className="sval">{inwardHistory.reduce((acc, curr) => acc + curr.totalKg, 0).toFixed(1)}</span>
                          <span className="sunit">KG</span>
                        </div>
                        <div className="schg up">{inwardHistory.length > 0 ? '↑ Today\'s yield' : 'No production data yet'}</div>
                      </div>
                    </div>

                    {/* Quick Actions 2x2 grid */}
                    <div className="slabel"><i className="ti ti-bolt"></i> {t('quickActions')}</div>
                    <div className="qgrid">
                      <div className="qbtn" onClick={() => {
                        setInwardForm({ ...inwardForm, date: new Date().toISOString().split('T')[0] });
                        setShowSheet('inward');
                      }}>
                        <div className="cico ci-b"><i className="ti ti-package"></i></div>
                        <div className="qlbl">{t('yarnInward')}</div>
                        <div className="qsub">Log incoming yarns stock</div>
                      </div>
                      <div className="qbtn" onClick={() => {
                        setOutwardForm({ ...outwardForm, date: new Date().toISOString().split('T')[0] });
                        setShowSheet('outward');
                      }}>
                        <div className="cico ci-a"><i className="ti ti-truck"></i></div>
                        <div className="qlbl">{t('yarnOutward')}</div>
                        <div className="qsub">Issue yarn stock to parties</div>
                      </div>
                      <div className="qbtn" onClick={openAttendanceSheet}>
                        <div className="cico ci-g"><i className="ti ti-clipboard-list"></i></div>
                        <div className="qlbl">{t('attendance')}</div>
                        <div className="qsub">Log employee daily shifts</div>
                      </div>
                      <div className="qbtn" onClick={() => setCurrentPage('payroll')}>
                        <div className="cico ci-n"><i className="ti ti-currency-rupee"></i></div>
                        <div className="qlbl">{t('payroll')}</div>
                        <div className="qsub">Generate weekly wages lists</div>
                      </div>
                    </div>

                    {/* Production bar chart */}
                    <div className="slabel"><i className="ti ti-chart-bar"></i> {t('weeklyProduction')}</div>
                    <div className="card">
                      <div className="chwrap">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                          const heights = [45, 85, 50, 75, 90, 65, 0];
                          const todayIdx = 1; // Tuesday is index 1
                          const isToday = idx === todayIdx;
                          return (
                            <div key={day} className="cbar" style={{
                              height: `${heights[idx]}%`,
                              background: isToday ? 'var(--PRI)' : 'var(--BD)'
                            }}>
                              <span className="cbarlbl">{day}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ height: '22px' }}></div>
                      <div className="chart-footer">
                        <span className="chart-footer-lbl">{t('totalThisWeek')}</span>
                        <span className="chart-footer-val">{inwardHistory.reduce((acc, curr) => acc + curr.totalKg, 0).toFixed(1)} KG</span>
                      </div>
                    </div>

                    {/* Recent activity log */}
                    <div className="slabel"><i className="ti ti-activity"></i> {t('recentActivity')}</div>
                    <div className="lwrap">
                      <div className="li">
                        <div className="lav ci-b cico"><i className="ti ti-package"></i></div>
                        <div className="linf">
                          <div className="lname">{t('yarnInward')}</div>
                          <div className="ldet">Blue 40s · 12 bags · Rajan Textiles</div>
                        </div>
                        <div className="lrt">
                          <span className="badge bg">+747 KG</span>
                          <div className="ltm">9:30 AM</div>
                        </div>
                      </div>
                      <div className="li">
                        <div className="lav ci-a cico"><i className="ti ti-truck"></i></div>
                        <div className="linf">
                          <div className="lname">{t('yarnOutward')}</div>
                          <div className="ldet">Red 20s · 5 bags · Sri Venkata</div>
                        </div>
                        <div className="lrt">
                          <span className="badge br">−311 KG</span>
                          <div className="ltm">Yesterday</div>
                        </div>
                      </div>
                      <div className="li">
                        <div className="lav ci-g cico"><i className="ti ti-clipboard-list"></i></div>
                        <div className="linf">
                          <div className="lname">{t('attendance')}</div>
                          <div className="ldet">Morning Shift Marked</div>
                        </div>
                        <div className="lrt">
                          <span className="badge bb">2 Present</span>
                          <div className="ltm">15 Jun</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════
                    INVENTORY PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'stock' && (
                  <div className="page on">
                    <div className="phdr">
                      <div>
                        <div className="ptitle">{t('inventory')}</div>
                        <div className="psub">{t('totalKg')}: {stockItems.reduce((acc, curr) => acc + curr.kg, 0)} KG</div>
                      </div>
                      <button className="hbtn" onClick={() => setShowSheet('inward')}>
                        <i className="ti ti-plus"></i> {t('add')}
                      </button>
                    </div>

                    {/* Stock Tabs */}
                    <div className="tabbar">
                      <button className={`tab ${stockTab === 'stock' ? 'on' : ''}`} onClick={() => setStockTab('stock')}>
                        {t('stock')}
                      </button>
                      <button className={`tab ${stockTab === 'inward' ? 'on' : ''}`} onClick={() => setStockTab('inward')}>
                        {t('inward')}
                      </button>
                      <button className={`tab ${stockTab === 'outward' ? 'on' : ''}`} onClick={() => setStockTab('outward')}>
                        {t('outward')}
                      </button>
                    </div>

                    {/* Stock Tab Render */}
                    {stockTab === 'stock' && (
                      <div>
                        <div className="slabel">{t('colorWiseStock')}</div>
                        <div className="lwrap">
                          {stockItems.map((item, idx) => (
                            <div className="li" key={idx} style={{ justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="lav ci-n cico"><i className="ti ti-palette"></i></div>
                                <div>
                                  <div className="lname">{item.color}</div>
                                  <div className="ldet">{item.bags} {t('bags')}</div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div className="lval" style={{ textAlign: 'right' }}>
                                  <div>{item.kg.toFixed(2)} KG</div>
                                </div>
                                <button className="icon-btn ib-back" style={{ width: '36px', height: '36px' }} onClick={() => {
                                  setSelectedColorToEdit(item);
                                  setStockEditForm({ kg: item.kg.toString(), bags: item.bags.toString(), reason: '' });
                                  setShowSheet('edit-stock');
                                }}>
                                  <i className="ti ti-pencil" style={{ fontSize: '14px' }}></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inward Tab Render */}
                    {stockTab === 'inward' && (
                      <div>
                        <div className="slabel">{t('yarnInward')} History</div>
                        {inwardHistory.map((entry, idx) => (
                          <div className="card" key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div className="ctitle">{entry.supplier}</div>
                                <div className="csub">{entry.color} · {entry.bags} bags ({entry.weightPerBag} kg/bag)</div>
                              </div>
                              <span className="badge bg">+{entry.totalKg.toFixed(1)} KG</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: 'var(--MUTED)', fontWeight: 'bold' }}>
                              <span>ID: {entry.id}</span>
                              <span>{entry.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Outward Tab Render */}
                    {stockTab === 'outward' && (
                      <div>
                        <div className="slabel">{t('yarnOutward')} History</div>
                        {outwardHistory.map((entry, idx) => (
                          <div className="card" key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div className="ctitle">{entry.partyName}</div>
                                <div className="csub">{entry.color} · {entry.bags} bags</div>
                              </div>
                              <span className="badge br">-{entry.totalKg.toFixed(1)} KG</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: 'var(--MUTED)', fontWeight: 'bold' }}>
                              <span>ID: {entry.id}</span>
                              <span>{entry.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ═══════════════════════════════════════
                    STAFF PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'staff' && (
                  <div className="page on">
                    <div className="phdr">
                      <div>
                        <div className="ptitle">{t('staff')}</div>
                        <div className="psub">
                          {employees.length} {t('employees')} · {employees.filter(e => e.status === 'present').length} {t('activeToday')}
                        </div>
                      </div>
                      <button className="hbtn" onClick={() => {
                        setEmployeeForm({ name: '', fatherName: '', motherName: '', mobile: '', bloodGroup: 'A+', dob: '', aadhaar: '', payType: 'bag', shift: 'Morning', rate: '', joiningDate: new Date().toISOString().split('T')[0], address: '', docName: '' });
                        setCapturedPhoto(null);
                        setShowSheet('add-employee');
                      }}>
                        <i className="ti ti-plus"></i> {t('add')}
                      </button>
                    </div>

                    {/* Staff Shift Tabs */}
                    <div className="tabbar">
                      <button className={`tab ${staffTab === 'all' ? 'on' : ''}`} onClick={() => setStaffTab('all')}>
                        {t('all')}
                      </button>
                      <button className={`tab ${staffTab === 'morning' ? 'on' : ''}`} onClick={() => setStaffTab('morning')}>
                        {t('morning')}
                      </button>
                      <button className={`tab ${staffTab === 'night' ? 'on' : ''}`} onClick={() => setStaffTab('night')}>
                        {t('night')}
                      </button>
                    </div>

                    <div className="slabel">Factory Employees</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {employees
                        .filter(emp => staffTab === 'all' || emp.shift.toLowerCase() === staffTab)
                        .map((emp, idx) => {
                          const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                          return (
                            <div className="card" key={idx} style={{ cursor: 'pointer', padding: '12px' }} onClick={() => setSelectedEmployee(emp)}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div className="lav" style={{ background: 'var(--NAVY)', color: '#fff' }}>
                                    {emp.photo && emp.photo.startsWith('data:') ? <img src={emp.photo} className="camera-preview-img" alt="" /> : initials}
                                  </div>
                                  <div>
                                    <div className="ctitle">{emp.name}</div>
                                    <div className="csub">{emp.role} · {emp.id}</div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                  <span className="badge bb" style={{ fontSize: '10px' }}>{emp.shift === 'Morning' ? 'M' : 'N'}</span>
                                  <span className="badge br" style={{ fontSize: '10px' }}>{emp.bloodGroup}</span>
                                  <span className={`badge ${emp.status === 'present' ? 'bg' : 'br'}`} style={{ minWidth: '32px', textAlign: 'center' }}>
                                    {emp.status === 'present' ? 'P' : 'A'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════
                    PAYROLL PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'payroll' && (
                  <div className="page on">
                    <div className="phdr">
                      <div>
                        <div className="ptitle">{t('payroll')}</div>
                        <div className="psub">{payrollPeriod}</div>
                      </div>
                    </div>

                    {payrollStarted && (
                      <div className="sgrid" style={{ marginBottom: '16px' }}>
                        <div className="sc pri">
                          <div className="slbl">{t('totalPayable')}</div>
                          <span className="sval">₹{payrollRecords.reduce((acc, curr) => acc + curr.net, 0).toLocaleString()}</span>
                        </div>
                        <div className="sc">
                          <div className="slbl">{t('advancesTotal')}</div>
                          <span className="sval" style={{ color: 'var(--R)' }}>
                            ₹{payrollRecords.reduce((acc, curr) => acc + curr.advance, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Payroll Start Banner */}
                    {!payrollStarted ? (
                      <div className="payroll-start-wrap">
                        <div>
                          <div className="payroll-start-title">
                            <i className="ti ti-calendar"></i> {t('startWeeklyPayroll')}
                          </div>
                          <div className="payroll-start-sub">{t('startPayrollDesc')}</div>
                        </div>
                        <button className="payroll-start-btn" onClick={handleStartPayrollTrigger}>
                          {t('startPayrollBtn')}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="slabel">Wages list &amp; deductions</div>
                        {payrollRecords.map((rec, idx) => (
                          <div className="paycard" key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div className="ctitle">{rec.name}</div>
                                <div className="csub">{rec.payType === 'bag' ? `${rec.bags} bags @ ₹${rec.rate}/bag` : `${rec.shifts} shifts @ ₹${rec.rate}/shift`}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--T)' }}>₹{rec.net.toLocaleString()}</div>
                                <span className="badge bg" style={{ fontSize: '9px', marginTop: '4px' }}>Net Payable</span>
                              </div>
                            </div>

                            <div className="pbrkd">
                              <div className="pbitem">
                                <div className="pblbl">{t('grossPay')}</div>
                                <div className="pbval">₹{rec.gross.toLocaleString()}</div>
                              </div>
                              <div className="pbitem">
                                <div className="pblbl">{t('advanceDeduction')}</div>
                                <div className="pbval" style={{ color: 'var(--R)' }}>-₹{rec.advance.toLocaleString()}</div>
                              </div>
                              <div className="pbitem">
                                <div className="pblbl">{t('netPay')}</div>
                                <div className="pbval" style={{ color: 'var(--G)' }}>₹{rec.net.toLocaleString()}</div>
                              </div>
                            </div>

                            <button className="pay-edit-btn" onClick={() => {
                              setSelectedPayrollRecord(rec);
                              setPayrollEditForm({ bags: rec.bags, shifts: rec.shifts, rate: rec.rate, advance: rec.advance });
                              setShowSheet('edit-payroll');
                            }}>
                              <i className="ti ti-pencil"></i> Edit details
                            </button>
                          </div>
                        ))}

                        <button className="bpri" style={{ marginTop: '16px' }} onClick={() => {
                          const csv = "Name,Pay Type,Workload,Rate,Gross,Advance,Net\n" + 
                            payrollRecords.map(r => `"${r.name}",${r.payType},${r.payType === 'bag' ? r.bags : r.shifts},${r.rate},${r.gross},${r.advance},${r.net}`).join("\n");
                          downloadSimulatedFile(`payroll_${payrollPeriod.replace(/ /g, '_')}.csv`, csv);
                        }}>
                          <i className="ti ti-download"></i> {t('generatePayroll')}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ═══════════════════════════════════════
                    REPORTS PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'reports' && (
                  <div className="page on">
                    <div className="phdr">
                      <div>
                        <div className="ptitle">{t('reports')}</div>
                        <div className="psub">Analytics &amp; Summaries</div>
                      </div>
                      <button className="hbtn" onClick={() => downloadSimulatedFile("full_factory_summary.csv", `Report,Value\nTotal Stock,${stockItems.reduce((acc, curr) => acc + curr.kg, 0).toFixed(1)} KG\nEmployees,${employees.length}\nWeekly Pay,₹${payrollRecords.reduce((acc, curr) => acc + curr.net, 0).toLocaleString()}\nProduction,${inwardHistory.reduce((acc, curr) => acc + curr.totalKg, 0).toFixed(1)} `)}>
                        <i className="ti ti-download"></i> PDF
                      </button>
                    </div>

                    {/* Date picker range */}
                    <div className="slabel"><i className="ti ti-calendar"></i> {t('dateRange')}</div>
                    <div className="date-opt-grid">
                      <button className={`dopt ${reportRange === 'today' ? 'sel' : ''}`} onClick={() => setReportRange('today')}>{t('today')}</button>
                      <button className={`dopt ${reportRange === 'week' ? 'sel' : ''}`} onClick={() => setReportRange('week')}>{t('oneWeek')}</button>
                      <button className={`dopt ${reportRange === 'month' ? 'sel' : ''}`} onClick={() => setReportRange('month')}>{t('oneMonth')}</button>
                      <button className={`dopt ${reportRange === 'custom' ? 'sel' : ''}`} onClick={() => setReportRange('custom')}>{t('customRange')}</button>
                    </div>

                    {reportRange === 'custom' && (
                      <div className="custom-range">
                        <div className="fgrp" style={{ flex: 1 }}>
                          <label className="flbl">From</label>
                          <input type="date" className="finp" value={customRangeFrom} onChange={(e) => setCustomRangeFrom(e.target.value)} />
                        </div>
                        <div className="fgrp" style={{ flex: 1 }}>
                          <label className="flbl">To</label>
                          <input type="date" className="finp" value={customRangeTo} onChange={(e) => setCustomRangeTo(e.target.value)} />
                        </div>
                      </div>
                    )}

                    {/* Report Cards Grid */}
                    <div className="slabel"><i className="ti ti-files"></i> {t('productionSummary')}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { title: t('stockReport'), sub: "Yarn stocks flow inward/outward summaries" },
                        { title: t('payrollReport'), sub: "Employee weekly salary disbursements logs" },
                        { title: t('employeeReport'), sub: "Shift and active attendances charts" },
                        { title: t('productionSummary'), sub: "Weekly and monthly production yields" }
                      ].map((item, idx) => (
                        <div className="repcard" key={idx}>
                          <div className="cico ci-n" style={{ background: 'var(--PRI-L)', color: 'var(--PRI)' }}><i className="ti ti-file-text"></i></div>
                          <div className="rep-info">
                            <div className="ctitle">{item.title}</div>
                            <div className="csub">{item.sub}</div>
                          </div>
                          <button className="rep-dl-btn" onClick={() => downloadSimulatedFile(`${item.title.toLowerCase().replace(/ /g, '_')}.csv`, "Item,Date,Quantity\nBlue 40s Yarn,2026-06-16,12 bags")}>
                            PDF
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Suppliers Statistics */}
                    <div className="slabel" style={{ marginTop: '20px' }}><i className="ti ti-truck"></i> {t('suppliers')}</div>
                    <div className="lwrap">
                      {suppliers.map((sup, idx) => {
                        const init = sup.name[0].toUpperCase();
                        return (
                          <div className="li" key={idx} style={{ cursor: 'default' }}>
                            <div className="lav ci-b cico" style={{ fontWeight: 'bold' }}>{init}</div>
                            <div className="linf">
                              <div className="lname">{sup.name}</div>
                              <div className="ldet">{sup.deliveryCount} {t('deliveries')}</div>
                            </div>
                            <div className="lrt">
                              <div className="lval">{sup.totalKg.toLocaleString()} KG</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════
                    SETTINGS PAGE
                    ═══════════════════════════════════════ */}
                {currentPage === 'settings' && (
                  <div className="page on">
                    <div className="prof-hero">
                      <div className="prof-av"><i className="ti ti-building-factory-2"></i></div>
                      <div>
                        <div className="prof-name">{onboardingData.ownerName}</div>
                        <div className="prof-det">{onboardingData.factoryName} · +91 {onboardingData.phone}</div>
                      </div>
                    </div>

                    <div className="slabel">Configurations</div>
                    <div className="pmenu">
                      <div className="pmi" onClick={() => setShowSheet('factory-settings')}>
                        <div className="pmico ci-b"><i className="ti ti-building"></i></div>
                        <div className="pmi-info">
                          <div className="pmlbl">{t('factorySettings')}</div>
                          <div className="pmsub">Edit names, logo image uploadings</div>
                        </div>
                        <i className="ti ti-chevron-right pmi-arr"></i>
                      </div>

                      <div className="pmi" onClick={() => setShowSheet('notif-settings')}>
                        <div className="pmico ci-a"><i className="ti ti-bell"></i></div>
                        <div className="pmi-info">
                          <div className="pmlbl">{t('notifications')}</div>
                          <div className="pmsub">Set WhatsApp alerts, reminders alerts</div>
                        </div>
                        <i className="ti ti-chevron-right pmi-arr"></i>
                      </div>

                      <div className="pmi" onClick={toggleLanguage}>
                        <div className="pmico ci-g"><i className="ti ti-language"></i></div>
                        <div className="pmi-info">
                          <div className="pmlbl">{t('language')}</div>
                          <div className="pmsub">{language === 'en' ? "English (த)" : "தமிழ் (EN)"}</div>
                        </div>
                        <span className="badge bb" style={{ fontSize: '10px' }}>{language.toUpperCase()}</span>
                      </div>

                      <div className="pmi" onClick={() => setShowSheet('backup-settings')}>
                        <div className="pmico ci-n"><i className="ti ti-cloud-upload"></i></div>
                        <div className="pmi-info">
                          <div className="pmlbl">{t('dataBackup')}</div>
                          <div className="pmsub">Export database, cloud backups</div>
                        </div>
                        <i className="ti ti-chevron-right pmi-arr"></i>
                      </div>
                    </div>

                    <div className="pmenu">
                      <div className="pmi" onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          type: 'logout',
                          message: "Are you sure you want to sign out from TFO One?",
                          onConfirm: () => {
                            setCurrentScreen('auth');
                            setConfirmDialog({ isOpen: false, type: '', message: '', onConfirm: null });
                            triggerToast("Logged out successfully");
                          }
                        });
                      }} style={{ color: 'var(--R)' }}>
                        <div className="pmico ci-r"><i className="ti ti-logout"></i></div>
                        <div className="pmi-info">
                          <div className="pmlbl" style={{ color: 'var(--R)' }}>{t('logout')}</div>
                        </div>
                        <i className="ti ti-chevron-right pmi-arr" style={{ color: 'var(--R)' }}></i>
                      </div>
                    </div>

                    <div className="app-version">
                      TFO One v1.1.0 · PWA Ready
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom App Navigation Bars */}
          <div className="bnav">
            <div className={`ni ${currentPage === 'home' && !selectedEmployee ? 'on' : ''}`} onClick={() => { setCurrentPage('home'); setSelectedEmployee(null); }}>
              <div className="ico"><i className="ti ti-home-2"></i></div>
              <div className="nlbl">{t('home')}</div>
            </div>
            <div className={`ni ${currentPage === 'stock' && !selectedEmployee ? 'on' : ''}`} onClick={() => { setCurrentPage('stock'); setSelectedEmployee(null); }}>
              <div className="ico"><i className="ti ti-package"></i></div>
              <div className="nlbl">{t('stock')}</div>
            </div>
            <div className={`ni ${currentPage === 'staff' && !selectedEmployee ? 'on' : ''}`} onClick={() => { setCurrentPage('staff'); setSelectedEmployee(null); }}>
              <div className="ico"><i className="ti ti-users"></i></div>
              <div className="nlbl">{t('staff')}</div>
            </div>
            <div className={`ni ${currentPage === 'payroll' && !selectedEmployee ? 'on' : ''}`} onClick={() => { setCurrentPage('payroll'); setSelectedEmployee(null); }}>
              <div className="ico"><i className="ti ti-currency-rupee"></i></div>
              <div className="nlbl">{t('payroll')}</div>
            </div>
            <div className={`ni ${currentPage === 'reports' && !selectedEmployee ? 'on' : ''}`} onClick={() => { setCurrentPage('reports'); setSelectedEmployee(null); }}>
              <div className="ico"><i className="ti ti-chart-bar"></i></div>
              <div className="nlbl">{t('reports')}</div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* 4. SHEET OVERLAYS                                        */}
          {/* ──────────────────────────────────────────────────────── */}
          
          {/* Yarn Inward sheet */}
          {showSheet === 'inward' && (
            <div className="sheet-overlay open">
              <form className="sheet-inner" onSubmit={handleInwardSubmit}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-package"></i> {t('yarnInward')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-calendar"></i> Date</label>
                  <input type="date" className="finp" value={inwardForm.date} onChange={(e) => setInwardForm({ ...inwardForm, date: e.target.value })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-truck"></i> {t('supplier')}</label>
                  <select className="finp" value={inwardForm.supplier} onChange={(e) => setInwardForm({ ...inwardForm, supplier: e.target.value })} required>
                    <option value="">{t('selectSupplier')}</option>
                    {suppliers.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                    <option value="new">+ Add New Supplier</option>
                  </select>
                </div>

                {inwardForm.supplier === 'new' && (
                  <div className="fgrp" style={{ animation: 'slideIn 0.2s' }}>
                    <label className="flbl">New Supplier Name</label>
                    <input type="text" className="finp" placeholder="Enter supplier name" value={inwardForm.supplierNew} onChange={(e) => setInwardForm({ ...inwardForm, supplierNew: e.target.value })} required />
                  </div>
                )}

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-palette"></i> {t('colorName')}</label>
                  <input type="text" className="finp" placeholder="e.g. Blue 40s" value={inwardForm.color} onChange={(e) => setInwardForm({ ...inwardForm, color: e.target.value })} required />
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl"><i className="ti ti-package"></i> {t('bags')}</label>
                    <input type="number" className="finp" placeholder="No. of bags" value={inwardForm.bags} onChange={(e) => setInwardForm({ ...inwardForm, bags: e.target.value })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl"><i className="ti ti-weight"></i> {t('weightBag')}</label>
                    <input type="text" className="finp" placeholder="62.250" value={inwardForm.weightPerBag} onChange={(e) => setInwardForm({ ...inwardForm, weightPerBag: e.target.value })} required />
                  </div>
                </div>

                {inwardForm.bags && inwardForm.weightPerBag && (
                  <div className="card" style={{ background: 'var(--BG)', textAlign: 'center', fontWeight: 'bold', borderStyle: 'dashed' }}>
                    {t('totalCalculated')}: {(parseInt(inwardForm.bags) * parseFloat(inwardForm.weightPerBag)).toFixed(2)} KG
                  </div>
                )}

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-note"></i> {t('notes')}</label>
                  <input type="text" className="finp" placeholder="Any special marks/notes..." value={inwardForm.notes} onChange={(e) => setInwardForm({ ...inwardForm, notes: e.target.value })} />
                </div>

                <button type="submit" className="bpri" style={{ marginTop: '10px' }}>
                  <i className="ti ti-check"></i> {t('saveInward')}
                </button>
              </form>
            </div>
          )}

          {/* Yarn Outward sheet */}
          {showSheet === 'outward' && (
            <div className="sheet-overlay open">
              <form className="sheet-inner" onSubmit={handleOutwardSubmit}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-truck-delivery"></i> {t('yarnOutward')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-calendar"></i> Date</label>
                  <input type="date" className="finp" value={outwardForm.date} onChange={(e) => setOutwardForm({ ...outwardForm, date: e.target.value })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-user"></i> {t('partyName')}</label>
                  <input type="text" className="finp" placeholder="Enter receiver party name" value={outwardForm.partyName} onChange={(e) => setOutwardForm({ ...outwardForm, partyName: e.target.value })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl"><i className="ti ti-palette"></i> {t('colorName')}</label>
                  <select className="finp" value={outwardForm.color} onChange={(e) => setOutwardForm({ ...outwardForm, color: e.target.value })} required>
                    <option value="">{t('selectColor')}</option>
                    {stockItems.map((s, idx) => <option key={idx} value={s.color}>{s.color} ({s.bags} bags left)</option>)}
                  </select>
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl"><i className="ti ti-package"></i> {t('bags')}</label>
                    <input type="number" className="finp" placeholder="No. of bags" value={outwardForm.bags} onChange={(e) => setOutwardForm({ ...outwardForm, bags: e.target.value })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl"><i className="ti ti-weight"></i> {t('weightBag')}</label>
                    <input type="text" className="finp" placeholder="62.250" value={outwardForm.weightPerBag} onChange={(e) => setOutwardForm({ ...outwardForm, weightPerBag: e.target.value })} required />
                  </div>
                </div>

                {outwardForm.bags && outwardForm.weightPerBag && (
                  <div className="card" style={{ background: 'var(--BG)', textAlign: 'center', fontWeight: 'bold', borderStyle: 'dashed' }}>
                    {t('totalCalculated')}: {(parseInt(outwardForm.bags) * parseFloat(outwardForm.weightPerBag)).toFixed(2)} KG
                  </div>
                )}

                <button type="submit" className="bpri" style={{ marginTop: '10px' }}>
                  <i className="ti ti-check"></i> {t('saveOutward')}
                </button>
              </form>
            </div>
          )}

          {/* Edit Stock sheet */}
          {showSheet === 'edit-stock' && selectedColorToEdit && (
            <div className="sheet-overlay open">
              <form className="sheet-inner" onSubmit={handleEditStockSubmit}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-edit"></i> {t('editStock')}: {selectedColorToEdit.color}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>

                <div className="fgrp">
                  <label className="flbl">Total KG Weight</label>
                  <input type="number" step="0.01" className="finp" value={stockEditForm.kg} onChange={(e) => setStockEditForm({ ...stockEditForm, kg: e.target.value })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl">Total Bags count</label>
                  <input type="number" className="finp" value={stockEditForm.bags} onChange={(e) => setStockEditForm({ ...stockEditForm, bags: e.target.value })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl">{t('reason')}</label>
                  <input type="text" className="finp" placeholder="Reason for manual edit" value={stockEditForm.reason} onChange={(e) => setStockEditForm({ ...stockEditForm, reason: e.target.value })} required />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <button type="button" className="btn-danger" style={{ flex: 1 }} onClick={handleRemoveColor}>
                    <i className="ti ti-trash"></i> {t('removeColor')}
                  </button>
                  <button type="submit" className="bpri" style={{ flex: 1 }}>
                    <i className="ti ti-check"></i> {t('save')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Attendance sheet */}
          {showSheet === 'attendance' && (
            <div className="sheet-overlay open">
              <div className="sheet-inner">
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-clipboard-list"></i> {t('markAttendance')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--T)' }}>
                    Date: {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="badge bg">
                    {Object.values(attendanceGrid).filter(s => s === 'present').length} P · {Object.values(attendanceGrid).filter(s => s === 'absent').length} A
                  </div>
                </div>

                <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '18px', paddingRight: '4px' }}>
                  {employees.map((emp) => (
                    <div className="att-row" key={emp.id}>
                      <div className="att-row-left">
                        <div className="lav" style={{ background: 'var(--NAVY-L)', color: 'var(--NAVY)', width: '36px', height: '36px', fontSize: '12px' }}>
                          {emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div className="att-name-info">
                          <span className="att-name">{emp.name}</span>
                          <span className="att-role">{emp.role} · {emp.shift === 'Morning' ? t('morning') : t('night')}</span>
                        </div>
                      </div>
                      
                      <div className="att-toggles">
                        <button
                          type="button"
                          className={`btn-att-tog ${attendanceGrid[emp.id] === 'present' ? 'p-active' : ''}`}
                          onClick={() => setAttendanceGrid({ ...attendanceGrid, [emp.id]: 'present' })}
                        >
                          P
                        </button>
                        <button
                          type="button"
                          className={`btn-att-tog ${attendanceGrid[emp.id] === 'absent' ? 'a-active' : ''}`}
                          onClick={() => setAttendanceGrid({ ...attendanceGrid, [emp.id]: 'absent' })}
                        >
                          A
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="bpri" onClick={saveAttendance}>
                  <i className="ti ti-check"></i> {t('save')}
                </button>
              </div>
            </div>
          )}

          {/* Add / Edit Employee Sheet */}
          {showSheet === 'add-employee' && (
            <div className="sheet-overlay open">
              <form className="sheet-inner" onSubmit={handleAddEmployee}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-user-plus"></i> {t('addEmployee')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => { stopCamera(); setShowSheet(null); }}><i className="ti ti-x"></i></button>
                </div>

                {/* Camera / Avatar Photo capture section */}
                <div className="fgrp">
                  <label className="flbl">Employee Photo (Live Camera)</label>
                  <div className="camera-container">
                    {cameraActive ? (
                      <>
                        <video ref={videoRef} className="camera-video" autoPlay playsInline muted></video>
                        <div className="camera-controls">
                          <button type="button" className="camera-btn" onClick={capturePhoto}>
                            <i className="ti ti-camera"></i>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {capturedPhoto ? (
                          <img src={capturedPhoto} className="camera-preview-img" alt="" />
                        ) : (
                          <div className="camera-placeholder">
                            <i className="ti ti-reload"></i>
                            <span style={{ fontSize: '12px' }}>Camera simulated feed loading...</span>
                          </div>
                        )}
                        <div className="camera-controls">
                          <button type="button" className="bpri" style={{ minHeight: '36px', padding: '6px 12px' }} onClick={startCamera}>
                            <i className="ti ti-camera"></i> {capturedPhoto ? "Retake" : "Open Camera"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </div>

                <div className="fgrp">
                  <label className="flbl">{t('fullName')}</label>
                  <input type="text" className="finp" placeholder="Enter worker name" value={employeeForm.name} onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} required />
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl">{t('fatherName')}</label>
                    <input type="text" className="finp" placeholder="Father name" value={employeeForm.fatherName} onChange={(e) => setEmployeeForm({ ...employeeForm, fatherName: e.target.value })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl">{t('motherName')}</label>
                    <input type="text" className="finp" placeholder="Mother name" value={employeeForm.motherName} onChange={(e) => setEmployeeForm({ ...employeeForm, motherName: e.target.value })} required />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl">{t('mobileNumber')}</label>
                    <input type="tel" maxLength="10" className="finp" placeholder="9876543210" value={employeeForm.mobile} onChange={(e) => setEmployeeForm({ ...employeeForm, mobile: e.target.value.replace(/\D/g, '') })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl">{t('bloodGroup')}</label>
                    <select className="finp" value={employeeForm.bloodGroup} onChange={(e) => setEmployeeForm({ ...employeeForm, bloodGroup: e.target.value })} required>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl">{t('dob')}</label>
                    <input type="date" className="finp" value={employeeForm.dob} onChange={(e) => setEmployeeForm({ ...employeeForm, dob: e.target.value })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl">{t('aadhaar')} (12 Digits)</label>
                    <input type="tel" maxLength="12" className="finp" placeholder="123456789012" value={employeeForm.aadhaar} onChange={(e) => setEmployeeForm({ ...employeeForm, aadhaar: e.target.value.replace(/\D/g, '') })} required />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl">{t('payType')}</label>
                    <select className="finp" value={employeeForm.payType} onChange={(e) => setEmployeeForm({ ...employeeForm, payType: e.target.value })} required>
                      <option value="bag">{t('bagProduction')}</option>
                      <option value="shift">{t('shiftBased')}</option>
                    </select>
                  </div>
                  <div className="fgrp">
                    <label className="flbl">{t('shift')}</label>
                    <select className="finp" value={employeeForm.shift} onChange={(e) => setEmployeeForm({ ...employeeForm, shift: e.target.value })} required>
                      <option value="Morning">{t('morning')}</option>
                      <option value="Night">{t('night')}</option>
                    </select>
                  </div>
                </div>

                <div className="frow">
                  <div className="fgrp">
                    <label className="flbl">{employeeForm.payType === 'bag' ? t('ratePerBag') : t('ratePerShift')}</label>
                    <input type="number" step="0.01" className="finp" placeholder="₹ Rate" value={employeeForm.rate} onChange={(e) => setEmployeeForm({ ...employeeForm, rate: e.target.value })} required />
                  </div>
                  <div className="fgrp">
                    <label className="flbl">{t('joiningDate')}</label>
                    <input type="date" className="finp" value={employeeForm.joiningDate} onChange={(e) => setEmployeeForm({ ...employeeForm, joiningDate: e.target.value })} required />
                  </div>
                </div>

                <div className="fgrp">
                  <label className="flbl">{t('address')}</label>
                  <input type="text" className="finp" placeholder="Enter home address" value={employeeForm.address} onChange={(e) => setEmployeeForm({ ...employeeForm, address: e.target.value })} required />
                </div>

                {/* Aadhaar upload slot */}
                <div className="fgrp">
                  <label className="flbl">{t('docUpload')}</label>
                  <div className="doc-upload" onClick={() => triggerToast("Document upload simulated successfully!")}>
                    <div className="doc-upload-left">
                      <i className="ti ti-file-upload"></i>
                      <span>Aadhaar_Document_Card.pdf</span>
                    </div>
                    <span className="doc-upload-right">Upload</span>
                  </div>
                </div>

                <button type="submit" className="bpri" style={{ marginTop: '10px' }}>
                  <i className="ti ti-check"></i> {t('addEmployee')}
                </button>
              </form>
            </div>
          )}

          {/* Edit Payroll sheet */}
          {showSheet === 'edit-payroll' && selectedPayrollRecord && (
            <div className="sheet-overlay open">
              <form className="sheet-inner" onSubmit={handleEditPayrollSubmit}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-edit"></i> {t('editPayroll')}: {selectedPayrollRecord.name}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>

                {selectedPayrollRecord.payType === 'bag' ? (
                  <div className="fgrp">
                    <label className="flbl">Bags Produced</label>
                    <input type="number" className="finp" value={payrollEditForm.bags} onChange={(e) => setPayrollEditForm({ ...payrollEditForm, bags: parseInt(e.target.value) || 0 })} required />
                  </div>
                ) : (
                  <div className="fgrp">
                    <label className="flbl">Shifts Worked</label>
                    <input type="number" className="finp" value={payrollEditForm.shifts} onChange={(e) => setPayrollEditForm({ ...payrollEditForm, shifts: parseInt(e.target.value) || 0 })} required />
                  </div>
                )}

                <div className="fgrp">
                  <label className="flbl">{t('rate')} (₹)</label>
                  <input type="number" step="0.01" className="finp" value={payrollEditForm.rate} onChange={(e) => setPayrollEditForm({ ...payrollEditForm, rate: parseFloat(e.target.value) || 0 })} required />
                </div>

                <div className="fgrp">
                  <label className="flbl">{t('advanceDeduction')} (₹)</label>
                  <input type="number" step="0.01" className="finp" value={payrollEditForm.advance} onChange={(e) => setPayrollEditForm({ ...payrollEditForm, advance: parseFloat(e.target.value) || 0 })} required />
                </div>

                <div className="card" style={{ background: 'var(--BG)', textAlign: 'center', fontWeight: 'bold' }}>
                  Estimated Net Wages: ₹
                  {((selectedPayrollRecord.payType === 'bag' ? payrollEditForm.bags * payrollEditForm.rate : payrollEditForm.shifts * payrollEditForm.rate) - payrollEditForm.advance).toFixed(2)}
                </div>

                <button type="submit" className="bpri" style={{ marginTop: '10px' }}>
                  <i className="ti ti-check"></i> {t('save')}
                </button>
              </form>
            </div>
          )}

          {/* Subscreen sheet — Factory Settings */}
          {showSheet === 'factory-settings' && (
            <div className="sheet-overlay open">
              <div className="sheet-inner" style={{ minHeight: '350px' }}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-building"></i> {t('factorySettings')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>
                <div className="fgrp">
                  <label className="flbl">{t('factoryName')}</label>
                  <input type="text" className="finp" value={onboardingData.factoryName} onChange={(e) => setOnboardingData({ ...onboardingData, factoryName: e.target.value })} />
                </div>
                <div className="fgrp">
                  <label className="flbl">{t('ownerName')}</label>
                  <input type="text" className="finp" value={onboardingData.ownerName} onChange={(e) => setOnboardingData({ ...onboardingData, ownerName: e.target.value })} />
                </div>
                <div className="fgrp">
                  <label className="flbl">{t('logoUpload')}</label>
                  <div className="upload-box" onClick={() => triggerToast(t('logoUploaded'))}>
                    <i className="ti ti-photo" style={{ fontSize: '24px', color: 'var(--PRI)' }}></i>
                    <span className="upload-text">Drag files or Click here</span>
                  </div>
                </div>
                <button type="button" className="bpri" onClick={() => setShowSheet(null)}>
                  <i className="ti ti-check"></i> {t('save')}
                </button>
              </div>
            </div>
          )}

          {/* Subscreen sheet — Notifications Settings */}
          {showSheet === 'notif-settings' && (
            <div className="sheet-overlay open">
              <div className="sheet-inner">
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-bell"></i> {t('notifications')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>
                <div className="notif-row">
                  <div>
                    <div className="notif-title"><i className="ti ti-brand-whatsapp"></i> {t('whatsappAlerts')}</div>
                    <span className="notif-sub">Alert workers on payment approvals</span>
                  </div>
                  <input type="checkbox" className="tog-check" defaultChecked />
                </div>
                <div className="notif-row">
                  <div>
                    <div className="notif-title"><i className="ti ti-message"></i> {t('smsAlerts')}</div>
                    <span className="notif-sub">Daily attendance notifications logs</span>
                  </div>
                  <input type="checkbox" className="tog-check" defaultChecked />
                </div>
                <div className="notif-row" style={{ marginBottom: '14px' }}>
                  <div>
                    <div className="notif-title"><i className="ti ti-calendar"></i> {t('payrollReminders')}</div>
                    <span className="notif-sub">Reminder notifications to owner</span>
                  </div>
                  <input type="checkbox" className="tog-check" defaultChecked />
                </div>
                <button type="button" className="bpri" onClick={() => setShowSheet(null)}>
                  <i className="ti ti-check"></i> {t('save')}
                </button>
              </div>
            </div>
          )}

          {/* Subscreen sheet — Backup settings */}
          {showSheet === 'backup-settings' && (
            <div className="sheet-overlay open">
              <div className="sheet-inner" style={{ minHeight: '300px' }}>
                <div className="shandle"></div>
                <div className="shdr">
                  <span className="stitle"><i className="ti ti-cloud-upload"></i> {t('dataBackup')}</span>
                  <button type="button" className="icon-btn ib-close" onClick={() => setShowSheet(null)}><i className="ti ti-x"></i></button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '13px' }}>
                  <span>Cloud Sync State</span>
                  <span className="badge bg">{isOffline ? "Sync Paused" : "Connected"}</span>
                </div>
                <button type="button" className="bsec" style={{ marginBottom: '10px' }} onClick={() => {
                  if (isOffline) {
                    triggerToast("Cannot sync while offline!");
                  } else {
                    triggerToast(t('syncedSuccessfully'));
                  }
                }}>
                  <i className="ti ti-rotate"></i> {t('syncNow')}
                </button>
                <button type="button" className="bsec" style={{ marginBottom: '10px' }} onClick={() => {
                  const db = { onboardingData, employees, stockItems, inwardHistory, outwardHistory, suppliers };
                  downloadSimulatedFile("tfo_one_database_export.json", JSON.stringify(db, null, 2));
                  triggerToast(t('dataExported'));
                }}>
                  <i className="ti ti-download"></i> {t('exportData')}
                </button>
                <button type="button" className="bsec" style={{ marginBottom: '14px' }} onClick={() => downloadSimulatedFile("tfo_full_pdf_backup.txt", "TFO One Factory Records Backup PDF\nGenerated on: " + new Date().toISOString())}>
                  <i className="ti ti-file-text"></i> {t('downloadPdfBackup')}
                </button>
              </div>
            </div>
          )}

          {/* Toast Notification Banner popup */}
          <div className={`toast ${showToast ? 'show' : ''}`}>
            {toastMessage}
          </div>

          {/* Center Confirmation Dialog Backdrop Overlay */}
          <div className={`confirm-overlay ${confirmDialog.isOpen ? 'open' : ''}`}>
            <div className="confirm-box">
              <div className="conf-icon-wrap" style={{
                background: confirmDialog.type === 'delete_employee' ? 'var(--RL)' : 'var(--PRI-L)',
                color: confirmDialog.type === 'delete_employee' ? 'var(--R)' : 'var(--PRI)'
              }}>
                <i className={confirmDialog.type === 'delete_employee' ? 'ti ti-trash' : 'ti ti-help'}></i>
              </div>
              <h3 className="conf-title">{t('confirmTitle')}</h3>
              <p className="conf-msg">{confirmDialog.message}</p>
              <div className="conf-btns">
                <button type="button" className="conf-cancel" onClick={() => setConfirmDialog({ isOpen: false, type: '', message: '', onConfirm: null })}>
                  {t('cancel')}
                </button>
                <button type="button" className={`conf-ok ${confirmDialog.type === 'delete_employee' ? 'conf-del-btn' : 'conf-start-btn'}`} onClick={() => {
                  if (confirmDialog.onConfirm) confirmDialog.onConfirm();
                }}>
                  {t('confirm')}
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
