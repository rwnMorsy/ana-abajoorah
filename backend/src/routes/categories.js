import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  });
  res.json(categories);
});

export default router;
