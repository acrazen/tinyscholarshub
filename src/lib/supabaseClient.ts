
// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "---------------------------------------------------------------------\n" +
    "!!! IMPORTANT: SUPABASE ENVIRONMENT VARIABLES ARE MISSING !!!\n" +
    "---------------------------------------------------------------------\n" +
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.\n" +
    "Please ensure these are set in your Firebase Studio project settings / hosting configuration.\n" +
    "Supabase functionality will be DISABLED until these are configured.\n" +
    "The app will continue to run in a limited mode.\n" +
    "---------------------------------------------------------------------"
  );
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Error initializing Supabase client even with vars present:", error);
    supabase = null; // Ensure supabase is null if initialization fails
  }
}

// Export a potentially null client. Components using it must check for null.
export { supabase };
