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
// Allow requests from GitHub Pages (production) and localhost (development)
app.use(cors({
  origin: [
    'https://SIMON-cloud-tech.github.io',
    'http://localhost:5173'
  ]
}));

app.use(express.json());

/* ── fix __dirname for ES modules ── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── serve images from backend/data/images ── */
app.use('/images', express.static(path.join(__dirname, 'data/images')));

// ── ROUTES ────────────────────────────────────────────────────
app.use('/api', Product);
app.use("/api/blogs", BlogRoute);
app.use('/api/config', ConfigRoute);

// ── CATCH ALL ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

// ── START SERVER ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});