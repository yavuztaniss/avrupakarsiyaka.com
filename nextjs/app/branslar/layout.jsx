import { sayfaMeta } from "@/lib/seo";

export const metadata = sayfaMeta({
  baslik: "Basketbol, Voleybol ve Cimnastik Kursları",
  aciklama: "İstanbul'da basketbol kursu, voleybol kursu ve cimnastik eğitimi. Kız ve erkek gruplarında temel hareket eğitiminden lisanslı kulüp takımlarına uzanan 4–16 yaş programları.",
  yol: "/branslar",
  kelimeler: "basketbol kursu istanbul, voleybol kursu istanbul, çocuk basketbol eğitimi, kız voleybol okulu, erkek basketbol okulu, temel hareket eğitimi, basketbol yaz okulu, voleybol yaz okulu, basketbol kış okulu, voleybol kış okulu",
});

export default function Layout({ children }) {
  return children;
}
