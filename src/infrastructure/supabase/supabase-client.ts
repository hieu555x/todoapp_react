import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseClientKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("[Supabase] URL:", supabaseUrl);
console.log("[Supabase] Key exists:", !!supabaseClientKey);

if (!supabaseUrl || !supabaseClientKey) {
  throw new Error(
    "Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or EXPO_PUBLIC_SUPABASE_ANON_KEY) in .env",
  );
}

if (supabaseClientKey.startsWith("sb_secret_")) {
  throw new Error(
    "Invalid Supabase client key: do not use sb_secret_ in mobile app. Use EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or anon key).",
  );
}

export const supabase = createClient(supabaseUrl, supabaseClientKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
