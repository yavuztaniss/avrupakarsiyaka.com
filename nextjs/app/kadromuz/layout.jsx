import { sayfaMeta } from "@/lib/seo";

export const metadata = sayfaMeta({
  baslik: "Antrenör Kadromuz",
  aciklama: "Lisanslı basketbol, voleybol ve cimnastik antrenörlerimiz; deneyimleri ve görev yaptıkları şubeler. Çocuğunuzu emanet ettiğiniz ekibi tanıyın.",
  yol: "/kadromuz",
  kelimeler: "antrenör kadrosu, basketbol antrenörü istanbul, voleybol antrenörü istanbul, cimnastik antrenörü, lisanslı antrenör",
});

export default function Layout({ children }) {
  return children;
}
