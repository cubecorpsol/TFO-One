-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factory_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yarn_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inward_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outward_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- FACTORY SETTINGS RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own factory settings" ON public.factory_settings;
DROP POLICY IF EXISTS "Users can insert own factory settings" ON public.factory_settings;
DROP POLICY IF EXISTS "Users can update own factory settings" ON public.factory_settings;
DROP POLICY IF EXISTS "Users can delete own factory settings" ON public.factory_settings;

-- Users can view their own factory settings
CREATE POLICY "Users can view own factory settings"
  ON public.factory_settings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own factory settings
CREATE POLICY "Users can insert own factory settings"
  ON public.factory_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own factory settings
CREATE POLICY "Users can update own factory settings"
  ON public.factory_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own factory settings
CREATE POLICY "Users can delete own factory settings"
  ON public.factory_settings FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- EMPLOYEES RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own employees" ON public.employees;
DROP POLICY IF EXISTS "Users can insert own employees" ON public.employees;
DROP POLICY IF EXISTS "Users can update own employees" ON public.employees;
DROP POLICY IF EXISTS "Users can delete own employees" ON public.employees;

-- Users can view their own employees
CREATE POLICY "Users can view own employees"
  ON public.employees FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own employees
CREATE POLICY "Users can insert own employees"
  ON public.employees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own employees
CREATE POLICY "Users can update own employees"
  ON public.employees FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own employees
CREATE POLICY "Users can delete own employees"
  ON public.employees FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- YARN TYPES RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own yarn types" ON public.yarn_types;
DROP POLICY IF EXISTS "Users can insert own yarn types" ON public.yarn_types;
DROP POLICY IF EXISTS "Users can update own yarn types" ON public.yarn_types;
DROP POLICY IF EXISTS "Users can delete own yarn types" ON public.yarn_types;

-- Users can view their own yarn types
CREATE POLICY "Users can view own yarn types"
  ON public.yarn_types FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own yarn types
CREATE POLICY "Users can insert own yarn types"
  ON public.yarn_types FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own yarn types
CREATE POLICY "Users can update own yarn types"
  ON public.yarn_types FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own yarn types
CREATE POLICY "Users can delete own yarn types"
  ON public.yarn_types FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STOCK RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can insert own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can update own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can delete own stock" ON public.stock;

-- Users can view their own stock
CREATE POLICY "Users can view own stock"
  ON public.stock FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own stock
CREATE POLICY "Users can insert own stock"
  ON public.stock FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own stock
CREATE POLICY "Users can update own stock"
  ON public.stock FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own stock
CREATE POLICY "Users can delete own stock"
  ON public.stock FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- SUPPLIERS RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Users can insert own suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Users can update own suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Users can delete own suppliers" ON public.suppliers;

-- Users can view their own suppliers
CREATE POLICY "Users can view own suppliers"
  ON public.suppliers FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own suppliers
CREATE POLICY "Users can insert own suppliers"
  ON public.suppliers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own suppliers
CREATE POLICY "Users can update own suppliers"
  ON public.suppliers FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own suppliers
CREATE POLICY "Users can delete own suppliers"
  ON public.suppliers FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- PARTIES RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own parties" ON public.parties;
DROP POLICY IF EXISTS "Users can insert own parties" ON public.parties;
DROP POLICY IF EXISTS "Users can update own parties" ON public.parties;
DROP POLICY IF EXISTS "Users can delete own parties" ON public.parties;

-- Users can view their own parties
CREATE POLICY "Users can view own parties"
  ON public.parties FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own parties
CREATE POLICY "Users can insert own parties"
  ON public.parties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own parties
CREATE POLICY "Users can update own parties"
  ON public.parties FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own parties
CREATE POLICY "Users can delete own parties"
  ON public.parties FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- INWARD TRANSACTIONS RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own inward transactions" ON public.inward_transactions;
DROP POLICY IF EXISTS "Users can insert own inward transactions" ON public.inward_transactions;
DROP POLICY IF EXISTS "Users can update own inward transactions" ON public.inward_transactions;
DROP POLICY IF EXISTS "Users can delete own inward transactions" ON public.inward_transactions;

-- Users can view their own inward transactions
CREATE POLICY "Users can view own inward transactions"
  ON public.inward_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own inward transactions
CREATE POLICY "Users can insert own inward transactions"
  ON public.inward_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own inward transactions
CREATE POLICY "Users can update own inward transactions"
  ON public.inward_transactions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own inward transactions
CREATE POLICY "Users can delete own inward transactions"
  ON public.inward_transactions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- OUTWARD TRANSACTIONS RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own outward transactions" ON public.outward_transactions;
DROP POLICY IF EXISTS "Users can insert own outward transactions" ON public.outward_transactions;
DROP POLICY IF EXISTS "Users can update own outward transactions" ON public.outward_transactions;
DROP POLICY IF EXISTS "Users can delete own outward transactions" ON public.outward_transactions;

-- Users can view their own outward transactions
CREATE POLICY "Users can view own outward transactions"
  ON public.outward_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own outward transactions
CREATE POLICY "Users can insert own outward transactions"
  ON public.outward_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own outward transactions
CREATE POLICY "Users can update own outward transactions"
  ON public.outward_transactions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own outward transactions
CREATE POLICY "Users can delete own outward transactions"
  ON public.outward_transactions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- ATTENDANCE RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can insert own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can update own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can delete own attendance" ON public.attendance;

-- Users can view their own attendance
CREATE POLICY "Users can view own attendance"
  ON public.attendance FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own attendance
CREATE POLICY "Users can insert own attendance"
  ON public.attendance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own attendance
CREATE POLICY "Users can update own attendance"
  ON public.attendance FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own attendance
CREATE POLICY "Users can delete own attendance"
  ON public.attendance FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- PAYROLL RUNS RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own payroll runs" ON public.payroll_runs;
DROP POLICY IF EXISTS "Users can insert own payroll runs" ON public.payroll_runs;
DROP POLICY IF EXISTS "Users can update own payroll runs" ON public.payroll_runs;
DROP POLICY IF EXISTS "Users can delete own payroll runs" ON public.payroll_runs;

-- Users can view their own payroll runs
CREATE POLICY "Users can view own payroll runs"
  ON public.payroll_runs FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own payroll runs
CREATE POLICY "Users can insert own payroll runs"
  ON public.payroll_runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own payroll runs
CREATE POLICY "Users can update own payroll runs"
  ON public.payroll_runs FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own payroll runs
CREATE POLICY "Users can delete own payroll runs"
  ON public.payroll_runs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- ACTIVITY LOG RLS POLICIES
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own activity log" ON public.activity_log;
DROP POLICY IF EXISTS "Users can insert own activity log" ON public.activity_log;
DROP POLICY IF EXISTS "Users can delete own activity log" ON public.activity_log;

-- Users can view their own activity log
CREATE POLICY "Users can view own activity log"
  ON public.activity_log FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own activity log
CREATE POLICY "Users can insert own activity log"
  ON public.activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own activity log
CREATE POLICY "Users can delete own activity log"
  ON public.activity_log FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ============================================
-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, onboarding_complete)
  VALUES (NEW.id, NEW.email, FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists, then create it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger to call function on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
