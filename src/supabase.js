import { createClient } from '@supabase/supabase-js';
import { Browser } from '@capacitor/browser';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '';
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'supabase-auth',
        flowType: 'pkce',
      }
    })
  : null;

// ============================================
// AUTH HELPERS
// ============================================
export const signUpUser = async (email, password) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signUp({ email, password });
};

export const signInUser = async (email, password) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signInWithGoogle = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        prompt: 'select_account',
        access_type: 'offline'
      }
    }
  });
  if (error) throw error;
  return data;
};

export const signInWithGoogleNative = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'com.yourcompany.tfoone://auth-callback',
      skipBrowserRedirect: true
    }
  });
  if (error) throw error;
  if (data?.url) {
    await Browser.open({ url: data.url });
  }
};

export const signOutUser = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signOut();
};

// ============================================
// PROFILE HELPERS
// ============================================
export const getProfile = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ============================================
// FACTORY SETTINGS HELPERS
// ============================================
export const getFactorySettings = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('factory_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const upsertFactorySettings = async (userId, settings) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('factory_settings')
    .upsert({ user_id: userId, ...settings })
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ============================================
// EMPLOYEES HELPERS
// ============================================
export const getEmployees = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createEmployee = async (userId, employee) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('employees')
    .insert({ user_id: userId, ...employee })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateEmployee = async (employeeId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('employees')
    .update(updates)
    .eq('id', employeeId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteEmployee = async (employeeId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', employeeId);
  if (error) throw error;
};

// ============================================
// YARN TYPES HELPERS
// ============================================
export const getYarnTypes = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('yarn_types')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createYarnType = async (userId, yarn) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('yarn_types')
    .insert({ user_id: userId, ...yarn })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateYarnType = async (yarnId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('yarn_types')
    .update(updates)
    .eq('id', yarnId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteYarnType = async (yarnId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('yarn_types')
    .delete()
    .eq('id', yarnId);
  if (error) throw error;
};

// ============================================
// STOCK HELPERS
// ============================================
export const getStock = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('stock')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createStock = async (userId, stockItem) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('stock')
    .insert({ user_id: userId, ...stockItem })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateStock = async (stockId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('stock')
    .update(updates)
    .eq('id', stockId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteStock = async (stockId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('stock')
    .delete()
    .eq('id', stockId);
  if (error) throw error;
};

// ============================================
// SUPPLIERS HELPERS
// ============================================
export const getSuppliers = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createSupplier = async (userId, supplier) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('suppliers')
    .insert({ user_id: userId, ...supplier })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateSupplier = async (supplierId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('suppliers')
    .update(updates)
    .eq('id', supplierId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteSupplier = async (supplierId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', supplierId);
  if (error) throw error;
};

// ============================================
// PARTIES HELPERS
// ============================================
export const getParties = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('parties')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createParty = async (userId, party) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('parties')
    .insert({ user_id: userId, ...party })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateParty = async (partyId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('parties')
    .update(updates)
    .eq('id', partyId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteParty = async (partyId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('parties')
    .delete()
    .eq('id', partyId);
  if (error) throw error;
};

// ============================================
// INWARD TRANSACTIONS HELPERS
// ============================================
export const getInwardTransactions = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('inward_transactions')
    .select('*, suppliers(name)')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const createInwardTransaction = async (userId, transaction) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('inward_transactions')
    .insert({ user_id: userId, ...transaction })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateInwardTransaction = async (transactionId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('inward_transactions')
    .update(updates)
    .eq('id', transactionId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteInwardTransaction = async (transactionId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('inward_transactions')
    .delete()
    .eq('id', transactionId);
  if (error) throw error;
};

// ============================================
// OUTWARD TRANSACTIONS HELPERS
// ============================================
export const getOutwardTransactions = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('outward_transactions')
    .select('*, parties(name)')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const createOutwardTransaction = async (userId, transaction) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('outward_transactions')
    .insert({ user_id: userId, ...transaction })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateOutwardTransaction = async (transactionId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('outward_transactions')
    .update(updates)
    .eq('id', transactionId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteOutwardTransaction = async (transactionId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('outward_transactions')
    .delete()
    .eq('id', transactionId);
  if (error) throw error;
};

// ============================================
// ATTENDANCE HELPERS
// ============================================
export const getAttendance = async (userId, date) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('attendance')
    .select('*, employees(name, shift)')
    .eq('user_id', userId)
    .eq('date', date);
  if (error) throw error;
  return data;
};

export const getAttendanceByDateRange = async (userId, startDate, endDate) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('attendance')
    .select('*, employees(name, shift)')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
};

export const createAttendance = async (userId, attendance) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('attendance')
    .insert({ user_id: userId, ...attendance })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateAttendance = async (attendanceId, updates) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('attendance')
    .update(updates)
    .eq('id', attendanceId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteAttendance = async (attendanceId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('attendance')
    .delete()
    .eq('id', attendanceId);
  if (error) throw error;
};

// ============================================
// PAYROLL RUNS HELPERS
// ============================================
export const getPayrollRuns = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('payroll_runs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createPayrollRun = async (userId, payroll) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('payroll_runs')
    .insert({ user_id: userId, ...payroll })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePayrollRun = async (payrollId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('payroll_runs')
    .delete()
    .eq('id', payrollId);
  if (error) throw error;
};

// ============================================
// ACTIVITY LOG HELPERS
// ============================================
export const getActivityLog = async (userId, limit = 10) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};

export const createActivityLog = async (userId, activity) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('activity_log')
    .insert({ user_id: userId, ...activity })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteActivityLog = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from('activity_log')
    .delete()
    .eq('user_id', userId);
  if (error) throw error;
};

// ============================================
// BATCH LOAD FUNCTION (for initial app load)
// ============================================
export const loadAllUserData = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  const [
    profile,
    factorySettings,
    employees,
    yarnTypes,
    stock,
    suppliers,
    parties,
    inward,
    outward,
    payrollRuns,
    activity
  ] = await Promise.all([
    getProfile(userId),
    getFactorySettings(userId),
    getEmployees(userId),
    getYarnTypes(userId),
    getStock(userId),
    getSuppliers(userId),
    getParties(userId),
    getInwardTransactions(userId),
    getOutwardTransactions(userId),
    getPayrollRuns(userId),
    getActivityLog(userId, 10)
  ]);

  return {
    profile,
    factorySettings,
    employees,
    yarnTypes,
    stock,
    suppliers,
    parties,
    inward,
    outward,
    payrollRuns,
    activity
  };
};
