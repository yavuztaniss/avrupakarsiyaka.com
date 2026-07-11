import { sayfaMeta } from "@/lib/seo";

export const metadata = sayfaMeta({
  baslik: "Ön Kayıt ve Spor Okulu Kayıtları",
  aciklama: "Spor okulu kayıtları başladı. Basketbol ve voleybol altyapı seçmeleri ile ücretsiz deneme antrenmanı için ön kayıt formunu doldurun. 4–16 yaş, tüm şubeler.",
  yol: "/on-kayit",
  kelimeler: "spor okulu kayıtları, ön kayıt, basketbol altyapı seçmeleri, voleybol altyapı seçmeleri, deneme antrenmanı, basketbol kayıt istanbul, voleybol kayıt istanbul",
});

export default function Layout({ children }) {
  return children;
}
