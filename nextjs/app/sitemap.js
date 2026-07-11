import { SITE_URL } from "@/lib/seo";

// Otomatik sitemap — https://www.avrupakarsiyaka.com/sitemap.xml adresinde yayınlanır
export default function sitemap() {
  const simdi = new Date();
  const sayfalar = [
    { yol: "", siklik: "weekly", oncelik: 1 },
    { yol: "/branslar", siklik: "monthly", oncelik: 0.9 },
    { yol: "/on-kayit", siklik: "monthly", oncelik: 0.9 },
    { yol: "/haberler", siklik: "weekly", oncelik: 0.8 },
    { yol: "/iletisim", siklik: "monthly", oncelik: 0.8 },
    { yol: "/hakkimizda", siklik: "monthly", oncelik: 0.7 },
    { yol: "/kadromuz", siklik: "monthly", oncelik: 0.7 },
    { yol: "/kvkk", siklik: "yearly", oncelik: 0.3 },
  ];
  // ===== Supabase'e geçildiğinde: haber detay URL'lerini buraya ekleyin =====
  // const { data } = await supabase.from("haberler").select("slug, updated_at");
  // data.forEach((h) => sayfalar.push({ yol: "/haberler/" + h.slug, siklik: "yearly", oncelik: 0.6 }));
  return sayfalar.map((s) => ({
    url: SITE_URL + s.yol,
    lastModified: simdi,
    changeFrequency: s.siklik,
    priority: s.oncelik,
  }));
}
