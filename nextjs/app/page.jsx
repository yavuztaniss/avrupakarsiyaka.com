import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";
import CtaBand from "@/components/CtaBand";
import GrupBulucu from "@/components/GrupBulucu";
import { subeler, harita } from "@/lib/site";

const branslar = [
  { id: "basketbol", ad: "Basketbol", metin: "Temel becerilerden takım oyununa uzanan, yaş gruplarına göre planlanmış antrenman programı." },
  { id: "voleybol", ad: "Voleybol", metin: "Pas, smaç ve servis tekniklerinin yanında koordinasyon ve takımdaşlık bilinci kazandıran eğitim." },
  { id: "cimnastik", ad: "Cimnastik", metin: "Esneklik, denge ve vücut farkındalığını erken yaşta geliştiren, tüm sporların temeli olan branş." },
];

export default function AnaSayfa() {
  return (
    <div style={{ minWidth: 320 }}>
      <div style={{ background: "#D0342C", color: "#ffffff", textAlign: "center", padding: "9px 20px", fontSize: 14, fontWeight: 700 }}>
        2026–2027 sezonu ön kayıtlarımız başladı!{" "}
        <Link href="/on-kayit" style={{ color: "#ffffff", textDecoration: "underline", fontWeight: 800, marginLeft: 6 }}>Ön Kayıt →</Link>
      </div>
      <SiteHeader />

      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <span style={{ background: "#D0342C", color: "#ffffff", fontSize: 13, fontWeight: 800, letterSpacing: 1.6, padding: "7px 16px", borderRadius: 999 }}>4–16 YAŞ SPOR OKULU</span>
            <h1 style={{ margin: 0, fontSize: 52, fontWeight: 900, lineHeight: 1.08, letterSpacing: -0.5 }}>Karşıyaka ruhu<br />İstanbul'da yeşeriyor</h1>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 500, lineHeight: 1.65, color: "#DFF0E5", maxWidth: 480 }}>
              Basketbol, voleybol ve cimnastik branşlarında; disiplini, takımdaşlığı ve spor ahlakını merkeze alan antrenmanlarla geleceğin sporcularını yetiştiriyoruz. İstanbul'daki 5 şubemizde sizi bekliyoruz.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              <Link href="/on-kayit" className="btn-kirmizi" style={{ fontSize: 16, padding: "15px 32px" }}>Ön Kayıt Yap</Link>
              <Link href="/branslar" style={{ border: "2px solid #ffffff", color: "#ffffff", fontSize: 16, fontWeight: 800, padding: "13px 30px", borderRadius: 999 }}>Branşlarımız</Link>
            </div>
          </div>
          <ImageSlot placeholder="Antrenman fotoğrafınızı buraya koyun (public/hero.jpg → src='/hero.jpg')" height={400} radius={20} />
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4, marginBottom: 10 }}>BRANŞLARIMIZ</div>
            <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>Geleceğin sporcularını yetiştiriyoruz</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {branslar.map((b) => (
              <div key={b.id} style={{ background: "#ffffff", border: "1px solid #E2EDE5", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)" }}>
                <ImageSlot placeholder={b.ad + " fotoğrafı"} height={210} />
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#0C5231" }}>{b.ad}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#4A5B50", flex: 1 }}>{b.metin}</p>
                  <Link href={"/branslar#" + b.id} className="link-kirmizi" style={{ fontSize: 15 }}>Detaylı Bilgi →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#0C5231" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 36px" }}>
            <div style={{ color: "#DFF0E5", fontSize: 13, fontWeight: 800, letterSpacing: 2.4, marginBottom: 10 }}>GRUP BULUCU</div>
            <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: "#ffffff", lineHeight: 1.15 }}>Çocuğunuza en uygun grubu bulun</h2>
            <p style={{ margin: "12px 0 0", fontSize: 16, fontWeight: 500, color: "#DFF0E5" }}>Doğum yılını ve branşı seçin; uygun yaş grubunu ve şubeleri gösterelim.</p>
          </div>
          <GrupBulucu />
        </div>
      </section>

      <section style={{ background: "#EEF6F0" }}>
        <div className="iki-kolon-ters" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <ImageSlot placeholder="Kulüp / takım fotoğrafı" height={360} radius={20} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>HAKKIMIZDA</div>
            <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>Misyonumuz ve amacımız</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#33443B" }}>
              Amacımız; sporun disiplinini, dostluğunu ve centilmenliğini genç nesillere aktararak, onları hem fiziksel hem de zihinsel olarak güçlü bireyler halinde geleceğe hazırlamaktır. Kulübümüz, Karşıyaka SK'nin vizyonunu ve spor kültürünü İstanbul'daki geniş gençlik potansiyeliyle buluşturmaktadır.
            </p>
            <Link href="/hakkimizda" className="btn-yesil" style={{ fontSize: 15, padding: "13px 28px", marginTop: 6 }}>Devamını Oku</Link>
          </div>
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4, marginBottom: 10 }}>ŞUBELERİMİZ</div>
            <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>İstanbul'un 5 noktasındayız</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {subeler.map((s) => (
              <div key={s.ad} style={{ border: "1px solid #E2EDE5", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)" }}>
                <div style={{ background: "#157A46", color: "#ffffff", padding: "14px 20px", fontSize: 17, fontWeight: 900 }}>{s.ad}</div>
                <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#4A5B50", flex: 1 }}>{s.adres}</p>
                  <a href={harita(s)} target="_blank" rel="noopener" className="link-kirmizi" style={{ fontSize: 14 }}>Yol Tarifi →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        baslik="Çocuğunuz için ilk adımı atın"
        metin="Ön kayıt formunu doldurun, ekibimiz sizi arayarak deneme antrenmanına davet etsin."
      />
      <SiteFooter />
    </div>
  );
}
