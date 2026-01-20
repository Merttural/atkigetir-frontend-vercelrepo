import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Environment variables kontrolü
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here';

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn('⚠️ Supabase environment variables are not set. Supabase features will not work.');
}

// Create a single supabase client for interacting with your database
// Eğer environment variables yoksa, null döndürecek bir mock client oluştur
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

// Supabase'in yapılandırılıp yapılandırılmadığını kontrol etmek için helper
export const isSupabaseReady = () => isSupabaseConfigured;
