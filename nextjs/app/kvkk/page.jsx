import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// NOT: Bu metin genel bilgilendirme amaçlı bir taslaktır; yayına almadan önce
// bir hukuk danışmanına kontrol ettirilmesi önerilir. [KÖŞELİ PARANTEZLİ] alanları doldurun.

const h2 = { margin: "36px 0 12px", fontSize: 22, fontWeight: 900, color: "#0C5231" };
const h3 = { margin: "24px 0 8px", fontSize: 17, fontWeight: 800, color: "#0C5231" };
const p = { margin: "0 0 12px", fontSize: 15, lineHeight: 1.75, color: "#33443B" };
const ul = { margin: "0 0 12px", paddingLeft: 22, fontSize: 15, lineHeight: 1.75, color: "#33443B", display: "flex", flexDirection: "column", gap: 6 };

export default function Kvkk() {
  return (
    <div style={{ minWidth: 320 }}>
      <SiteHeader />
      <section style={{ background: "#0C5231", color: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 38, fontWeight: 900 }}>KVKK ve Çerez Politikası</h1>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "#DFF0E5" }}>Kişisel verilerinizin korunması bizim için önceliklidir</p>
        </div>
      </section>

      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 80px" }}>

          <h2 style={h2}>Kişisel Verilerin Korunması Hakkında Aydınlatma Metni</h2>
          <p style={p}>
            İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla
            hareket eden <strong>Avrupa Karşıyaka Spor Kulübü</strong> ("Kulüp") tarafından, kişisel verilerinizin işlenmesine
            ilişkin olarak sizleri bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <h3 style={h3}>1. Veri Sorumlusu</h3>
          <p style={p}>
            Avrupa Karşıyaka Spor Kulübü<br />
            Adres: [KULÜP MERKEZ ADRESİ]<br />
            E-posta: info@avrupakarsiyaka.com
          </p>

          <h3 style={h3}>2. İşlenen Kişisel Veriler</h3>
          <p style={p}>Web sitemizdeki ön kayıt ve iletişim formları aracılığıyla aşağıdaki kişisel veriler işlenmektedir:</p>
          <ul style={ul}>
            <li><strong>Veliye ait:</strong> ad, soyad, telefon numarası</li>
            <li><strong>Sporcuya (çocuğa) ait:</strong> ad, soyad, doğum yılı, tercih edilen branş ve şube</li>
            <li>Formda isteğe bağlı olarak paylaştığınız ek bilgiler</li>
          </ul>

          <h3 style={h3}>3. İşleme Amaçları</h3>
          <ul style={ul}>
            <li>Ön kayıt talebinizin alınması ve tarafınızla iletişime geçilmesi</li>
            <li>Deneme antrenmanı planlaması ve kayıt süreçlerinin yürütülmesi</li>
            <li>Sorularınızın yanıtlanması ve talep yönetimi</li>
          </ul>

          <h3 style={h3}>4. İşlemenin Hukuki Sebebi ve Aktarım</h3>
          <p style={p}>
            Kişisel verileriniz, KVKK md. 5/2-c ("bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması")
            ve md. 5/2-f ("veri sorumlusunun meşru menfaati") hukuki sebeplerine dayanılarak işlenir. Ön kayıt formu
            gönderiminiz WhatsApp uygulaması üzerinden iletildiğinden, form içeriği WhatsApp LLC'nin (Meta) hizmet
            altyapısı üzerinden aktarılır; WhatsApp'ın kendi gizlilik politikası ayrıca geçerlidir. Verileriniz bunun
            dışında üçüncü kişilerle paylaşılmaz, yurt dışına aktarılmaz ve pazarlama amaçlı kullanılmaz.
          </p>

          <h3 style={h3}>5. Saklama Süresi</h3>
          <p style={p}>
            Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı
            süreleri saklı kalmak kaydıyla saklanır; sürenin sonunda silinir, yok edilir veya anonim hale getirilir.
          </p>

          <h3 style={h3}>6. KVKK Kapsamındaki Haklarınız</h3>
          <p style={p}>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini talep etme, otomatik sistemlerle analiz sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz.</p>
          <p style={p}>
            Taleplerinizi <strong>info@avrupakarsiyaka.com</strong> adresine yazılı olarak iletebilirsiniz. Başvurunuz en geç
            30 gün içinde ücretsiz olarak sonuçlandırılır.
          </p>

          <h2 style={h2}>Çerez Politikası (Cookie Policy)</h2>

          <h3 style={h3}>1. Çerez Nedir?</h3>
          <p style={p}>
            Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük
            metin dosyalarıdır.
          </p>

          <h3 style={h3}>2. Sitemizde Kullanılan Çerezler</h3>
          <ul style={ul}>
            <li>
              <strong>Zorunlu / işlevsel çerezler:</strong> Sitenin temel işlevlerinin çalışması için gereklidir
              (ör. sayfalar arası gezinme durumu). Bu çerezler kimliğinizi tanımlamaz.
            </li>
            <li>
              <strong>Üçüncü taraf çerezleri:</strong> Sayfalarımızda kullanılan Google Fonts gibi harici hizmetler
              kendi çerezlerini kullanabilir. Ayrıca WhatsApp'a yönlendiren bağlantılar, WhatsApp'ın kendi çerez
              politikasına tabidir.
            </li>
          </ul>
          <p style={p}>
            Sitemizde şu an için reklam veya pazarlama amaçlı çerez <strong>kullanılmamaktadır</strong>. Analitik bir araç
            (ör. Google Analytics) eklenmesi hâlinde bu politika güncellenir.
          </p>

          <h3 style={h3}>3. Çerezleri Nasıl Kontrol Edersiniz?</h3>
          <p style={p}>
            Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi
            hâlinde sitenin bazı bölümleri beklendiği gibi çalışmayabilir.
          </p>

          <p style={{ ...p, marginTop: 32, fontSize: 13, color: "#4A5B50" }}>
            Son güncelleme: Temmuz 2026 · Bu metinler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
