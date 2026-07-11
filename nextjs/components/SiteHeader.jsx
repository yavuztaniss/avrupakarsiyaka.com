"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { iletisim, navLinkleri } from "@/lib/site";

export default function SiteHeader() {
  const yol = usePathname();
  return (
    <>
      <div style={{ background: "#0C5231", color: "#CFE5D6", fontSize: 13, fontWeight: 600 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span>Tel: {iletisim.telefon}</span>
            <span>E-posta: {iletisim.eposta}</span>
          </div>
          <span>Instagram: {iletisim.instagram}</span>
        </div>
      </div>
      <header style={{ background: "#ffffff", borderBottom: "3px solid #157A46", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(12, 82, 49, 0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.png" alt="KSK Avrupa Karşıyaka logosu" style={{ height: 56, width: "auto", display: "block" }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#0C5231", letterSpacing: 0.4 }}>AVRUPA KARŞIYAKA</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#D0342C", letterSpacing: 2.4 }}>SPOR KULÜBÜ</span>
            </span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
            {navLinkleri.map((l) => (
              <Link key={l.href} href={l.href} className={"nav-link" + (yol === l.href ? " aktif" : "")}>
                {l.ad}
              </Link>
            ))}
            <Link href="/on-kayit" className="btn-kirmizi" style={{ fontSize: 15, padding: "11px 24px" }}>
              Ön Kayıt
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
