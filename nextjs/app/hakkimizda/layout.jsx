import { sayfaMeta } from "@/lib/seo";

export const metadata = sayfaMeta({
  baslik: "Hakkımızda",
  aciklama: "Avrupa Karşıyaka Spor Kulübü'nün hikayesi, değerleri ve eğitim anlayışı. İstanbul'da Karşıyaka geleneğiyle çocuk basketbol, voleybol ve cimnastik eğitimi.",
  yol: "/hakkimizda",
  kelimeler: "avrupa karşıyaka spor kulübü, istanbul spor kulübü, avrupa karşıyaka, çocuk spor okulu istanbul, kulüp değerleri",
});

export default function Layout({ children }) {
  return children;
}
