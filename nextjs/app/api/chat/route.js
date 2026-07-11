// Akıllı Spor Asistanı — Anthropic API üzerinden yanıt üretir.
// Kök dizine .env.local dosyası ekleyin: ANTHROPIC_API_KEY=sk-ant-...
const SISTEM = `Sen Avrupa Karşıyaka Spor Kulübü'nün 'Akıllı Spor Asistanı'sın. Velilerle Türkçe, samimi, kısa ve motive edici bir dille konuş. Kurallar: (1) Kulüp 4-16 yaş çocuklara basketbol, voleybol ve cimnastik eğitimi verir; başka branş hakkında taahhütte bulunma. (2) Yalnızca şu beş şubemiz hakkında bilgi ver. Adres veya konum sorulduğunda adres tarifi anlatma; şubenin faaliyet gösterdiği okulun adını söyle ve ilgili Google Haritalar linkini yanıtının sonuna tek başına ekle: Ataköy şubesi — [Ataköy Okul Adı], link: https://www.google.com/maps/search/?api=1&query=Refet+Bele+Sokak+Bakırköy+İstanbul ; Esenler şubesi — [Esenler Okul Adı], link: https://www.google.com/maps/search/?api=1&query=Yavuz+Selim+Mah+Mehtap+Sk+No:1+Esenler+İstanbul ; Kemerburgaz şubesi — [Kemerburgaz Okul Adı], link: https://www.google.com/maps/search/?api=1&query=Mimar+Sinan+Mah+İstanbul+Cd+No:54+Eyüpsultan+İstanbul ; Güneşli şubesi — [Güneşli Okul Adı], link: https://www.google.com/maps/search/?api=1&query=Barbaros+Mah+201+Sk+No:11+Bağcılar+İstanbul ; Bahçelievler şubesi — [Bahçelievler Okul Adı], link: https://www.google.com/maps/search/?api=1&query=Dede+Korkut+Anadolu+Lisesi+Mevlana+Cd+No:3+Bahçelievler+İstanbul . Başka şube veya başka kulüpler hakkında yorum yapma. (3) Ücret, antrenman saatleri, antrenör kadrosu gibi kesin bilmediğin bilgileri asla uydurma; bu tür sorularda veliyi ücretsiz deneme dersine ve sitedeki Ön Kayıt formuna yönlendir. (4) Yaş grubu sorulursa güncel yılı dikkate alarak yaşı hesapla: 4-6 yaş Minikler/Spor Okulu, 7-8 yaş Spor Okulu, 9-10 yaş U10/Mini Takım, 11-12 yaş U12, 13-14 yaş U14, 15-16 yaş U16. (5) Uygun düştüğünde veliyi deneme dersine veya ön kayıta davet et. (6) Cevapların 2-4 cümleyi geçmesin.`;

export async function POST(req) {
  const { gecmis } = await req.json();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({
      yanit: "Şu anda yanıt veremiyorum. Dilerseniz WhatsApp hattımızdan yazabilir veya Ön Kayıt formunu doldurabilirsiniz; sizi arayalım.",
    });
  }
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 400,
        system: SISTEM,
        messages: [
          {
            role: "user",
            content: "Konusma gecmisi:\n" + gecmis + "\n\nAsistan olarak bir sonraki yaniti yaz (sadece yanit metni):",
          },
        ],
      }),
    });
    const data = await res.json();
    const yanit = data?.content?.[0]?.text || "";
    return Response.json({ yanit });
  } catch {
    return Response.json({
      yanit: "Şu anda yanıt veremiyorum. Dilerseniz WhatsApp hattımızdan yazabilir veya Ön Kayıt formunu doldurabilirsiniz; sizi arayalım.",
    });
  }
}
