import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '';
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Auth helpers
export const signUpUser = async (email, password) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signUp({ email, password });
};

export const signInUser = async (email, password) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOutUser = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return await supabase.auth.signOut();
};

// Sync helpers
export const fetchFactoryData = async (userId) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from('factory_data')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    throw error;
  }
  return data;
};

export const upsertFactoryData = async (userId, payload, email) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  const record = {
    id: userId,
    settings: payload.settings,
    employees: payload.employees,
    stock: payload.stock,
    inward: payload.inward,
    outward: payload.outward,
    activity: payload.activity,
    attendance: payload.attendance,
    payroll_runs: payload.payrollRuns,
    updated_at: new Date().toISOString()
  };

  // Add email if provided or present in settings
  const userEmail = email || payload.settings?.email;
  if (userEmail) {
    record.email = userEmail;
  }

  const { error } = await supabase
    .from('factory_data')
    .upsert(record);

  if (error) throw error;
};
