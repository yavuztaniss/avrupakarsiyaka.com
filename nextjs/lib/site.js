// Kulüp genel bilgileri — gerçek bilgiler geldiğinde burayı güncelleyin.
export const iletisim = {
  telefon: "+90 5XX XXX XX XX",
  eposta: "info@avrupakarsiyaka.com",
  instagram: "@avrupakarsiyaka",
  instagramUrl: "https://www.instagram.com/avrupakarsiyaka",
};

export const navLinkleri = [
  { href: "/", ad: "Ana Sayfa" },
  { href: "/hakkimizda", ad: "Hakkımızda" },
  { href: "/branslar", ad: "Branşlar" },
  { href: "/kadromuz", ad: "Kadromuz" },
  { href: "/haberler", ad: "Haberler" },
  { href: "/iletisim", ad: "İletişim" },
];

export const subeler = [
  { ad: "Bahçelievler", tel: "905000000005", okul: "[Bahçelievler Okul Adı]", adres: "Cumhuriyet Mah., Mevlana Cd. No:3, 34186 Bahçelievler / İstanbul", not: "Dede Korkut Anadolu Lisesi", sorgu: "Dede+Korkut+Anadolu+Lisesi+Mevlana+Cd+No:3+Bahçelievler+İstanbul" },
  { ad: "Ataköy", tel: "905000000001", okul: "[Ataköy Okul Adı]", adres: "Refet Bele Sk., 34158 Bakırköy / İstanbul", not: "", sorgu: "Refet+Bele+Sokak+Bakırköy+İstanbul" },
  { ad: "Güneşli", tel: "905000000004", okul: "[Güneşli Okul Adı]", adres: "Barbaros Mah., 201. Sk. No:11, 34203 Bağcılar / İstanbul", not: "", sorgu: "Barbaros+Mah+201+Sk+No:11+Bağcılar+İstanbul" },
  { ad: "Kemerburgaz", tel: "905000000003", okul: "[Kemerburgaz Okul Adı]", adres: "Mimar Sinan Mah., İstanbul Cd. No:54, 34065 Eyüpsultan / İstanbul", not: "", sorgu: "Mimar+Sinan+Mah+İstanbul+Cd+No:54+Eyüpsultan+İstanbul" },
  { ad: "Esenler", tel: "905000000002", okul: "[Esenler Okul Adı]", adres: "Yavuz Selim Mah., İstanbul Cad. Mehtap Sk. No:1, 34220 Esenler / İstanbul", not: "", sorgu: "Yavuz+Selim+Mah+Mehtap+Sk+No:1+Esenler+İstanbul" },
];

export const harita = (sube) => "https://www.google.com/maps/search/?api=1&query=" + sube.sorgu;
export const waLink = (sube) => "https://wa.me/" + sube.tel + "?text=" + encodeURIComponent("Merhaba, " + sube.okul + " bünyesindeki " + sube.ad + " şubeniz ve antrenman programı hakkında bilgi almak istiyorum.");

// Ön kayıt formunu, seçilen şubenin WhatsApp hattına hazır mesaj olarak açar.
// Şube seçilmemişse/eşleşmezse ilk şubenin hattı kullanılır.
export const waOnKayit = (form) => {
  const sube = subeler.find((s) => s.ad === form.sube) || subeler[0];
  const satirlar = [
    "ÖN KAYIT TALEBİ",
    "Veli: " + form.veliAdi,
    "Telefon: " + form.telefon,
    "Sporcu: " + form.sporcuAdi + " (" + form.dogumYili + ")",
    "Branş: " + form.brans,
    "Şube: " + form.sube,
  ];
  if (form.mesaj && form.mesaj.trim()) satirlar.push("Not: " + form.mesaj.trim());
  return "https://wa.me/" + sube.tel + "?text=" + encodeURIComponent(satirlar.join("\n"));
};
