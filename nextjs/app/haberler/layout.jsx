import { sayfaMeta } from "@/lib/seo";

export const metadata = sayfaMeta({
  baslik: "Haberler ve Duyurular",
  aciklama: "Maç sonuçları, basketbol ve voleybol altyapı seçmeleri, turnuva duyuruları, kış ve yaz okulu programları. Avrupa Karşıyaka'dan güncel haberler.",
  yol: "/haberler",
  kelimeler: "basketbol altyapı seçmeleri, voleybol altyapı seçmeleri, maç sonuçları, basketbol yaz okulu, voleybol kış okulu, turnuva duyuruları",
});

export default function Layout({ children }) {
  return children;
}
