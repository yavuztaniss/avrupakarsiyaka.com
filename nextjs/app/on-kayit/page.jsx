"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { waOnKayit } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const alanStil = { border: "2px solid #DCE9E0", borderRadius: 10, padding: "12px 14px", fontSize: 15, outline: "none", color: "#1C2B22", background: "#ffffff" };
const etiketStil = { fontSize: 14, fontWeight: 800, color: "#0C5231" };
const branslar = ["Basketbol", "Voleybol", "Cimnastik"];
const subeler = ["Bahçelievler", "Ataköy", "Güneşli", "Kemerburgaz", "Esenler"];
const dogumYillari = Array.from({ length: 13 }, (_, i) => String(new Date().getFullYear() - 4 - i));

function KayitFormu() {
  const p = useSearchParams();
  const [form, setForm] = useState({
    veliAdi: "", telefon: "", sporcuAdi: "", mesaj: "",
    dogumYili: dogumYillari.includes(p.get("yil")) ? p.get("yil") : "",
    brans: branslar.includes(p.get("brans")) ? p.get("brans") : "",
    sube: subeler.includes(p.get("sube")) ? p.get("sube") : "",
  });
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState(false);
  const degistir = (alan) => (e) => setForm({ ...form, [alan]: e.target.value });

  if (gonderildi) {
    return (
      <div style={{ background: "#ffffff", borderRadius: 20, padding: "56px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(12, 82, 49, 0.1)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#157A46", color: "#ffffff", fontSize: 36, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>✓</div>
        <h2 style={{ margin: "0 0 10px", fontSize: 30, fontWeight: 900, color: "#0C5231" }}>Teşekkürler!</h2>
        <p style={{ margin: "0 0 24px", fontSize: 16, lineHeight: 1.7, color: "#33443B" }}>
          WhatsApp'ta açılan mesajı gönderdiyseniz ön kaydınız bize ulaşmıştır. Ekibimiz en kısa sürede sizi arayarak deneme antrenmanı için uygun gün ve saati birlikte planlayacak.
        </p>
        <button onClick={() => { setGonderildi(false); setForm({ veliAdi: "", telefon: "", sporcuAdi: "", mesaj: "", dogumYili: "", brans: "", sube: "" }); }} className="btn-yesil" style={{ fontSize: 15, padding: "13px 28px" }}>
          Yeni Kayıt Oluştur
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#ffffff", borderRadius: 20, padding: 40, boxShadow: "0 8px 32px rgba(12, 82, 49, 0.1)", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Veli Adı Soyadı *</span>
          <input value={form.veliAdi} onChange={degistir("veliAdi")} type="text" placeholder="Adınız ve soyadınız" style={alanStil} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Telefon *</span>
          <input value={form.telefon} onChange={degistir("telefon")} type="tel" placeholder="05XX XXX XX XX" style={alanStil} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Sporcunun Adı Soyadı *</span>
          <input value={form.sporcuAdi} onChange={degistir("sporcuAdi")} type="text" placeholder="Çocuğunuzun adı" style={alanStil} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Doğum Yılı *</span>
          <select value={form.dogumYili} onChange={degistir("dogumYili")} style={alanStil}>
            <option value="">Seçiniz</option>
            {dogumYillari.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Branş *</span>
          <select value={form.brans} onChange={degistir("brans")} style={alanStil}>
            <option value="">Seçiniz</option>
            {branslar.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={etiketStil}>Tercih Edilen Şube *</span>
          <select value={form.sube} onChange={degistir("sube")} style={alanStil}>
            <option value="">Seçiniz</option>
            {subeler.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <span style={etiketStil}>Eklemek İstedikleriniz</span>
        <textarea value={form.mesaj} onChange={degistir("mesaj")} rows={4} placeholder="Sorularınız veya belirtmek istedikleriniz (isteğe bağlı)" style={{ ...alanStil, resize: "vertical" }} />
      </label>
      {hata && (
        <div style={{ background: "#FDECEA", border: "1px solid #F5C6C2", color: "#B02820", borderRadius: 10, padding: "12px 16px", fontSize: 14, fontWeight: 700 }}>
          Lütfen yıldızlı (*) alanların tümünü doldurun.
        </div>
      )}
      <button
        onClick={() => {
          const eksik = !form.veliAdi.trim() || !form.telefon.trim() || !form.sporcuAdi.trim() || !form.dogumYili || !form.brans || !form.sube;
          if (eksik) { setHata(true); return; }
          setHata(false);
          // Formu WhatsApp mesajı olarak seçilen şubenin hattına gönder
          window.open(waOnKayit(form), "_blank", "noopener");
          setGonderildi(true);
        }}
        className="btn-kirmizi"
        style={{ fontSize: 16, fontWeight: 900, padding: "16px 32px" }}
      >
        WhatsApp ile Gönder
      </button>
      <p style={{ margin: 0, fontSize: 13, color: "#6B7A70", fontWeight: 600, textAlign: "center" }}>
        Gönder butonu, bilgilerinizi hazır mesaj olarak WhatsApp'ta açar — mesajı siz onaylayıp gönderirsiniz. Ayrıntılar: <a href="/kvkk" style={{ color: "#157A46", fontWeight: 800 }}>KVKK ve Çerez Politikası</a>.
      </p>
    </div>
  );
}

export default function OnKayit() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />
      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: 44, fontWeight: 900 }}>Ön Kayıt Formu</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#DFF0E5" }}>Formu doldurun; ekibimiz sizi arayarak deneme antrenmanına davet etsin</p>
        </div>
      </section>
      <section style={{ background: "#EEF6F0" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
          <Suspense fallback={null}>
            <KayitFormu />
          </Suspense>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
