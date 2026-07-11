"use client";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

// Ortak stiller
const kutu = { border: "2px solid #DCE9E0", borderRadius: 12, padding: "12px 16px", fontSize: 15, outline: "none", width: "100%", background: "#ffffff", color: "#1C2B22", fontFamily: "inherit" };
const etiket = { fontSize: 13, fontWeight: 800, color: "#0C5231", letterSpacing: 0.4 };
const butonYesil = { background: "#157A46", color: "#ffffff", border: "none", borderRadius: 999, padding: "12px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer" };
const kartStil = { background: "#ffffff", border: "1px solid #E2EDE5", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 4px 20px rgba(12, 82, 49, 0.06)" };
const satirStil = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, background: "#ffffff", border: "1px solid #E2EDE5", borderRadius: 12, padding: "12px 18px" };
const silButon = { background: "none", border: "2px solid #B02820", color: "#B02820", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", flexShrink: 0 };

const kategoriler = ["Duyurular", "Maç Sonuçları", "Turnuvalar", "Kamplar"];
const subeSecenekleri = ["Ataköy", "Esenler", "Kemerburgaz", "Güneşli", "Bahçelievler"];
const bransSecenekleri = ["Basketbol", "Voleybol", "Cimnastik"];

export default function Admin() {
  const supabase = getSupabase();
  const [oturum, setOturum] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [sekme, setSekme] = useState("haberler");
  const [mesaj, setMesaj] = useState("");

  // giriş
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");

  // haberler
  const [haberler, setHaberler] = useState([]);
  const [baslik, setBaslik] = useState("");
  const [kategori, setKategori] = useState("Duyurular");
  const [ozet, setOzet] = useState("");
  const [icerik, setIcerik] = useState("");
  const [gorselUrl, setGorselUrl] = useState("");
  const [skor, setSkor] = useState("");

  // kadro
  const [kadro, setKadro] = useState([]);
  const [kAd, setKAd] = useState("");
  const [kRol, setKRol] = useState("antrenor");
  const [kUnvan, setKUnvan] = useState("");
  const [kBrans, setKBrans] = useState("Basketbol");
  const [kSubeler, setKSubeler] = useState([]);
  const [kUzmanlik, setKUzmanlik] = useState("");
  const [kEtiketler, setKEtiketler] = useState("");
  const [kMesaj, setKMesaj] = useState("");
  const [kFoto, setKFoto] = useState("");
  const [kSira, setKSira] = useState(0);

  useEffect(() => {
    if (!supabase) { setYukleniyor(false); return; }
    supabase.auth.getSession().then(({ data }) => { setOturum(data.session); setYukleniyor(false); });
    const { data: dinleyici } = supabase.auth.onAuthStateChange((_e, s) => setOturum(s));
    return () => dinleyici.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (oturum) { haberleriYukle(); kadroyuYukle(); } }, [oturum]);

  async function haberleriYukle() {
    const { data } = await supabase.from("news").select("id, title, category, created_at").order("created_at", { ascending: false });
    setHaberler(data || []);
  }
  async function kadroyuYukle() {
    const { data } = await supabase.from("coaches").select("id, name, role, title, branch, sort_order").order("sort_order").order("created_at");
    setKadro(data || []);
  }

  async function girisYap(e) {
    e.preventDefault();
    setMesaj("");
    const { error } = await supabase.auth.signInWithPassword({ email: eposta, password: sifre });
    if (error) setMesaj("Giriş başarısız: " + error.message);
  }

  async function haberEkle(e) {
    e.preventDefault();
    setMesaj("");
    if (!baslik.trim() || !icerik.trim()) { setMesaj("Başlık ve içerik zorunludur."); return; }
    const { error } = await supabase.from("news").insert({
      title: baslik.trim(),
      content: icerik.trim(),
      image_url: gorselUrl.trim() || null,
      category: kategori,
      summary: ozet.trim() || null,
      score: skor.trim() || null,
    });
    if (error) { setMesaj("Kayıt hatası: " + error.message); return; }
    setMesaj("✓ Haber yayınlandı. Sitede en geç 5 dakika içinde görünür.");
    setBaslik(""); setOzet(""); setIcerik(""); setGorselUrl(""); setSkor("");
    haberleriYukle();
  }

  async function haberSil(id, ad) {
    if (!confirm('"' + ad + '" silinsin mi?')) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) { setMesaj("Silme hatası: " + error.message); return; }
    haberleriYukle();
  }

  function subeToggle(s) {
    setKSubeler((mevcut) => mevcut.includes(s) ? mevcut.filter((x) => x !== s) : [...mevcut, s]);
  }

  async function kadroEkle(e) {
    e.preventDefault();
    setMesaj("");
    if (!kAd.trim()) { setMesaj("Ad soyad zorunludur."); return; }
    if (kRol === "yonetici" && !kUnvan.trim()) { setMesaj("Yönetici için unvan zorunludur."); return; }
    const { error } = await supabase.from("coaches").insert({
      name: kAd.trim(),
      role: kRol,
      title: kRol === "yonetici" ? kUnvan.trim() : null,
      branch: kRol === "antrenor" ? kBrans : null,
      subeler: kRol === "antrenor" ? kSubeler : [],
      specialty: kRol === "antrenor" ? (kUzmanlik.trim() || null) : null,
      tags: kRol === "antrenor" ? kEtiketler.split(",").map((t) => t.trim()).filter(Boolean) : [],
      message: kRol === "yonetici" ? (kMesaj.trim() || null) : null,
      photo_url: kFoto.trim() || null,
      sort_order: Number(kSira) || 0,
    });
    if (error) { setMesaj("Kayıt hatası: " + error.message); return; }
    setMesaj("✓ Kişi eklendi. Sitede en geç 5 dakika içinde görünür.");
    setKAd(""); setKUnvan(""); setKSubeler([]); setKUzmanlik(""); setKEtiketler(""); setKMesaj(""); setKFoto(""); setKSira(0);
    kadroyuYukle();
  }

  async function kadroSil(id, ad) {
    if (!confirm('"' + ad + '" kadrodan silinsin mi?')) return;
    const { error } = await supabase.from("coaches").delete().eq("id", id);
    if (error) { setMesaj("Silme hatası: " + error.message); return; }
    kadroyuYukle();
  }

  if (!supabase) {
    return (
      <Kabuk>
        <div style={{ background: "#FFF7E6", border: "2px solid #F0D9A6", borderRadius: 14, padding: 24, fontSize: 15, lineHeight: 1.7, color: "#6B5619" }}>
          <strong>Supabase yapılandırılmamış.</strong><br />
          .env.local dosyasına NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY ekleyin (bkz. README, .env.local.example).
        </div>
      </Kabuk>
    );
  }

  if (yukleniyor) return <Kabuk><div style={{ color: "#4A5B50", fontWeight: 700 }}>Yükleniyor...</div></Kabuk>;

  if (!oturum) {
    return (
      <Kabuk>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900, color: "#0C5231" }}>Yönetici Girişi</h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#4A5B50", fontWeight: 600 }}>Hesabınız Supabase Dashboard &gt; Authentication &gt; Users bölümünden oluşturulur.</p>
        <form onSubmit={girisYap} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 380 }}>
          <label style={etiket}>E-posta
            <input type="email" value={eposta} onChange={(e) => setEposta(e.target.value)} style={{ ...kutu, marginTop: 6 }} required />
          </label>
          <label style={etiket}>Şifre
            <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} style={{ ...kutu, marginTop: 6 }} required />
          </label>
          <button type="submit" style={butonYesil}>Giriş Yap</button>
          {mesaj && <div style={{ color: "#B02820", fontSize: 14, fontWeight: 700 }}>{mesaj}</div>}
        </form>
      </Kabuk>
    );
  }

  return (
    <Kabuk>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[["haberler", "Haberler"], ["kadro", "Kadro"]].map(([k, ad]) => (
            <button key={k} onClick={() => { setSekme(k); setMesaj(""); }} style={{
              background: sekme === k ? "#0C5231" : "#ffffff",
              color: sekme === k ? "#ffffff" : "#0C5231",
              border: "2px solid #0C5231", borderRadius: 999, padding: "10px 26px", fontSize: 15, fontWeight: 800, cursor: "pointer",
            }}>{ad}</button>
          ))}
        </div>
        <button onClick={() => supabase.auth.signOut()} style={{ background: "#ffffff", color: "#B02820", border: "2px solid #B02820", borderRadius: 999, padding: "8px 20px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Çıkış</button>
      </div>

      {sekme === "haberler" && (
        <>
          <form onSubmit={haberEkle} style={kartStil}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#157A46" }}>YENİ HABER EKLE</div>
            <label style={etiket}>Başlık *
              <input value={baslik} onChange={(e) => setBaslik(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="Ör: U12 takımımızdan farklı galibiyet" />
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              <label style={etiket}>Kategori
                <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ ...kutu, marginTop: 6 }}>
                  {kategoriler.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </label>
              <label style={etiket}>Maç skoru (opsiyonel)
                <input value={skor} onChange={(e) => setSkor(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="AK U12 — 54 : 41 — Rakip" />
              </label>
            </div>
            <label style={etiket}>Kısa özet (kartta görünür; boşsa içeriğin ilk cümlesi kullanılır)
              <input value={ozet} onChange={(e) => setOzet(e.target.value)} style={{ ...kutu, marginTop: 6 }} />
            </label>
            <label style={etiket}>İçerik * (paragrafları boş satırla ayırın)
              <textarea value={icerik} onChange={(e) => setIcerik(e.target.value)} rows={8} style={{ ...kutu, marginTop: 6, resize: "vertical" }} />
            </label>
            <label style={etiket}>Görsel URL'si (opsiyonel)
              <input value={gorselUrl} onChange={(e) => setGorselUrl(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="https://... (Supabase Storage veya başka bir link)" />
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button type="submit" style={butonYesil}>Haberi Yayınla</button>
              {mesaj && <div style={{ color: mesaj.startsWith("✓") ? "#157A46" : "#B02820", fontSize: 14, fontWeight: 700 }}>{mesaj}</div>}
            </div>
          </form>

          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#157A46", marginBottom: 12 }}>YAYINDAKİ HABERLER ({haberler.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {haberler.map((h) => (
                <div key={h.id} style={satirStil}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#0C5231", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.title}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#4A5B50" }}>{h.category} · {new Date(h.created_at).toLocaleDateString("tr-TR")}</div>
                  </div>
                  <button onClick={() => haberSil(h.id, h.title)} style={silButon}>Sil</button>
                </div>
              ))}
              {haberler.length === 0 && <div style={{ color: "#4A5B50", fontSize: 14, fontWeight: 600 }}>Henüz haber yok.</div>}
            </div>
          </div>
        </>
      )}

      {sekme === "kadro" && (
        <>
          <form onSubmit={kadroEkle} style={kartStil}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#157A46" }}>KADROYA KİŞİ EKLE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              <label style={etiket}>Ad Soyad *
                <input value={kAd} onChange={(e) => setKAd(e.target.value)} style={{ ...kutu, marginTop: 6 }} />
              </label>
              <label style={etiket}>Görev
                <select value={kRol} onChange={(e) => setKRol(e.target.value)} style={{ ...kutu, marginTop: 6 }}>
                  <option value="antrenor">Antrenör</option>
                  <option value="yonetici">Yönetici</option>
                </select>
              </label>
            </div>

            {kRol === "yonetici" && (
              <>
                <label style={etiket}>Unvan *
                  <input value={kUnvan} onChange={(e) => setKUnvan(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="Ör: Kulüp Başkanı, Sportif Direktör" />
                </label>
                <label style={etiket}>Kısa mesaj / özgeçmiş (kartta görünür)
                  <textarea value={kMesaj} onChange={(e) => setKMesaj(e.target.value)} rows={3} style={{ ...kutu, marginTop: 6, resize: "vertical" }} />
                </label>
              </>
            )}

            {kRol === "antrenor" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                  <label style={etiket}>Branş
                    <select value={kBrans} onChange={(e) => setKBrans(e.target.value)} style={{ ...kutu, marginTop: 6 }}>
                      {bransSecenekleri.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </label>
                  <label style={etiket}>Uzmanlık
                    <input value={kUzmanlik} onChange={(e) => setKUzmanlik(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="Ör: Altyapı ve temel teknik gelişimi" />
                  </label>
                </div>
                <div>
                  <div style={{ ...etiket, marginBottom: 8 }}>Görev yaptığı şubeler</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {subeSecenekleri.map((s) => (
                      <button type="button" key={s} onClick={() => subeToggle(s)} style={{
                        background: kSubeler.includes(s) ? "#157A46" : "#ffffff",
                        color: kSubeler.includes(s) ? "#ffffff" : "#157A46",
                        border: "2px solid #157A46", borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer",
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <label style={etiket}>Etiketler (virgülle ayırın — lisans, deneyim, mezuniyet)
                  <input value={kEtiketler} onChange={(e) => setKEtiketler(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="TBF 2. Kademe Antrenör, 8 Yıl Deneyim, BESYO Mezunu" />
                </label>
              </>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              <label style={etiket}>Fotoğraf URL'si (opsiyonel)
                <input value={kFoto} onChange={(e) => setKFoto(e.target.value)} style={{ ...kutu, marginTop: 6 }} placeholder="https://..." />
              </label>
              <label style={etiket}>Sıra (küçük olan önce görünür)
                <input type="number" value={kSira} onChange={(e) => setKSira(e.target.value)} style={{ ...kutu, marginTop: 6 }} />
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button type="submit" style={butonYesil}>Kadroya Ekle</button>
              {mesaj && <div style={{ color: mesaj.startsWith("✓") ? "#157A46" : "#B02820", fontSize: 14, fontWeight: 700 }}>{mesaj}</div>}
            </div>
          </form>

          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#157A46", marginBottom: 12 }}>MEVCUT KADRO ({kadro.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {kadro.map((k) => (
                <div key={k.id} style={satirStil}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#0C5231", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#4A5B50" }}>{k.role === "yonetici" ? "Yönetici · " + (k.title || "") : "Antrenör · " + (k.branch || "")}</div>
                  </div>
                  <button onClick={() => kadroSil(k.id, k.name)} style={silButon}>Sil</button>
                </div>
              ))}
              {kadro.length === 0 && <div style={{ color: "#4A5B50", fontSize: 14, fontWeight: 600 }}>Henüz kadroya kimse eklenmedi.</div>}
            </div>
          </div>
        </>
      )}
    </Kabuk>
  );
}

function Kabuk({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#EEF6F0" }}>
      <div style={{ background: "#0C5231", color: "#ffffff", padding: "18px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: 16, fontWeight: 900, letterSpacing: 0.4 }}>Avrupa Karşıyaka — Yönetici Paneli</div>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 24px 72px" }}>{children}</div>
    </div>
  );
}
