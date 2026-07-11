import { sayfaMeta, subeSchemalari } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = sayfaMeta({
  baslik: "İletişim ve Şubelerimiz",
  aciklama: "İstanbul'daki 5 şubemiz: Bahçelievler, Ataköy, Güneşli, Kemerburgaz ve Esenler. Adresler, WhatsApp hatları ve ulaşım bilgileri.",
  yol: "/iletisim",
  kelimeler: "istanbul basketbol kulüpleri, istanbul voleybol kulüpleri, spor okulu şubeleri, Bahçelievler basketbol, Ataköy voleybol, Güneşli spor okulu, Kemerburgaz, Esenler",
});

// Şube LocalBusiness schema'ları bu sayfada basılır (Google Haritalar / yerel arama)
export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={subeSchemalari()} />
      {children}
    </>
  );
}
