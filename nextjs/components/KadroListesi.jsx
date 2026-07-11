"use client";
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";
import CtaBand from "@/components/CtaBand";

const bransRenk = { Basketbol: "#D0342C", Voleybol: "#157A46", Cimnastik: "#0C5231" };
const subeListesi = ["Tümü", "Ataköy", "Esenler", "Kemerburgaz", "Güneşli", "Bahçelievler"];
const bransListesi = ["Tümü", "Basketbol", "Voleybol", "Cimnastik"];

function Chip({ aktif, renk, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: aktif ? renk : "#ffffff",
        color: aktif ? "#ffffff" : renk,
        border: "2px solid " + renk,
        fontSize: 14, fontWeight: 800, padding: "8px 18px", borderRadius: 999, cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function KadroListesi({ yoneticiler, antrenorler }) {
  const [gorunum, setGorunum] = useState("hepsi");
  const [sube, setSube] = useState("Tümü");
  const [brans, setBrans] = useState("Tümü");

  const filtreli = antrenorler.filter(
    (a) => (sube === "Tümü" || a.subeler.includes(sube)) && (brans === "Tümü" || a.brans === brans)
  );

  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />

      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 60px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ color: "#DFF0E5", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>TAKIMIMIZ</div>
          <h1 style={{ margin: 0, fontSize: 44, fontWeight: 900, lineHeight: 1.1 }}>Kadromuz</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, lineHeight: 1.65, color: "#DFF0E5", maxWidth: 640 }}>
            Kulübümüzü yöneten ekip ve çocuklarınızı emanet ettiğiniz antrenörlerimiz; lisansları, deneyimleri ve görev yaptıkları şubelerle. Şubeye veya branşa göre filtreleyerek inceleyin.
          </p>
        </div>
      </section>

      <section style={{ background: "#ffffff", borderBottom: "1px solid #E2EDE5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[["hepsi", "Tüm Kadro"], ["yonetim", "Yönetim Ekibi"], ["antrenor", "Antrenörlerimiz"]].map(([k, ad]) => (
            <button
              key={k}
              onClick={() => setGorunum(k)}
              style={{
                background: gorunum === k ? "#0C5231" : "#ffffff",
                color: gorunum === k ? "#ffffff" : "#0C5231",
                border: "2px solid #0C5231",
                fontSize: 15, fontWeight: 800, padding: "10px 26px", borderRadius: 999, cursor: "pointer",
              }}
            >
              {ad}
            </button>
          ))}
        </div>
      </section>

      {gorunum !== "antrenor" && (
        <section style={{ background: "#ffffff", borderBottom: "1px solid #E2EDE5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 56px" }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4, marginBottom: 8 }}>YÖNETİM EKİBİ</div>
              <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#0C5231" }}>Kulübümüzü yönetenler</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 22 }}>
              {yoneticiler.map((y, i) => (
                <div key={i} style={{ border: "1px solid #E2EDE5", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)", background: "#ffffff" }}>
                  <ImageSlot src={y.foto} alt={y.ad} placeholder="Yönetici fotoğrafı" height={220} />
                  <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: "#0C5231" }}>{y.ad}</h3>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#D0342C", letterSpacing: 0.6 }}>{y.unvan}</div>
                    {y.mesaj && <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.6, color: "#4A5B50" }}>{y.mesaj}</p>}
                  </div>
                </div>
              ))}
              {yoneticiler.length === 0 && (
                <div style={{ gridColumn: "1 / -1", color: "#4A5B50", fontSize: 15, fontWeight: 600, padding: "12px 0" }}>
                  Yönetim ekibi bilgileri yakında eklenecek.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {gorunum !== "yonetim" && (
        <>
          <section style={{ background: "#EEF6F0", borderBottom: "1px solid #E2EDE5" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>ANTRENÖRLERİMİZ</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#0C5231", letterSpacing: 1.6, width: 64 }}>ŞUBE</span>
                {subeListesi.map((ad) => (
                  <Chip key={ad} aktif={sube === ad} renk="#157A46" onClick={() => setSube(ad)}>{ad}</Chip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#0C5231", letterSpacing: 1.6, width: 64 }}>BRANŞ</span>
                {bransListesi.map((ad) => (
                  <Chip key={ad} aktif={brans === ad} renk="#D0342C" onClick={() => setBrans(ad)}>{ad}</Chip>
                ))}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#4A5B50" }}>
                {filtreli.length} antrenör gösteriliyor{sube !== "Tümü" ? " · " + sube : ""}{brans !== "Tümü" ? " · " + brans : ""}
              </div>
            </div>
          </section>

          <section style={{ background: "#ffffff" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 72px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 26 }}>
                {filtreli.map((a, i) => (
                  <div key={i} style={{ border: "1px solid #E2EDE5", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)", background: "#ffffff" }}>
                    <ImageSlot src={a.foto} alt={a.ad} placeholder="Antrenör fotoğrafı" height={240} />
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 900, color: "#0C5231", lineHeight: 1.25 }}>{a.ad}</h3>
                        <span style={{ background: bransRenk[a.brans] || "#0C5231", color: "#ffffff", fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 999, whiteSpace: "nowrap", flexShrink: 0 }}>{a.brans}</span>
                      </div>
                      {a.uzmanlik && <div style={{ fontSize: 14, fontWeight: 700, color: "#4A5B50" }}>{a.uzmanlik}</div>}
                      {a.etiketler.length > 0 && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {a.etiketler.map((e) => (
                            <span key={e} style={{ border: "1.5px solid #DCE9E0", color: "#33443B", fontSize: 12, fontWeight: 800, padding: "5px 11px", borderRadius: 999, background: "#F7FBF8" }}>{e}</span>
                          ))}
                        </div>
                      )}
                      {a.subeler.length > 0 && (
                        <div style={{ borderTop: "1px solid #EEF6F0", paddingTop: 12, marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 900, color: "#D0342C", letterSpacing: 1.4 }}>GÖREV YAPTIĞI ŞUBELER</span>
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {a.subeler.map((s) => (
                              <span key={s} style={{ background: "#157A46", color: "#ffffff", fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 999 }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {antrenorler.length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 24px", color: "#4A5B50" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0C5231", marginBottom: 8 }}>Henüz antrenör eklenmedi</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Kadro bilgileri yönetici panelinden eklendiğinde burada görünecek.</div>
                </div>
              )}
              {antrenorler.length > 0 && filtreli.length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 24px", color: "#4A5B50" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0C5231", marginBottom: 8 }}>Bu filtrelerle eşleşen antrenör bulunamadı</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Farklı bir şube veya branş seçmeyi deneyin.</div>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <CtaBand
        baslik="Antrenörlerimizle tanışın"
        metin="Ücretsiz deneme antrenmanında çocuğunuz antrenörümüzle birebir tanışsın."
      />
      <SiteFooter />
    </div>
  );
}
