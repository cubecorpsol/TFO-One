-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FACTORY SETTINGS TABLE
-- ============================================
CREATE TABLE public.factory_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  owner_name TEXT NOT NULL,
  factory_name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  pincode TEXT,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- EMPLOYEES TABLE
-- ============================================
CREATE TABLE public.employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  father_name TEXT,
  mother_name TEXT,
  phone TEXT,
  blood_group TEXT,
  dob DATE,
  aadhaar TEXT,
  pay_type TEXT CHECK (pay_type IN ('production', 'shift')),
  shift TEXT CHECK (shift IN ('Morning', 'Night')),
  rate DECIMAL(10, 2),
  joining_date DATE,
  address TEXT,
  status TEXT DEFAULT 'present',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- YARN TYPES TABLE
-- ============================================
CREATE TABLE public.yarn_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  yarn_name TEXT NOT NULL,
  yarn_code TEXT,
  color TEXT,
  count TEXT,
  twist TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STOCK TABLE
-- ============================================
CREATE TABLE public.stock (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  stock_name TEXT NOT NULL,
  yarn_type TEXT,
  color TEXT,
  lot_number TEXT,
  kg DECIMAL(10, 2) DEFAULT 0,
  bags INTEGER DEFAULT 0,
  weight_per_bag DECIMAL(10, 2),
  purchase_price DECIMAL(10, 2),
  supplier_name TEXT,
  purchase_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUPPLIERS TABLE (normalized)
-- ============================================
CREATE TABLE public.suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PARTIES TABLE (normalized)
-- ============================================
CREATE TABLE public.parties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INWARD TRANSACTIONS TABLE
-- ============================================
CREATE TABLE public.inward_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  color TEXT NOT NULL,
  bags INTEGER NOT NULL,
  kg DECIMAL(10, 2) NOT NULL,
  rate DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- OUTWARD TRANSACTIONS TABLE
-- ============================================
CREATE TABLE public.outward_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  party_id UUID REFERENCES public.parties(id) ON DELETE SET NULL,
  color TEXT NOT NULL,
  bags INTEGER NOT NULL,
  kg DECIMAL(10, 2) NOT NULL,
  rate DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ATTENDANCE TABLE
-- ============================================
CREATE TABLE public.attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  shift TEXT CHECK (shift IN ('Morning', 'Night')),
  status TEXT CHECK (status IN ('present', 'absent', 'half_day')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date, shift)
);

-- ============================================
-- PAYROLL RUNS TABLE
-- ============================================
CREATE TABLE public.payroll_runs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('production', 'shift')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10, 2),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE public.activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  details JSONB,
  badge TEXT
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_employees_user_id ON public.employees(user_id);
CREATE INDEX idx_stock_user_id ON public.stock(user_id);
CREATE INDEX idx_yarn_types_user_id ON public.yarn_types(user_id);
CREATE INDEX idx_inward_user_id ON public.inward_transactions(user_id);
CREATE INDEX idx_inward_date ON public.inward_transactions(date);
CREATE INDEX idx_outward_user_id ON public.outward_transactions(user_id);
CREATE INDEX idx_outward_date ON public.outward_transactions(date);
CREATE INDEX idx_attendance_user_id ON public.attendance(user_id);
CREATE INDEX idx_attendance_employee_id ON public.attendance(employee_id);
CREATE INDEX idx_attendance_date ON public.attendance(date);
CREATE INDEX idx_payroll_user_id ON public.payroll_runs(user_id);
CREATE INDEX idx_activity_user_id ON public.activity_log(user_id);
CREATE INDEX idx_suppliers_user_id ON public.suppliers(user_id);
CREATE INDEX idx_parties_user_id ON public.parties(user_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- APPLY UPDATED_AT TRIGGER TO TABLES
-- ============================================
CREATE TRIGGER handle_updated_at_factory_settings
  BEFORE UPDATE ON public.factory_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_employees
  BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_yarn_types
  BEFORE UPDATE ON public.yarn_types
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_stock
  BEFORE UPDATE ON public.stock
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_suppliers
  BEFORE UPDATE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_parties
  BEFORE UPDATE ON public.parties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_inward
  BEFORE UPDATE ON public.inward_transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_outward
  BEFORE UPDATE ON public.outward_transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_attendance
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_payroll
  BEFORE UPDATE ON public.payroll_runs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
