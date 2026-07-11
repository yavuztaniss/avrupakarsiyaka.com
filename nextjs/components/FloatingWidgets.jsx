"use client";
import { useEffect, useRef, useState } from "react";
import { subeler, harita, waLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const panelStil = {
  position: "fixed", right: 24, bottom: 164, width: 320, maxWidth: "calc(100vw - 48px)",
  background: "#ffffff", borderRadius: 18, boxShadow: "0 16px 48px rgba(0, 0, 0, 0.24)",
  zIndex: 70, overflow: "hidden", animation: "yukariKay 0.25s ease-out",
};

const hizliSorular = [
  "Çocuğumun yaş grubuna uygun antrenmanlar hangileri?",
  "Şubeleriniz hangi okullarda bulunuyor ve harita konumları nerede?",
  "Bahçelievler veya diğer şubelerde deneme dersi nasıl yapılıyor?",
];

export default function FloatingWidgets() {
  const [waAcik, setWaAcik] = useState(false);
  const [chatAcik, setChatAcik] = useState(false);
  const [mesajlar, setMesajlar] = useState([
    { bot: true, linkler: [], text: "Merhaba! Ben Avrupa Karşıyaka Akıllı Spor Asistanı'yım. Çocuğunuz için en uygun branş, yaş grubu ve şube konusunda size yardımcı olabilirim. Nasıl yardımcı olayım?" },
  ]);
  const [chatYazi, setChatYazi] = useState("");
  const [yaziyor, setYaziyor] = useState(false);
  const [hizliGoster, setHizliGoster] = useState(true);
  const kutuRef = useRef(null);

  useEffect(() => {
    if (kutuRef.current) kutuRef.current.scrollTop = kutuRef.current.scrollHeight;
  }, [mesajlar, yaziyor]);

  async function gonder(hazir) {
    const metin = (typeof hazir === "string" ? hazir : chatYazi).trim();
    if (!metin || yaziyor) return;
    const yeni = [...mesajlar, { bot: false, text: metin }];
    setMesajlar(yeni);
    setChatYazi("");
    setYaziyor(true);
    setHizliGoster(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gecmis: yeni.slice(1).map((m) => (m.bot ? "Asistan: " : "Veli: ") + m.text).join("\n") }),
      });
      const data = await res.json();
      const yanit = data.yanit || "";
      const linkler = (yanit.match(/https?:\/\/[^\s)]+/g) || []).map((url) => ({ url, ad: "Haritada Aç →" }));
      const temiz = yanit.replace(/\(?https?:\/\/[^\s)]+\)?/g, "").replace(/[ \t]+/g, " ").replace(/ ?link: ?/gi, " ").trim();
      setMesajlar((m) => [...m, { bot: true, linkler, text: temiz || yanit }]);
    } catch {
      setMesajlar((m) => [...m, { bot: true, linkler: [], text: "Şu anda yanıt veremiyorum. Dilerseniz WhatsApp hattımızdan yazabilir veya Ön Kayıt formunu doldurabilirsiniz; sizi arayalım." }]);
    }
    setYaziyor(false);
  }

  return (
    <>
      {waAcik && (
        <div style={panelStil}>
          <div style={{ background: "#157A46", color: "#ffffff", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900 }}>WhatsApp Hattımız</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#DFF0E5" }}>Şubenizi seçin, hemen yazın</div>
            </div>
            <button onClick={() => setWaAcik(false)} title="Kapat" style={{ background: "rgba(255,255,255,0.16)", border: "none", color: "#ffffff", width: 30, height: 30, borderRadius: "50%", fontSize: 14, fontWeight: 800, cursor: "pointer", flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 10, maxHeight: "min(440px, calc(100vh - 320px))", overflowY: "auto" }}>
            {subeler.map((s) => (
              <div key={s.ad} style={{ display: "flex", flexDirection: "column", gap: 9, padding: 12, borderRadius: 12, background: "#F7FBF8", border: "1px solid #E2EDE5" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#1C2B22" }}>{s.ad} Şubesi</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#4A5B50" }}>{s.okul}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href={harita(s)} target="_blank" rel="noopener" className="btn-cerceve-yesil" style={{ flex: 1, textAlign: "center", fontSize: 12, padding: "7px 0", borderWidth: 1.5 }}>Yol Tarifi</a>
                  <a href={waLink(s)} target="_blank" rel="noopener" style={{ flex: 1, textAlign: "center", background: "#25A05F", color: "#ffffff", fontSize: 12, fontWeight: 800, padding: "8.5px 0", borderRadius: 999 }}>WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chatAcik && (
        <div style={{ ...panelStil, width: 360, height: 480, maxHeight: "calc(100vh - 200px)", zIndex: 71, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#157A46", color: "#ffffff", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900 }}>Akıllı Spor Asistanı</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#DFF0E5" }}>Avrupa Karşıyaka · Velilere özel</div>
            </div>
            <button onClick={() => setChatAcik(false)} title="Kapat" style={{ background: "rgba(255,255,255,0.16)", border: "none", color: "#ffffff", width: 30, height: 30, borderRadius: "50%", fontSize: 14, fontWeight: 800, cursor: "pointer", flexShrink: 0 }}>✕</button>
          </div>
          <div ref={kutuRef} style={{ flex: 1, overflowY: "auto", padding: 16, background: "#EEF6F0", display: "flex", flexDirection: "column", gap: 10 }}>
            {mesajlar.map((m, i) =>
              m.bot ? (
                <div key={i} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                  <div style={{ background: "#ffffff", color: "#1C2B22", borderRadius: "14px 14px 14px 4px", padding: "10px 14px", fontSize: 14, lineHeight: 1.55, boxShadow: "0 2px 8px rgba(12, 82, 49, 0.08)", whiteSpace: "pre-wrap" }}>{m.text}</div>
                  {(m.linkler || []).map((l, j) => (
                    <a key={j} href={l.url} target="_blank" rel="noopener" className="btn-yesil" style={{ fontSize: 13, padding: "8px 16px" }}>{l.ad}</a>
                  ))}
                </div>
              ) : (
                <div key={i} style={{ alignSelf: "flex-end", maxWidth: "85%", background: "#157A46", color: "#ffffff", borderRadius: "14px 14px 4px 14px", padding: "10px 14px", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{m.text}</div>
              )
            )}
            {yaziyor && (
              <div style={{ alignSelf: "flex-start", background: "#ffffff", borderRadius: "14px 14px 14px 4px", padding: "13px 16px", display: "flex", gap: 5, boxShadow: "0 2px 8px rgba(12, 82, 49, 0.08)" }}>
                {[0, 0.2, 0.4].map((d) => (
                  <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#157A46", animation: "noktaAtla 1.2s infinite", animationDelay: d + "s" }} />
                ))}
              </div>
            )}
            {hizliGoster && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                {hizliSorular.map((soru) => (
                  <button key={soru} onClick={() => gonder(soru)} className="btn-cerceve-yesil" style={{ background: "#ffffff", fontSize: 13, padding: "10px 14px", borderRadius: 12, textAlign: "left", lineHeight: 1.4 }}>
                    {soru}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, padding: 12, background: "#ffffff", borderTop: "1px solid #E2EDE5" }}>
            <input
              value={chatYazi}
              onChange={(e) => setChatYazi(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") gonder(); }}
              type="text"
              placeholder="Sorunuzu yazın..."
              style={{ flex: 1, border: "2px solid #DCE9E0", borderRadius: 999, padding: "11px 16px", fontSize: 14, outline: "none", color: "#1C2B22", minWidth: 0 }}
            />
            <button onClick={() => gonder()} className="btn-kirmizi" style={{ fontSize: 14, fontWeight: 900, padding: "0 20px" }}>Gönder</button>
          </div>
        </div>
      )}

      <button
        onClick={() => { setChatAcik(!chatAcik); setWaAcik(false); }}
        title="Akıllı Spor Asistanı"
        className="btn-kirmizi"
        style={{ position: "fixed", right: 24, bottom: 94, width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)", zIndex: 60, padding: 0 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 3C6.98 3 3 6.42 3 10.6c0 2.38 1.27 4.5 3.3 5.9-.14.9-.55 2.06-1.44 3.11-.18.21 0 .53.27.48 2.05-.36 3.52-1.2 4.4-1.86.79.18 1.62.27 2.47.27 5.02 0 9-3.42 9-7.6S17.02 3 12 3z" /></svg>
      </button>
      <button
        onClick={() => { setWaAcik(!waAcik); setChatAcik(false); }}
        title="WhatsApp şube hattı"
        style={{ position: "fixed", right: 24, bottom: 24, width: 58, height: 58, borderRadius: "50%", background: "#25D366", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)", zIndex: 60 }}
      >
        <WhatsAppIcon />
      </button>
    </>
  );
}
