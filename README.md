<<<<<<< HEAD
# أنا أباجورة

متجر إضاءة (أباجورات، نجف، شابوهات، سبوتات).
- `frontend/`: React + Vite
- `backend/`: Node.js + Express + Prisma + PostgreSQL
- `design-reference/`: التصميم الأصلي كمرجع

## التشغيل

### 1. الباك اند
```bash
cd backend
npm install
cp .env.example .env      # على ويندوز: copy .env.example .env
# افتحي .env وحطي DATABASE_URL
npx prisma migrate dev --name init
npm run db:seed
npm run dev               # http://localhost:4000/api/health
```

### 2. الفرونت اند (في تيرمنال تاني)
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## الـ API الحالي
- `GET /api/health`
- `GET /api/categories`
- `GET /api/products?category=najaf`
- `GET /api/products/:slug`

## الخطوات الجاية
حسابات العملاء ← السلة والطلبات ← لوحة تحكم المدير ← الدفع ← الرفع.
=======
# ana-abajoorah - أنا أباجورة
>>>>>>> a7e0bdafc3f0fa030c4b77307e62e46e49d53c1d
