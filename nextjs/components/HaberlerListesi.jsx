"use client";
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";
import { iletisim } from "@/lib/site";

// Etkinlik takvimi şimdilik statik — istenirse Supabase'e 'events' tablosu eklenebilir
const etkinlikler = [
  { gun: "15", ay: "AĞU", baslik: "İstanbul Cup U14 Turnuvası", detay: "Basketbol & Voleybol · 15-20 Ağustos" },
  { gun: "01", ay: "TEM", baslik: "Yaz Spor Kampı 1. Dönem", detay: "Tüm şubeler · Hafta içi 09.00-16.00" },
  { gun: "03", ay: "AĞU", baslik: "Yaz Spor Kampı 2. Dönem", detay: "Tüm şubeler · Kayıtlar açık" },
  { gun: "07", ay: "EYL", baslik: "2026-2027 sezonu ilk antrenman", detay: "Tüm branşlar · Şube programları duyurulacak" },
];

const etiketArka = { "Maç Sonuçları": "#D0342C", Turnuvalar: "#157A46", Kamplar: "#0C5231", Duyurular: "#B02820" };
const kategoriler = ["Hepsi", "Maç Sonuçları", "Turnuvalar", "Kamplar", "Duyurular"];
const waPaylas = (h) => "https://wa.me/?text=" + encodeURIComponent(h.baslik + " — Avrupa Karşıyaka Spor Kulübü: " + h.ozet);

export default function HaberlerListesi({ haberler }) {
  const [kategori, setKategori] = useState("Hepsi");
  const [arama, setArama] = useState("");
  const [seciliId, setSeciliId] = useState(null);
  const [kopyalandi, setKopyalandi] = useState(false);

  const detay = seciliId ? haberler.find((h) => h.id === seciliId) : null;
  const q = arama.trim().toLowerCase();
  const filtreli = haberler.filter(
    (h) => (kategori === "Hepsi" || h.kategori === kategori) && (!q || (h.baslik + " " + h.ozet).toLowerCase().includes(q))
  );

  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />

      {!detay && (
        <>
          <section style={{ background: "#0C5231", color: "#ffffff" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 60px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ color: "#DFF0E5", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>KULÜPTEN</div>
              <h1 style={{ margin: 0, fontSize: 44, fontWeight: 900, lineHeight: 1.1 }}>Haberler ve Etkinlikler</h1>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 500, lineHeight: 1.65, color: "#DFF0E5", maxWidth: 640 }}>
                Maç sonuçları, turnuva duyuruları, kamplar ve kulüp haberleri. Kategoriye göre filtreleyin veya arayın.
              </p>
            </div>
          </section>

          <section style={{ background: "#EEF6F0", borderBottom: "1px solid #E2EDE5" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {kategoriler.map((ad) => (
                  <button
                    key={ad}
                    onClick={() => setKategori(ad)}
                    style={{
                      background: kategori === ad ? "#157A46" : "#ffffff",
                      color: kategori === ad ? "#ffffff" : "#157A46",
                      border: "2px solid #157A46",
                      fontSize: 14, fontWeight: 800, padding: "8px 18px", borderRadius: 999, cursor: "pointer",
                    }}
                  >
                    {ad}
                  </button>
                ))}
              </div>
              <input
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                type="text"
                placeholder="Haberlerde ara..."
                style={{ border: "2px solid #DCE9E0", borderRadius: 999, padding: "10px 18px", fontSize: 14, outline: "none", background: "#ffffff", color: "#1C2B22", minWidth: 220 }}
              />
            </div>
          </section>

          <section style={{ background: "#ffffff" }}>
            <div className="haber-duzen" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 72px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 26 }}>
                {filtreli.map((h) => (
                  <article key={h.id} style={{ border: "1px solid #E2EDE5", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)", background: "#ffffff" }}>
                    <div style={{ position: "relative" }}>
                      <ImageSlot src={h.gorsel} alt={h.baslik} placeholder="Haber görseli" height={190} />
                      <span style={{ position: "absolute", top: 14, left: 14, background: etiketArka[h.kategori] || "#B02820", color: "#ffffff", fontSize: 12, fontWeight: 800, padding: "6px 14px", borderRadius: 999 }}>{h.kategori}</span>
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#4A5B50" }}>{h.tarih}</div>
                      {h.skor && (
                        <div style={{ background: "#EEF6F0", borderRadius: 12, padding: "10px 16px", fontSize: 17, fontWeight: 900, color: "#0C5231", alignSelf: "flex-start" }}>{h.skor}</div>
                      )}
                      <h3 style={{ margin: 0, fontSize: 19, fontWeight: 900, color: "#0C5231", lineHeight: 1.3 }}>{h.baslik}</h3>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#4A5B50", flex: 1 }}>{h.ozet}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 4 }}>
                        <button onClick={() => { setSeciliId(h.id); setKopyalandi(false); window.scrollTo(0, 0); }} className="btn-kirmizi" style={{ fontSize: 14, padding: "10px 22px" }}>Devamını Oku</button>
                        <a href={waPaylas(h)} target="_blank" rel="noopener" title="WhatsApp'ta paylaş" className="btn-cerceve-yesil" style={{ fontSize: 13, padding: "8px 14px" }}>Paylaş</a>
                      </div>
                    </div>
                  </article>
                ))}
                {haberler.length === 0 && (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 24px", color: "#4A5B50" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#0C5231", marginBottom: 8 }}>Henüz bir duyuru eklenmedi</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Yeni haberler eklendiğinde burada görünecek.</div>
                  </div>
                )}
                {haberler.length > 0 && filtreli.length === 0 && (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 24px", color: "#4A5B50" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#0C5231", marginBottom: 8 }}>Aramanızla eşleşen haber bulunamadı</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Farklı bir kategori veya arama terimi deneyin.</div>
                  </div>
                )}
              </div>

              <aside style={{ background: "#0C5231", borderRadius: 18, padding: 26, color: "#ffffff", position: "sticky", top: 110 }}>
                <div style={{ color: "#DFF0E5", fontSize: 12, fontWeight: 800, letterSpacing: 2.2, marginBottom: 6 }}>TAKVİM</div>
                <h3 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 900 }}>Yaklaşan Etkinlikler</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {etkinlikler.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ background: "#ffffff", color: "#0C5231", borderRadius: 12, width: 54, padding: "8px 0", textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{e.gun}</div>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#D0342C" }}>{e.ay}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.35 }}>{e.baslik}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#CFE5D6" }}>{e.detay}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </>
      )}

      {detay && (
        <section style={{ background: "#EEF6F0", minHeight: "60vh" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 72px" }}>
            <button onClick={() => setSeciliId(null)} style={{ background: "none", border: "none", color: "#157A46", fontSize: 15, fontWeight: 800, cursor: "pointer", padding: 0, marginBottom: 24 }}>← Tüm Haberler</button>
            <article style={{ background: "#ffffff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(12, 82, 49, 0.1)" }}>
              <ImageSlot src={detay.gorsel} alt={detay.baslik} placeholder="Haber görseli" height={340} />
              <div style={{ padding: "40px 44px 44px", display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <span style={{ background: etiketArka[detay.kategori] || "#B02820", color: "#ffffff", fontSize: 12, fontWeight: 800, padding: "6px 14px", borderRadius: 999 }}>{detay.kategori}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#4A5B50" }}>{detay.tarih}</span>
                </div>
                <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900, color: "#0C5231", lineHeight: 1.2 }}>{detay.baslik}</h1>
                {detay.skor && (
                  <div style={{ background: "#0C5231", color: "#ffffff", borderRadius: 14, padding: "18px 26px", fontSize: 26, fontWeight: 900, alignSelf: "flex-start" }}>{detay.skor}</div>
                )}
                {detay.paragraflar.map((p, i) => (
                  <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#33443B" }}>{p}</p>
                ))}
                <div style={{ borderTop: "2px solid #EEF6F0", paddingTop: 22, marginTop: 8, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#0C5231", letterSpacing: 1.4 }}>PAYLAŞ</span>
                  <a href={waPaylas(detay)} target="_blank" rel="noopener" style={{ background: "#25D366", color: "#ffffff", fontSize: 14, fontWeight: 800, padding: "10px 20px", borderRadius: 999 }}>WhatsApp</a>
                  <a href={iletisim.instagramUrl} target="_blank" rel="noopener" className="btn-cerceve-kirmizi" style={{ fontSize: 14, padding: "8px 18px" }}>Instagram</a>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) navigator.clipboard.writeText(location.origin + "/haberler#" + detay.id);
                      setKopyalandi(true);
                    }}
                    className="btn-cerceve-yesil"
                    style={{ background: "#ffffff", fontSize: 14, padding: "8px 18px" }}
                  >
                    {kopyalandi ? "Kopyalandı ✓" : "Linki Kopyala"}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
