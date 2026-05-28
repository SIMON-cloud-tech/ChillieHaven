import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './routes/Products.js';
import BlogRoute from "./routes/BlogRoute.js";

const app = express();
//use cors to facicitate communication between the frontend and backend
app.use(cors());
app.use(express.json());

/* ── fix __dirname for ES modules ── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── serve images from backend/data/images ── */
app.use('/images', express.static(path.join(__dirname, 'data/images')));
//use the products api
app.use('/api', Product);
app.use("/api/blogs", BlogRoute);

// catch all errors 
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});
//Access nnd run the server from port 5000s
const PORT = process.env.PORT || 5000;
//start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});