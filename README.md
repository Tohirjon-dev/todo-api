# 📦 Todo API (NestJS)

Ushbu loyiha `NestJS` asosida qurilgan REST API bo‘lib, autentifikatsiya, foydalanuvchilar bilan ishlash va tokenlar asosida tizimga kirish/chiqish funksiyalarini taqdim etadi. Loyihaning maqsadi — backend logikasini modular va scalable tarzda yozishdir.

## 📌 Loyixa haqida qisqacha ma'lumot

Strukturaviy jihatdan loyixa imkon qadar microservicelarga bo‘lingan. Har bir modul o‘z vazifasi bilan chegaralangan. Loyixada `common` papkasi orqali umumiy foydalaniladigan komponentlar (guard, interceptor, filter, type, interface, config va h.k.) saqlanadi.

Parol ni bazaga bcrypt orqali heshlab saqladim bu esa havfsizlik uchun 




## 🧱 Loyiha tuzilmasi

src/
│
├── common/ # Guardlar, configlar, interceptorlar, util funksiyalar
│ ├── config/
│ ├── filters/
│ ├── guards/
│ ├── interceptors/
│ └── utils/
│
├── modules/
│ ├── auth/ # Login, Register, Forgot-password, Reset-password
│ ├── users/ # Foydalanuvchilar bilan ishlash
│ ├── super-admin/ # Super admin moduli
│ ├── admin/ # Admin moduli
│ └── jwt/
│ ├── token/ # Token service
│ ├── access/ # Access token moduli
│ └── refresh/ # Refresh token moduli
│
├── prisma/ # Prisma config va schema
├── app.module.ts # Bosh modul
└── main.ts # Kirish nuqtasi



## ⚙️ Ishlatilgan texnologiyalar

| Texnologiya         | Maqsadi                          |
|---------------------|----------------------------------|
| NestJS              | Backend framework                |
| PostgreSQL          | Ma'lumotlar bazasi               |
| Prisma ORM          | ORM va migrationlar              |
| bcrypt              | Parolni xashlash uchun           |
| cookie-parser       | Cookie'lar bilan ishlash         |
| @nestjs/jwt         | JWT tokenlar                     |
| @nestjs/config       | ENV bilan ishlash                |
| class-validator     | DTO validatsiyasi                |
| class-transformer   | DTO transformatsiyasi            |


🔐 Avtorizatsiya va rollar
Loyihada rol asosida boshqaruv (RBAC – Role-Based Access Control) implementatsiya qilingan. Har bir foydalanuvchining tizimda aniq roli mavjud bo‘lib, u orqali resurslarga kirish cheklovlari belgilanadi.

Mavjud rollar:
USER — Oddiy foydalanuvchi, ro‘yxatdan o‘tib, tizimga kirishi va o‘z hisobini yangilashi mumkin (updateMe, logout va h.k.).

ADMIN — Admin foydalanuvchi, tizimdagi foydalanuvchilarni boshqarish huquqiga ega (foydalanuvchilar ro‘yxatini ko‘rish, o‘chirish va h.k.).

SUPERADMIN — Yuqori darajadagi admin. U quyidagi huquqlarga ega:

Yangi ADMIN yaratish yoki mavjud USERni ADMINga aylantirish.

Tizimdagi barcha foydalanuvchilar va adminlar ustidan nazorat qilish.

Superadmin roliga boshqa hech kim o‘zini ko‘tara olmaydi (faqat .env orqali belgilangan).

🧩 Default holat
Har bir yangi foydalanuvchi tizimga ro‘yxatdan o‘tganida USER roliga ega bo‘ladi.

SUPERADMIN roli dastlab .env fayli orqali bir martalik yaratiladi:


SUPERADMIN_FULLNAME=Tohirjon Muqimov
SUPERADMIN_EMAIL=tohirjonmuqimov79@gmail.com
SUPERADMIN_PASSWORD=1234
Loyihani ishga tushirish vaqtida ushbu foydalanuvchi avtomatik ravishda bazaga qo‘shiladi.

🛡 Guard va Access nazorati
@Roles('ADMIN'), @Roles('SUPERADMIN') kabi custom decoratorlar orqali endpointlarga kirish cheklovlari qo‘yilgan.

AuthGuard JWT token orqali foydalanuvchining shaxsini aniqlaydi.

Refresh token yordamida access token avtomatik yangilanadi (cookie orqali).

🔧 Misollar
POST /auth/register — Foydalanuvchi ro‘yxatdan o‘tadi → USER bo‘ladi

POST /auth/login — Login bo‘ladi → access va refresh token cookie’da saqlanadi

PATCH /super-admin/:id — Superadmin foydalanuvchini admin qiladi

GET /admin/users — Admin foydalanuvchilarni ko‘radi



## 🛠️ Ishga tushirish

### 1. Klonlash

```bash
git clone https://github.com/tohirjon-dev/todo-api.git
cd todo-api
2. Paketlarni o‘rnatish
npm install
3. .env faylini sozlash

DATABASE_URL="postgresql://postgres:parol@localhost:5432/todo?schema=public"
PORT=4000

ACCESS_SECRET=qwerty
REFRESH_SECRET=qwerty123
ACCESS_EXPIRES=15m
REFRESH_EXPIRES=7d

SUPERADMIN_FULLNAME=Tohirjon Muqimov
SUPERADMIN_EMAIL=example@gmail.com
SUPERADMIN_PASSWORD=1234
4. Prisma migration

npx prisma migrate dev
5. Loyihani ishga tushirish

npm run start:dev
📮 Test qilish
Postman yoki boshqa REST client orqali quyidagi endpointlarni test qilishingiz mumkin. Cookie tokenlar avtomatik yuboriladi (httpOnly).

