import { createClient } from '@supabase/supabase-js';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '';
};

export const signInWithGoogleNative = async () => {
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

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'supabase-auth',
        flowType: 'pkce', // Use PKCE flow for better mobile support
        debug: true // Enable auth debugging
      }
    })
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

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const upsertFactoryData = async (userId, payload, email) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  const record = {
    id: userId,
    settings: payload.settings,
    employees: payload.employees || [],
    stock: payload.stock || [],
    yarn: payload.yarn || [],
    inward: payload.inward || [],
    outward: payload.outward || [],
    activity: payload.activity || [],
    attendance: payload.attendance || {},
    payroll_runs: payload.payrollRuns || [],
    updated_at: new Date().toISOString()
  };

  const userEmail = email || payload.settings?.email;
  if (userEmail) {
    record.email = userEmail;
  }
  
  const { error } = await supabase.from('factory_data').upsert(record);

  if (error) throw error;
};
