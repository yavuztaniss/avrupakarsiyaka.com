import Link from "next/link";
import { iletisim } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer style={{ background: "#0C5231", color: "#CFE5D6" }}>
      <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <span style={{ background: "#ffffff", borderRadius: 14, padding: 10 }}>
            <img src="/logo.png" alt="KSK Avrupa Karşıyaka logosu" style={{ height: 76, width: "auto", display: "block" }} />
          </span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>
            Karşıyaka geleneklerini referans alarak İstanbul'da geleceğin yetenekli ve ahlaklı sporcularını Türk sporuna kazandırıyoruz.
          </p>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", color: "#ffffff", fontSize: 15, fontWeight: 900, letterSpacing: 1.2 }}>KURUMSAL</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <Link href="/" className="footer-link">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="footer-link">Hakkımızda</Link>
            <Link href="/branslar" className="footer-link">Branşlar</Link>
            <Link href="/kadromuz" className="footer-link">Kadromuz</Link>
            <Link href="/haberler" className="footer-link">Haberler</Link>
            <Link href="/iletisim" className="footer-link">İletişim</Link>
            <Link href="/on-kayit" className="footer-link">Ön Kayıt</Link>
            <Link href="/kvkk" className="footer-link">KVKK ve Çerez Politikası</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", color: "#ffffff", fontSize: 15, fontWeight: 900, letterSpacing: 1.2 }}>BRANŞLAR</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <Link href="/branslar#basketbol" className="footer-link">Basketbol</Link>
            <Link href="/branslar#voleybol" className="footer-link">Voleybol</Link>
            <Link href="/branslar#cimnastik" className="footer-link">Cimnastik</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", color: "#ffffff", fontSize: 15, fontWeight: 900, letterSpacing: 1.2 }}>ŞUBELERİMİZ</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14, fontWeight: 600 }}>
            <span>Bahçelievler · Ataköy · Güneşli</span>
            <span>Kemerburgaz · Esenler</span>
            <span style={{ marginTop: 6 }}>Tel: {iletisim.telefon}</span>
            <span>{iletisim.eposta}</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.16)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
          © 2026 KSK Avrupa Karşıyaka Spor Kulübü — Tüm Hakları Saklıdır | İstanbul
        </div>
      </div>
    </footer>
  );
}
