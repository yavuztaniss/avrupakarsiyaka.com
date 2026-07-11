import { getSupabase } from "@/lib/supabaseClient";
import HaberlerListesi from "@/components/HaberlerListesi";

// Sayfa 5 dakikada bir yeniden üretilir (ISR) — yeni haber en geç 5 dk içinde yayına düşer
export const revalidate = 300;

function tarihFormatla(iso) {
  try {
    return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

// Veritabanı satırını arayüzün beklediği şekle çevirir
function dbdenHabere(r) {
  return {
    id: r.id,
    baslik: r.title,
    kategori: r.category || "Duyurular",
    tarih: tarihFormatla(r.created_at),
    skor: r.score || "",
    ozet: r.summary || (r.content || "").split(/\n{2,}/)[0].slice(0, 180),
    paragraflar: (r.content || "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    gorsel: r.image_url || null,
  };
}

async function haberleriGetir() {
  const supabase = getSupabase();
  if (!supabase) return []; // env eksikse boş liste → "Henüz bir duyuru eklenmedi"
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase haber okuma hatası:", error.message);
    return [];
  }
  return (data || []).map(dbdenHabere);
}

export default async function Haberler() {
  const haberler = await haberleriGetir();
  return <HaberlerListesi haberler={haberler} />;
}
