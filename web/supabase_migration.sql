-- MIGRATION: Ensure completed_sections column exists with correct type
-- Run this in Supabase SQL Editor if your user_courses table was created before this column was added

ALTER TABLE user_courses 
  ADD COLUMN IF NOT EXISTS completed_sections TEXT[] DEFAULT '{}';

-- Also ensure progress is INTEGER (not null)
ALTER TABLE user_courses 
  ALTER COLUMN progress SET DEFAULT 0;

-- Reset any NULL values to empty array / 0
UPDATE user_courses 
  SET completed_sections = '{}' 
  WHERE completed_sections IS NULL;

UPDATE user_courses 
  SET progress = 0 
  WHERE progress IS NULL;

-- Verify the table structure
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'user_courses'
ORDER BY ordinal_position;
