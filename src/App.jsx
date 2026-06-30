import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/tfologo.png';
import {
  supabase,
  isSupabaseConfigured,
  signInUser,
  signUpUser,
  signOutUser,
  fetchFactoryData,
  upsertFactoryData
} from './supabase';
import { saveToDB, loadFromDB } from './indexedDB.js';
import { PushNotifications } from '@capacitor/push-notifications';

// ==========================================
// TRANSLATION DICTIONARY (EN & TA)
// ==========================================
const translations = {
  en: {
    appName: "TFO One",
    tagline: "Your factory, in your hands.",
    subtitle: "Yarn · Payroll · Attendance · Reports",
    signInToContinue: "Sign in to continue",
    continueWithGoogle: "Continue with Google",
    settingUp: "setting up?",
    newFactorySetup: "New factory setup",
    agreeTerms: "I agree to the Terms & Privacy Policy",
    getStarted: "Get started",
    freeToUse: "Free to use · Secure sign in.",
    next: "Next",
    back: "Back",
    finish: "Let's Get Started",
    ownerName: "Owner's full name",
    factoryName: "Factory / TFO name",
    mobileNumber: "Mobile number (+91)",
    whatsappNumber: "WhatsApp number",
    employeeCount: "Number of employees",
    factoryAddress: "Factory address (City, State, Pincode)",
    addressPlaceholder: "e.g. Palladam, Tamil Nadu, 641664",
    onboardingSummary: "Review your information",
    synced: "Synced",
    offline: "Offline",
    home: "Home",
    stock: "Edit",
    stockTab: "Stock",
    staff: "Staff",
    payroll: "Payroll",
    reports: "Reports",
    settings: "Settings",
    welcome: "Welcome",
    week: "Week",
    totalStock: "Total Stock",
    employees: "Employees",
    weeklyPay: "Weekly Pay",
    production: "Production",
    yarnInward: "Yarn Inward",
    yarnOutward: "Yarn Outward",
    attendance: "Attendance",
    weeklyProdChart: "Weekly Production (KG)",
    today: "Today",
    recentActivity: "Recent Activity",
    inventory: "Inventory",
    add: "Add",
    color: "Colour",
    bags: "Bags",
    kg: "KG",
    inward: "Inward",
    outward: "Outward",
    supplier: "Supplier",
    partyName: "Party Name",
    entryId: "Entry ID",
    saveInward: "Save Inward Entry",
    saveOutward: "Save Outward Entry",
    bagWeight: "Bag Weight (KG)",
    autoCalculated: "Auto-calculated total KG",
    notes: "Notes",
    activeToday: "active today",
    morning: "Morning",
    night: "Night",
    all: "All",
    role: "Role",
    shift: "Shift",
    bloodGroup: "Blood Group",
    markAttendance: "Mark Attendance",
    paySalary: "Pay Salary",
    personalDetails: "Personal Details",
    salaryInfo: "Salary Info",
    thisWeekAttendance: "This Week Attendance",
    familyInfo: "Family Info",
    fatherName: "Father's name",
    motherName: "Mother's name",
    payType: "Pay Type",
    ratePerBag: "Rate per Bag",
    ratePerShift: "Rate per Shift",
    advanceDeduction: "Advance Deduction",
    aadhaar: "Aadhaar Number",
    joiningDate: "Joining Date",
    address: "Address",
    dob: "Date of Birth",
    addEmployee: "Add Employee",
    capturePhoto: "Capture Photo",
    retakePhoto: "Retake",
    uploadDoc: "Upload Aadhaar (PDF/Image)",
    weeklyWages: "Weekly Payroll Summary",
    payable: "Total Payable",
    advances: "Advances",
    pending: "Pending",
    startPayroll: "Start Weekly Payroll",
    bagsProduced: "Bags Produced",
    rate: "Rate",
    grossPay: "Gross Pay",
    netPay: "Net Pay",
    generatePayroll: "Generate Payroll",
    downloadPDF: "Download PDF",
    whatsappAlerts: "WhatsApp Alerts",
    smsAlerts: "SMS Alerts",
    reminders: "Payroll Reminders",
    syncNow: "Sync Now",
    exportData: "Export All Data",
    logout: "Log Out",
    version: "TFO One v1.1.0 · PWA Ready",
    save: "Save",
    remove: "Remove",
    cancel: "Cancel",
    confirmDelete: "Are you sure you want to delete this employee? This action cannot be undone.",
    confirmPayroll: "Start weekly payroll run for Week {week}?",
    successSave: "Saved successfully!",
    errorFields: "Please fill in all required fields.",
    errorTerms: "Please accept the Terms & Privacy Policy.",
    saveAttendance: "Save Attendance",
    morningShift: "Morning Shift (8 AM - 8 PM)",
    nightShift: "Night Shift (8 PM - 8 AM)",
    selectSupplier: "Select Supplier",
    addNewSupplier: "+ Add New Supplier",
    newSupplierName: "New Supplier Name",
    selectParty: "Select Party Name",
    addNewParty: "+ Add New Party",
    newPartyName: "New Party Name",
    editStock: "Edit Stock Ledger",
    editPayroll: "Edit Employee Payroll Record",
    customDate: "Custom Range",
    stockReport: "Stock Report",
    payrollReport: "Payroll Report",
    employeeReport: "Employee Report",
    prodSummaryReport: "Production Summary",
    downloadReport: "Download PDF Report",
    suppliersSection: "Supplier Ledger Summary",
    stockName: "Stock Name",
    yarnType: "Yarn Type",
    lotNumber: "Lot Number",
    numBags: "Number of Bags",
    weightPerBag: "Weight Per Bag (KG)",
    totalWeight: "Total Weight (KG)",
    purchasePrice: "Purchase Price",
    supplierName: "Supplier Name",
    purchaseDate: "Purchase Date",
    stockNotes: "Notes",
    saveStock: "Stock",
    deleteStock: "Stock",
    confirmDeleteStock: "Are you sure you want to delete this stock?",
    viewDetails: "View Details",
    employeesTab: "Employees",
    employeeName: "Employee Name",
    employeeId: "Employee ID",
    designation: "Designation",
    mobileNumber: "Mobile Number",
    email: "Email",
    department: "Department",
    salary: "Salary",
    employeeStatus: "Status",
    addEmployee: "Add Employee",
    saveEmployee: "Save",
    deleteEmployee: "Delete",
    confirmDeleteEmployee: "Are you sure you want to delete this employee?",
    yarnTab: "Yarn",
    yarnName: "Yarn Name",
    yarnCode: "Yarn Code",
    gsm: "GSM",
    materialType: "Material Type",
    availableQuantity: "Available Quantity",
    description: "Description",
    addYarn: "Add Yarn",
    saveYarn: "Save Yarn",
    deleteYarn: "Delete Yarn",
    confirmDeleteYarn: "Are you sure you want to delete this yarn?",
    searchPlaceholder: "Search by name, code, or ID...",
    filterAll: "All",
    filterStocks: "Stocks",
    filterYarn: "Yarn",
    filterEmployees: "Employees",
    sortByName: "Name",
    sortByDateCreated: "Date Created",
    sortByLastUpdated: "Last Updated",
    sortByQuantity: "Quantity",
    recentActivity: "Recent Activity",
    stockAdded: "Stock Added",
    stockUpdated: "Stock Updated",
    stockDeleted: "Stock Deleted",
    yarnAdded: "Yarn Added",
    yarnUpdated: "Yarn Updated",
    yarnDeleted: "Yarn Deleted",
    employeeAdded: "Employee Added",
    employeeUpdated: "Employee Updated",
    employeeDeleted: "Employee Deleted",
    loading: "Loading...",
    noResults: "No results found",
    emptyState: "No items yet. Add your first item!",
    logoActive: "Logo Active",
    factoryLogo: "Factory Logo",
    uploadLogo: "Upload Logo",
    factoryAddressLabel: "Factory Address",
    phoneContact: "Phone Contact",
    factoryNameLabel: "Factory Name",
    ownerNameLabel: "Owner Name",
    factorySettings: "Factory Settings",
    dataLoadedFromCloud: "Data loaded from Cloud!",
    failedToConnectCloud: "Failed to connect to cloud: ",
    insufficientStock: "Insufficient stock bags available!",
    removeEmployeeQuestion: "Remove Employee?",
    employeeRemoved: "Employee removed.",
    stockEntryRemoved: "Stock entry removed",
    weeklyPayrollGenerated: "Weekly payroll generated successfully!",
    backupExported: "Backup file exported.",
    searchEmployeePlaceholder: "Search employee name or ID...",
    wagesCalculated: "Wages calculated",
    pdfDownloaded: "PDF Downloaded",
    logoUploaded: "Logo uploaded!",
    logoRemoved: "Logo removed.",
    languageChanged: "Language changed to English",
    languageChangedTamil: "மொழி தமிழுக்கு மாற்றப்பட்டது",
    notifications: "Notifications",
    removeLogo: "Remove Logo",
    whatsappAlertDesc: "Receive automatic dispatch alerts on WhatsApp",
    smsAlertDesc: "Receive automatic dispatch alerts via SMS",
    smsAlertDescAttendance: "Receive daily worker attendance roll via SMS",
    remindersDesc: "Notify on weekly payroll calculation schedule",
    unknownError: "Unknown error",
    languageSelection: "Language selection",
    dataAndBackup: "Data & Backup",
    databaseSynced: "Database synced online!",
    confirmLogout: "Are you sure you want to log out?",
    confirmLogoutButton: "Log Out",
    deleteInwardEntry: "Delete Inward Entry",
    confirmDeleteInward: "Are you sure you want to delete this inward entry?",
    deleteOutwardEntry: "Delete Outward Entry",
    confirmDeleteOutward: "Are you sure you want to delete this outward entry?",
    inwardEntryDeleted: "Inward entry deleted",
    outwardEntryDeleted: "Outward entry deleted",
    supabaseNotConfigured: "Supabase is not configured. Using local demo mode.",
    confirmationEmailSent: "Confirmation email sent! Check your inbox.",
    loggedInSuccessfully: "Logged in successfully!",
    loggedOutFromCloud: "Logged out from cloud.",
    pieceRateBags: "Piece rate (bags)",
    dailyWages: "Daily wages",
    bagProductionPieceRate: "Bag Production (Piece-rate)",
    shiftBasedDailyWages: "Shift-based (Daily Wages)",
    bagProduction: "Bag Production",
    shiftWise: "Shift-wise",
    stockAudit: "Stock Audit / Correction",
    yarnWastage: "Yarn Wastage",
    damagedYarn: "Damaged Yarn",
    reasonForChange: "Reason for change",
    morning: "Morning",
    night: "Night",
    runWeeklyLedger: "Run Weekly Ledger",
    compileActiveRecords: "Compile active records of employees to run this week's statements.",
    twelveDigitAadhaar: "12-digit Aadhaar",
    egGunaSundaram: "e.g. Guna Sundaram",
    egKonguTfoMills: "e.g. Kongu TFO Mills",
    eg15: "e.g. 15",
    egRoyalBlue: "e.g. Royal Blue",
    egAnandhaSelvam: "e.g. Anandha Selvam",
    eg120: "e.g. 120",
    fullName: "Full Name",
    bagsCount: "Bags count",
    kgQuantity: "KG Quantity",
    selectStockColor: "Select Stock Color",
    bagsLeft: "bags left",
    bagWeightPlaceholder: "62.250",
    stockAdded: "Stock added",
    stockUpdated: "Stock updated",
    stockDeleted: "Stock deleted",
    employeeAdded: "Employee added",
    employeeUpdated: "Employee updated",
    employeeDeleted: "Employee deleted",
    yarnAdded: "Yarn added",
    yarnUpdated: "Yarn updated",
    yarnDeleted: "Yarn deleted",
    added: "added",
    updated: "updated",
    deleted: "deleted",
    received: "Received",
    dispatched: "Dispatched",
    from: "from",
    to: "to",
    currentLocation: "Current Location",
    getLocation: "Get Current Location",
    locationPermission: "Location permission required",
    locationError: "Unable to get location",
    coordinates: "Coordinates"
  },
  ta: {
    appName: "டி.எஃப்.ஓ ஒன்",
    tagline: "உங்கள் தொழிற்சாலை, உங்கள் கைகளில்.",
    subtitle: "நூல் · ஊதியம் · வருகைப்பதிவு · அறிக்கைகள்",
    signInToContinue: "தொடர உள்நுழையவும்",
    continueWithGoogle: "கூகுள் கணக்கு மூலம் உள்நுழையவும்",
    settingUp: "தொழிற்சாலை அமைக்கவா?",
    newFactorySetup: "புதிய தொழிற்சாலை அமைப்பு",
    agreeTerms: "விதிமுறைகள் & தனியுரிமைக் கொள்கையை ஏற்கிறேன்",
    getStarted: "தொடங்குவோம்",
    freeToUse: "இலவச பயன்பாடு · பாதுகாப்பான உள்நுழைவு.",
    next: "அடுத்து",
    back: "பின்னால்",
    finish: "தொடங்குவோம்",
    ownerName: "உரிமையாளரின் முழுப் பெயர்",
    factoryName: "தொழிற்சாலை / டி.எஃப்.ஓ பெயர்",
    mobileNumber: "கைபேசி எண் (+91)",
    whatsappNumber: "வாட்ஸ்அப் எண்",
    employeeCount: "பணியாளர்களின் எண்ணிக்கை",
    factoryAddress: "தொழிற்சாலை முகவரி (நகரம், மாநிலம், பின்கோடு)",
    addressPlaceholder: "எ.கா. பல்லடம், தமிழ்நாடு, 641664",
    onboardingSummary: "உள்ளீடுகளைச் சரிபார்க்கவும்",
    synced: "இணைக்கப்பட்டது",
    offline: "இணையம் இல்லை",
    home: "முகப்பு",
    stock: "திருத்து",
    stockTab: "ஸ்டாக்",
    staff: "பணியாளர்கள்",
    payroll: "ஊதியம்",
    reports: "அறிக்கைகள்",
    settings: "அமைப்புகள்",
    welcome: "வரவேற்கிறோம்",
    week: "வாரம்",
    totalStock: "மொத்த நூல்",
    employees: "பணியாளர்கள்",
    weeklyPay: "வார ஊதியம்",
    production: "உற்பத்தி",
    yarnInward: "நூல் வரவு (Inward)",
    yarnOutward: "நூல் செலவு (Outward)",
    attendance: "வருகை",
    weeklyProdChart: "வார உற்பத்தி (கிலோ)",
    today: "இன்று",
    recentActivity: "சமீபத்திய நடவடிக்கை",
    inventory: "இருப்பு விவரம்",
    add: "சேர்",
    color: "வண்ணம்",
    bags: "மூட்டைகள்",
    kg: "கிலோ",
    inward: "வரவு",
    outward: "செலவு",
    supplier: "விநியோகஸ்தர்",
    partyName: "வாடிக்கையாளர் பெயர்",
    entryId: "பதிவு எண்",
    saveInward: "வரவு பதிவை சேமி",
    saveOutward: "செலவு பதிவை சேமி",
    bagWeight: "மூட்டை எடை (கிலோ)",
    autoCalculated: "தானாக கணக்கிடப்பட்ட மொத்த கிலோ",
    notes: "குறிப்புகள்",
    activeToday: "இன்று வேலை செய்யும் பணியாளர்கள்",
    morning: "பகல் ஷிப்ட்",
    night: "இரவு ஷிப்ட்",
    all: "அனைவரும்",
    role: "பணி",
    shift: "ஷிப்ட்",
    bloodGroup: "இரத்த பிரிவு",
    markAttendance: "வருகைப்பதிவு செய்",
    paySalary: "சம்பளம் வழங்கு",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    salaryInfo: "சம்பள விவரம்",
    thisWeekAttendance: "இந்த வார வருகைப்பதிவு",
    familyInfo: "குடும்ப விவரம்",
    fatherName: "தந்தை பெயர்",
    motherName: "தாய் பெயர்",
    payType: "சம்பள முறை",
    ratePerBag: "மூட்டைக்கான வீதம்",
    ratePerShift: "ஷிப்டுக்கான வீதம்",
    advanceDeduction: "முன்பணக் கழிவு",
    aadhaar: "ஆதார் எண்",
    joiningDate: "சேர்ந்த தேதி",
    address: "முகவரி",
    dob: "பிறந்த தேதி",
    addEmployee: "பணியாளரைச் சேர்",
    capturePhoto: "புகைப்படம் எடு",
    retakePhoto: "மறுபடியும் எடு",
    uploadDoc: "ஆதார் நகல் (PDF/படம்)",
    weeklyWages: "வார சம்பள அறிக்கை",
    payable: "மொத்த ஊதியம்",
    advances: "முன்பணம்",
    pending: "நிலுவையில் உள்ளவை",
    startPayroll: "வார சம்பளத்தை கணக்கிடு",
    bagsProduced: "உற்பத்தி செய்த மூட்டைகள்",
    rate: "வீதம்",
    grossPay: "மொத்த சம்பளம்",
    netPay: "கைக்கு வரும் சம்பளம்",
    generatePayroll: "சம்பளப் பட்டியல் உருவாக்கு",
    downloadPDF: "PDF பதிவிறக்கு",
    whatsappAlerts: "வாட்ஸ்அப் அறிவிப்புகள்",
    smsAlerts: "எஸ்எம்எஸ் அறிவிப்புகள்",
    reminders: "ஊதிய நினைவூட்டல்கள்",
    syncNow: "இப்போதே இணை",
    exportData: "அனைத்து தரவுகளையும் ஏற்று",
    logout: "வெளியேறு",
    version: "டி.எஃப்.ஓ ஒன் v1.1.0 · PWA தயார்",
    save: "சேமி",
    remove: "நீக்கு",
    cancel: "ரத்து செய்",
    confirmDelete: "இந்தப் பணியாளரை நீக்க வேண்டுமா? இந்த நடவடிக்கை ரத்து செய்யப்படாது.",
    confirmPayroll: "வாரம் {week}-க்கான வார ஊதியக் கணக்கீட்டைத் தொடங்கலாமா?",
    successSave: "வெற்றிகரமாக சேமிக்கப்பட்டது!",
    errorFields: "தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.",
    errorTerms: "விதிமுறைகள் & தனியுரிமைக் கொள்கையை ஏற்கவும்.",
    saveAttendance: "வருகைப்பதிவை சேமி",
    morningShift: "பகல் ஷிப்ட் (காலை 8 - இரவு 8)",
    nightShift: "இரவு ஷிப்ட் (இரவு 8 - காலை 8)",
    selectSupplier: "விநியோகஸ்தரைத் தேர்ந்தெடு",
    addNewSupplier: "+ புதிய விநியோகஸ்தர்",
    newSupplierName: "புதிய விநியோகஸ்தர் பெயர்",
    selectParty: "வாடிக்கையாளர் பெயரைத் தேர்ந்தெடு",
    addNewParty: "+ புதிய வாடிக்கையாளர்",
    newPartyName: "புதிய வாடிக்கையாளர் பெயர்",
    editStock: "இருப்பைத் திருத்து",
    editPayroll: "பணியாளர் சம்பளத்தைத் திருத்து",
    customDate: "தேதியைத் தேர்ந்தெடு",
    stockReport: "இருப்பு அறிக்கை",
    payrollReport: "ஊதிய அறிக்கை",
    employeeReport: "பணியாளர் அறிக்கை",
    prodSummaryReport: "உற்பத்தி சுருக்கம்",
    downloadReport: "PDF அறிக்கை பதிவிறக்கு",
    suppliersSection: "விநியோகஸ்தர் கணக்குச் சுருக்கம்",
    stockName: "இருப்பு பெயர்",
    yarnType: "நூல் வகை",
    lotNumber: "லாட் எண்",
    numBags: "மூட்டைகளின் எண்ணிக்கை",
    weightPerBag: "ஒரு மூட்டைக்கான எடை (கிலோ)",
    totalWeight: "மொத்த எடை (கிலோ)",
    purchasePrice: "கொள்முதல் விலை",
    supplierName: "விநியோகஸ்தர் பெயர்",
    purchaseDate: "கொள்முதல் தேதி",
    stockNotes: "குறிப்புகள்",
    saveStock: "இருப்பை சேமி",
    deleteStock: "இருப்பை நீக்கு",
    confirmDeleteStock: "இந்த இருப்பை நீக்க வேண்டுமா?",
    viewDetails: "விவரங்களைக் காட்டு",
    employeesTab: "பணியாளர்கள்",
    employeeName: "பணியாளர் பெயர்",
    employeeId: "பணியாளர் ஐடி",
    designation: "பதவி",
    mobileNumber: "மொபைல் எண்",
    email: "மின்னஞ்சல்",
    department: "துறை",
    salary: "சம்பளம்",
    employeeStatus: "நிலை",
    addEmployee: "பணியாளரைச் சேர்",
    saveEmployee: "பணியாளரை சேமி",
    deleteEmployee: "பணியாளரை நீக்கு",
    confirmDeleteEmployee: "இந்தப் பணியாளரை நீக்க வேண்டுமா?",
    yarnTab: "நூல்",
    yarnName: "நூல் பெயர்",
    yarnCode: "நூல் குறியீடு",
    gsm: "ஜிஎஸ்எம்",
    materialType: "பொருள் வகை",
    availableQuantity: "கிடைக்கக்கூடிய அளவு",
    description: "விளக்கம்",
    addYarn: "நூலைச் சேர்",
    saveYarn: "நூலை சேமி",
    deleteYarn: "நூலை நீக்கு",
    confirmDeleteYarn: "இந்த நூலை நீக்க வேண்டுமா?",
    searchPlaceholder: "பெயர், குறியீடு அல்லது ஐடி தேடவும்...",
    filterAll: "அனைத்தும்",
    filterStocks: "இருப்பு",
    filterYarn: "நூல்",
    filterEmployees: "பணியாளர்கள்",
    sortByName: "பெயர்",
    sortByDateCreated: "உருவாக்கப்பட்ட தேதி",
    sortByLastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    sortByQuantity: "அளவு",
    recentActivity: "சமீபத்திய நடவடிக்கை",
    stockAdded: "இருப்பு சேர்க்கப்பட்டது",
    stockUpdated: "இருப்பு புதுப்பிக்கப்பட்டது",
    stockDeleted: "இருப்பு நீக்கப்பட்டது",
    yarnAdded: "நூல் சேர்க்கப்பட்டது",
    yarnUpdated: "நூல் புதுப்பிக்கப்பட்டது",
    yarnDeleted: "நூல் நீக்கப்பட்டது",
    employeeAdded: "பணியாளர் சேர்க்கப்பட்டார்",
    employeeUpdated: "பணியாளர் புதுப்பிக்கப்பட்டார்",
    employeeDeleted: "பணியாளர் நீக்கப்பட்டார்",
    loading: "ஏற்றுகிறது...",
    noResults: "முடிவுகள் இல்லை",
    emptyState: "உருப்படிகள் இல்லை. முதல் உருப்படியைச் சேர்க்கவும்!",
    logoActive: "லோகோ செயலில் உள்ளது",
    factoryLogo: "தொழிற்சாலை லோகோ",
    uploadLogo: "லோகோ பதிவேற்று",
    factoryAddressLabel: "தொழிற்சாலை முகவரி",
    phoneContact: "கைபேசி எண்",
    factoryNameLabel: "தொழிற்சாலை பெயர்",
    ownerNameLabel: "உரிமையாளர் பெயர்",
    factorySettings: "தொழிற்சாலை அமைப்புகள்",
    dataLoadedFromCloud: "தரவு கிளவுடிலிருந்து ஏற்றப்பட்டது!",
    failedToConnectCloud: "கிளவுட் இணைப்பு தோல்வியுற்றது: ",
    insufficientStock: "மூட்டை இருப்பு போதுமானதாக இல்லை!",
    removeEmployeeQuestion: "பணியாளரை நீக்கவா?",
    employeeRemoved: "பணியாளர் நீக்கப்பட்டார்.",
    stockEntryRemoved: "இருப்புப் பதிவு நீக்கப்பட்டது",
    weeklyPayrollGenerated: "வார ஊதியப் பட்டியல் கணக்கிடப்பட்டது!",
    backupExported: "காப்பு நகல் கோப்பு உருவாக்கப்பட்டது.",
    searchEmployeePlaceholder: "பணியாளர் பெயர் அல்லது ஐடி தேடவும்...",
    wagesCalculated: "சம்பளம் கணக்கிடப்பட்டது",
    pdfDownloaded: "PDF பதிவிறக்கப்பட்டது",
    logoUploaded: "லோகோ பதிவேற்றப்பட்டது!",
    logoRemoved: "லோகோ நீக்கப்பட்டது.",
    languageChanged: "மொழி தமிழுக்கு மாற்றப்பட்டது",
    languageChangedTamil: "மொழி தமிழுக்கு மாற்றப்பட்டது",
    notifications: "அறிவிப்புகள்",
    removeLogo: "லோகோவை நீக்கு",
    whatsappAlertDesc: "வாட்ஸ்அப்பில் தானியங்கி அறிவிப்புகளைப் பெறுங்கள்",
    smsAlertDesc: "எஸ்எம்எஸ் வழியாக தானியங்கி அறிவிப்புகளைப் பெறுங்கள்",
    smsAlertDescAttendance: "எஸ்எம்எஸ் மூலம் வருகைப்பதிவு விவரங்களை பெறுக",
    remindersDesc: "வார ஊதியக் கணக்கீட்டு அட்டவணை பற்றிய நினைவூட்டல்",
    unknownError: "தெரியாத பிழை",
    languageSelection: "மொழி தேர்வு",
    dataAndBackup: "தரவு & காப்புப்பிரதி",
    databaseSynced: "தரவுத்தளம் இணையத்தில் இணைக்கப்பட்டது!",
    confirmLogout: "நீங்கள் வெளியேற விரும்புகிறீர்களா?",
    confirmLogoutButton: "வெளியேறு",
    deleteInwardEntry: "வரவு பதிவை நீக்கு",
    confirmDeleteInward: "இந்த வரவு பதிவை நீக்க வேண்டுமா?",
    deleteOutwardEntry: "செலவு பதிவை நீக்கு",
    confirmDeleteOutward: "இந்த செலவு பதிவை நீக்க வேண்டுமா?",
    inwardEntryDeleted: "வரவு பதிவு நீக்கப்பட்டது",
    outwardEntryDeleted: "செலவு பதிவு நீக்கப்பட்டது",
    supabaseNotConfigured: "Supabase கட்டமைக்கப்படவில்லை. உள்ளூர் டெமோ முறையைப் பயன்படுத்துகிறது.",
    confirmationEmailSent: "உறுதிப்படுத்தல் மின்னஞ்சல் அனுப்பப்பட்டது! உங்கள் இன்பாக்ஸைச் சரிபார்க்கவும்.",
    loggedInSuccessfully: "வெற்றிகரமாக உள்நுழைந்தீர்கள்!",
    loggedOutFromCloud: "கிளவுடிலிருந்து வெளியேறினீர்கள்.",
    pieceRateBags: "துண்டு வீதம் (மூட்டைகள்)",
    dailyWages: "நாள் ஊதியம்",
    bagProductionPieceRate: "மூட்டை உற்பத்தி (துண்டு வீதம்)",
    shiftBasedDailyWages: "ஷிப்ட் அடிப்படையில் (நாள் ஊதியம்)",
    bagProduction: "மூட்டை உற்பத்தி",
    shiftWise: "ஷிப்ட் வாரியாக",
    stockAudit: "ஸ்டாக் தணிக்கை / திருத்தம்",
    yarnWastage: "நூல் அபாயம்",
    damagedYarn: "சேதமடைந்த நூல்",
    reasonForChange: "மாற்றத்திற்கான காரணம்",
    morning: "காலை",
    night: "இரவு",
    runWeeklyLedger: "வாராந்திர லெட்ஜர் இயக்கு",
    compileActiveRecords: "இந்த வாரத்தின் கணக்குகளை இயக்க ஊழியர்களின் செயலில் உள்ள பதிவுகளைத் தொகுக்கவும்.",
    twelveDigitAadhaar: "12-இலக்க ஆதார்",
    egGunaSundaram: "எ.கா. குணா சுந்தரம்",
    egKonguTfoMills: "எ.கா. கொங்கு டி.எஃப்.ஓ மில்ஸ்",
    eg15: "எ.கா. 15",
    egRoyalBlue: "எ.கா. ராயல் ப்ளூ",
    egAnandhaSelvam: "எ.கா. ஆனந்த செல்வம்",
    eg120: "எ.கா. 120",
    fullName: "முழு பெயர்",
    bagsCount: "மூட்டை எண்ணிக்கை",
    kgQuantity: "கிலோ அளவு",
    selectStockColor: "ஸ்டாக் வண்ணத்தைத் தேர்ந்தெடு",
    bagsLeft: "மூட்டைகள் மீதம்",
    bagWeightPlaceholder: "62.250",
    stockAdded: "ஸ்டாக் சேர்க்கப்பட்டது",
    stockUpdated: "ஸ்டாக் புதுப்பிக்கப்பட்டது",
    stockDeleted: "ஸ்டாக் நீக்கப்பட்டது",
    employeeAdded: "ஊழியர் சேர்க்கப்பட்டார்",
    employeeUpdated: "ஊழியர் புதுப்பிக்கப்பட்டார்",
    employeeDeleted: "ஊழியர் நீக்கப்பட்டார்",
    yarnAdded: "நூல் சேர்க்கப்பட்டது",
    yarnUpdated: "நூல் புதுப்பிக்கப்பட்டது",
    yarnDeleted: "நூல் நீக்கப்பட்டது",
    added: "சேர்க்கப்பட்டது",
    updated: "புதுப்பிக்கப்பட்டது",
    deleted: "நீக்கப்பட்டது",
    received: "பெறப்பட்டது",
    dispatched: "அனுப்பப்பட்டது",
    from: "இருந்து",
    to: "க்கு",
    currentLocation: "தற்போதைய இடம்",
    getLocation: "தற்போதைய இடத்தைப் பெறு",
    locationPermission: "இட அனுமதி தேவை",
    locationError: "இடத்தைப் பெற முடியவில்லை",
    coordinates: "ஆயத்தொலைவுகள்"
  }
};

// ==========================================
// SEED MOCK DATA
// ==========================================
const DEFAULT_FACTORY_SETTINGS = {
  ownerName: "Guna S",
  factoryName: "Guna's TFO Mills",
  phone: "9843210987",
  whatsapp: "9843210987",
  employeesCount: "4",
  address: "124, Trichy Road, Palladam",
  pincode: "641664",
  logo: ""
};

const DEFAULT_EMPLOYEES = [
  {
    id: "EMP-101",
    name: "Karthik Raja",
    fatherName: "Ramasamy",
    motherName: "Palaniammal",
    phone: "9876543210",
    bloodGroup: "O+",
    dob: "1994-08-12",
    aadhaar: "•••• •••• 4829",
    payType: "production", // production/shift
    shift: "Morning", // Morning/Night
    rate: 120, // Rate per bag
    joiningDate: "2024-01-10",
    address: "12, Main Street, Palladam",
    status: "present",
    photoUrl: ""
  },
  {
    id: "EMP-102",
    name: "Muthu Kumar",
    fatherName: "Chinnasamy",
    motherName: "Marathal",
    phone: "9786543211",
    bloodGroup: "A+",
    dob: "1996-05-15",
    aadhaar: "•••• •••• 9283",
    payType: "production",
    shift: "Night",
    rate: 125,
    joiningDate: "2024-03-22",
    address: "45, Bypass Road, Tiruppur",
    status: "present",
    photoUrl: ""
  },
  {
    id: "EMP-103",
    name: "Palanisamy G.",
    fatherName: "Ganesan",
    motherName: "Saraswathi",
    phone: "9676543212",
    bloodGroup: "B+",
    dob: "1992-12-05",
    aadhaar: "•••• •••• 7492",
    payType: "shift",
    shift: "Morning",
    rate: 750, // Rate per shift
    joiningDate: "2023-11-05",
    address: "7, Kovai Road, Somanur",
    status: "absent",
    photoUrl: ""
  },
  {
    id: "EMP-104",
    name: "Selvi Mani",
    fatherName: "Manickam",
    motherName: "Rukmani",
    phone: "9566543213",
    bloodGroup: "O-",
    dob: "1998-04-10",
    aadhaar: "•••• •••• 5392",
    payType: "shift",
    shift: "Morning",
    rate: 700,
    joiningDate: "2025-02-15",
    address: "22, Factory Colony, Palladam",
    status: "present",
    photoUrl: ""
  }
];

const DEFAULT_STOCK = [
  { 
    id: "STK-001",
    stockName: "Royal Blue Yarn",
    yarnType: "Cotton",
    color: "Royal Blue", 
    lotNumber: "LOT-2024-001",
    kg: 450, 
    bags: 7,
    weightPerBag: 64.286,
    purchasePrice: 45000,
    supplierName: "Sri Murugan Mills",
    purchaseDate: "2024-01-15",
    notes: "A-grade combed yarn",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  { 
    id: "STK-002",
    stockName: "Terracotta Red Yarn",
    yarnType: "Polyester",
    color: "Terracotta Red", 
    kg: 1240, 
    bags: 20,
    weightPerBag: 62.0,
    purchasePrice: 124000,
    supplierName: "KPR Spinners",
    purchaseDate: "2024-02-10",
    notes: "Fast delivery",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10"
  },
  { 
    id: "STK-003",
    stockName: "Jet Black Yarn",
    yarnType: "Cotton Blend",
    color: "Jet Black", 
    kg: 850, 
    bags: 14,
    weightPerBag: 60.714,
    purchasePrice: 85000,
    supplierName: "Senthil Textiles",
    purchaseDate: "2024-03-05",
    notes: "Premium quality",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-05"
  },
  { 
    id: "STK-004",
    stockName: "Off-White Yarn",
    yarnType: "Cotton",
    color: "Off-White", 
    kg: 1900, 
    bags: 30,
    weightPerBag: 63.333,
    purchasePrice: 190000,
    supplierName: "Sri Murugan Mills",
    purchaseDate: "2024-04-20",
    notes: "Bulk order",
    createdAt: "2024-04-20",
    updatedAt: "2024-04-20"
  }
];

const DEFAULT_YARN = [
  {
    id: "YRN-001",
    yarnName: "Premium Cotton",
    yarnCode: "COT-001",
    color: "Natural White",
    gsm: 120,
    materialType: "100% Cotton",
    availableQuantity: 5000,
    description: "High-quality cotton yarn for weaving",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: "YRN-002",
    yarnName: "Polyester Blend",
    yarnCode: "POL-002",
    color: "Various",
    gsm: 150,
    materialType: "65% Polyester, 35% Cotton",
    availableQuantity: 3000,
    description: "Durable polyester-cotton blend",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15"
  },
  {
    id: "YRN-003",
    yarnName: "Viscose Rayon",
    yarnCode: "VIS-003",
    color: "Multiple Colors",
    gsm: 130,
    materialType: "100% Viscose",
    availableQuantity: 2000,
    description: "Soft and shiny rayon yarn",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20"
  }
];

const DEFAULT_INWARD = [
  { id: "IN-2849", date: "2026-06-18", supplier: "Sri Murugan Mills", color: "Off-White", bags: 10, kgPerBag: 62.250, totalKg: 622.5, notes: "A-grade combed yarn" },
  { id: "IN-2848", date: "2026-06-15", supplier: "KPR Spinners", color: "Terracotta Red", bags: 15, kgPerBag: 62.250, totalKg: 933.75, notes: "Fast delivery" }
];

const DEFAULT_OUTWARD = [
  { id: "OUT-1740", date: "2026-06-19", partyName: "Vasanth Weaving", color: "Royal Blue", bags: 5, kgPerBag: 62.250, totalKg: 311.25 }
];

const DEFAULT_ACTIVITY = [
  { type: "inward", text: "Received 10 bags Off-White from Sri Murugan Mills", timestamp: "2026-06-18 11:30 AM", badge: "+622.5 KG" },
  { type: "outward", text: "Dispatched 5 bags Royal Blue to Vasanth Weaving", timestamp: "2026-06-19 04:15 PM", badge: "-311.25 KG" },
  { type: "attendance", text: "Attendance marked: 3 Present, 1 Absent", timestamp: "Today 08:30 AM", badge: "3/4 Active" }
];

export default function App() {
  // State Initialization
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('auth'); // auth, onboarding, home, stock, staff, payroll, reports, settings, employee_profile
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Supabase Integration States
  const [session, setSession] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('local'); // 'local', 'synced', 'syncing', 'error', 'offline'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSignUpView, setIsSignUpView] = useState(false);
  const [dbError, setDbError] = useState(null);

  // Local Database State with IndexedDB as primary storage
  const [db, setDb] = useState(() => {
    console.log('App init: Loading from IndexedDB');
    
    // Try IndexedDB first (most reliable)
    loadFromDB().then(data => {
      if (data) {
        const hasData = data && (
          data.employees?.length > 0 ||
          data.stock?.length > 0 ||
          data.inward?.length > 0 ||
          data.outward?.length > 0 ||
          (data.settings?.ownerName && data.settings.ownerName !== "Guna S")
        );
        if (hasData) {
          console.log('App init: Loaded from IndexedDB with data:', {
            employeesCount: data.employees?.length,
            stockCount: data.stock?.length,
            inwardCount: data.inward?.length,
            outwardCount: data.outward?.length
          });
          setDb(data);
          return;
        }
      }
      console.log('App init: IndexedDB empty or no data, using defaults');
    }).catch(err => {
      console.error('App init: IndexedDB error:', err);
    });
    
    // Fallback to localStorage
    const local = localStorage.getItem('tfo_db');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        const hasData = parsed && (
          parsed.employees?.length > 0 ||
          parsed.stock?.length > 0 ||
          parsed.inward?.length > 0 ||
          parsed.outward?.length > 0 ||
          (parsed.settings?.ownerName && parsed.settings.ownerName !== "Guna S")
        );
        if (hasData) {
          console.log('App init: Loaded from localStorage with data:', {
            employeesCount: parsed.employees?.length,
            stockCount: parsed.stock?.length,
            inwardCount: parsed.inward?.length,
            outwardCount: parsed.outward?.length
          });
          return parsed;
        }
      } catch (e) {
        console.error('App init: Error parsing localStorage:', e);
      }
    }
    
    console.log('App init: Using default data - no data found in storage');
    return {
      settings: DEFAULT_FACTORY_SETTINGS,
      employees: DEFAULT_EMPLOYEES,
      stock: DEFAULT_STOCK,
      yarn: DEFAULT_YARN,
      inward: DEFAULT_INWARD,
      outward: DEFAULT_OUTWARD,
      activity: DEFAULT_ACTIVITY,
      attendance: {}, // key: YYYY-MM-DD_Shift -> { empId: 'present'/'absent' }
      payrollRuns: []
    };
  });

  // Navigation history tracker
  const [prevScreen, setPrevScreen] = useState('auth');
  const [activeEmployeeId, setActiveEmployeeId] = useState(null);

  // Onboarding variables
  const [obName, setObName] = useState('');
  const [obFactory, setObFactory] = useState('');
  const [obMobile, setObMobile] = useState('');
  const [obWhatsapp, setObWhatsapp] = useState('');
  const [obEmpCount, setObEmpCount] = useState('');
  const [obAddress, setObAddress] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form Bottom Sheet details
  const [bottomSheet, setBottomSheet] = useState(null); // inward, outward, attendance, add_employee, edit_stock, edit_payroll_item
  const [selectedStockColor, setSelectedStockColor] = useState(null);
  const [selectedPayrollEmpId, setSelectedPayrollEmpId] = useState(null);

  // Dialog / Toast alerts
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const [confirmModal, setConfirmModal] = useState({ title: '', message: '', action: null, visible: false });

  // Camera capture inside Employee sheet
  const [cameraActive, setCameraActive] = useState(false);
  const [photoData, setPhotoData] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Handle Supabase Auth States
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setCloudStatus('local');
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCloudStatus('synced');
        loadDataFromCloud(session.user.id, session.user.email);
      } else {
        setCloudStatus('offline');
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, 'Session:', session ? 'exists' : 'null');
      setSession(session);
      if (session) {
        setCloudStatus('synced');
        loadDataFromCloud(session.user.id, session.user.email);
      } else {
        setCloudStatus('offline');
        setScreen('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadDataFromCloud = async (userId, userEmail) => {
    console.log('Loading data from cloud for user:', userId);
    setIsSyncing(true);
    setCloudStatus('syncing');
    
    try {
      const data = await fetchFactoryData(userId);
      console.log('Cloud data received:', data);
      if (data) {
        // Merge cloud data with state
        const mergedDb = {
          settings: {
            ...(data.settings || DEFAULT_FACTORY_SETTINGS),
            email: userEmail || data.email || data.settings?.email || ''
          },
          employees: data.employees || [],
          stock: data.stock || [],
          yarn: data.yarn || [],
          inward: data.inward || [],
          outward: data.outward || [],
          activity: data.activity || [],
          attendance: data.attendance || {},
          payrollRuns: data.payroll_runs || []
        };
        setDb(mergedDb);
        setCloudStatus('synced');
        // If the user completed onboarding before → home; else → onboarding
        if (data.settings?.onboardingComplete) {
          navigateTo('home');
        } else {
          console.log('Cloud user has not completed onboarding, going to onboarding');
          navigateTo('onboarding');
          setOnboardingStep(1);
        }
      } else {
        // No cloud record at all — this is a brand-new user.
        // Check localStorage for onboardingComplete flag ONLY (ignore default mock data)
        let completedLocally = false;
        try {
          const localData = localStorage.getItem('tfo_db');
          if (localData) {
            const parsed = JSON.parse(localData);
            completedLocally = !!parsed?.settings?.onboardingComplete;
          }
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }

        setCloudStatus('synced');
        if (completedLocally) {
          console.log('Onboarding completed locally, going to home');
          navigateTo('home');
        } else {
          // Brand-new user — wipe default mock data and start completely fresh
          console.log('New user — clearing mock data and going to onboarding');
          const freshDb = {
            settings: {
              ownerName: '',
              factoryName: '',
              phone: '',
              whatsapp: '',
              address: '',
              logo: '',
              email: userEmail || '',
              onboardingComplete: false
            },
            employees: [],
            stock: [],
            yarn: [],
            inward: [],
            outward: [],
            activity: [],
            attendance: {},
            payrollRuns: []
          };
          setDb(freshDb);
          // Clear localStorage so stale default data doesn't survive a page refresh
          localStorage.removeItem('tfo_db');
          sessionStorage.removeItem('tfo_db');
          navigateTo('onboarding');
          setOnboardingStep(1);
        }
      }
    } catch (err) {
      console.error("Cloud fetch error:", err);
      setCloudStatus('synced');
      navigateTo('home');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFallbackToLocalDemo = () => {
    setDbError(null);
    setCloudStatus('local');
    if (!db.settings.onboardingComplete) {
      navigateTo('onboarding');
      setOnboardingStep(1);
    } else {
      navigateTo('home');
    }
  };

  // Local state persistence + Automatic Cloud Sync (Debounced)
  useEffect(() => {
    console.log('useEffect triggered - saving to IndexedDB and localStorage');
    const dbString = JSON.stringify(db);
    
    // Save to IndexedDB (primary storage)
    saveToDB(db).then(() => {
      console.log('IndexedDB saved successfully');
    }).catch(err => {
      console.error('IndexedDB save error:', err);
    });
    
    // Save to localStorage as backup
    localStorage.setItem('tfo_db', dbString);
    
    // Save to sessionStorage as additional backup
    sessionStorage.setItem('tfo_db', dbString);
    
    console.log('Storage saved. Current db state:', {
      employeesCount: db.employees?.length,
      stockCount: db.stock?.length,
      inwardCount: db.inward?.length,
      outwardCount: db.outward?.length
    });
    console.log('localStorage verification:', localStorage.getItem('tfo_db')?.substring(0, 100));
    console.log('sessionStorage verification:', sessionStorage.getItem('tfo_db')?.substring(0, 100));

    if (!isSupabaseConfigured() || !session) {
      if (!isSupabaseConfigured() && session) {
        console.warn("Supabase not configured - data only saved locally");
        showToast('Supabase not configured - check environment variables', 'error');
      }
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setCloudStatus('syncing');
      console.log('Attempting to sync data to cloud for user:', session.user.id);
      console.log('Syncing db state:', {
        employeesCount: db.employees?.length,
        stockCount: db.stock?.length,
        inwardCount: db.inward?.length,
        outwardCount: db.outward?.length
      });
      try {
        await upsertFactoryData(session.user.id, db, session.user.email);
        setCloudStatus('synced');
        console.log("Data synced to cloud successfully");
        showToast('Data saved to cloud', 'success');
      } catch (err) {
        console.error("Auto sync error:", err);
        setCloudStatus('offline');
        showToast('Failed to connect to cloud: ' + (err.message || 'Unknown error'), 'error');
      }
    }, 2000); // Debounce sync by 2 seconds

    return () => clearTimeout(delayDebounceFn);
  }, [db, session]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      showToast(t('supabaseNotConfigured'), "error");
      if (!db.settings.onboardingComplete) {
        navigateTo('onboarding');
        setOnboardingStep(1);
      } else {
        navigateTo('home');
      }
      return;
    }

    setIsSyncing(true);
    try {
      if (isSignUpView) {
        const { data, error } = await signUpUser(authEmail, authPassword);
        if (error) throw error;
        showToast(t('confirmationEmailSent'), "success");
      } else {
        const { data, error } = await signInUser(authEmail, authPassword);
        if (error) throw error;
        showToast(t('loggedInSuccessfully'), "success");
      }
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isSupabaseConfigured()) {
      // Mock sign-in (Local Mode)
      if (!db.settings.onboardingComplete) {
        // Fresh slate for new local users
        setDb({
          settings: { ownerName: '', factoryName: '', phone: '', whatsapp: '', address: '', logo: '', onboardingComplete: false },
          employees: [], stock: [], yarn: [], inward: [], outward: [], activity: [], attendance: {}, payrollRuns: []
        });
        localStorage.removeItem('tfo_db');
        sessionStorage.removeItem('tfo_db');
        navigateTo('onboarding');
        setOnboardingStep(1);
      } else {
        navigateTo('home');
        showToast(t('successSave'));
      }
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured() && session) {
      try {
        await signOutUser();
        showToast(t('loggedOutFromCloud'));
      } catch (err) {
        console.error(err);
      }
    }
    setSession(null);
    localStorage.removeItem('tfo_db');
    setDb({
      settings: DEFAULT_FACTORY_SETTINGS,
      employees: DEFAULT_EMPLOYEES,
      stock: DEFAULT_STOCK,
      yarn: DEFAULT_YARN,
      inward: DEFAULT_INWARD,
      outward: DEFAULT_OUTWARD,
      activity: DEFAULT_ACTIVITY,
      attendance: {},
      payrollRuns: []
    });
    navigateTo('auth');
  };

  const renderCloudStatus = () => {
    if (cloudStatus === 'local') {
      return (
        <span className="badge-sync offline" style={{ backgroundColor: 'rgba(217, 119, 6, 0.08)', color: 'var(--amber)' }} title="Add Supabase credentials to .env to enable backend sync">
          <i className="ti ti-cloud-off"></i> Local Demo
        </span>
      );
    }
    if (cloudStatus === 'syncing') {
      return (
        <span className="badge-sync online" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
          <i className="ti ti-loader" style={{ animation: 'spin 1.5s linear infinite', display: 'inline-block' }}></i> Syncing
        </span>
      );
    }
    if (cloudStatus === 'synced') {
      return (
        <span className="badge-sync online">
          <i className="ti ti-cloud-check"></i> Synced
        </span>
      );
    }
    return (
      <span className="badge-sync offline">
        <i className="ti ti-cloud-off"></i> Offline
      </span>
    );
  };

  // Online Offline indicators
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Push Notifications Setup (only for native platforms)
  useEffect(() => {
    const setupPushNotifications = async () => {
      try {
        // Check if running on native platform (Capacitor)
        const { Capacitor } = await import('@capacitor/core');
        if (!Capacitor.isNativePlatform()) {
          console.log('Push notifications only available on native platforms');
          return;
        }

        // Request permission
        const result = await PushNotifications.requestPermissions();
        if (result.receive === 'granted') {
          console.log('Push notification permission granted');
          
          // Register for push notifications
          await PushNotifications.register();
          
          // Listen to registration
          PushNotifications.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
            // Store token in Supabase or send to backend
          });
          
          // Listen to notification received
          PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push notification received: ' + JSON.stringify(notification));
          });
          
          // Listen to notification action performed
          PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            console.log('Push notification action performed: ' + JSON.stringify(notification));
          });
        } else {
          console.log('Push notification permission denied');
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    };

    setupPushNotifications();
  }, []);

  // Utility to fire toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Helper translations getter
  const t = (key) => {
    return translations[lang][key] || key;
  };

  // Helper date formatter
  const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return today.toLocaleDateString(lang === 'en' ? 'en-US' : 'ta-IN', options);
  };

  // Helper week number calculator
  const getWeekNumber = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  };

  // Switch Screen Helper
  const navigateTo = (target) => {
    setPrevScreen(screen);
    setScreen(target);
  };

  // Onboarding next page transitions (4 steps: owner name, TFO name, mobile, location)
  const handleOnboardingNext = () => {
    if (onboardingStep === 1 && !obName.trim()) { showToast(t('errorFields'), 'error'); return; }
    if (onboardingStep === 2 && !obFactory.trim()) { showToast(t('errorFields'), 'error'); return; }
    if (onboardingStep === 3 && !obMobile.trim()) { showToast(t('errorFields'), 'error'); return; }
    if (onboardingStep === 4 && !obAddress.trim()) { showToast(t('errorFields'), 'error'); return; }

    if (onboardingStep < 4) {
      setOnboardingStep(prev => prev + 1);
    } else {
      // Completed — set onboardingComplete flag so returning users skip onboarding
      const updatedDb = {
        ...db,
        settings: {
          ...db.settings,
          ownerName: obName,
          factoryName: obFactory,
          phone: obMobile,
          whatsapp: obMobile,
          address: obAddress,
          email: session?.user?.email || db.settings.email || '',
          onboardingComplete: true
        }
      };

      setDb(updatedDb);

      // Force instant sync if logged in, instead of debouncing
      if (isSupabaseConfigured() && session) {
        setCloudStatus('syncing');
        upsertFactoryData(session.user.id, updatedDb, session.user.email)
          .then(() => setCloudStatus('synced'))
          .catch((e) => {
            console.error("Initial onboarding sync error:", e);
            setCloudStatus('offline');
          });
      }

      navigateTo('home');
      showToast(t('successSave'));
    }
  };

  // Onboarding previous page transition
  const handleOnboardingBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(prev => prev - 1);
    } else {
      navigateTo('auth');
    }
  };

  // Dynamic Camera Stream triggers
  const startCamera = async () => {
    setCameraActive(true);
    setPhotoData("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      // fallback handled gracefully via input file tag
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/jpeg');
      setPhotoData(data);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  // Activity logging
  const addActivity = (type, data) => {
    let badgeText;
    if (type === 'employeeAdded') badgeText = t('employeeAdded');
    else if (type === 'employeeUpdated') badgeText = t('employeeUpdated');
    else if (type === 'employeeDeleted') badgeText = t('employeeDeleted');
    else if (type === 'yarnAdded') badgeText = t('yarnAdded');
    else if (type === 'yarnUpdated') badgeText = t('yarnUpdated');
    else if (type === 'yarnDeleted') badgeText = t('yarnDeleted');
    else if (type === 'stockAdded') badgeText = t('stockAdded');
    else if (type === 'stockUpdated') badgeText = t('stockUpdated');
    else if (type === 'stockDeleted') badgeText = t('stockDeleted');
    else if (type === 'inward') badgeText = `+${data.kg.toFixed(2)} KG`;
    else if (type === 'outward') badgeText = `-${data.kg.toFixed(2)} KG`;
    else badgeText = type.replace(/([A-Z])/g, ' $1').trim();

    const newActivity = {
      type,
      data,
      timestamp: new Date().toLocaleString(),
      badge: badgeText
    };
    setDb(prev => ({ ...prev, activity: [newActivity, ...prev.activity.slice(0, 9)] }));
  };

  // Add Yarn Inward Entry state variables
  const [inwardDate, setInwardDate] = useState(new Date().toISOString().split('T')[0]);
  const [inwardSupplier, setInwardSupplier] = useState('');
  const [inwardNewSupplier, setInwardNewSupplier] = useState('');
  const [inwardColor, setInwardColor] = useState('');
  const [inwardBags, setInwardBags] = useState('');
  const [inwardBagWeight, setInwardBagWeight] = useState('62.250');
  const [inwardNotes, setInwardNotes] = useState('');
  const [showNewSupplierInput, setShowNewSupplierInput] = useState(false);

  const saveInwardEntry = (e) => {
    e.preventDefault();
    console.log('saveInwardEntry called');
    const finalSupplier = showNewSupplierInput ? inwardNewSupplier : inwardSupplier;
    const bagsCount = parseInt(inwardBags);
    const weightVal = parseFloat(inwardBagWeight);

    console.log('Form values:', { finalSupplier, inwardColor, bagsCount, weightVal });

    if (!finalSupplier || !inwardColor || !bagsCount || !weightVal) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const calculatedTotalKg = bagsCount * weightVal;
    const newId = "IN-" + Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      id: newId,
      date: inwardDate,
      supplier: finalSupplier,
      color: inwardColor,
      bags: bagsCount,
      kgPerBag: weightVal,
      totalKg: calculatedTotalKg,
      notes: inwardNotes
    };

    // Update Stock List color-wise
    let updatedStock = [...db.stock];
    const stockIdx = updatedStock.findIndex(item => item.color.toLowerCase() === inwardColor.toLowerCase());
    if (stockIdx > -1) {
      updatedStock[stockIdx].kg += calculatedTotalKg;
      updatedStock[stockIdx].bags += bagsCount;
    } else {
      updatedStock.push({ color: inwardColor, kg: calculatedTotalKg, bags: bagsCount });
    }

    // Push feed activity
    addActivity('inward', { type: 'inward', bags: bagsCount, color: inwardColor, supplier: finalSupplier, kg: calculatedTotalKg });

    setDb(prev => ({
      ...prev,
      inward: [newEntry, ...prev.inward],
      stock: updatedStock
    }));

    setBottomSheet(null);
    showToast(t('successSave'));
    // reset form fields
    setInwardSupplier('');
    setInwardNewSupplier('');
    setInwardColor('');
    setInwardBags('');
    setInwardNotes('');
    setShowNewSupplierInput(false);
    console.log('Inward entry saved successfully:', newEntry);
  };

  // Add Yarn Outward Entry state variables
  const [outwardDate, setOutwardDate] = useState(new Date().toISOString().split('T')[0]);
  const [outwardParty, setOutwardParty] = useState('');
  const [outwardNewParty, setOutwardNewParty] = useState('');
  const [showNewPartyInput, setShowNewPartyInput] = useState(false);
  const [outwardColor, setOutwardColor] = useState('');
  const [outwardBags, setOutwardBags] = useState('');
  const [outwardBagWeight, setOutwardBagWeight] = useState('62.250');

  // Get all unique saved party names dynamically from history
  const uniqueParties = Array.from(new Set(db.outward.map(item => item.partyName).filter(Boolean)));

  const saveOutwardEntry = (e) => {
    e.preventDefault();
    const finalParty = (showNewPartyInput || uniqueParties.length === 0) ? outwardNewParty.trim() : outwardParty.trim();
    const bagsCount = parseInt(outwardBags);
    const weightVal = parseFloat(outwardBagWeight);

    if (!finalParty || !outwardColor || !bagsCount || !weightVal) {
      showToast(t('errorFields'), 'error');
      return;
    }

    // Verify Stock levels
    let updatedStock = [...db.stock];
    const stockIdx = updatedStock.findIndex(item => item.color === outwardColor);
    const calculatedTotalKg = bagsCount * weightVal;

    if (stockIdx === -1 || updatedStock[stockIdx].bags < bagsCount) {
      showToast(t('insufficientStock'), 'error');
      return;
    }

    updatedStock[stockIdx].kg -= calculatedTotalKg;
    updatedStock[stockIdx].bags -= bagsCount;

    const newId = "OUT-" + Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      id: newId,
      date: outwardDate,
      partyName: finalParty,
      color: outwardColor,
      bags: bagsCount,
      kgPerBag: weightVal,
      totalKg: calculatedTotalKg
    };

    // Push feed activity
    addActivity('outward', { type: 'outward', bags: bagsCount, color: outwardColor, party: finalParty, kg: calculatedTotalKg });

    setDb(prev => ({
      ...prev,
      outward: [newEntry, ...prev.outward],
      stock: updatedStock
    }));

    setBottomSheet(null);
    showToast(t('successSave'));
    setOutwardParty('');
    setOutwardNewParty('');
    setOutwardColor('');
    setOutwardBags('');
    setShowNewPartyInput(false);
  };

  // Add Employee variables
  const [empName, setEmpName] = useState('');
  const [empFather, setEmpFather] = useState('');
  const [empMother, setEmpMother] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empBlood, setEmpBlood] = useState('O+');
  const [empDob, setEmpDob] = useState('');
  const [empAadhaar, setEmpAadhaar] = useState('');
  const [empPayType, setEmpPayType] = useState('production');
  const [empShift, setEmpShift] = useState('Morning');
  const [empRate, setEmpRate] = useState('');
  const [empJoining, setEmpJoining] = useState(new Date().toISOString().split('T')[0]);
  const [empAddress, setEmpAddress] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!empName.trim() || !empPhone.trim() || !empRate.trim()) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const maskedAadhaar = empAadhaar.trim()
      ? "•••• •••• " + empAadhaar.trim().slice(-4)
      : "•••• •••• 0000";

    const newEmp = {
      id: "EMP-" + Math.floor(100 + Math.random() * 900),
      name: empName,
      fatherName: empFather,
      motherName: empMother,
      phone: empPhone,
      bloodGroup: empBlood,
      dob: empDob,
      aadhaar: maskedAadhaar,
      payType: empPayType,
      shift: empShift,
      rate: parseFloat(empRate),
      joiningDate: empJoining,
      address: empAddress,
      status: 'present',
      photoUrl: photoData || ""
    };

    setDb(prev => ({
      ...prev,
      employees: [...prev.employees, newEmp]
    }));

    setBottomSheet(null);
    showToast(t('successSave'));
    // reset variables
    setEmpName('');
    setEmpFather('');
    setEmpMother('');
    setEmpPhone('');
    setEmpDob('');
    setEmpAadhaar('');
    setEmpRate('');
    setEmpAddress('');
    setPhotoData('');
  };

  // Staff profile edit triggers
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = db.employees.map(emp => {
      if (emp.id === activeEmployeeId) {
        return {
          ...emp,
          name: empName,
          fatherName: empFather,
          motherName: empMother,
          phone: empPhone,
          bloodGroup: empBlood,
          dob: empDob,
          payType: empPayType,
          shift: empShift,
          rate: parseFloat(empRate),
          joiningDate: empJoining,
          address: empAddress,
          photoUrl: photoData || emp.photoUrl
        };
      }
      return emp;
    });

    setDb(prev => ({ ...prev, employees: updatedEmployees }));
    setIsEditingEmployee(false);
    showToast(t('successSave'));
  };

  const startEditEmployee = (emp) => {
    setEmpName(emp.name);
    setEmpFather(emp.fatherName);
    setEmpMother(emp.motherName);
    setEmpPhone(emp.phone);
    setEmpBlood(emp.bloodGroup);
    setEmpDob(emp.dob);
    setEmpPayType(emp.payType);
    setEmpShift(emp.shift);
    setEmpRate(emp.rate.toString());
    setEmpJoining(emp.joiningDate);
    setEmpAddress(emp.address);
    setPhotoData(emp.photoUrl);
    setIsEditingEmployee(true);
  };

  const removeEmployee = () => {
    setConfirmModal({
      visible: true,
      title: t('removeEmployeeQuestion'),
      message: t('confirmDelete'),
      action: () => {
        const remainingEmps = db.employees.filter(emp => emp.id !== activeEmployeeId);
        setDb(prev => ({ ...prev, employees: remainingEmps }));
        navigateTo('staff');
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('employeeRemoved'));
      }
    });
  };

  // Attendance Sheet handling
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceShift, setAttendanceShift] = useState('Morning');
  const [localAttendanceMap, setLocalAttendanceMap] = useState({});

  const loadAttendanceForDate = () => {
    const key = `${attendanceDate}_${attendanceShift}`;
    const saved = db.attendance[key] || {};

    // Seed initial states from current employee roster
    const initialMap = {};
    db.employees.forEach(emp => {
      if (emp.shift === attendanceShift) {
        initialMap[emp.id] = saved[emp.id] || emp.status || 'present';
      }
    });
    setLocalAttendanceMap(initialMap);
  };

  useEffect(() => {
    if (bottomSheet === 'attendance') {
      loadAttendanceForDate();
    }
  }, [bottomSheet, attendanceDate, attendanceShift]);

  const toggleLocalAttendance = (empId, val) => {
    setLocalAttendanceMap(prev => ({
      ...prev,
      [empId]: val
    }));
  };

  const saveAttendanceSheet = () => {
    const key = `${attendanceDate}_${attendanceShift}`;
    const updatedAttendance = {
      ...db.attendance,
      [key]: localAttendanceMap
    };

    // Update employees status flags for today's view in dashboard
    const updatedEmployees = db.employees.map(emp => {
      if (emp.shift === attendanceShift && localAttendanceMap[emp.id]) {
        return { ...emp, status: localAttendanceMap[emp.id] };
      }
      return emp;
    });

    const activeCount = Object.values(localAttendanceMap).filter(val => val === 'present').length;
    const totalCount = Object.keys(localAttendanceMap).length;

    // Push feed activity
    const activityText = `Attendance marked for ${attendanceShift} Shift: ${activeCount}/${totalCount} Present`;
    const newActivity = {
      type: "attendance",
      text: activityText,
      timestamp: "Today " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badge: `${activeCount}/${totalCount} Present`
    };

    setDb(prev => ({
      ...prev,
      attendance: updatedAttendance,
      employees: updatedEmployees,
      activity: [newActivity, ...prev.activity.slice(0, 5)]
    }));

    setBottomSheet(null);
    showToast(t('successSave'));
  };

  // Stock Edit bottom sheet handling
  const [stockEditKg, setStockEditKg] = useState('');
  const [stockEditBags, setStockEditBags] = useState('');
  const [stockEditReason, setStockEditReason] = useState('');

  const openStockEdit = (colorObj) => {
    setSelectedStockColor(colorObj.color);
    setStockEditKg(colorObj.kg.toString());
    setStockEditBags(colorObj.bags.toString());
    setStockEditReason(t('stockAudit'));
    setBottomSheet('edit_stock');
  };

  const saveStockEdit = (isRemove) => {
    let updatedStock = [...db.stock];
    const idx = updatedStock.findIndex(item => item.color === selectedStockColor);

    if (idx === -1) return;

    if (isRemove) {
      updatedStock.splice(idx, 1);
      showToast(t('stockEntryRemoved'));
    } else {
      updatedStock[idx].kg = parseFloat(stockEditKg) || 0;
      updatedStock[idx].bags = parseInt(stockEditBags) || 0;
      showToast(t('successSave'));
    }

    setDb(prev => ({ ...prev, stock: updatedStock }));
    setBottomSheet(null);
  };

  // Weekly Payroll calculation state variables
  const [payrollType, setPayrollType] = useState('production'); // production/shift
  const [localPayrollRates, setLocalPayrollRates] = useState({}); // empId -> rate
  const [localPayrollProduction, setLocalPayrollProduction] = useState({}); // empId -> bags/shifts
  const [localPayrollAdvances, setLocalPayrollAdvances] = useState({}); // empId -> advance deduction

  const loadPayrollGrid = () => {
    const rates = {};
    const production = {};
    const advances = {};

    db.employees.forEach(emp => {
      rates[emp.id] = emp.rate;
      production[emp.id] = emp.payType === 'production' ? 12 : 6; // Mock defaults bags produced or shifts worked
      advances[emp.id] = emp.payType === 'production' ? 150 : 200; // Mock default advance deductions
    });

    setLocalPayrollRates(rates);
    setLocalPayrollProduction(production);
    setLocalPayrollAdvances(advances);
  };

  useEffect(() => {
    loadPayrollGrid();
  }, [db.employees]);

  const handleStartPayroll = () => {
    setConfirmModal({
      visible: true,
      title: t('startPayroll'),
      message: t('confirmPayroll').replace('{week}', getWeekNumber().toString()),
      action: () => {
        // Compile Payroll records into database
        const breakdown = db.employees.map(emp => {
          const rate = localPayrollRates[emp.id] || emp.rate;
          const units = localPayrollProduction[emp.id] || 0;
          const advance = localPayrollAdvances[emp.id] || 0;

          const grossPay = units * rate;
          const netPay = Math.max(0, grossPay - advance);

          return {
            employeeId: emp.id,
            employeeName: emp.name,
            payType: emp.payType,
            rate,
            units,
            grossPay,
            advanceDeduction: advance,
            netPay
          };
        });

        const totalPayableVal = breakdown.reduce((sum, item) => sum + item.netPay, 0);
        const totalAdvancesVal = breakdown.reduce((sum, item) => sum + item.advanceDeduction, 0);

        const runRecord = {
          week: getWeekNumber(),
          month: new Date().toLocaleString(lang === 'en' ? 'en-US' : 'ta-IN', { month: 'long' }),
          totalPayable: totalPayableVal,
          totalAdvances: totalAdvancesVal,
          details: breakdown
        };

        setDb(prev => ({
          ...prev,
          payrollRuns: [runRecord, ...prev.payrollRuns]
        }));

        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('weeklyPayrollGenerated'));
      }
    });
  };

  // Edit single payroll item variables
  const [editPayrollUnits, setEditPayrollUnits] = useState('');
  const [editPayrollRate, setEditPayrollRate] = useState('');
  const [editPayrollAdvance, setEditPayrollAdvance] = useState('');

  const openPayrollItemEdit = (empId) => {
    setSelectedPayrollEmpId(empId);
    setEditPayrollUnits(localPayrollProduction[empId]?.toString() || '0');
    setEditPayrollRate(localPayrollRates[empId]?.toString() || '0');
    setEditPayrollAdvance(localPayrollAdvances[empId]?.toString() || '0');
    setBottomSheet('edit_payroll_item');
  };

  const savePayrollItemEdit = () => {
    setLocalPayrollProduction(prev => ({ ...prev, [selectedPayrollEmpId]: parseFloat(editPayrollUnits) || 0 }));
    setLocalPayrollRates(prev => ({ ...prev, [selectedPayrollEmpId]: parseFloat(editPayrollRate) || 0 }));
    setLocalPayrollAdvances(prev => ({ ...prev, [selectedPayrollEmpId]: parseFloat(editPayrollAdvance) || 0 }));
    setBottomSheet(null);
    showToast(t('successSave'));
  };

  // Reports page state
  const [reportRange, setReportRange] = useState('1week'); // today, 1week, 1month, custom
  const [customFromDate, setCustomFromDate] = useState('');
  const [customToDate, setCustomToDate] = useState('');

  // Settings export
  const exportAllData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TFO_One_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(t('backupExported'));
  };

  // Custom Chart calculation
  const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartDaysTa = ['திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி', 'ஞாயிறு'];

  // Calculate mock or real production data values for 7 days
  const todayDayIndex = (new Date().getDay() + 6) % 7; // Convert Sun=0 to Mon=0, Sun=6
  const getWeeklyProdValues = () => {
    // Generate values based on inward yarn records
    const values = [450, 620, 310, 800, 540, 930, 200];
    // Dynamic replacement of today's inward KG sum
    const todayStr = new Date().toISOString().split('T')[0];
    const todayInwardSum = db.inward
      .filter(item => item.date === todayStr)
      .reduce((sum, item) => sum + item.totalKg, 0);

    if (todayInwardSum > 0) {
      values[todayDayIndex] = Math.round(todayInwardSum);
    }
    return values;
  };

  const weeklyProdValues = getWeeklyProdValues();
  const maxWeeklyProdVal = Math.max(...weeklyProdValues, 100);

  // Stats calculation
  const totalStockKg = db.stock.reduce((sum, item) => sum + item.kg, 0);
  const totalStockBags = db.stock.reduce((sum, item) => sum + item.bags, 0);
  const totalStaffCount = db.employees.length;
  const activeStaffToday = db.employees.filter(emp => emp.status === 'present').length;
  const weeklyWagesSum = db.payrollRuns.length > 0 ? db.payrollRuns[0].totalPayable : 0;
  const productionTodayKg = db.inward
    .filter(item => item.date === new Date().toISOString().split('T')[0])
    .reduce((sum, item) => sum + item.totalKg, 0);

  // Active view router selector
  const activeEmployee = db.employees.find(emp => emp.id === activeEmployeeId);

  // Supplier Ledger summaries
  const supplierDeliveries = {};
  db.inward.forEach(item => {
    if (!supplierDeliveries[item.supplier]) {
      supplierDeliveries[item.supplier] = { count: 0, totalKg: 0 };
    }
    supplierDeliveries[item.supplier].count += 1;
    supplierDeliveries[item.supplier].totalKg += item.totalKg;
  });

  return (
    <div className={`app-container ${lang === 'ta' ? 'tamil-mode' : ''}`}>

      {/* ==========================================
          HEADER SECTION (Visible when logged in)
          ========================================== */}
      {screen !== 'auth' && screen !== 'onboarding' && (
        <header className="app-header">
          <a href="#" className="app-logo" onClick={() => navigateTo('home')}>
            <img src={logo} alt="TFO One" className="logo-image" />
          </a>
          <div className="header-actions">
            {renderCloudStatus()}
            <button className="header-icon-btn" onClick={() => navigateTo('settings')}>
              <i className="ti ti-settings"></i>
            </button>
            <span className="lang-pill" onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}>
              {lang === 'en' ? 'த' : 'EN'}
            </span>
          </div>
        </header>
      )}

      {/* ==========================================
          SCREEN PANELS WIDGET
          ========================================== */}
      <main className="app-content">

        {/* 1. AUTHENTICATION SCREEN */}
        {screen === 'auth' && (
          <div className="auth-wrapper">
            <div className="auth-header">
              <span className="lang-pill" style={{ alignSelf: 'flex-end' }} onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}>
                {lang === 'en' ? 'த' : 'EN'}
              </span>
              <img src={logo} alt="TFO One" className="auth-logo-image" />
              <h1 className="auth-tagline">{t('tagline')}</h1>
              <p className="auth-subtitle">{t('subtitle')}</p>
            </div>

            {dbError === 'table_missing' && (
              <div className="card" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef4444', padding: '20px', borderRadius: '12px', color: '#b91c1c', fontSize: '14px', lineHeight: '1.6', width: '100%', maxWidth: '400px', margin: '0 auto 16px auto', boxSizing: 'border-box' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                  <i className="ti ti-alert-triangle" style={{ fontSize: '20px' }}></i>
                  Database Setup Required
                </h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>
                  The database table <strong>factory_data</strong> does not exist in your Supabase project. To resolve this, run this SQL query in your <strong>Supabase SQL Editor</strong>:
                </p>
                <pre style={{ margin: '0 0 12px 0', padding: '10px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '6px', overflowX: 'auto', fontSize: '11px', textAlign: 'left', maxHeight: '140px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace', color: '#374151', border: '1px solid rgba(0,0,0,0.05)' }}>
                  {`create table public.factory_data (
  id uuid references auth.users not null primary key,
  email text,
  settings jsonb not null default '{}'::jsonb,
  employees jsonb not null default '[]'::jsonb,
  stock jsonb not null default '[]'::jsonb,
  inward jsonb not null default '[]'::jsonb,
  outward jsonb not null default '[]'::jsonb,
  activity jsonb not null default '[]'::jsonb,
  attendance jsonb not null default '{}'::jsonb,
  payroll_runs jsonb not null default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.factory_data enable row level security;

create policy "Users can view own factory data." on public.factory_data for select using (auth.uid() = id);
create policy "Users can update own factory data." on public.factory_data for update using (auth.uid() = id);
create policy "Users can insert own factory data." on public.factory_data for insert with check (auth.uid() = id);`}
                </pre>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="button" className="btn" onClick={() => setDbError(null)} style={{ flex: 1, padding: '8px 12px', fontSize: '13px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                    Dismiss
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleFallbackToLocalDemo} style={{ flex: 1, padding: '8px 12px', fontSize: '13px', backgroundColor: '#d97706', border: 'none', color: '#fff', fontWeight: 'bold' }}>
                    Use Local Demo
                  </button>
                </div>
              </div>
            )}

            <div className="card auth-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', marginBottom: '8px' }}>{t('signInToContinue')}</h2>

              <button className="btn google-btn" onClick={handleGoogleSignIn} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {t('continueWithGoogle')}
              </button>
            </div>

            <p className="auth-subtitle" style={{ fontSize: '12px', textAlign: 'center', marginTop: '24px' }}>
              {t('freeToUse')}
            </p>
          </div>
        )}

        {/* 2. ONBOARDING SCREEN FLOW — 4 steps for new users */}
        {screen === 'onboarding' && (
          <div className="onboarding-wrapper">
            <div className="onboarding-header">
              <button className="btn-back" onClick={handleOnboardingBack}>
                <i className="ti ti-arrow-left"></i>
              </button>
              <div className="progress-container">
                <p className="progress-text">Step {onboardingStep} / 4</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${onboardingStep * 25}%` }}></div>
                </div>
              </div>
            </div>

            <div className="onboarding-body">
              {/* Step 1 — Owner Name */}
              {onboardingStep === 1 && (
                <>
                  <div className="ob-step-icon"><i className="ti ti-user-circle"></i></div>
                  <h2 className="question-title">{t('ownerName')}</h2>
                  <p className="ob-step-hint">Your full name as the factory owner</p>
                  <input
                    type="text"
                    className="large-input"
                    value={obName}
                    onChange={(e) => setObName(e.target.value)}
                    placeholder={t('egGunaSundaram')}
                    autoFocus
                  />
                </>
              )}

              {/* Step 2 — TFO One Name */}
              {onboardingStep === 2 && (
                <>
                  <div className="ob-step-icon"><i className="ti ti-building-factory"></i></div>
                  <h2 className="question-title">{t('factoryName')}</h2>
                  <p className="ob-step-hint">Your TFO / factory business name</p>
                  <input
                    type="text"
                    className="large-input"
                    value={obFactory}
                    onChange={(e) => setObFactory(e.target.value)}
                    placeholder={t('egKonguTfoMills')}
                    autoFocus
                  />
                </>
              )}

              {/* Step 3 — Mobile Number */}
              {onboardingStep === 3 && (
                <>
                  <div className="ob-step-icon"><i className="ti ti-device-mobile"></i></div>
                  <h2 className="question-title">{t('mobileNumber')}</h2>
                  <p className="ob-step-hint">10-digit mobile number (India)</p>
                  <input
                    type="tel"
                    className="large-input"
                    value={obMobile}
                    onChange={(e) => setObMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98432XXXXX"
                    maxLength="10"
                    autoFocus
                  />
                </>
              )}

              {/* Step 4 — Location / Address */}
              {onboardingStep === 4 && (
                <>
                  <div className="ob-step-icon"><i className="ti ti-map-pin"></i></div>
                  <h2 className="question-title">{t('factoryAddress')}</h2>
                  <p className="ob-step-hint">City, State, Pincode of your factory</p>
                  <textarea
                    className="large-input"
                    style={{ fontSize: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px' }}
                    value={obAddress}
                    onChange={(e) => setObAddress(e.target.value)}
                    placeholder={t('addressPlaceholder')}
                    rows="3"
                    autoFocus
                  ></textarea>

                  <div className="card onboarding-summary mt-16">
                    <h3 style={{ fontSize: '15px', color: 'var(--accent-terracotta)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>{t('onboardingSummary')}</h3>
                    <div className="summary-row"><span className="summary-label">{t('ownerName')}:</span><span className="summary-value">{obName}</span></div>
                    <div className="summary-row"><span className="summary-label">{t('factoryName')}:</span><span className="summary-value">{obFactory}</span></div>
                    <div className="summary-row"><span className="summary-label">{t('mobileNumber')}:</span><span className="summary-value">+91 {obMobile}</span></div>
                    <div className="summary-row"><span className="summary-label">{t('factoryAddress')}:</span><span className="summary-value">{obAddress}</span></div>
                  </div>
                </>
              )}
            </div>

            <button className="btn btn-primary mt-16" onClick={handleOnboardingNext}>
              {onboardingStep === 4 ? t('finish') : t('next') + " →"}
            </button>
          </div>
        )}

        {/* 3. HOME DASHBOARD VIEW */}
        {screen === 'home' && (
          <>
            <div className="text-left">
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700' }}>
                {getFormattedDate()} | {t('week')} {getWeekNumber()}
              </p>
              <h1 style={{ fontSize: '24px', margin: '4px 0 0 0' }}>{t('welcome')}</h1>
            </div>

            {/* Stats 2x2 Grid */}
            <div className="grid-2x2">
              <div className="card stat-card" onClick={() => navigateTo('stock')}>
                <span className="stat-label">{t('totalStock')}</span>
                <span className="stat-value">{totalStockKg.toFixed(1)} <span style={{ fontSize: '13px' }}>KG</span></span>
                <span className="stat-delta delta-up">{totalStockBags} Bags</span>
              </div>
              <div className="card stat-card" onClick={() => navigateTo('staff')}>
                <span className="stat-label">{t('employees')}</span>
                <span className="stat-value">{totalStaffCount}</span>
                <span className="stat-delta delta-up">{activeStaffToday} {t('activeToday')}</span>
              </div>
              <div className="card stat-card" onClick={() => navigateTo('payroll')}>
                <span className="stat-label">{t('weeklyPay')}</span>
                <span className="stat-value">₹{weeklyWagesSum}</span>
                <span className="stat-delta delta-down">{db.employees.filter(emp => emp.status === 'absent').length} Absent</span>
              </div>
              <div className="card stat-card" onClick={() => navigateTo('stock')}>
                <span className="stat-label">{t('production')}</span>
                <span className="stat-value">{productionTodayKg.toFixed(1)} <span style={{ fontSize: '13px' }}>KG</span></span>
                <span className="stat-delta delta-up">Today</span>
              </div>
            </div>

            {/* Quick Actions 2x2 */}
            <div className="grid-2x2">
              <div className="action-card" onClick={() => setBottomSheet('inward')}>
                <div className="action-icon"><i className="ti ti-package-import"></i></div>
                <span className="action-title">{t('yarnInward')}</span>
                <span className="action-subtitle">Add Inward</span>
              </div>
              <div className="action-card" onClick={() => setBottomSheet('outward')}>
                <div className="action-icon"><i className="ti ti-package-export"></i></div>
                <span className="action-title">{t('yarnOutward')}</span>
                <span className="action-subtitle">Add Outward</span>
              </div>
              <div className="action-card" onClick={() => setBottomSheet('attendance')}>
                <div className="action-icon"><i className="ti ti-calendar-user"></i></div>
                <span className="action-title">{t('attendance')}</span>
                <span className="action-subtitle">Mark daily roll</span>
              </div>
              <div className="action-card" onClick={() => navigateTo('payroll')}>
                <div className="action-icon"><i className="ti ti-wallet"></i></div>
                <span className="action-title">{t('payroll')}</span>
                <span className="action-subtitle">Calculate wages</span>
              </div>
            </div>

            {/* Production Chart */}
            <div className="card">
              <div className="chart-container">
                <div className="chart-header">
                  <h3 style={{ fontSize: '15px' }}>{t('weeklyProdChart')}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>Today: {weeklyProdValues[todayDayIndex]} KG</span>
                </div>
                <div className="chart-bars">
                  {chartDays.map((day, idx) => {
                    const heightPercent = Math.max(5, (weeklyProdValues[idx] / maxWeeklyProdVal) * 100);
                    const isActive = idx === todayDayIndex;
                    return (
                      <div className="chart-bar-wrapper" key={day}>
                        <div className={`chart-bar-fill ${isActive ? 'active' : ''}`} style={{ height: `${heightPercent}%` }}>
                          <span className="chart-tooltip">{weeklyProdValues[idx]} KG</span>
                        </div>
                        <span className={`chart-day-label ${isActive ? 'active' : ''}`}>{lang === 'en' ? day : chartDaysTa[idx]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="chart-summary-text">
                  Total Production This Week: {weeklyProdValues.reduce((a, b) => a + b, 0)} KG
                </p>
              </div>
            </div>

            {/* Recent Activity feed */}
            <div className="card">
              <h3 style={{ fontSize: '15px', textAlign: 'left', marginBottom: '10px' }}>{t('recentActivity')}</h3>
              <div className="activity-feed">
                {db.activity.map((item, idx) => {
                  let icon = "ti ti-info-circle";
                  let colorClass = "amber";
                  if (item.type === 'inward') { icon = "ti ti-arrow-down-left"; colorClass = "green"; }
                  if (item.type === 'outward') { icon = "ti ti-arrow-up-right"; colorClass = "red"; }
                  if (item.type === 'attendance') { icon = "ti ti-users"; colorClass = "amber"; }

                  // Dynamically translate activity text
                  let activityText = item.text;
                  if (item.data) {
                    if (item.type === 'inward') {
                      activityText = `${t('received')} ${item.data.bags} ${t('bags')} ${item.data.color} ${t('from')} ${item.data.supplier}`;
                    } else if (item.type === 'outward') {
                      activityText = `${t('dispatched')} ${item.data.bags} ${t('bags')} ${item.data.color} ${t('to')} ${item.data.party}`;
                    } else if (item.data.type) {
                      const actionText = item.type.includes('Added') ? t('added') : item.type.includes('Updated') ? t('updated') : t('deleted');
                      activityText = `${t(item.data.type)} ${actionText}: ${item.data.name}`;
                    }
                  }

                  return (
                    <div className="activity-item" key={idx}>
                      <div className="activity-left">
                        <div className={`activity-icon-round ${colorClass}`}>
                          <i className={icon}></i>
                        </div>
                        <div className="text-left" style={{ maxWidth: '240px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '700' }}>{activityText}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.timestamp}</p>
                        </div>
                      </div>
                      <span className={`badge-sync ${colorClass}`} style={{ fontSize: '11px', fontWeight: '800' }}>{item.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 4. STOCK / INVENTORY VIEW */}
        {screen === 'stock' && (
          <StockPage
            db={db}
            t={t}
            lang={lang}
            setBottomSheet={setBottomSheet}
            openStockEdit={openStockEdit}
            totalStockKg={totalStockKg}
            totalStockBags={totalStockBags}
            setDb={setDb}
            showToast={showToast}
            setConfirmModal={setConfirmModal}
            addActivity={addActivity}
          />
        )}

        {/* 5. STAFF / EMPLOYEES VIEW */}
        {screen === 'staff' && (
          <StaffPage
            db={db}
            t={t}
            lang={lang}
            setBottomSheet={setBottomSheet}
            setActiveEmployeeId={setActiveEmployeeId}
            navigateTo={navigateTo}
            totalStaffCount={totalStaffCount}
            activeStaffToday={activeStaffToday}
          />
        )}

        {/* 6. EMPLOYEE PROFILE VIEW */}
        {screen === 'employee_profile' && activeEmployee && (
          <EmployeeProfile
            emp={activeEmployee}
            t={t}
            lang={lang}
            startEditEmployee={startEditEmployee}
            removeEmployee={removeEmployee}
            navigateTo={navigateTo}
            setBottomSheet={setBottomSheet}
            showToast={showToast}
          />
        )}

        {/* 7. PAYROLL VIEW */}
        {screen === 'payroll' && (
          <PayrollPage
            db={db}
            t={t}
            lang={lang}
            payrollType={payrollType}
            setPayrollType={setPayrollType}
            localPayrollRates={localPayrollRates}
            localPayrollProduction={localPayrollProduction}
            localPayrollAdvances={localPayrollAdvances}
            openPayrollItemEdit={openPayrollItemEdit}
            handleStartPayroll={handleStartPayroll}
            getWeekNumber={getWeekNumber}
            showToast={showToast}
          />
        )}

        {/* 8. REPORTS VIEW */}
        {screen === 'reports' && (
          <ReportsPage
            db={db}
            t={t}
            lang={lang}
            reportRange={reportRange}
            setReportRange={setReportRange}
            customFromDate={customFromDate}
            setCustomFromDate={setCustomFromDate}
            customToDate={customToDate}
            setCustomToDate={setCustomToDate}
            supplierDeliveries={supplierDeliveries}
            totalStockKg={totalStockKg}
            totalStockBags={totalStockBags}
            weeklyWagesSum={weeklyWagesSum}
            productionTodayKg={productionTodayKg}
          />
        )}

        {/* 9. SETTINGS VIEW */}
        {screen === 'settings' && (
          <SettingsPage
            db={db}
            setDb={setDb}
            t={t}
            lang={lang}
            setLang={setLang}
            exportAllData={exportAllData}
            showToast={showToast}
            navigateTo={navigateTo}
            setConfirmModal={setConfirmModal}
            handleLogout={handleLogout}
          />
        )}

      </main>

      {/* ==========================================
          BOTTOM NAVIGATION BAR
          ========================================== */}
      {screen !== 'auth' && screen !== 'onboarding' && (
        <nav className="app-bottom-nav">
          <button className={`nav-tab ${screen === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
            <i className="ti ti-home-2"></i>
            <span>{t('home')}</span>
          </button>
          <button className={`nav-tab ${screen === 'stock' ? 'active' : ''}`} onClick={() => navigateTo('stock')}>
            <i className="ti ti-package"></i>
            <span>{t('stock')}</span>
          </button>
          <button className={`nav-tab ${screen === 'staff' || screen === 'employee_profile' ? 'active' : ''}`} onClick={() => navigateTo('staff')}>
            <i className="ti ti-users"></i>
            <span>{t('staff')}</span>
          </button>
          <button className={`nav-tab ${screen === 'payroll' ? 'active' : ''}`} onClick={() => navigateTo('payroll')}>
            <i className="ti ti-currency-rupee"></i>
            <span>{t('payroll')}</span>
          </button>
          <button className={`nav-tab ${screen === 'reports' ? 'active' : ''}`} onClick={() => navigateTo('reports')}>
            <i className="ti ti-chart-bar"></i>
            <span>{t('reports')}</span>
          </button>
        </nav>
      )}

      {/* ==========================================
          BOTTOM SHEET SYSTEM MODALS
          ========================================== */}

      {/* A. Yarn Inward entry Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'inward' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('yarnInward')}</span>
            <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
          </div>
          <form onSubmit={saveInwardEntry} className="text-left">
            <div className="form-group">
              <label>{t('inward')} Date</label>
              <input type="date" value={inwardDate} onChange={(e) => setInwardDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>{t('supplier')}</label>
              {!showNewSupplierInput ? (
                <select value={inwardSupplier} onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') {
                    setShowNewSupplierInput(true);
                  } else {
                    setInwardSupplier(e.target.value);
                  }
                }} required>
                  <option value="">{t('selectSupplier')}</option>
                  {Array.from(new Set(db.inward.map(item => item.supplier).filter(Boolean))).map(supplier => (
                    <option value={supplier} key={supplier}>{supplier}</option>
                  ))}
                  <option value="ADD_NEW">{t('addNewSupplier')}</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder={t('newSupplierName')} value={inwardNewSupplier} onChange={(e) => setInwardNewSupplier(e.target.value)} required />
                  <button type="button" className="btn btn-secondary" style={{ minWidth: '80px' }} onClick={() => setShowNewSupplierInput(false)}>{t('cancel')}</button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>{t('color')}</label>
              <input type="text" value={inwardColor} onChange={(e) => setInwardColor(e.target.value)} placeholder={t('egRoyalBlue')} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('bags')}</label>
                <input type="number" value={inwardBags} onChange={(e) => setInwardBags(e.target.value)} placeholder={t('bagsCount')} required />
              </div>
              <div className="form-group">
                <label>{t('bagWeight')}</label>
                <input type="number" step="0.001" value={inwardBagWeight} onChange={(e) => setInwardBagWeight(e.target.value)} placeholder={t('bagWeightPlaceholder')} required />
              </div>
            </div>

            <div className="form-group">
              <label>{t('autoCalculated')}</label>
              <input type="text" disabled value={((parseInt(inwardBags) || 0) * (parseFloat(inwardBagWeight) || 0)).toFixed(3) + " KG"} style={{ backgroundColor: '#faf6f0', fontWeight: 'bold' }} />
            </div>

            <div className="form-group">
              <label>{t('notes')}</label>
              <textarea value={inwardNotes} onChange={(e) => setInwardNotes(e.target.value)} placeholder="Add any details..."></textarea>
            </div>

            <button type="button" onClick={(e) => {
              e.preventDefault();
              saveInwardEntry(e);
            }} className="btn btn-primary mt-8">{t('saveInward')}</button>
          </form>
        </div>
      </div>

      {/* B. Yarn Outward entry Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'outward' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('yarnOutward')}</span>
            <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
          </div>
          <form onSubmit={saveOutwardEntry} className="text-left">
            <div className="form-group">
              <label>{t('outward')} Date</label>
              <input type="date" value={outwardDate} onChange={(e) => setOutwardDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>{t('partyName')}</label>
              {!showNewPartyInput ? (
                <select value={outwardParty} onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') {
                    setShowNewPartyInput(true);
                    setOutwardParty('');
                  } else {
                    setOutwardParty(e.target.value);
                  }
                }} required>
                  <option value="">{t('selectParty')}</option>
                  {uniqueParties.map(party => (
                    <option value={party} key={party}>{party}</option>
                  ))}
                  <option value="ADD_NEW">{t('addNewParty')}</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder={t('newPartyName')} value={outwardNewParty} onChange={(e) => setOutwardNewParty(e.target.value)} autoFocus required />
                  <button type="button" className="btn btn-secondary" style={{ minWidth: '80px' }} onClick={() => {
                    setShowNewPartyInput(false);
                    setOutwardNewParty('');
                  }}>{t('cancel')}</button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>{t('color')}</label>
              <select value={outwardColor} onChange={(e) => setOutwardColor(e.target.value)} required>
                <option value="">{t('selectStockColor')}</option>
                {db.stock.map(item => (
                  <option value={item.color} key={item.color}>{item.color} ({item.bags} {t('bagsLeft')})</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('bags')}</label>
                <input type="number" value={outwardBags} onChange={(e) => setOutwardBags(e.target.value)} placeholder={t('bagsCount')} required />
              </div>
              <div className="form-group">
                <label>{t('bagWeight')}</label>
                <input type="number" step="0.001" value={outwardBagWeight} onChange={(e) => setOutwardBagWeight(e.target.value)} placeholder={t('bagWeightPlaceholder')} required />
              </div>
            </div>

            <div className="form-group">
              <label>{t('autoCalculated')}</label>
              <input type="text" disabled value={((parseInt(outwardBags) || 0) * (parseFloat(outwardBagWeight) || 0)).toFixed(3) + " KG"} style={{ backgroundColor: '#faf6f0', fontWeight: 'bold' }} />
            </div>

            <button type="button" onClick={(e) => {
              e.preventDefault();
              saveOutwardEntry(e);
            }} className="btn btn-primary mt-8">{t('saveOutward')}</button>
          </form>
        </div>
      </div>

      {/* C. Mark Attendance Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'attendance' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('attendance')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-sync online" style={{ fontWeight: 'bold' }}>
                P: {Object.values(localAttendanceMap).filter(v => v === 'present').length} | A: {Object.values(localAttendanceMap).filter(v => v === 'absent').length}
              </span>
              <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
            </div>
          </div>
          <div className="text-left">
            <div className="form-group">
              <label>Select Date</label>
              <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>{t('shift')}</label>
              <select value={attendanceShift} onChange={(e) => setAttendanceShift(e.target.value)}>
                <option value="Morning">{t('morningShift')}</option>
                <option value="Night">{t('nightShift')}</option>
              </select>
            </div>

            <h3 style={{ fontSize: '13px', margin: '12px 0 6px 0', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('employees')}</h3>
            <div className="staff-attendance-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
              {db.employees.filter(emp => emp.shift === attendanceShift).map(emp => {
                const status = localAttendanceMap[emp.id] || 'present';
                return (
                  <div className="list-row" key={emp.id} style={{ padding: '8px 0' }}>
                    <div className="row-left">
                      <span className="row-title" style={{ fontSize: '14px' }}>{emp.name}</span>
                      <span className="row-subtitle">{emp.id} · {emp.payType === 'production' ? t('ratePerBag') : t('ratePerShift')}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn" style={{ minHeight: '36px', padding: '6px 12px', minWidth: '46px', backgroundColor: status === 'present' ? 'var(--green)' : '#cbd5e1', color: 'white' }} onClick={() => toggleLocalAttendance(emp.id, 'present')}>P</button>
                      <button className="btn" style={{ minHeight: '36px', padding: '6px 12px', minWidth: '46px', backgroundColor: status === 'absent' ? 'var(--red)' : '#cbd5e1', color: 'white' }} onClick={() => toggleLocalAttendance(emp.id, 'absent')}>A</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button type="button" className="btn btn-primary mt-16" onClick={saveAttendanceSheet}>{t('saveAttendance')}</button>
          </div>
        </div>
      </div>

      {/* D. Add Employee Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'add_employee' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('addEmployee')}</span>
            <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
          </div>
          <form onSubmit={handleAddEmployee} className="text-left">

            {/* Live Camera capturing */}
            <div className="form-group">
              <label>Employee Snapshot</label>
              {cameraActive ? (
                <div className="camera-container">
                  <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
                  <div className="camera-controls">
                    <button type="button" className="camera-shutter" onClick={takePhoto}></button>
                  </div>
                </div>
              ) : photoData ? (
                <div style={{ position: 'relative' }}>
                  <img src={photoData} className="photo-preview" alt="Snapshot Preview" />
                  <button type="button" className="btn btn-secondary mt-8" onClick={startCamera}>{t('retakePhoto')}</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button type="button" className="btn btn-secondary" onClick={startCamera}>
                    <i className="ti ti-camera"></i> {t('capturePhoto')}
                  </button>
                  <input type="file" accept="image/*" capture="user" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setPhotoData(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>{t('fullName')}</label>
              <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} placeholder={t('egAnandhaSelvam')} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('fatherName')}</label>
                <input type="text" value={empFather} onChange={(e) => setEmpFather(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('motherName')}</label>
                <input type="text" value={empMother} onChange={(e) => setEmpMother(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('mobileNumber')}</label>
                <input type="tel" value={empPhone} onChange={(e) => setEmpPhone(e.target.value)} placeholder="98765XXXXX" required />
              </div>
              <div className="form-group">
                <label>{t('bloodGroup')}</label>
                <select value={empBlood} onChange={(e) => setEmpBlood(e.target.value)}>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('dob')}</label>
                <input type="date" value={empDob} onChange={(e) => setEmpDob(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('aadhaar')}</label>
                <input type="text" value={empAadhaar} onChange={(e) => setEmpAadhaar(e.target.value)} placeholder={t('twelveDigitAadhaar')} maxLength="12" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('payType')}</label>
                <select value={empPayType} onChange={(e) => setEmpPayType(e.target.value)}>
                  <option value="production">{t('bagProductionPieceRate')}</option>
                  <option value="shift">{t('shiftBasedDailyWages')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('shift')}</label>
                <select value={empShift} onChange={(e) => setEmpShift(e.target.value)}>
                  <option value="Morning">{t('morning')}</option>
                  <option value="Night">{t('night')}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{empPayType === 'production' ? t('ratePerBag') : t('ratePerShift')} (₹)</label>
              <input type="number" value={empRate} onChange={(e) => setEmpRate(e.target.value)} placeholder={t('eg120')} required />
            </div>

            <div className="form-group">
              <label>{t('joiningDate')}</label>
              <input type="date" value={empJoining} onChange={(e) => setEmpJoining(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('address')}</label>
              <textarea value={empAddress} onChange={(e) => setEmpAddress(e.target.value)} rows="2"></textarea>
            </div>

            <div className="form-group">
              <label>{t('uploadDoc')}</label>
              <input type="file" />
            </div>

            <button type="submit" className="btn btn-primary mt-8">{t('addEmployee')}</button>
          </form>
        </div>
      </div>

      {/* E. Edit Stock Ledger Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'edit_stock' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('editStock')}</span>
            <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
          </div>
          <div className="text-left">
            <h3 style={{ fontSize: '15px', color: 'var(--accent-terracotta)', marginBottom: '12px' }}>Colour: {selectedStockColor}</h3>

            <div className="form-group">
              <label>{t('kg')} {t('kgQuantity')}</label>
              <input type="number" step="0.1" value={stockEditKg} onChange={(e) => setStockEditKg(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('bags')} Count</label>
              <input type="number" value={stockEditBags} onChange={(e) => setStockEditBags(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('reasonForChange')}</label>
              <select value={stockEditReason} onChange={(e) => setStockEditReason(e.target.value)}>
                <option value="Stock audit">{t('stockAudit')}</option>
                <option value="Yarn wastage">{t('yarnWastage')}</option>
                <option value="Damaged yarn">{t('damagedYarn')}</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={(e) => {
                e.preventDefault();
                saveStockEdit(false);
              }}>{t('save')}</button>
              <button type="button" className="btn btn-danger" style={{ flex: 1 }} onClick={(e) => {
                e.preventDefault();
                saveStockEdit(true);
              }}>{t('remove')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* F. Edit Single Payroll Item Sheet */}
      <div className={`bottom-sheet-overlay ${bottomSheet === 'edit_payroll_item' ? 'active' : ''}`} onClick={() => setBottomSheet(null)}>
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <span className="bottom-sheet-title">{t('editPayroll')}</span>
            <button className="btn-back" style={{ transform: 'rotate(45deg)' }} onClick={() => setBottomSheet(null)}><i className="ti ti-plus"></i></button>
          </div>
          <div className="text-left">
            <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>
              {db.employees.find(e => e.id === selectedPayrollEmpId)?.name}
            </h3>

            <div className="form-group">
              <label>
                {db.employees.find(e => e.id === selectedPayrollEmpId)?.payType === 'production'
                  ? t('bagsProduced')
                  : "Shifts Worked"}
              </label>
              <input type="number" value={editPayrollUnits} onChange={(e) => setEditPayrollUnits(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('rate')} (₹)</label>
              <input type="number" value={editPayrollRate} onChange={(e) => setEditPayrollRate(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('advanceDeduction')} (₹)</label>
              <input type="number" value={editPayrollAdvance} onChange={(e) => setEditPayrollAdvance(e.target.value)} />
            </div>

            <div className="form-group">
              <label>{t('netPay')} ({t('autoCalculated')})</label>
              <input type="text" disabled style={{ fontWeight: 'bold', backgroundColor: '#faf6f0' }} value={"₹" + Math.max(0, (parseFloat(editPayrollUnits) || 0) * (parseFloat(editPayrollRate) || 0) - (parseFloat(editPayrollAdvance) || 0))} />
            </div>

            <button className="btn btn-primary mt-16" onClick={savePayrollItemEdit}>{t('save')}</button>
          </div>
        </div>
      </div>

      {/* ==========================================
          SYSTEM WIDE OVERLAYS & ALERTS
          ========================================== */}

      {/* 1. Confirm dialog card */}
      <div className={`dialog-overlay ${confirmModal.visible ? 'active' : ''}`}>
        <div className="dialog-card">
          <h3 className="dialog-title">{confirmModal.title}</h3>
          <p className="dialog-message">{confirmModal.message}</p>
          <div className="dialog-buttons">
            <button className="btn btn-secondary" onClick={() => setConfirmModal(prev => ({ ...prev, visible: false }))}>
              {t('cancel')}
            </button>
            <button className="btn btn-primary" onClick={confirmModal.action}>
              {confirmModal.buttonText || t('save')}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Feedback Toast Widget */}
      <div className="toast-container">
        <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}>
          <i className={toast.type === 'success' ? "ti ti-circle-check" : "ti ti-alert-circle"}></i>
          <span>{toast.message}</span>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: STOCK INVENTORY SUBPAGE
// ==========================================
function StockPage({ db, t, lang, setBottomSheet, openStockEdit, totalStockKg, totalStockBags, setDb, showToast, setConfirmModal, addActivity }) {
  const [activeTab, setActiveTab] = useState('stock'); // stock, employees, yarn, inward, outward
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, stocks, employees, yarn
  const [sortBy, setSortBy] = useState('name'); // name, dateCreated, lastUpdated, quantity
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedYarn, setSelectedYarn] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showInwardModal, setShowInwardModal] = useState(false);
  const [showOutwardModal, setShowOutwardModal] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isEditingInward, setIsEditingInward] = useState(false);
  const [isEditingOutward, setIsEditingOutward] = useState(false);
  const [selectedInward, setSelectedInward] = useState(null);
  const [selectedOutward, setSelectedOutward] = useState(null);
  
  // Search suggestions state
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  // Dropdown states
  const [showDropdown, setShowDropdown] = useState(null); // which dropdown is open
  const [dropdownOptions, setDropdownOptions] = useState([]);
  
  // Helper functions for dropdown options
  const getUniqueValues = (field, dataArray) => {
    const values = dataArray.map(item => item[field]).filter(Boolean);
    return [...new Set(values)];
  };
  
  const getStockDropdownOptions = (field) => {
    if (field === 'yarnType') return getUniqueValues('yarnType', db.stock);
    if (field === 'color') return getUniqueValues('color', db.stock);
    if (field === 'supplierName') return getUniqueValues('supplierName', db.stock);
    return [];
  };
  
  const getYarnDropdownOptions = (field) => {
    if (field === 'materialType') return getUniqueValues('materialType', db.yarn);
    if (field === 'color') return getUniqueValues('color', db.yarn);
    return [];
  };
  
  const getEmployeeDropdownOptions = (field) => {
    if (field === 'designation') return getUniqueValues('designation', db.employees).concat(getUniqueValues('payType', db.employees));
    if (field === 'department') return getUniqueValues('department', db.employees);
    return [];
  };
  
  const handleDropdownToggle = (field, source) => {
    let options = [];
    if (source === 'stock') options = getStockDropdownOptions(field);
    else if (source === 'yarn') options = getYarnDropdownOptions(field);
    else if (source === 'employee') options = getEmployeeDropdownOptions(field);
    
    setDropdownOptions(options);
    setShowDropdown(showDropdown === field ? null : field);
  };
  
  const handleDropdownSelect = (field, value) => {
    if (activeTab === 'stock' || showStockModal) {
      setStockForm(prev => ({ ...prev, [field]: value }));
    } else if (activeTab === 'employees' || showEmployeeModal) {
      setEmployeeForm(prev => ({ ...prev, [field]: value }));
    } else if (activeTab === 'yarn' || showYarnModal) {
      setYarnForm(prev => ({ ...prev, [field]: value }));
    }
    setShowDropdown(null);
  };
  
  // Search suggestions
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const suggestions = [];
      const term = value.toLowerCase();
      
      // Get suggestions from all tabs
      db.stock.forEach(item => {
        if (item.stockName?.toLowerCase().includes(term) || item.color?.toLowerCase().includes(term)) {
          suggestions.push({ type: 'stock', name: item.stockName || item.color, id: item.id });
        }
      });
      
      db.employees.forEach(item => {
        if (item.name?.toLowerCase().includes(term) || item.id?.toLowerCase().includes(term)) {
          suggestions.push({ type: 'employee', name: item.name, id: item.id });
        }
      });
      
      
      setSearchSuggestions(suggestions.slice(0, 8));
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSearchSuggestions(false);
    
    // Switch to appropriate tab and select item
    if (suggestion.type === 'stock') {
      setActiveTab('stock');
      const stock = db.stock.find(s => s.id === suggestion.id);
      if (stock) handleStockClick(stock);
    } else if (suggestion.type === 'employee') {
      setActiveTab('employees');
      const emp = db.employees.find(e => e.id === suggestion.id);
      if (emp) handleEmployeeClick(emp);
    }
  };

  // Stock form state
  const [stockForm, setStockForm] = useState({
    stockName: '',
    yarnType: '',
    color: '',
    lotNumber: '',
    numBags: '',
    weightPerBag: '',
    totalWeight: '',
    purchasePrice: '',
    supplierName: '',
    purchaseDate: '',
    notes: ''
  });

  // Employee form state
  const [employeeForm, setEmployeeForm] = useState({
    fullName: '',
    employeeId: '',
    phone: '',
    email: '',
    address: '',
    designation: '',
    department: '',
    joiningDate: '',
    salary: '',
    status: 'Active'
  });

  // Yarn form state
  const [yarnForm, setYarnForm] = useState({
    yarnName: '',
    yarnCode: '',
    color: '',
    gsm: '',
    materialType: '',
    description: ''
  });

  // Inward form state
  const [inwardForm, setInwardForm] = useState({
    id: '',
    date: '',
    supplier: '',
    color: '',
    bags: '',
    kgPerBag: '',
    totalKg: '',
    notes: ''
  });

  // Outward form state
  const [outwardForm, setOutwardForm] = useState({
    id: '',
    date: '',
    partyName: '',
    color: '',
    bags: '',
    kgPerBag: '',
    totalKg: ''
  });

  // Filter and search logic
  const getFilteredItems = () => {
    let items = [];
    
    if (activeTab === 'stock') {
      items = db.stock || [];
    } else if (activeTab === 'employees') {
      items = db.employees || [];
    } else if (activeTab === 'yarn') {
      items = db.yarn || [];
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(item => {
        if (activeTab === 'stock') {
          return (item.stockName?.toLowerCase().includes(term) || 
                  item.color?.toLowerCase().includes(term) ||
                  item.lotNumber?.toLowerCase().includes(term));
        } else if (activeTab === 'employees') {
          return (item.name?.toLowerCase().includes(term) || 
                  item.id?.toLowerCase().includes(term) ||
                  item.designation?.toLowerCase().includes(term));
        } else if (activeTab === 'yarn') {
          return (item.yarnName?.toLowerCase().includes(term) || 
                  item.yarnCode?.toLowerCase().includes(term));
        }
        return false;
      });
    }

    // Apply sorting
    items = [...items].sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = activeTab === 'stock' ? a.stockName : activeTab === 'employees' ? a.name : a.yarnName;
        const nameB = activeTab === 'stock' ? b.stockName : activeTab === 'employees' ? b.name : b.yarnName;
        return nameA?.localeCompare(nameB) || 0;
      } else if (sortBy === 'dateCreated') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (sortBy === 'lastUpdated') {
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      } else if (sortBy === 'quantity') {
        const qtyA = activeTab === 'stock' ? a.kg : activeTab === 'employees' ? 0 : a.availableQuantity;
        const qtyB = activeTab === 'stock' ? b.kg : activeTab === 'employees' ? 0 : b.availableQuantity;
        return qtyB - qtyA;
      }
      return 0;
    });

    return items;
  };

  const filteredItems = getFilteredItems();

  // Stock CRUD operations
  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setStockForm({
      stockName: stock.stockName || '',
      yarnType: stock.yarnType || '',
      color: stock.color || '',
      lotNumber: stock.lotNumber || '',
      numBags: stock.bags?.toString() || '',
      weightPerBag: stock.weightPerBag?.toString() || '',
      totalWeight: stock.kg?.toString() || '',
      purchasePrice: stock.purchasePrice?.toString() || '',
      supplierName: stock.supplierName || '',
      purchaseDate: stock.purchaseDate || '',
      notes: stock.notes || ''
    });
    setIsAddingStock(false);
    setShowStockModal(true);
  };

  const handleAddStock = () => {
    setStockForm({
      stockName: '',
      yarnType: '',
      color: '',
      lotNumber: '',
      numBags: '',
      weightPerBag: '',
      totalWeight: '',
      purchasePrice: '',
      supplierName: '',
      purchaseDate: '',
      notes: ''
    });
    setIsAddingStock(true);
    setShowStockModal(true);
  };

  const saveStock = () => {
    if (!stockForm.stockName || !stockForm.color || !stockForm.numBags) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const newStock = {
      id: isAddingStock ? `STK-${Date.now()}` : selectedStock.id,
      stockName: stockForm.stockName,
      yarnType: stockForm.yarnType,
      color: stockForm.color,
      lotNumber: stockForm.lotNumber,
      bags: parseInt(stockForm.numBags) || 0,
      weightPerBag: parseFloat(stockForm.weightPerBag) || 0,
      kg: parseFloat(stockForm.totalWeight) || (parseInt(stockForm.numBags) || 0) * (parseFloat(stockForm.weightPerBag) || 0),
      purchasePrice: parseFloat(stockForm.purchasePrice) || 0,
      supplierName: stockForm.supplierName,
      purchaseDate: stockForm.purchaseDate,
      notes: stockForm.notes,
      createdAt: isAddingStock ? new Date().toISOString().split('T')[0] : selectedStock.createdAt,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    let updatedStock;
    if (isAddingStock) {
      updatedStock = [...db.stock, newStock];
      addActivity('stockAdded', { type: 'stock', name: newStock.stockName });
    } else {
      updatedStock = db.stock.map(s => s.id === selectedStock.id ? newStock : s);
      addActivity('stockUpdated', { type: 'stock', name: newStock.stockName });
    }

    setDb(prev => ({ ...prev, stock: updatedStock }));
    setShowStockModal(false);
    showToast(t('successSave'));
  };

  const deleteStock = () => {
    setConfirmModal({
      visible: true,
      title: t('deleteStock'),
      message: t('confirmDeleteStock'),
      action: () => {
        const updatedStock = db.stock.filter(s => s.id !== selectedStock.id);
        setDb(prev => ({ ...prev, stock: updatedStock }));
        addActivity('stockDeleted', { type: 'stock', name: selectedStock.stockName });
        setShowStockModal(false);
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('deleteStock') + ' ' + t('successSave').toLowerCase());
      }
    });
  };

  // Employee CRUD operations
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeForm({
      fullName: employee.name || '',
      employeeId: employee.id || '',
      phone: employee.phone || '',
      email: employee.email || '',
      address: employee.address || '',
      designation: employee.designation || employee.payType || '',
      department: employee.department || '',
      joiningDate: employee.joiningDate || '',
      salary: employee.rate?.toString() || '',
      status: employee.status || 'Active'
    });
    setIsAddingEmployee(false);
    setShowEmployeeModal(true);
  };

  const handleAddEmployee = () => {
    setEmployeeForm({
      fullName: '',
      employeeId: '',
      phone: '',
      email: '',
      address: '',
      designation: '',
      department: '',
      joiningDate: '',
      salary: '',
      status: 'Active'
    });
    setIsAddingEmployee(true);
    setShowEmployeeModal(true);
  };

  const saveEmployee = () => {
    if (!employeeForm.fullName || !employeeForm.employeeId) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const newEmployee = {
      id: employeeForm.employeeId,
      name: employeeForm.fullName,
      phone: employeeForm.phone,
      email: employeeForm.email,
      address: employeeForm.address,
      designation: employeeForm.designation,
      department: employeeForm.department,
      joiningDate: employeeForm.joiningDate,
      rate: parseFloat(employeeForm.salary) || 0,
      status: employeeForm.status,
      payType: employeeForm.designation?.toLowerCase().includes('production') ? 'production' : 'shift',
      shift: 'Morning',
      bloodGroup: 'O+',
      fatherName: '',
      motherName: '',
      dob: '',
      aadhaar: '',
      photoUrl: '',
      createdAt: isAddingEmployee ? new Date().toISOString().split('T')[0] : selectedEmployee?.createdAt,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    let updatedEmployees;
    if (isAddingEmployee) {
      updatedEmployees = [...db.employees, newEmployee];
      addActivity('employeeAdded', { type: 'employee', name: newEmployee.name });
    } else {
      updatedEmployees = db.employees.map(e => e.id === selectedEmployee.id ? newEmployee : e);
      addActivity('employeeUpdated', { type: 'employee', name: newEmployee.name });
    }

    setDb(prev => ({ ...prev, employees: updatedEmployees }));
    setShowEmployeeModal(false);
    showToast(t('successSave'));
  };

  const deleteEmployee = () => {
    setConfirmModal({
      visible: true,
      title: t('deleteEmployee'),
      message: t('confirmDeleteEmployee'),
      action: () => {
        const updatedEmployees = db.employees.filter(e => e.id !== selectedEmployee.id);
        setDb(prev => ({ ...prev, employees: updatedEmployees }));
        addActivity('employeeDeleted', { type: 'employee', name: selectedEmployee.name });
        setShowEmployeeModal(false);
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('deleteEmployee') + ' ' + t('successSave').toLowerCase());
      }
    });
  };

  // Yarn CRUD operations
  const handleYarnClick = (yarn) => {
    setSelectedYarn(yarn);
    setYarnForm({
      yarnName: yarn.yarnName || '',
      yarnCode: yarn.yarnCode || '',
      color: yarn.color || '',
      gsm: yarn.gsm?.toString() || '',
      materialType: yarn.materialType || '',
      description: yarn.description || ''
    });
    setIsAddingYarn(false);
    setShowYarnModal(true);
  };

  const handleAddYarn = () => {
    setYarnForm({
      yarnName: '',
      yarnCode: '',
      color: '',
      gsm: '',
      materialType: '',
      description: ''
    });
    setIsAddingYarn(true);
    setShowYarnModal(true);
  };

  const saveYarn = () => {
    if (!yarnForm.yarnName || !yarnForm.yarnCode) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const newYarn = {
      id: isAddingYarn ? `YRN-${Date.now()}` : selectedYarn.id,
      yarnName: yarnForm.yarnName,
      yarnCode: yarnForm.yarnCode,
      color: yarnForm.color,
      gsm: parseInt(yarnForm.gsm) || 0,
      materialType: yarnForm.materialType,
      description: yarnForm.description,
      availableQuantity: selectedYarn?.availableQuantity || 0,
      createdAt: isAddingYarn ? new Date().toISOString().split('T')[0] : selectedYarn.createdAt,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    let updatedYarn;
    if (isAddingYarn) {
      updatedYarn = [...db.yarn, newYarn];
      addActivity('yarnAdded', { type: 'yarn', name: newYarn.yarnName });
    } else {
      updatedYarn = db.yarn.map(y => y.id === selectedYarn.id ? newYarn : y);
      addActivity('yarnUpdated', { type: 'yarn', name: newYarn.yarnName });
    }

    setDb(prev => ({ ...prev, yarn: updatedYarn }));
    setShowYarnModal(false);
    showToast(t('successSave'));
  };

  const deleteYarn = () => {
    setConfirmModal({
      visible: true,
      title: t('deleteYarn'),
      message: t('confirmDeleteYarn'),
      action: () => {
        const updatedYarn = db.yarn.filter(y => y.id !== selectedYarn.id);
        setDb(prev => ({ ...prev, yarn: updatedYarn }));
        addActivity('yarnDeleted', { type: 'yarn', name: selectedYarn.yarnName });
        setShowYarnModal(false);
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('deleteYarn') + ' ' + t('successSave').toLowerCase());
      }
    });
  };

  // Inward CRUD operations
  const handleInwardEdit = (inward) => {
    setSelectedInward(inward);
    setInwardForm({
      id: inward.id,
      date: inward.date,
      supplier: inward.supplier,
      color: inward.color,
      bags: inward.bags?.toString() || '',
      kgPerBag: inward.kgPerBag?.toString() || '',
      totalKg: inward.totalKg?.toString() || '',
      notes: inward.notes || ''
    });
    setIsEditingInward(true);
    setShowInwardModal(true);
  };

  const saveInward = () => {
    if (!inwardForm.supplier || !inwardForm.color || !inwardForm.bags) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const updatedInward = {
      id: inwardForm.id,
      date: inwardForm.date,
      supplier: inwardForm.supplier,
      color: inwardForm.color,
      bags: parseInt(inwardForm.bags) || 0,
      kgPerBag: parseFloat(inwardForm.kgPerBag) || 0,
      totalKg: parseFloat(inwardForm.totalKg) || (parseInt(inwardForm.bags) || 0) * (parseFloat(inwardForm.kgPerBag) || 0),
      notes: inwardForm.notes
    };

    const updatedInwardList = db.inward.map(item => item.id === inwardForm.id ? updatedInward : item);
    setDb(prev => ({ ...prev, inward: updatedInwardList }));
    setShowInwardModal(false);
    showToast(t('successSave'));
  };

  const deleteInward = () => {
    setConfirmModal({
      visible: true,
      title: t('deleteInwardEntry'),
      message: t('confirmDeleteInward'),
      action: () => {
        const updatedInward = db.inward.filter(item => item.id !== selectedInward.id);
        setDb(prev => ({ ...prev, inward: updatedInward }));
        setShowInwardModal(false);
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('inwardEntryDeleted'));
      }
    });
  };

  // Outward CRUD operations
  const handleOutwardEdit = (outward) => {
    setSelectedOutward(outward);
    setOutwardForm({
      id: outward.id,
      date: outward.date,
      partyName: outward.partyName,
      color: outward.color,
      bags: outward.bags?.toString() || '',
      kgPerBag: outward.kgPerBag?.toString() || '',
      totalKg: outward.totalKg?.toString() || ''
    });
    setIsEditingOutward(true);
    setShowOutwardModal(true);
  };

  const saveOutward = () => {
    if (!outwardForm.partyName || !outwardForm.color || !outwardForm.bags) {
      showToast(t('errorFields'), 'error');
      return;
    }

    const updatedOutward = {
      id: outwardForm.id,
      date: outwardForm.date,
      partyName: outwardForm.partyName,
      color: outwardForm.color,
      bags: parseInt(outwardForm.bags) || 0,
      kgPerBag: parseFloat(outwardForm.kgPerBag) || 0,
      totalKg: parseFloat(outwardForm.totalKg) || (parseInt(outwardForm.bags) || 0) * (parseFloat(outwardForm.kgPerBag) || 0)
    };

    const updatedOutwardList = db.outward.map(item => item.id === outwardForm.id ? updatedOutward : item);
    setDb(prev => ({ ...prev, outward: updatedOutwardList }));
    setShowOutwardModal(false);
    showToast(t('successSave'));
  };

  const deleteOutward = () => {
    setConfirmModal({
      visible: true,
      title: t('deleteOutwardEntry'),
      message: t('confirmDeleteOutward'),
      action: () => {
        const updatedOutward = db.outward.filter(item => item.id !== selectedOutward.id);
        setDb(prev => ({ ...prev, outward: updatedOutward }));
        setShowOutwardModal(false);
        setConfirmModal(prev => ({ ...prev, visible: false }));
        showToast(t('outwardEntryDeleted'));
      }
    });
  };

  return (
    <div className="view-panel">
      <div className="flex-row-center">
        <div className="text-left">
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>{t('totalStock')}</span>
          <h1 style={{ fontSize: '24px', margin: '2px 0 0 0' }}>{totalStockKg.toFixed(1)} KG</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>{totalStockBags} Bags in Warehouse</p>
        </div>
        <button className="btn btn-primary" style={{ width: 'auto', minHeight: '36px', padding: '6px 12px' }} onClick={() => {
          if (activeTab === 'stock') handleAddStock();
          else if (activeTab === 'employees') handleAddEmployee();
          else setBottomSheet('inward');
        }}>
          <i className="ti ti-plus"></i> {t('add')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-12" style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => searchTerm.length > 0 && setShowSearchSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
          style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', outline: 'none' }}
        />
        <i className="ti ti-search" style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }}></i>
        
        {/* Search Suggestions Dropdown */}
        {showSearchSuggestions && searchSuggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '4px'
          }}>
            {searchSuggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderBottom: idx < searchSuggestions.length - 1 ? '1px solid var(--border-color)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                <i className={`ti ti-${suggestion.type === 'stock' ? 'package' : suggestion.type === 'employee' ? 'users' : 'socks'}`} style={{ color: 'var(--accent-terracotta)' }}></i>
                <span style={{ fontSize: '13px' }}>{suggestion.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto', textTransform: 'capitalize' }}>{suggestion.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter and Sort */}
      <div className="flex-row-center mt-12" style={{ gap: '8px' }}>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: '600' }}
        >
          <option value="name">{t('sortByName')}</option>
          <option value="dateCreated">{t('sortByDateCreated')}</option>
          <option value="lastUpdated">{t('sortByLastUpdated')}</option>
          <option value="quantity">{t('sortByQuantity')}</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="tabs-header mt-12">
        <button className={`tab-btn ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>{t('stockTab')}</button>
        <button className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>{t('employeesTab')}</button>
        <button className={`tab-btn ${activeTab === 'inward' ? 'active' : ''}`} onClick={() => setActiveTab('inward')}>{t('inward')}</button>
        <button className={`tab-btn ${activeTab === 'outward' ? 'active' : ''}`} onClick={() => setActiveTab('outward')}>{t('outward')}</button>
      </div>

      {/* Stock Tab */}
      {activeTab === 'stock' && (
        <div className="card">
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <i className="ti ti-package" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}></i>
              <p>{t('emptyState')}</p>
            </div>
          ) : (
            <div className="stock-list">
              {filteredItems.map((item) => (
                <div className="list-row" key={item.id} style={{ cursor: 'pointer' }} onClick={() => handleStockClick(item)}>
                  <div className="row-left">
                    <span className="row-title">{item.stockName || item.color}</span>
                    <span className="row-subtitle">{item.bags} bags · {item.yarnType || 'N/A'}</span>
                  </div>
                  <div className="row-right">
                    <span className="row-value">{item.kg.toFixed(2)} KG</span>
                    <button className="pencil-btn" onClick={(e) => { e.stopPropagation(); handleStockClick(item); }}>
                      <i className="ti ti-pencil"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredItems.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <i className="ti ti-users" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}></i>
              <p>{t('emptyState')}</p>
            </div>
          ) : (
            filteredItems.map(emp => (
              <div className="employee-card" key={emp.id} onClick={() => handleEmployeeClick(emp)}>
                <div className="initials-circle">
                  {emp.photoUrl ? <img src={emp.photoUrl} alt={emp.name} /> : emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="emp-details text-left">
                  <span className="emp-name">{emp.name}</span>
                  <span className="emp-role-id">{emp.designation || emp.payType} · {emp.id}</span>
                  <div className="badge-row">
                    <span className="badge badge-shift">{emp.department || 'N/A'}</span>
                    <span className={`badge badge-status ${emp.status === 'present' || emp.status === 'Active' ? 'present' : 'absent'}`}>
                      {emp.status}
                    </span>
                  </div>
                </div>
                <button className="pencil-btn" onClick={(e) => { e.stopPropagation(); handleEmployeeClick(emp); }}>
                  <i className="ti ti-pencil"></i>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Inward Tab */}
      {activeTab === 'inward' && (
        <div className="inward-history">
          {db.inward.map((item, idx) => (
            <div 
              className="history-card" 
              key={idx} 
              onClick={() => handleInwardEdit(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="history-header">
                <span className="history-party">{item.supplier}</span>
                <span className="history-badge inward">{t('inward')}</span>
              </div>
              <div className="history-details">
                <span>{item.color} · {item.bags} bags</span>
                <span style={{ fontWeight: 'bold', color: 'var(--green)' }}>+{item.totalKg.toFixed(2)} KG</span>
              </div>
              <div className="history-details" style={{ fontSize: '10px', marginTop: '4px' }}>
                <span>{item.date}</span>
                <span>{item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Outward Tab */}
      {activeTab === 'outward' && (
        <div className="outward-history">
          {db.outward.map((item, idx) => (
            <div 
              className="history-card" 
              key={idx} 
              onClick={() => handleOutwardEdit(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="history-header">
                <span className="history-party">{item.partyName}</span>
                <span className="history-badge outward">{t('outward')}</span>
              </div>
              <div className="history-details">
                <span>{item.color} · {item.bags} bags</span>
                <span style={{ fontWeight: 'bold', color: 'var(--red)' }}>-{item.totalKg.toFixed(2)} KG</span>
              </div>
              <div className="history-details" style={{ fontSize: '10px', marginTop: '4px' }}>
                <span>{item.date}</span>
                <span>{item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Activity */}
      <div className="card mt-16">
        <h3 style={{ fontSize: '15px', textAlign: 'left', marginBottom: '10px' }}>{t('recentActivity')}</h3>
        <div className="activity-feed">
          {db.activity.slice(0, 5).map((item, idx) => {
            let icon = "ti ti-info-circle";
            let colorClass = "amber";
            if (item.type.includes('stock') || item.type.includes('yarn')) { icon = "ti ti-package"; colorClass = "green"; }
            if (item.type.includes('employee')) { icon = "ti ti-users"; colorClass = "amber"; }
            if (item.type.includes('Deleted')) { colorClass = "red"; }

            // Dynamically translate activity text
            let activityText = item.text;
            if (item.data) {
              if (item.type === 'inward') {
                activityText = `${t('received')} ${item.data.bags} ${t('bags')} ${item.data.color} ${t('from')} ${item.data.supplier}`;
              } else if (item.type === 'outward') {
                activityText = `${t('dispatched')} ${item.data.bags} ${t('bags')} ${item.data.color} ${t('to')} ${item.data.party}`;
              } else if (item.data.type) {
                const actionText = item.type.includes('Added') ? t('added') : item.type.includes('Updated') ? t('updated') : t('deleted');
                activityText = `${t(item.data.type)} ${actionText}: ${item.data.name}`;
              }
            }

            return (
              <div className="activity-item" key={idx}>
                <div className="activity-left">
                  <div className={`activity-icon-round ${colorClass}`}>
                    <i className={icon}></i>
                  </div>
                  <div className="text-left" style={{ maxWidth: '240px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '700' }}>{activityText}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.timestamp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stock Details Modal */}
      {showStockModal && (
        <div className="dialog-overlay active" onClick={() => setShowStockModal(false)}>
          <div className="dialog-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>
              {isAddingStock ? t('add') + ' ' + t('stock') : t('viewDetails')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>{t('stockName')}</label>
                <input type="text" value={stockForm.stockName} onChange={(e) => setStockForm({...stockForm, stockName: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group" style={{ position: 'relative' }}>
                  <label>{t('yarnType')}</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input 
                      type="text" 
                      value={stockForm.yarnType} 
                      onChange={(e) => setStockForm({...stockForm, yarnType: e.target.value})} 
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button"
                      onClick={() => handleDropdownToggle('yarnType', 'stock')}
                      style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                    >
                      <i className="ti ti-chevron-down"></i>
                    </button>
                  </div>
                  {showDropdown === 'yarnType' && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      marginTop: '4px'
                    }}>
                      {dropdownOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleDropdownSelect('yarnType', opt)}
                          style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          {opt}
                        </div>
                      ))}
                      {dropdownOptions.length === 0 && (
                        <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                      )}
                    </div>
                  )}
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                  <label>{t('color')}</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input 
                      type="text" 
                      value={stockForm.color} 
                      onChange={(e) => setStockForm({...stockForm, color: e.target.value})} 
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button"
                      onClick={() => handleDropdownToggle('color', 'stock')}
                      style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                    >
                      <i className="ti ti-chevron-down"></i>
                    </button>
                  </div>
                  {showDropdown === 'color' && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      marginTop: '4px'
                    }}>
                      {dropdownOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleDropdownSelect('color', opt)}
                          style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          {opt}
                        </div>
                      ))}
                      {dropdownOptions.length === 0 && (
                        <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('lotNumber')}</label>
                  <input type="text" value={stockForm.lotNumber} onChange={(e) => setStockForm({...stockForm, lotNumber: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('numBags')}</label>
                  <input type="number" value={stockForm.numBags} onChange={(e) => setStockForm({...stockForm, numBags: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('weightPerBag')}</label>
                  <input type="number" step="0.001" value={stockForm.weightPerBag} onChange={(e) => setStockForm({...stockForm, weightPerBag: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('totalWeight')}</label>
                  <input type="number" step="0.001" value={stockForm.totalWeight} onChange={(e) => setStockForm({...stockForm, totalWeight: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('purchasePrice')}</label>
                  <input type="number" value={stockForm.purchasePrice} onChange={(e) => setStockForm({...stockForm, purchasePrice: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('purchaseDate')}</label>
                  <input type="date" value={stockForm.purchaseDate} onChange={(e) => setStockForm({...stockForm, purchaseDate: e.target.value})} />
                </div>
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>{t('supplierName')}</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input 
                    type="text" 
                    value={stockForm.supplierName} 
                    onChange={(e) => setStockForm({...stockForm, supplierName: e.target.value})} 
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={() => handleDropdownToggle('supplierName', 'stock')}
                    style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                  >
                    <i className="ti ti-chevron-down"></i>
                  </button>
                </div>
                {showDropdown === 'supplierName' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {dropdownOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDropdownSelect('supplierName', opt)}
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {opt}
                      </div>
                    ))}
                    {dropdownOptions.length === 0 && (
                      <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                    )}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>{t('stockNotes')}</label>
                <textarea value={stockForm.notes} onChange={(e) => setStockForm({...stockForm, notes: e.target.value})} rows="3"></textarea>
              </div>
              <div className="dialog-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setShowStockModal(false)}>{t('cancel')}</button>
                {!isAddingStock && (
                  <button type="button" className="btn btn-danger" onClick={deleteStock}>{t('deleteStock')}</button>
                )}
                <button type="button" className="btn btn-primary" onClick={saveStock}>{t('saveStock')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showEmployeeModal && (
        <div className="dialog-overlay active" onClick={() => setShowEmployeeModal(false)}>
          <div className="dialog-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>
              {isAddingEmployee ? t('addEmployee') : t('viewDetails')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>{t('employeeName')}</label>
                <input type="text" value={employeeForm.fullName} onChange={(e) => setEmployeeForm({...employeeForm, fullName: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('employeeId')}</label>
                  <input type="text" value={employeeForm.employeeId} onChange={(e) => setEmployeeForm({...employeeForm, employeeId: e.target.value})} disabled={!isAddingEmployee} />
                </div>
                <div className="form-group">
                  <label>{t('mobileNumber')}</label>
                  <input type="text" value={employeeForm.phone} onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>{t('email')}</label>
                <input type="email" value={employeeForm.email} onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>{t('address')}</label>
                <textarea value={employeeForm.address} onChange={(e) => setEmployeeForm({...employeeForm, address: e.target.value})} rows="2"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group" style={{ position: 'relative' }}>
                  <label>{t('designation')}</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input 
                      type="text" 
                      value={employeeForm.designation} 
                      onChange={(e) => setEmployeeForm({...employeeForm, designation: e.target.value})} 
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button"
                      onClick={() => handleDropdownToggle('designation', 'employee')}
                      style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                    >
                      <i className="ti ti-chevron-down"></i>
                    </button>
                  </div>
                  {showDropdown === 'designation' && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      marginTop: '4px'
                    }}>
                      {dropdownOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleDropdownSelect('designation', opt)}
                          style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          {opt}
                        </div>
                      ))}
                      {dropdownOptions.length === 0 && (
                        <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                      )}
                    </div>
                  )}
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                  <label>{t('department')}</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input 
                      type="text" 
                      value={employeeForm.department} 
                      onChange={(e) => setEmployeeForm({...employeeForm, department: e.target.value})} 
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button"
                      onClick={() => handleDropdownToggle('department', 'employee')}
                      style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                    >
                      <i className="ti ti-chevron-down"></i>
                    </button>
                  </div>
                  {showDropdown === 'department' && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      marginTop: '4px'
                    }}>
                      {dropdownOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleDropdownSelect('department', opt)}
                          style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          {opt}
                        </div>
                      ))}
                      {dropdownOptions.length === 0 && (
                        <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('joiningDate')}</label>
                  <input type="date" value={employeeForm.joiningDate} onChange={(e) => setEmployeeForm({...employeeForm, joiningDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('salary')}</label>
                  <input type="number" value={employeeForm.salary} onChange={(e) => setEmployeeForm({...employeeForm, salary: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>{t('employeeStatus')}</label>
                <select value={employeeForm.status} onChange={(e) => setEmployeeForm({...employeeForm, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="dialog-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEmployeeModal(false)}>{t('cancel')}</button>
                {!isAddingEmployee && (
                  <button type="button" className="btn btn-danger" onClick={deleteEmployee}>{t('deleteEmployee')}</button>
                )}
                <button type="button" className="btn btn-primary" onClick={saveEmployee}>{t('saveEmployee')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inward Edit Modal */}
      {showInwardModal && (
        <div className="dialog-overlay active" onClick={() => setShowInwardModal(false)}>
          <div className="dialog-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Edit Inward Entry</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>ID</label>
                <input type="text" value={inwardForm.id} disabled style={{ backgroundColor: 'var(--bg-cream)' }} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={inwardForm.date} onChange={(e) => setInwardForm({...inwardForm, date: e.target.value})} />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>Supplier</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input 
                    type="text" 
                    value={inwardForm.supplier} 
                    onChange={(e) => setInwardForm({...inwardForm, supplier: e.target.value})} 
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={() => handleDropdownToggle('supplierName', 'stock')}
                    style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                  >
                    <i className="ti ti-chevron-down"></i>
                  </button>
                </div>
                {showDropdown === 'supplierName' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {dropdownOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDropdownSelect('supplier', opt)}
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {opt}
                      </div>
                    ))}
                    {dropdownOptions.length === 0 && (
                      <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                    )}
                  </div>
                )}
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>Color</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input 
                    type="text" 
                    value={inwardForm.color} 
                    onChange={(e) => setInwardForm({...inwardForm, color: e.target.value})} 
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={() => handleDropdownToggle('color', 'stock')}
                    style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                  >
                    <i className="ti ti-chevron-down"></i>
                  </button>
                </div>
                {showDropdown === 'color' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {dropdownOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDropdownSelect('color', opt)}
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {opt}
                      </div>
                    ))}
                    {dropdownOptions.length === 0 && (
                      <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                    )}
                  </div>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bags</label>
                  <input type="number" value={inwardForm.bags} onChange={(e) => setInwardForm({...inwardForm, bags: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>KG Per Bag</label>
                  <input type="number" step="0.001" value={inwardForm.kgPerBag} onChange={(e) => setInwardForm({...inwardForm, kgPerBag: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Total KG</label>
                <input type="number" step="0.001" value={inwardForm.totalKg} onChange={(e) => setInwardForm({...inwardForm, totalKg: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea value={inwardForm.notes} onChange={(e) => setInwardForm({...inwardForm, notes: e.target.value})} rows="3"></textarea>
              </div>
              <div className="dialog-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setShowInwardModal(false)}>{t('cancel')}</button>
                <button type="button" className="btn btn-danger" onClick={deleteInward}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={saveInward}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Outward Edit Modal */}
      {showOutwardModal && (
        <div className="dialog-overlay active" onClick={() => setShowOutwardModal(false)}>
          <div className="dialog-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Edit Outward Entry</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>ID</label>
                <input type="text" value={outwardForm.id} disabled style={{ backgroundColor: 'var(--bg-cream)' }} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={outwardForm.date} onChange={(e) => setOutwardForm({...outwardForm, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Party Name</label>
                <input type="text" value={outwardForm.partyName} onChange={(e) => setOutwardForm({...outwardForm, partyName: e.target.value})} />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>Color</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input 
                    type="text" 
                    value={outwardForm.color} 
                    onChange={(e) => setOutwardForm({...outwardForm, color: e.target.value})} 
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={() => handleDropdownToggle('color', 'stock')}
                    style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-cream)', cursor: 'pointer' }}
                  >
                    <i className="ti ti-chevron-down"></i>
                  </button>
                </div>
                {showDropdown === 'color' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {dropdownOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDropdownSelect('color', opt)}
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-cream)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {opt}
                      </div>
                    ))}
                    {dropdownOptions.length === 0 && (
                      <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>No saved values</div>
                    )}
                  </div>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bags</label>
                  <input type="number" value={outwardForm.bags} onChange={(e) => setOutwardForm({...outwardForm, bags: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>KG Per Bag</label>
                  <input type="number" step="0.001" value={outwardForm.kgPerBag} onChange={(e) => setOutwardForm({...outwardForm, kgPerBag: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Total KG</label>
                <input type="number" step="0.001" value={outwardForm.totalKg} onChange={(e) => setOutwardForm({...outwardForm, totalKg: e.target.value})} />
              </div>
              <div className="dialog-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOutwardModal(false)}>{t('cancel')}</button>
                <button type="button" className="btn btn-danger" onClick={deleteOutward}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={saveOutward}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// COMPONENT: STAFF LIST SUBPAGE
// ==========================================
function StaffPage({ db, t, lang, setBottomSheet, setActiveEmployeeId, navigateTo, totalStaffCount, activeStaffToday }) {
  const [activeTab, setActiveTab] = useState('all'); // all, morning, night
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = db.employees.filter(emp => {
    const matchesTab = activeTab === 'all' || emp.shift.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="view-panel">
      <div className="flex-row-center">
        <div className="text-left">
          <h1 style={{ fontSize: '24px', margin: '0' }}>{t('employees')}</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
            {totalStaffCount} {t('employees')} · {activeStaffToday} {t('activeToday')}
          </p>
        </div>
        <button className="btn btn-primary" style={{ width: 'auto', minHeight: '36px', padding: '6px 12px' }} onClick={() => setBottomSheet('add_employee')}>
          <i className="ti ti-plus"></i> {t('add')}
        </button>
      </div>

      <div className="mt-12" style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder={t('searchEmployeePlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', outline: 'none' }}
        />
        <i className="ti ti-search" style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }}></i>
      </div>

      <div className="tabs-header mt-12">
        <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{t('all')}</button>
        <button className={`tab-btn ${activeTab === 'morning' ? 'active' : ''}`} onClick={() => setActiveTab('morning')}>{t('morning')}</button>
        <button className={`tab-btn ${activeTab === 'night' ? 'active' : ''}`} onClick={() => setActiveTab('night')}>{t('night')}</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredEmployees.map(emp => (
          <div className="employee-card" key={emp.id} onClick={() => {
            setActiveEmployeeId(emp.id);
            navigateTo('employee_profile');
          }}>
            <div className="initials-circle">
              {emp.photoUrl ? <img src={emp.photoUrl} alt={emp.name} /> : emp.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="emp-details text-left">
              <span className="emp-name">{emp.name}</span>
              <span className="emp-role-id">{emp.payType === 'production' ? "Production" : "Shift Rate"} · {emp.id}</span>
              <div className="badge-row">
                <span className="badge badge-shift">{emp.shift}</span>
                <span className="badge badge-blood">{emp.bloodGroup}</span>
              </div>
            </div>

            <span className={`badge-status ${emp.status === 'present' ? 'present' : 'absent'}`}>
              {emp.status === 'present' ? 'Present' : 'Absent'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: STAFF PROFILE SUBPAGE
// ==========================================
function EmployeeProfile({ emp, t, lang, startEditEmployee, removeEmployee, navigateTo, setBottomSheet, showToast }) {
  const [isEditing, setIsEditing] = useState(false);

  // Local edit variables
  const [name, setName] = useState(emp.name);
  const [phone, setPhone] = useState(emp.phone);
  const [blood, setBlood] = useState(emp.bloodGroup);
  const [address, setAddress] = useState(emp.address);
  const [rate, setRate] = useState(emp.rate);
  const [shift, setShift] = useState(emp.shift);

  return (
    <div className="view-panel" style={{ margin: '-16px' }}>
      <div className="profile-header">
        <button className="profile-action-btn" style={{ position: 'absolute', top: '16px', left: '16px' }} onClick={() => navigateTo('staff')}>
          <i className="ti ti-arrow-left"></i>
        </button>

        <div className="profile-actions-top">
          <button className="profile-action-btn" onClick={() => { startEditEmployee(emp); setIsEditing(true); }}><i className="ti ti-pencil"></i></button>
          <button className="profile-action-btn" onClick={removeEmployee} style={{ backgroundColor: 'var(--red)' }}><i className="ti ti-trash"></i></button>
        </div>

        <div className="initials-circle">
          {emp.photoUrl ? <img src={emp.photoUrl} alt={emp.name} /> : emp.name.split(' ').map(n => n[0]).join('')}
        </div>

        <h2 style={{ fontSize: '20px', margin: '4px 0 0 0' }}>{emp.name}</h2>
        <p style={{ fontSize: '13px', opacity: 0.8 }}>ID: {emp.id}</p>

        <div className="badge-row">
          <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>{emp.shift}</span>
          <span className="badge badge-blood">{emp.bloodGroup}</span>
          <span className={`badge-status ${emp.status === 'present' ? 'present' : 'absent'}`}>{emp.status === 'present' ? 'Present' : 'Absent'}</span>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flex: '1', flexDirection: 'column', gap: '16px' }}>

        {/* Personal Details */}
        <div className="card text-left">
          <h3 style={{ fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--accent-terracotta)' }}>{t('personalDetails')}</h3>
          <div className="profile-info-row"><span className="summary-label">{t('mobileNumber')}</span><span className="summary-value">{emp.phone}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('aadhaar')}</span><span className="summary-value">{emp.aadhaar}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('dob')}</span><span className="summary-value">{emp.dob || "1994-08-12"}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('joiningDate')}</span><span className="summary-value">{emp.joiningDate}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('address')}</span><span className="summary-value">{emp.address}</span></div>
        </div>

        {/* Salary details */}
        <div className="card text-left">
          <h3 style={{ fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--accent-terracotta)' }}>{t('salaryInfo')}</h3>
          <div className="profile-info-row"><span className="summary-label">{t('payType')}</span><span className="summary-value" style={{ textTransform: 'capitalize' }}>{emp.payType === 'production' ? t('pieceRateBags') : t('dailyWages')}</span></div>
          <div className="profile-info-row"><span className="summary-label">{emp.payType === 'production' ? t('ratePerBag') : t('ratePerShift')}</span><span className="summary-value">₹{emp.rate}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('advanceDeduction')}</span><span className="summary-value">₹150</span></div>
        </div>

        {/* Weekly Attendance 7 days grid */}
        <div className="card text-left">
          <div className="flex-row-center" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--accent-terracotta)' }}>{t('thisWeekAttendance')}</h3>
            <button className="btn-text" style={{ padding: '0', minHeight: 'auto' }} onClick={() => setBottomSheet('attendance')}>{t('save')}</button>
          </div>
          <div className="attendance-grid">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
              const isPresent = idx !== 2; // Mock Wednesday holiday or absent
              return (
                <div className="grid-day" key={idx}>
                  <span className="day-label">{day}</span>
                  <div className={`day-indicator ${isPresent ? 'present' : 'absent'}`}>
                    {isPresent ? 'P' : 'A'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Family info */}
        <div className="card text-left">
          <h3 style={{ fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--accent-terracotta)' }}>{t('familyInfo')}</h3>
          <div className="profile-info-row"><span className="summary-label">{t('fatherName')}</span><span className="summary-value">{emp.fatherName || "Ramasamy"}</span></div>
          <div className="profile-info-row"><span className="summary-label">{t('motherName')}</span><span className="summary-value">{emp.motherName || "Palaniammal"}</span></div>
        </div>

        {/* Mark Roll CTA */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setBottomSheet('attendance')}>
            <i className="ti ti-calendar-user"></i> {t('markAttendance')}
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { showToast(t('wagesCalculated')); navigateTo('payroll'); }}>
            <i className="ti ti-wallet"></i> {t('paySalary')}
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: PAYROLL WAGES SUBPAGE
// ==========================================
function PayrollPage({ db, t, lang, payrollType, setPayrollType, localPayrollRates, localPayrollProduction, localPayrollAdvances, openPayrollItemEdit, handleStartPayroll, getWeekNumber, showToast }) {

  // Calculate aggregated totals based on input rates
  const calculateAggregateTotals = () => {
    let grossTotal = 0;
    let advanceTotal = 0;
    let netTotal = 0;

    db.employees.forEach(emp => {
      const rate = localPayrollRates[emp.id] || emp.rate;
      const units = localPayrollProduction[emp.id] || 0;
      const adv = localPayrollAdvances[emp.id] || 0;

      const gross = units * rate;
      const net = Math.max(0, gross - adv);

      grossTotal += gross;
      advanceTotal += adv;
      netTotal += net;
    });

    return { grossTotal, advanceTotal, netTotal };
  };

  const totals = calculateAggregateTotals();

  return (
    <div className="view-panel">
      <div className="text-left">
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>{t('payroll')} | Week {getWeekNumber()}</span>
        <h1 style={{ fontSize: '24px', margin: '2px 0 0 0' }}>₹{totals.netTotal.toFixed(2)}</h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>Wages payable to staff</p>
      </div>

      {/* Summary box */}
      <div className="card grid-2x2 text-left">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="stat-label">{t('payable')}</span>
          <span className="stat-value" style={{ fontSize: '18px' }}>₹{totals.netTotal}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="stat-label">{t('advances')}</span>
          <span className="stat-value" style={{ fontSize: '18px' }}>₹{totals.advanceTotal}</span>
        </div>
      </div>

      <div className="tabs-header mt-8">
        <button className={`tab-btn ${payrollType === 'production' ? 'active' : ''}`} onClick={() => setPayrollType('production')}>{t('bagProduction')}</button>
        <button className={`tab-btn ${payrollType === 'shift' ? 'active' : ''}`} onClick={() => setPayrollType('shift')}>{t('shiftWise')}</button>
      </div>

      <div className="card text-left" style={{ border: '1px dashed var(--accent-terracotta)', backgroundColor: 'rgba(27, 43, 107, 0.04)' }}>
        <h3 style={{ fontSize: '14px', color: 'var(--accent-terracotta)' }}>{t('startPayroll')}</h3>
        <p style={{ fontSize: '12px', margin: '4px 0 8px 0', fontWeight: '600' }}>{t('compileActiveRecords')}</p>
        <button className="btn btn-primary" style={{ padding: '8px 12px', minHeight: '36px', width: 'auto' }} onClick={handleStartPayroll}>{t('runWeeklyLedger')}</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="mt-8">
        {db.employees.map(emp => {
          const rate = localPayrollRates[emp.id] || emp.rate;
          const units = localPayrollProduction[emp.id] || 0;
          const adv = localPayrollAdvances[emp.id] || 0;
          const gross = units * rate;
          const net = Math.max(0, gross - adv);

          return (
            <div className="payroll-item-card text-left" key={emp.id} onClick={() => openPayrollItemEdit(emp.id)}>
              <div className="flex-row-center">
                <span className="row-title" style={{ fontSize: '15px' }}>{emp.name}</span>
                <span className="row-value" style={{ color: 'var(--accent-terracotta)' }}>₹{net}</span>
              </div>
              <div className="payroll-row-summary">
                <span>{units} units × ₹{rate}</span>
                <span>Adv: -₹{adv}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Tap to edit</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px' }} className="mt-16">
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { window.print(); }}>
          <i className="ti ti-printer"></i> Print Statement
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { showToast(t('pdfDownloaded')); window.print(); }}>
          <i className="ti ti-download"></i> {t('downloadPDF')}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: REPORTS GENERATOR SUBPAGE
// ==========================================
function ReportsPage({ db, t, lang, reportRange, setReportRange, customFromDate, setCustomFromDate, customToDate, setCustomToDate, supplierDeliveries, totalStockKg, totalStockBags, weeklyWagesSum, productionTodayKg }) {

  return (
    <div className="view-panel">
      <div className="flex-row-center">
        <div className="text-left">
          <h1 style={{ fontSize: '24px', margin: '0' }}>{t('reports')}</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>Download statistics ledger statements</p>
        </div>
        <button className="btn btn-primary" style={{ width: 'auto', minHeight: '36px', padding: '6px 12px' }} onClick={() => window.print()}>
          <i className="ti ti-printer"></i> PDF
        </button>
      </div>

      {/* Date Range selectors */}
      <div className="card text-left">
        <span className="stat-label">Select Date Scope</span>
        <div className="tabs-header mt-8" style={{ borderBottom: 'none' }}>
          <button className={`tab-btn ${reportRange === 'today' ? 'active' : ''}`} style={{ fontSize: '12px', padding: '6px 2px' }} onClick={() => setReportRange('today')}>{t('today')}</button>
          <button className={`tab-btn ${reportRange === '1week' ? 'active' : ''}`} style={{ fontSize: '12px', padding: '6px 2px' }} onClick={() => setReportRange('1week')}>1 Week</button>
          <button className={`tab-btn ${reportRange === '1month' ? 'active' : ''}`} style={{ fontSize: '12px', padding: '6px 2px' }} onClick={() => setReportRange('1month')}>1 Month</button>
          <button className={`tab-btn ${reportRange === 'custom' ? 'active' : ''}`} style={{ fontSize: '12px', padding: '6px 2px' }} onClick={() => setReportRange('custom')}>{t('customDate')}</button>
        </div>

        {reportRange === 'custom' && (
          <div className="form-row mt-12">
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>From</label>
              <input type="date" value={customFromDate} onChange={(e) => setCustomFromDate(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>To</label>
              <input type="date" value={customToDate} onChange={(e) => setCustomToDate(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Main reports categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="mt-8">
        <div className="report-card text-left" onClick={() => window.print()}>
          <div className="report-left">
            <div className="report-icon"><i className="ti ti-package"></i></div>
            <div className="report-details">
              <span className="report-title">{t('stockReport')}</span>
              <span className="report-subtitle">Current stock details ({totalStockKg.toFixed(1)} KG)</span>
            </div>
          </div>
          <span className="badge-sync online">PDF</span>
        </div>

        <div className="report-card text-left" onClick={() => window.print()}>
          <div className="report-left">
            <div className="report-icon"><i className="ti ti-cash"></i></div>
            <div className="report-details">
              <span className="report-title">{t('payrollReport')}</span>
              <span className="report-subtitle">Staff wages breakdown (Week total: ₹{weeklyWagesSum})</span>
            </div>
          </div>
          <span className="badge-sync online">PDF</span>
        </div>

        <div className="report-card text-left" onClick={() => window.print()}>
          <div className="report-left">
            <div className="report-icon"><i className="ti ti-users"></i></div>
            <div className="report-details">
              <span className="report-title">{t('employeeReport')}</span>
              <span className="report-subtitle">Attendance lists & roll sheets history</span>
            </div>
          </div>
          <span className="badge-sync online">PDF</span>
        </div>

        <div className="report-card text-left" onClick={() => window.print()}>
          <div className="report-left">
            <div className="report-icon"><i className="ti ti-chart-arrows"></i></div>
            <div className="report-details">
              <span className="report-title">{t('prodSummaryReport')}</span>
              <span className="report-subtitle">Production inward/outward flow (Today: {productionTodayKg} KG)</span>
            </div>
          </div>
          <span className="badge-sync online">PDF</span>
        </div>
      </div>

      {/* Supplier Section summary */}
      <div className="card text-left mt-8">
        <h3 style={{ fontSize: '15px', color: 'var(--accent-terracotta)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>{t('suppliersSection')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="mt-12">
          {Object.entries(supplierDeliveries).map(([name, obj]) => (
            <div className="list-row" key={name}>
              <div className="row-left">
                <span className="row-title">{name}</span>
                <span className="row-subtitle">{obj.count} deliveries made</span>
              </div>
              <span className="row-value">{obj.totalKg.toFixed(2)} KG</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: SETTINGS DASHBOARD SUBPAGE
// ==========================================
function SettingsPage({ db, setDb, t, lang, setLang, exportAllData, showToast, navigateTo, setConfirmModal, handleLogout }) {
  // WhatsApp settings variables, persisting directly to db.settings
  const waAlerts = db.settings.whatsappAlerts !== undefined ? db.settings.whatsappAlerts : true;
  const smsAlerts = db.settings.smsAlerts !== undefined ? db.settings.smsAlerts : false;
  const payReminders = db.settings.payrollReminders !== undefined ? db.settings.payrollReminders : true;

  // Accordion section state
  const [expandedSection, setExpandedSection] = useState(null); // 'factory', 'notifications', 'language', 'data'

  // Edit factory details state
  const [facName, setFacName] = useState(db.settings.factoryName);
  const [facOwner, setFacOwner] = useState(db.settings.ownerName);
  const [facAddress, setFacAddress] = useState(db.settings.address || '');
  const [facPhone, setFacPhone] = useState(db.settings.phone);
  const [facLocation, setFacLocation] = useState(db.settings.location || '');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast(t('locationError'), 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setFacLocation(locationString);
        showToast(t('successSave'));
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (error.code === 1) {
          showToast(t('locationPermission'), 'error');
        } else {
          showToast(t('locationError'), 'error');
        }
      }
    );
  };

  const saveSettings = (e) => {
    e.preventDefault();
    setDb(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        factoryName: facName,
        ownerName: facOwner,
        address: facAddress,
        phone: facPhone,
        location: facLocation
      }
    }));
    showToast(t('successSave'));
  };

  const handleToggleNotification = (key, currentVal) => {
    setDb(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !currentVal
      }
    }));
    showToast(t('successSave'));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDb(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            logo: reader.result
          }
        }));
        showToast(t('logoUploaded'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setDb(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        logo: ""
      }
    }));
    showToast(t('logoRemoved'));
  };

  const handleLangChange = (selectedLang) => {
    setLang(selectedLang);
    showToast(selectedLang === 'en' ? t('languageChanged') : t('languageChangedTamil'));
  };

  // Location string helper
  const location = db.settings.address
    ? db.settings.address.split(',')
      .map(s => s.trim())
      .filter(s => s && !/^\d+$/.test(s) && !s.toLowerCase().includes('tamil'))
      .pop() || db.settings.address
    : 'Palladam';

  const toggleSection = (sectionName) => {
    setExpandedSection(prev => prev === sectionName ? null : sectionName);
  };

  return (
    <div className="view-panel text-left" style={{ gap: '16px' }}>

      {/* Profile summary row at top */}
      <div className="settings-profile-card">
        <div className="settings-profile-avatar">
          {db.settings.logo ? (
            <img src={db.settings.logo} alt={db.settings.factoryName} />
          ) : (
            db.settings.factoryName ? db.settings.factoryName.split(' ').map(n => n[0]).join('') : 'F'
          )}
        </div>
        <div className="settings-profile-info">
          <h2 className="settings-profile-owner">{db.settings.factoryName || t('factory')}</h2>
          {db.settings.email && (
            <p className="settings-profile-email" style={{ fontSize: '13px', opacity: 0.7, margin: '2px 0 4px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <i className="ti ti-mail" style={{ fontSize: '14px' }}></i>
              {db.settings.email}
            </p>
          )}
          <p className="settings-profile-mobile">+91 {db.settings.phone}</p>
          <div className="settings-profile-factory-row">
            <i className="ti ti-building-factory-2"></i>
            <span className="settings-profile-factory">{db.settings.factoryName}</span>
            <span className="settings-profile-dot">·</span>
            <span className="settings-profile-location">{location}</span>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="settings-accordion">

        {/* Section 1: Factory Settings */}
        <div className={`settings-accordion-item ${expandedSection === 'factory' ? 'active' : ''}`}>
          <div className="settings-accordion-header" onClick={() => toggleSection('factory')}>
            <div className="settings-accordion-title-left">
              <i className="ti ti-building-factory-2 section-icon"></i>
              <span>{t('factorySettings')}</span>
            </div>
            <i className={`ti ti-chevron-right chevron ${expandedSection === 'factory' ? 'rotate' : ''}`}></i>
          </div>
          {expandedSection === 'factory' && (
            <div className="settings-accordion-content text-left">
              <form onSubmit={saveSettings} style={{ marginTop: '12px' }}>
                <div className="form-group">
                  <label>{t('factoryNameLabel')}</label>
                  <input type="text" value={facName} onChange={(e) => setFacName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('ownerNameLabel')}</label>
                  <input type="text" value={facOwner} onChange={(e) => setFacOwner(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('factoryAddressLabel')}</label>
                  <input type="text" value={facAddress} onChange={(e) => setFacAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('phoneContact')}</label>
                  <input type="tel" value={facPhone} onChange={(e) => setFacPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('currentLocation')}</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      value={facLocation} 
                      onChange={(e) => setFacLocation(e.target.value)} 
                      placeholder={t('coordinates')}
                      readOnly
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handleGetCurrentLocation}
                      style={{ width: 'auto', minHeight: '36px', padding: '6px 12px' }}
                    >
                      <i className="ti ti-map-pin"></i> {t('getLocation')}
                    </button>
                  </div>
                </div>

                {/* Logo Upload inside Factory Settings */}
                <div className="form-group">
                  <label>{t('factoryLogo')}</label>
                  <div className="logo-upload-container">
                    {db.settings.logo ? (
                      <div className="logo-preview-row">
                        <img src={db.settings.logo} className="logo-preview-img" alt="Logo Preview" />
                        <div className="logo-actions">
                          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{t('logoActive')}</span>
                          <button type="button" className="logo-action-btn-small danger" onClick={handleRemoveLogo}>
                            {t('removeLogo')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input type="file" accept="image/*" id="logo-file-input" style={{ display: 'none' }} onChange={handleLogoUpload} />
                        <button type="button" className="btn btn-secondary" style={{ width: 'auto', minHeight: '36px', padding: '6px 12px' }} onClick={() => document.getElementById('logo-file-input').click()}>
                          <i className="ti ti-upload"></i> {t('uploadLogo')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-8">{t('save')}</button>
              </form>
            </div>
          )}
        </div>

        {/* Section 2: Notifications */}
        <div className={`settings-accordion-item ${expandedSection === 'notifications' ? 'active' : ''}`}>
          <div className="settings-accordion-header" onClick={() => toggleSection('notifications')}>
            <div className="settings-accordion-title-left">
              <i className="ti ti-bell section-icon"></i>
              <span>{t('notifications')}</span>
            </div>
            <i className={`ti ti-chevron-right chevron ${expandedSection === 'notifications' ? 'rotate' : ''}`}></i>
          </div>
          {expandedSection === 'notifications' && (
            <div className="settings-accordion-content">
              <div className="toggle-settings-list">
                <div className="toggle-settings-row">
                  <div className="toggle-settings-label">
                    <span className="toggle-title">{t('whatsappAlerts')}</span>
                    <span className="toggle-desc">{t('whatsappAlertDesc')}</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={waAlerts} onChange={() => handleToggleNotification('whatsappAlerts', waAlerts)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-settings-row">
                  <div className="toggle-settings-label">
                    <span className="toggle-title">{t('smsAlerts')}</span>
                    <span className="toggle-desc">{t('smsAlertDescAttendance')}</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={smsAlerts} onChange={() => handleToggleNotification('smsAlerts', smsAlerts)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-settings-row">
                  <div className="toggle-settings-label">
                    <span className="toggle-title">{t('reminders')}</span>
                    <span className="toggle-desc">{t('remindersDesc')}</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={payReminders} onChange={() => handleToggleNotification('payrollReminders', payReminders)} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Language */}
        <div className={`settings-accordion-item ${expandedSection === 'language' ? 'active' : ''}`}>
          <div className="settings-accordion-header" onClick={() => toggleSection('language')}>
            <div className="settings-accordion-title-left">
              <i className="ti ti-language section-icon"></i>
              <span>{t('languageSelection')}</span>
            </div>
            <i className={`ti ti-chevron-right chevron ${expandedSection === 'language' ? 'rotate' : ''}`}></i>
          </div>
          {expandedSection === 'language' && (
            <div className="settings-accordion-content">
              <div className="radio-group">
                <div className={`radio-row ${lang === 'en' ? 'active' : ''}`} onClick={() => handleLangChange('en')}>
                  <div className="radio-dot-outer">
                    {lang === 'en' && <div className="radio-dot-inner"></div>}
                  </div>
                  <span className="radio-label">English</span>
                </div>
                <div className={`radio-row ${lang === 'ta' ? 'active' : ''}`} onClick={() => handleLangChange('ta')}>
                  <div className="radio-dot-outer">
                    {lang === 'ta' && <div className="radio-dot-inner"></div>}
                  </div>
                  <span className="radio-label">தமிழ் (Tamil)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Data & Backup */}
        <div className={`settings-accordion-item ${expandedSection === 'data' ? 'active' : ''}`}>
          <div className="settings-accordion-header" onClick={() => toggleSection('data')}>
            <div className="settings-accordion-title-left">
              <i className="ti ti-database section-icon"></i>
              <span>{t('dataAndBackup')}</span>
            </div>
            <i className={`ti ti-chevron-right chevron ${expandedSection === 'data' ? 'rotate' : ''}`}></i>
          </div>
          {expandedSection === 'data' && (
            <div className="settings-accordion-content">
              <div className="data-actions-list">
                <div className="data-action-row" onClick={() => { showToast(t('databaseSynced')); }}>
                  <div className="data-action-left">
                    <i className="ti ti-cloud-upload"></i>
                    <div className="data-action-text">
                      <span className="data-action-title">{t('syncNow')}</span>
                      <span className="data-action-desc">Cloud Sync Status: Active</span>
                    </div>
                  </div>
                  <span className="badge-sync online" style={{ minHeight: 'auto' }}>{t('synced')}</span>
                </div>

                <div className="data-action-row" onClick={exportAllData}>
                  <div className="data-action-left">
                    <i className="ti ti-file-export"></i>
                    <div className="data-action-text">
                      <span className="data-action-title">{t('exportData')}</span>
                      <span className="data-action-desc">Download complete database as JSON file</span>
                    </div>
                  </div>
                  <i className="ti ti-chevron-right"></i>
                </div>

                <div className="data-action-row" onClick={() => window.print()}>
                  <div className="data-action-left">
                    <i className="ti ti-file-text"></i>
                    <div className="data-action-text">
                      <span className="data-action-title">Download PDF Backup</span>
                      <span className="data-action-desc">Generate PDF report of current ledger statements</span>
                    </div>
                  </div>
                  <i className="ti ti-chevron-right"></i>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Logout red row card */}
      <div className="card settings-logout-card" onClick={() => {
        setConfirmModal({
          visible: true,
          title: t('logout'),
          message: t('confirmLogout'),
          buttonText: t('confirmLogoutButton'),
          action: () => {
            handleLogout();
            setConfirmModal(prev => ({ ...prev, visible: false }));
          }
        });
      }}>
        <div className="settings-row-logout">
          <i className="ti ti-logout"></i>
          <span>{t('logout')}</span>
        </div>
      </div>

      {/* Version Footer */}
      <p className="text-center mt-16 settings-version-footer">
        TFO One v1.1.0 · PWA Ready
      </p>

    </div>
  );
}
