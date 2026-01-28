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

-- Add referral_code and referred_by columns to hosts table
ALTER TABLE public.hosts ADD COLUMN IF NOT EXISTS referral_code TEXT;
ALTER TABLE public.hosts ADD COLUMN IF NOT EXISTS referred_by_code TEXT REFERENCES public.referrals(referral_code);

-- Add referral_code column to service_providers table
ALTER TABLE public.service_providers ADD COLUMN IF NOT EXISTS referral_code TEXT;
ALTER TABLE public.service_providers ADD COLUMN IF NOT EXISTS referred_by_code TEXT REFERENCES public.referrals(referral_code);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_hosts_referred_by ON public.hosts(referred_by_code);
CREATE INDEX IF NOT EXISTS idx_service_providers_referred_by ON public.service_providers(referred_by_code);

-- Enable RLS for referrals table
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "referrals_insert_public" ON public.referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "referrals_select_public" ON public.referrals FOR SELECT USING (true);
