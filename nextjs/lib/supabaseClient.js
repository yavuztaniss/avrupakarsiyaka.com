import { createClient } from "@supabase/supabase-js";

// .env.local dosyasına şunları ekleyin (Supabase Dashboard > Settings > API):
// NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
let istemci = null;

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anahtar) return null; // env yoksa site çalışmaya devam eder, haberler boş görünür
  if (!istemci) istemci = createClient(url, anahtar);
  return istemci;
}
