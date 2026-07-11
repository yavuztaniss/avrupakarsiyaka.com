import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";

export const metadata = { title: "Hakkımızda — Avrupa Karşıyaka Spor Kulübü" };

const degerler = [
  { ad: "Disiplin", renk: "#157A46", metin: "Düzenli ve planlı çalışma alışkanlığı, sporcularımızın hem sahada hem okulda fark yaratmasını sağlar." },
  { ad: "Takımdaşlık", renk: "#D0342C", metin: "Birlikte kazanmayı ve birlikte gelişmeyi öğreten takım kültürü, kulübümüzün temelidir." },
  { ad: "Spor Ahlakı", renk: "#157A46", metin: "Centilmenlik ve saygı; kazandığımız her başarının önünde tutulan vazgeçilmez değerlerimizdir." },
];

export default function Hakkimizda() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />

      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: 44, fontWeight: 900 }}>Hakkımızda</h1>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#DFF0E5" }}>Karşıyaka geleneğini İstanbul'un gençlik potansiyeliyle buluşturuyoruz</p>
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>MİSYONUMUZ VE AMACIMIZ</div>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>Güçlü bireyler, ahlaklı sporcular</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#33443B" }}>
              Amacımız; sporun disiplinini, dostluğunu ve centilmenliğini genç nesillere aktararak, onları hem fiziksel hem de zihinsel olarak güçlü bireyler halinde geleceğe hazırlamaktır. Alt yapımızda yetişen sporcularımıza sadece teknik ve taktik beceriler kazandırmakla kalmıyor; disiplinli çalışma alışkanlığı, takımdaşlık bilinci ve spor ahlakını aşılamayı hedefliyoruz.
            </p>
          </div>
          <ImageSlot placeholder="Antrenman / takım fotoğrafı" height={360} radius={20} />
        </div>
      </section>

      <section style={{ background: "#EEF6F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {degerler.map((d) => (
              <div key={d.ad} style={{ background: "#ffffff", borderRadius: 16, padding: 28, borderTop: "4px solid " + d.renk, boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 900, color: "#0C5231" }}>{d.ad}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#4A5B50" }}>{d.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div className="iki-kolon-ters" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <ImageSlot placeholder="Kulüp fotoğrafı" height={360} radius={20} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ color: "#D0342C", fontSize: 13, fontWeight: 800, letterSpacing: 2.4 }}>KARŞIYAKA SK İLE BAĞIMIZ</div>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#0C5231", lineHeight: 1.15 }}>Tarihi bir geleneğin İstanbul'daki temsilcisi</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#33443B" }}>
              Kulübümüz, Karşıyaka SK'nin vizyonunu ve spor kültürünü İstanbul'daki geniş gençlik potansiyeliyle buluşturmaktadır. Tarihi başarılarla dolu Karşıyaka geleneklerini referans alarak, İstanbul genelindeki şubelerimizde geleceğin yetenekli ve ahlaklı sporcularını Türk sporuna kazandırmak için kararlılıkla çalışıyoruz.
            </p>
            <Link href="/on-kayit" className="btn-kirmizi" style={{ fontSize: 15, padding: "13px 28px", marginTop: 6, alignSelf: "flex-start" }}>Ailemize Katılın</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
