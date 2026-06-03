import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './routes/Products.js';
import BlogRoute from "./routes/BlogRoute.js";
import ConfigRoute from './routes/ConfigRoute.js';

const app = express();

// ── CORS ──────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api', Product);
app.use("/api/blogs", BlogRoute);
app.use('/api/config', ConfigRoute);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});
// ── KEEP ALIVE PING ───────────────────────────────────────────
app.get('/ping', (req, res) => {
  res.json({ status: 'alive' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});