import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
  { name: 'أباجورات', slug: 'abajorat' },
  { name: 'نجف', slug: 'najaf' },
  { name: 'شابوهات', slug: 'shabohat' },
  { name: 'سبوتات وإضاءة', slug: 'spots' },
];

// بيانات تجريبية: بدّليها بمنتجات المحل الحقيقية من لوحة التحكم بعدين
const products = [
  { name: 'أباجورة كلاسيك', slug: 'abajora-classic', category: 'abajorat', price: 450, stock: 10, description: 'قاعدة معدن وشابوه قماش للكومودينو والصالون.' },
  { name: 'أباجورة مكتب', slug: 'abajora-desk', category: 'abajorat', price: 320, stock: 8, description: 'إضاءة مريحة للمذاكرة والمكتب.' },
  { name: 'نجفة خمس لمبات', slug: 'najafa-5', category: 'najaf', price: 2800, stock: 4, description: 'دهبي هادي مناسب للصالات.' },
  { name: 'نجفة مودرن', slug: 'najafa-modern', category: 'najaf', price: 3900, stock: 3, description: 'تصميم عصري لغرف المعيشة.' },
  { name: 'شابوه كتان', slug: 'shabo-linen', category: 'shabohat', price: 180, stock: 20, description: 'إضاءة ناعمة للأوض.' },
  { name: 'شابوه مخرّم', slug: 'shabo-cutout', category: 'shabohat', price: 260, stock: 12, description: 'يرسم ظلال جميلة على الحيطة.' },
  { name: 'سبوت ليد دائري', slug: 'spot-led-round', category: 'spots', price: 95, stock: 50, description: 'ليد موفر للكهرباء للأسقف.' },
  { name: 'شريط ليد دافئ', slug: 'led-strip-warm', category: 'spots', price: 210, stock: 30, description: 'إضاءة مخفية للكرانيش والمطابخ.' },
];

async function main() {
  const bySlug = {};
  for (const c of categories) {
    bySlug[c.slug] = await prisma.category.upsert({ where: { slug: c.slug }, update: { name: c.name }, create: c });
  }
  for (const { category, ...p } of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p, categoryId: bySlug[category].id },
    });
  }
  console.log('Seed done');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
