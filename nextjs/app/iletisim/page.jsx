import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { subeler, harita, iletisim } from "@/lib/site";

export const metadata = { title: "İletişim — Avrupa Karşıyaka Spor Kulübü" };

export default function Iletisim() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />
      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: 44, fontWeight: 900 }}>İletişim</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#DFF0E5" }}>Sorularınız için bize ulaşın ya da şubelerimizi ziyaret edin</p>
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { etiket: "TELEFON", deger: iletisim.telefon, alt: "Hafta içi 10:00 – 20:00" },
              { etiket: "E-POSTA", deger: iletisim.eposta, alt: "En geç 24 saat içinde dönüş" },
              { etiket: "SOSYAL MEDYA", deger: iletisim.instagram, alt: "Duyurular ve antrenman kareleri" },
            ].map((k) => (
              <div key={k.etiket} style={{ background: "#EEF6F0", borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>{k.etiket}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#0C5231" }}>{k.deger}</div>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "#4A5B50", fontWeight: 600 }}>{k.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#EEF6F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4, marginBottom: 10 }}>ŞUBELERİMİZ</div>
            <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>Size en yakın şubemize gelin</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {subeler.map((s) => (
              <div key={s.ad} style={{ background: "#ffffff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.08)" }}>
                <div style={{ background: "#157A46", color: "#ffffff", padding: "14px 20px", fontSize: 17, fontWeight: 900 }}>{s.ad} Şubesi</div>
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "#33443B", flex: 1 }}>{s.adres}</p>
                  {s.not && <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0C5231" }}>{s.not}</p>}
                  <div style={{ display: "flex", gap: 16 }}>
                    <a href={harita(s)} target="_blank" rel="noopener" className="link-kirmizi" style={{ fontSize: 14 }}>Yol Tarifi →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        baslik="Deneme antrenmanına davetlisiniz"
        metin="Ön kayıt formunu doldurun; sizi arayıp uygun gün ve saati birlikte planlayalım."
      />
      <SiteFooter />
    </div>
  );
}
