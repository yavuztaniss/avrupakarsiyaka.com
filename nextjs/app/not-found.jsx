import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Sayfa Bulunamadı" };

export default function NotFound() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />
      <section style={{ background: "#0C5231", color: "#ffffff", minHeight: "56vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, color: "#DFF0E5", letterSpacing: 4 }}>404</div>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, lineHeight: 1.2 }}>Hay aksi, belki de yanlış yere pas attık!</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, lineHeight: 1.65, color: "#DFF0E5", maxWidth: 480 }}>
            Aradığınız sayfa taşınmış ya da hiç olmamış olabilir. Topu tekrar oyuna sokalım.
          </p>
          <Link href="/" className="btn-kirmizi" style={{ fontSize: 16, padding: "14px 34px", marginTop: 8 }}>Ana Sayfaya Dön</Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
