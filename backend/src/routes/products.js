import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// GET /api/products?category=najaf
router.get('/', async (req, res) => {
  const { category } = req.query;
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(typeof category === 'string' && category ? { category: { slug: category } } : {}),
    },
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(products);
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: { select: { name: true, slug: true } } },
  });
  if (!product || !product.isActive) return res.status(404).json({ error: 'المنتج غير موجود' });
  res.json(product);
});

export default router;
