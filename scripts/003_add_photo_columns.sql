-- Add photo_urls column to hosts table if it doesn't exist
ALTER TABLE public.hosts
ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT '{}';

-- Add photo_url column to service_providers table if it doesn't exist
ALTER TABLE public.service_providers
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Add referral_code column to hosts if it doesn't exist
ALTER TABLE public.hosts
ADD COLUMN IF NOT EXISTS referral_code TEXT;

-- Add referral_code column to service_providers if it doesn't exist
ALTER TABLE public.service_providers
ADD COLUMN IF NOT EXISTS referral_code TEXT;
