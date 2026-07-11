import { Nunito } from "next/font/google";
import "./globals.css";
import FloatingWidgets from "@/components/FloatingWidgets";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_ADI, OG_GORSEL, kulupSchema } from "@/lib/seo";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const anaBaslik = "Avrupa Karşıyaka Spor Kulübü | İstanbul Basketbol ve Voleybol Okulu";
const anaAciklama =
  "Avrupa Karşıyaka Spor Kulübü — İstanbul'da çocuk basketbol, voleybol ve cimnastik okulu. 4–16 yaş, lisanslı kulüp takımları, altyapı seçmeleri ve ücretsiz deneme antrenmanı. 5 şube.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: anaBaslik, template: "%s | " + SITE_ADI },
  description: anaAciklama,
  keywords: "avrupa karşıyaka, avrupa karşıyaka spor kulübü, istanbul spor kulübü, istanbul basketbol okulu, istanbul voleybol okulu, çocuk spor okulu istanbul, basketbol kursu istanbul, voleybol kursu istanbul",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "tr_TR", siteName: SITE_ADI,
    title: anaBaslik, description: anaAciklama, url: "/",
    images: [{ url: OG_GORSEL, alt: SITE_ADI + " antrenman" }],
  },
  twitter: { card: "summary_large_image", title: anaBaslik, description: anaAciklama, images: [OG_GORSEL] },
  other: { "geo.region": "TR-34", "geo.placename": "İstanbul" },
  icons: { icon: "/favicon.png", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={nunito.variable}>
      <body>
        <JsonLd data={kulupSchema()} />
        {children}
        <FloatingWidgets />
      </body>
    </html>
  );
}
