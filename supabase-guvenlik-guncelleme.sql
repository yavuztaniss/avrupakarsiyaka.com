-- ============================================================================
-- GÜVENLİK SIKILAŞTIRMASI — bunu SQL Editor'de RUN edin (tek seferlik, güvenli
-- şekilde tekrar çalıştırılabilir).
--
-- Önceki kurulumda "authenticated" (yani giriş yapmış HERHANGİ bir kullanıcı)
-- veritabanına yazabiliyordu. Supabase projelerinde varsayılan olarak herkes
-- kendine ücretsiz hesap açabildiği için, bu satır sizin bilginiz dışında
-- birinin siteye üye olup içeriği değiştirmesine / ön kayıt verilerini
-- okumasına izin verebilirdi. Artık yazma/okuma yetkisi sadece aşağıda
-- kayıtlı e-postalara (admin_kullanicilar tablosu) veriliyor.
-- ============================================================================

-- 1) Yönetici listesi — sadece SQL Editor'den (siz) değiştirilebilir,
--    hiçbir public/anon/authenticated istek bu tabloyu okuyamaz/yazamaz.
create table if not exists public.admin_kullanicilar (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_kullanicilar enable row level security;
-- Kasıtlı olarak HİÇ policy yok: bu tabloya normal API isteğiyle erişilemez.

-- 2) Giriş yapan kullanıcının yönetici olup olmadığını kontrol eden fonksiyon.
create or replace function public.admin_mi()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_kullanicilar where user_id = auth.uid()
  );
$$;

-- 3) icerik tablosu: yazma yetkisi artık sadece admin_mi() = true olanlarda.
drop policy if exists "icerik yonetici ekler" on public.icerik;
create policy "icerik yonetici ekler" on public.icerik
  for insert to authenticated with check (public.admin_mi());

drop policy if exists "icerik yonetici gunceller" on public.icerik;
create policy "icerik yonetici gunceller" on public.icerik
  for update to authenticated using (public.admin_mi()) with check (public.admin_mi());

drop policy if exists "icerik yonetici siler" on public.icerik;
create policy "icerik yonetici siler" on public.icerik
  for delete to authenticated using (public.admin_mi());

-- 4) onkayitlar (ön kayıt başvuruları): okuma yetkisi sadece adminde.
drop policy if exists "onkayit yonetici okur" on public.onkayitlar;
create policy "onkayit yonetici okur" on public.onkayitlar
  for select to authenticated using (public.admin_mi());

-- 5) Fotoğraf deposu: yükleme/değiştirme/silme sadece adminde.
drop policy if exists "gorseller yonetici yukler" on storage.objects;
create policy "gorseller yonetici yukler" on storage.objects
  for insert to authenticated with check (bucket_id = 'gorseller' and public.admin_mi());

drop policy if exists "gorseller yonetici gunceller" on storage.objects;
create policy "gorseller yonetici gunceller" on storage.objects
  for update to authenticated using (bucket_id = 'gorseller' and public.admin_mi());

drop policy if exists "gorseller yonetici siler" on storage.objects;
create policy "gorseller yonetici siler" on storage.objects
  for delete to authenticated using (bucket_id = 'gorseller' and public.admin_mi());

-- 6) ÖNEMLİ — kendi hesabınızı yönetici olarak kaydedin.
--    Aşağıdaki e-postayı panel.html'de giriş yaptığınız kendi e-postanızla
--    değiştirip çalıştırın (tırnak işaretlerini koruyun):
insert into public.admin_kullanicilar (user_id)
select id from auth.users where email = 'BURAYA-KENDI-EPOSTANIZI-YAZIN@ornek.com'
on conflict (user_id) do nothing;

-- Kontrol: aşağıdaki sorgu sizi listelemeli (1 satır dönmeli).
select u.email, a.user_id
from public.admin_kullanicilar a
join auth.users u on u.id = a.user_id;
