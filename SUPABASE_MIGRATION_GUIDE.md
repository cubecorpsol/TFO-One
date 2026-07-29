# Supabase Database Migration Guide

This guide explains how to migrate your TFO One application to the new normalized Supabase database schema.

## Overview

The new database structure replaces the single `factory_data` table with a properly normalized schema with separate tables for each entity type, Row Level Security (RLS) for user data isolation, and proper relationships.

## Migration Steps

### 1. Apply SQL Migrations to Supabase

Go to your Supabase project dashboard and apply the SQL migrations in order:

1. **Initial Schema** - Run `supabase/migrations/001_initial_schema.sql`
   - Creates all tables with proper relationships
   - Sets up UUID primary keys
   - Adds indexes for performance
   - Creates updated_at triggers

2. **RLS Policies** - Run `supabase/migrations/002_rls_policies.sql`
   - Enables Row Level Security
   - Creates policies for user-specific data access
   - Sets up automatic profile creation on signup

### 2. Update Environment Variables

Ensure your `.env` file has:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. What Changed

**Database Structure:**
- `profiles` - User profile and onboarding status
- `factory_settings` - Factory configuration (replaces settings in old schema)
- `employees` - Employee records
- `yarn_types` - Yarn type definitions
- `stock` - Stock inventory
- `suppliers` - Supplier information (normalized)
- `parties` - Party/customer information (normalized)
- `inward_transactions` - Inward transactions with supplier references
- `outward_transactions` - Outward transactions with party references
- `attendance` - Attendance records
- `payroll_runs` - Payroll calculation runs
- `activity_log` - Activity tracking

**Security:**
- All tables have RLS enabled
- Users can only access their own data
- Automatic profile creation on user signup
- Cascade deletes for data integrity

**Frontend Changes:**
- New `supabase.js` with table-specific CRUD functions
- Updated `App.jsx` to use new database functions
- Removed localStorage dependencies (only IndexedDB for local caching)
- Immediate sync to Supabase on data changes

### 4. Data Migration (If you have existing data)

If you have existing data in the old `factory_data` table, you'll need to migrate it. Create a migration script:

```sql
-- Migrate factory settings
INSERT INTO factory_settings (user_id, owner_name, factory_name, phone, whatsapp, address, pincode, logo)
SELECT id, 
       settings->>'ownerName' as owner_name,
       settings->>'factoryName' as factory_name,
       settings->>'phone' as phone,
       settings->>'whatsapp' as whatsapp,
       settings->>'address' as address,
       settings->>'pincode' as pincode,
       settings->>'logo' as logo
FROM factory_data
WHERE settings->>'ownerName' IS NOT NULL;

-- Migrate employees
INSERT INTO employees (user_id, name, father_name, mother_name, phone, blood_group, dob, aadhaar, pay_type, shift, rate, joining_date, address, status, photo_url)
SELECT id,
       emp->>'name' as name,
       emp->>'fatherName' as father_name,
       emp->>'motherName' as mother_name,
       emp->>'phone' as phone,
       emp->>'bloodGroup' as blood_group,
       emp->>'dob' as dob,
       emp->>'aadhaar' as aadhaar,
       emp->>'payType' as pay_type,
       emp->>'shift' as shift,
       (emp->>'rate')::decimal as rate,
       emp->>'joiningDate' as joining_date,
       emp->>'address' as address,
       emp->>'status' as status,
       emp->>'photoUrl' as photo_url
FROM factory_data,
jsonb_array_elements(employees) as emp
WHERE jsonb_array_length(employees) > 0;

-- Similar migrations needed for other tables...
```

### 5. Testing

After migration:
1. Sign out and sign back in to test data loading
2. Create new employees, stock, transactions
3. Refresh the page to verify persistence
4. Test on multiple devices
5. Verify RLS by checking that users can't see each other's data

### 6. Rollback Plan

If you need to rollback:
1. The old `supabase-old.js` file is preserved
2. You can restore the old single-table structure
3. Keep a backup of your data before migration

## Benefits of New Schema

1. **Security**: RLS ensures users can only access their own data
2. **Performance**: Proper indexes and normalized structure
3. **Scalability**: Easier to add new features and relationships
4. **Data Integrity**: Foreign key constraints prevent orphaned records
5. **Maintainability**: Clear separation of concerns
6. **Query Efficiency**: Can query specific tables instead of loading all data

## Support

If you encounter issues:
1. Check Supabase logs for SQL errors
2. Verify RLS policies are enabled
3. Check that environment variables are set correctly
4. Ensure the user is authenticated before data operations
