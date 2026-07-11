import Link from "next/link";

export default function CtaBand({ baslik, metin, butonYazi = "Ön Kayıt Yap", butonHref = "/on-kayit" }) {
  return (
    <section style={{ background: "#D0342C", color: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 900, lineHeight: 1.2 }}>{baslik}</h2>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#FBDFDD" }}>{metin}</p>
        </div>
        <Link href={butonHref} className="btn-beyaz" style={{ fontSize: 16, padding: "16px 36px", whiteSpace: "nowrap" }}>
          {butonYazi}
        </Link>
      </div>
    </section>
  );
}
