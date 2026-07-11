import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";
import CtaBand from "@/components/CtaBand";

export const metadata = { title: "Branşlarımız — Avrupa Karşıyaka Spor Kulübü" };

const branslar = [
  {
    id: "basketbol", ad: "Basketbol", arka: "#ffffff", tersDizilim: false,
    metin: "Basketbol okulumuzda top sürme, pas, şut ve savunma gibi temel beceriler doğru teknikle öğretilir; ilerleyen seviyelerde takım oyunu, hücum-savunma organizasyonları ve maç içi karar verme becerileri geliştirilir. Antrenmanlar yaş gruplarına ve seviyeye göre ayrılmış gruplarda yürütülür.",
    maddeler: ["Yaş grubu: 4–16 yaş", "Seviyeye göre gruplandırma: başlangıç / orta / ileri", "Fiziksel gelişim: kuvvet, hız, çeviklik ve koordinasyon çalışmaları"],
  },
  {
    id: "voleybol", ad: "Voleybol", arka: "#EEF6F0", tersDizilim: true,
    metin: "Voleybol okulumuzda parmak pas, manşet, servis ve smaç teknikleri temelden ileri seviyeye doğru biyomekanikle öğretilir. Takım sporu olması sayesinde sporcularımızda yardımlaşma, iletişim ve birlikte hedefe yürüme bilinci gelişir; el-göz koordinasyonu ve denge becerileri güçlenir.",
    maddeler: ["Yaş grubu: 4–16 yaş", "Mini voleybol gruplarından takım antrenmanlarına geçiş", "Teknik + koordinasyon + takımdaşlık odaklı program"],
  },
  {
    id: "cimnastik", ad: "Cimnastik", arka: "#ffffff", tersDizilim: false,
    metin: "Tüm sporların temeli kabul edilen cimnastik; esneklik, denge, kuvvet ve vücut farkındalığını erken yaşta geliştirir. Programımız, oyun temelli hareket eğitiminden başlayarak temel cimnastik duruşları ve serilerine uzanır; çocuğunuzun estetik duruş ve özgüven kazanmasını destekler.",
    maddeler: ["Yaş grubu: 4–16 yaş", "Esneklik, denge ve koordinasyon gelişimi", "Diğer branşlara güçlü bir altyapı oluşturur"],
  },
];

function BransBolumu({ b }) {
  const gorsel = <ImageSlot placeholder={b.ad + " antrenman fotoğrafı"} height={380} radius={20} />;
  const icerik = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
      <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>BRANŞ</div>
      <h2 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#0C5231" }}>{b.ad}</h2>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#33443B" }}>{b.metin}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15, fontWeight: 700, color: "#157A46" }}>
        {b.maddeler.map((m) => <span key={m}>• {m}</span>)}
      </div>
      <Link href="/on-kayit" className="btn-kirmizi" style={{ fontSize: 15, padding: "13px 28px", marginTop: 6 }}>Ön Kayıt Yap</Link>
    </div>
  );
  return (
    <section id={b.id} style={{ background: b.arka }}>
      <div className={b.tersDizilim ? "hero-grid" : "iki-kolon-ters"} style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        {b.tersDizilim ? <>{icerik}{gorsel}</> : <>{gorsel}{icerik}</>}
      </div>
    </section>
  );
}

export default function Branslar() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />
      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: 44, fontWeight: 900 }}>Branşlarımız</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#DFF0E5" }}>4–16 yaş grubuna yönelik, yaş ve seviye gruplarına göre planlanan antrenman programları</p>
        </div>
      </section>
      {branslar.map((b) => <BransBolumu key={b.id} b={b} />)}
      <CtaBand
        baslik="Hangi branş çocuğunuza uygun?"
        metin="Ön kayıt formunu doldurun; ekibimiz yaş ve ilgiye göre en uygun grubu önersin."
      />
      <SiteFooter />
    </div>
  );
}
