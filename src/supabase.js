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
  console.log('fetchFactoryData: Fetching data for user:', userId);
  const { data, error } = await supabase
    .from('factory_data')
    .select('*')
    .eq('id', userId)
    .single();

  console.log('fetchFactoryData: Response data:', data);
  console.log('fetchFactoryData: Response error:', error);

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    throw error;
  }
  return data;
};

export const upsertFactoryData = async (userId, payload, email) => {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  console.log('upsertFactoryData: Preparing to save data for user:', userId);
  console.log('upsertFactoryData: Payload employees count:', payload.employees?.length);
  console.log('upsertFactoryData: Payload stock count:', payload.stock?.length);
  console.log('upsertFactoryData: Payload inward count:', payload.inward?.length);
  console.log('upsertFactoryData: Payload outward count:', payload.outward?.length);
  
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

  // Add email if provided or present in settings
  const userEmail = email || payload.settings?.email;
  if (userEmail) {
    record.email = userEmail;
  }

  console.log('upsertFactoryData: Record to save:', record);
  
  const { error, data } = await supabase
    .from('factory_data')
    .upsert(record);

  console.log('upsertFactoryData: Response data:', data);
  console.log('upsertFactoryData: Response error:', error);

  if (error) {
    console.error('upsertFactoryData: Error saving data:', error);
    throw error;
  }
  
  console.log('upsertFactoryData: Data saved successfully');
};
