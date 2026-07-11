"use client";
import { useState } from "react";
import Link from "next/link";

function grupHesapla(yil, brans) {
  const yas = new Date().getFullYear() - parseInt(yil, 10);
  let grup, band;
  if (yas <= 6) { grup = "Minikler Grubu · Spor Okulu"; band = "4–6 yaş"; }
  else if (yas <= 8) { grup = "Spor Okulu Grubu"; band = "7–8 yaş"; }
  else if (yas <= 10) { grup = "U10 · Mini Takım"; band = "9–10 yaş"; }
  else if (yas <= 12) { grup = "U12 Grubu"; band = "11–12 yaş"; }
  else if (yas <= 14) { grup = "U14 Grubu"; band = "13–14 yaş"; }
  else { grup = "U16 Grubu"; band = "15–16 yaş"; }
  if (brans === "Cimnastik") {
    if (yas <= 6) grup = "Minikler Cimnastik Grubu";
    else if (yas <= 9) grup = "Temel Cimnastik Grubu";
    else grup = "Gelişim Cimnastik Grubu";
  }
  const kayitLink = "/on-kayit?yil=" + yil + "&brans=" + encodeURIComponent(brans);
  return {
    grup,
    aciklama: yil + " doğumlu sporcunuz, " + brans.toLowerCase() + " branşında " + band + " kategorisindeki bu grubun antrenmanlarına katılabilir. Aşağıdaki şubelerimizden size en uygun olanı seçin.",
    subeler: ["Ataköy", "Esenler", "Kemerburgaz", "Güneşli", "Bahçelievler"].map((ad) => ({ ad, link: kayitLink + "&sube=" + encodeURIComponent(ad) })),
    kayitLink,
  };
}

const dogumYillari = Array.from({ length: 13 }, (_, i) => String(new Date().getFullYear() - 4 - i));
const secimStil = { border: "2px solid #DCE9E0", borderRadius: 10, padding: "12px 14px", fontSize: 15, outline: "none", background: "#ffffff", color: "#1C2B22" };

export default function GrupBulucu() {
  const [yil, setYil] = useState("");
  const [brans, setBrans] = useState("");
  const [sonuc, setSonuc] = useState(null);
  const [hata, setHata] = useState(false);

  return (
    <div style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 860, margin: "0 auto", boxShadow: "0 12px 40px rgba(0, 0, 0, 0.18)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16, alignItems: "end" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#0C5231" }}>Doğum Yılı</span>
          <select value={yil} onChange={(e) => setYil(e.target.value)} style={secimStil}>
            <option value="">Seçiniz</option>
            {dogumYillari.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#0C5231" }}>İlgilendiği Branş</span>
          <select value={brans} onChange={(e) => setBrans(e.target.value)} style={secimStil}>
            <option value="">Seçiniz</option>
            <option value="Basketbol">Basketbol</option>
            <option value="Voleybol">Voleybol</option>
            <option value="Cimnastik">Cimnastik</option>
          </select>
        </label>
        <button
          onClick={() => {
            if (!yil || !brans) { setHata(true); setSonuc(null); return; }
            setHata(false);
            setSonuc(grupHesapla(yil, brans));
          }}
          className="btn-kirmizi"
          style={{ fontSize: 15, fontWeight: 900, padding: "14px 28px" }}
        >
          Grubumu Bul
        </button>
      </div>
      {hata && <p style={{ margin: "14px 0 0", fontSize: 14, fontWeight: 700, color: "#B02820" }}>Lütfen doğum yılı ve branş seçin.</p>}
      {sonuc && (
        <div style={{ borderTop: "2px solid #EEF6F0", marginTop: 24, paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#D0342C", letterSpacing: 2 }}>ÖNERİLEN GRUP</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#0C5231" }}>{sonuc.grup}</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#33443B" }}>{sonuc.aciklama}</p>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0C5231", marginTop: 4 }}>Bu grubun bulunduğu şubeler:</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {sonuc.subeler.map((s) => (
              <Link key={s.ad} href={s.link} className="btn-cerceve-yesil" style={{ fontSize: 14, padding: "9px 18px" }}>{s.ad}</Link>
            ))}
          </div>
          <Link href={sonuc.kayitLink} className="btn-kirmizi" style={{ fontSize: 15, fontWeight: 900, padding: "14px 28px", alignSelf: "flex-start", marginTop: 8 }}>
            Bu Gruba Ön Kayıt Yap
          </Link>
        </div>
      )}
    </div>
  );
}
