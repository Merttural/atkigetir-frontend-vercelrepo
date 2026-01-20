import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Environment variables kontrolü
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here';

// Warning sadece development'da gösterilir (production'da kaldırılır)
if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.warn('⚠️ Supabase environment variables are not set. Supabase features will not work.');
}

// Supabase'in yapılandırılıp yapılandırılmadığını kontrol etmek için helper
export const isSupabaseReady = () => isSupabaseConfigured;

// Server-side Supabase client with service role key for admin operations
export const createServerClient = () => {
  if (!isSupabaseConfigured) {
    // Mock client döndür - hiçbir şey yapmayacak
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }

  return createClient(
    supabaseUrl,
    supabaseServiceRoleKey || supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
};

// Regular server client (uses anon key)
export const createServerAnonClient = () => {
  if (!isSupabaseConfigured) {
    // Mock client döndür - hiçbir şey yapmayacak
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }

  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
};
