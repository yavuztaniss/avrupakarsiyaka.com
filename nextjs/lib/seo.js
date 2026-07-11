import { subeler, harita, iletisim } from "./site";

// ===== SEO merkezi ayarlar — gerçek domain geldiğinde SADECE bu satırı değiştirin =====
export const SITE_URL = "https://www.avrupakarsiyaka.com";
export const SITE_ADI = "Avrupa Karşıyaka Spor Kulübü";
export const OG_GORSEL = "/og.jpg";

// Sayfa bazlı metadata üretici (title, description, canonical, OG, Twitter)
export function sayfaMeta({ baslik, aciklama, yol, kelimeler }) {
  const url = SITE_URL + yol;
  const tamBaslik = baslik + " | " + SITE_ADI;
  return {
    title: baslik,
    description: aciklama,
    keywords: kelimeler,
    alternates: { canonical: url },
    openGraph: {
      type: "website", locale: "tr_TR", siteName: SITE_ADI,
      title: tamBaslik, description: aciklama, url,
      images: [{ url: OG_GORSEL, alt: SITE_ADI + " antrenman" }],
    },
    twitter: { card: "summary_large_image", title: tamBaslik, description: aciklama, images: [OG_GORSEL] },
  };
}

// JSON-LD: kulüp (tüm sayfalarda, layout.jsx içinde)
export function kulupSchema() {
  return {
    "@context": "https://schema.org", "@type": "SportsClub",
    name: SITE_ADI, alternateName: "Avrupa Karşıyaka", url: SITE_URL, logo: SITE_URL + "/logo.png", image: SITE_URL + OG_GORSEL,
    email: iletisim.eposta,
    sameAs: [iletisim.instagramUrl],
    sport: ["Basketball", "Volleyball", "Gymnastics"],
    keywords: "istanbul basketbol okulu, istanbul voleybol okulu, istanbul spor kulübü, basketbol kursu istanbul, voleybol kursu istanbul, çocuk spor okulu istanbul",
    knowsAbout: ["Basketbol eğitimi", "Voleybol eğitimi", "Cimnastik", "Temel hareket eğitimi", "Altyapı seçmeleri"],
    areaServed: { "@type": "City", name: "İstanbul" },
    address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
  };
}

// JSON-LD: şubeler (LocalBusiness/SportsActivityLocation — iletisim/layout.jsx içinde)
// TODO: gerçek telefonlar + koordinatlar (geo) eklenecek
// Çalışma saatleri: her gün 08.00–20.00 (şubeye göre değişebilir; gerekirse şube bazlı özelleştirin)
const calismaSaatleri = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "08:00",
  closes: "20:00",
};
export function subeSchemalari() {
  return {
    "@context": "https://schema.org",
    "@graph": subeler.map((s) => ({
      "@type": "SportsActivityLocation",
      "@id": SITE_URL + "/iletisim#" + s.ad.toLocaleLowerCase("tr").replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" }[c])),
      name: SITE_ADI + " — " + s.ad + " Şubesi",
      telephone: "+" + s.tel,
      url: SITE_URL + "/iletisim",
      hasMap: harita(s),
      openingHoursSpecification: calismaSaatleri,
      keywords: s.ad + " basketbol kursu, " + s.ad + " voleybol kursu, çocuk spor okulu",
      address: { "@type": "PostalAddress", streetAddress: s.adres, addressLocality: "İstanbul", addressCountry: "TR" },
      parentOrganization: { "@type": "SportsClub", name: SITE_ADI, url: SITE_URL },
    })),
  };
}
