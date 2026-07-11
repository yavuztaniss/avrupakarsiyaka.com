# Avrupa Karşıyaka Spor Kulübü — Next.js

## Kurulum
```bash
npm install
npm run dev
```
http://localhost:3000

## Yayınlama
En kolayı Vercel: repo'yu GitHub'a itin, vercel.com'da "Import Project" deyin.

## Akıllı Spor Asistanı
Chat, `app/api/chat/route.js` üzerinden Anthropic API kullanır.
Kök dizine `.env.local` dosyası ekleyin:
```
ANTHROPIC_API_KEY=sk-ant-...
```
Anahtar yoksa asistan kibar bir yedek mesaj döner, site çalışmaya devam eder.

## Haberler (Supabase) — kurulum
1. supabase.com'da ücretsiz proje açın.
2. Dashboard > SQL Editor > `supabase/schema.sql` içeriğini yapıştırıp Run deyin (tablo + güvenlik politikaları).
3. Dashboard > Authentication > Users > "Add user" ile kendi e-posta/şifrenizi oluşturun (yönetici hesabı — sitede kayıt yolu yoktur, başkası açamaz).
4. Dashboard > Settings > API'den URL ve anon key'i kopyalayıp `.env.local` dosyasına ekleyin (bkz. `.env.local.example`).
5. `npm install` (yeni bağımlılık: @supabase/supabase-js).
6. `/admin` sayfasından giriş yapıp haber ekleyin — /haberler sayfası veritabanından beslenir (5 dk önbellek).
7. Kadro için `supabase/kadro.sql` dosyasını da SQL Editor'de çalıştırın — /admin'de \"Kadro\" sekmesi açılır, /kadromuz sayfası veritabanından beslenir.

Görseller için: Dashboard > Storage'da "public" bucket açıp yüklediğiniz dosyanın public URL'sini formdaki "Görsel URL'si" alanına yapıştırın.

## Doldurulacak alanlar
- Telefon numaraları (+90 5XX...), okul adları ([Okul Adı]) → `lib/site.js`
- Yönetici/antrenör bilgileri → /admin panelindeki Kadro sekmesinden (Supabase)
- Haberler → /admin panelinden (Supabase)
- Görseller → `public/` klasörüne koyup ImageSlot'a `src` verin.
