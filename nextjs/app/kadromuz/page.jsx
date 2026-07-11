import { getSupabase } from "@/lib/supabaseClient";
import KadroListesi from "@/components/KadroListesi";

// 5 dakikada bir yenilenir — /admin'den eklenen kişi en geç 5 dk içinde görünür
export const revalidate = 300;

async function kadroyuGetir() {
  const supabase = getSupabase();
  if (!supabase) return { yoneticiler: [], antrenorler: [] };
  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Supabase kadro okuma hatası:", error.message);
    return { yoneticiler: [], antrenorler: [] };
  }
  const yoneticiler = [];
  const antrenorler = [];
  for (const k of data || []) {
    if (k.role === "yonetici") {
      yoneticiler.push({ ad: k.name, unvan: k.title || "", mesaj: k.message || "", foto: k.photo_url || null });
    } else {
      antrenorler.push({
        ad: k.name,
        brans: k.branch || "Basketbol",
        subeler: k.subeler || [],
        uzmanlik: k.specialty || "",
        etiketler: k.tags || [],
        foto: k.photo_url || null,
      });
    }
  }
  return { yoneticiler, antrenorler };
}

export default async function Kadromuz() {
  const { yoneticiler, antrenorler } = await kadroyuGetir();
  return <KadroListesi yoneticiler={yoneticiler} antrenorler={antrenorler} />;
}
