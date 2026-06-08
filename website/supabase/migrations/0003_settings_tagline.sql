-- =====================================================================
-- Add `tagline` column to settings
-- =====================================================================
-- Run in Supabase SQL Editor — New query → paste → Run.
-- Idempotent: safe to re-run.
-- =====================================================================

alter table public.settings
  add column if not exists tagline text not null
  default 'Quality Paints — Kaizen & Nippon';

-- Backfill the existing single row with the canonical tagline if it's
-- still the bare empty default.
update public.settings
  set tagline = 'Quality Paints — Kaizen & Nippon'
  where id = 1 and tagline = '';
