-- Create hosts table
CREATE TABLE IF NOT EXISTS public.hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  property_name TEXT NOT NULL,
  full_address TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_link TEXT,
  number_of_rooms INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  description TEXT,
  amenities TEXT[], -- JSON array of amenities
  base_price DECIMAL(10, 2),
  weekend_price DECIMAL(10, 2),
  photo_urls TEXT[], -- Store photo URLs as array directly in hosts table
  referral_code TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_providers table
CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  service_category TEXT NOT NULL,
  experience_years INTEGER,
  description TEXT,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  working_area TEXT,
  rate_type TEXT, -- per_day or per_hour
  rate DECIMAL(10, 2),
  photo_url TEXT, -- Store single photo URL directly
  referral_code TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table to track referral codes and their performance
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL UNIQUE,
  referrer_name TEXT NOT NULL,
  referrer_phone TEXT NOT NULL,
  referrer_email TEXT,
  total_properties_referred INTEGER DEFAULT 0,
  total_approvals INTEGER DEFAULT 0,
  reward_milestone_reached BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_hosts_status ON public.hosts(status);
CREATE INDEX IF NOT EXISTS idx_hosts_city ON public.hosts(city);
CREATE INDEX IF NOT EXISTS idx_hosts_state ON public.hosts(state);
CREATE INDEX IF NOT EXISTS idx_service_providers_status ON public.service_providers(status);
CREATE INDEX IF NOT EXISTS idx_service_providers_city ON public.service_providers(city);
CREATE INDEX IF NOT EXISTS idx_service_providers_category ON public.service_providers(service_category);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(referral_code);

-- Enable RLS (Row Level Security)
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow anyone to insert (public registration)
CREATE POLICY "hosts_insert_public" ON public.hosts FOR INSERT WITH CHECK (true);
CREATE POLICY "service_providers_insert_public" ON public.service_providers FOR INSERT WITH CHECK (true);
CREATE POLICY "referrals_insert_public" ON public.referrals FOR INSERT WITH CHECK (true);

-- RLS Policies - Allow public to view approved listings only
CREATE POLICY "hosts_select_public" ON public.hosts FOR SELECT USING (status = 'approved' OR auth.role() = 'authenticated');
CREATE POLICY "service_providers_select_public" ON public.service_providers FOR SELECT USING (status = 'approved' OR auth.role() = 'authenticated');
CREATE POLICY "referrals_select_public" ON public.referrals FOR SELECT USING (true);
