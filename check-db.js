import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bxdhyurmbufiwtibalji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZGh5dXJtYnVmaXd0aWJhbGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDkwMjgsImV4cCI6MjA5Nzc4NTAyOH0.m0wYVPc4UQNYBGE5fUzFUq2-nIAKFhXPHDnJWU08ks0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDatabase() {
  console.log('Checking Supabase database...\n');
  
  // Check all tables
  const tables = ['factory_data', 'profiles', 'factory_settings', 'employees', 'stock', 'yarn_types', 'suppliers', 'parties', 'inward_transactions', 'outward_transactions', 'attendance', 'payroll_runs', 'activity_log'];
  
  for (const table of tables) {
    console.log(`\n${table}:`);
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`  - Error: ${error.message}`);
      } else {
        console.log(`  - Exists: Yes, ${count} records`);
      }
    } catch (e) {
      console.log(`  - Error: ${e.message}`);
    }
  }
  
  console.log('\n\nChecking factory_data table details...');
  const { data: factoryData, error: factoryError } = await supabase
    .from('factory_data')
    .select('*');
  
  if (factoryError) {
    console.error('Error fetching factory_data:', factoryError);
  } else {
    console.log(`Found ${factoryData.length} records in factory_data`);
    if (factoryData.length > 0) {
      console.log('Sample record:', JSON.stringify(factoryData[0], null, 2));
    }
  }
}

checkDatabase().catch(console.error);
