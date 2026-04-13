import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Replace these with your actual Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Usage example:
// import { supabase } from '@/lib/supabase';
// const { data, error } = await supabase.from('reservations').insert({...});
