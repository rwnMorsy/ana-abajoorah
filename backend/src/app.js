import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'حصل خطأ في السيرفر' });
});

export default app;
