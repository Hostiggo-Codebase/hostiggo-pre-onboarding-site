-- Add unique constraint on referrer_email to ensure one referral code per email
ALTER TABLE public.referrals ADD CONSTRAINT unique_referrer_email UNIQUE (referrer_email);

-- Add index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_referrals_email ON public.referrals(referrer_email);
