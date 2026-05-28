import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const router = express.Router();
router.get('/config', (req, res) => {
  res.json({ whatsappNumber: process.env.WHATSAPP_NUMBER, 
     phoneNumber: process.env.PHONE_NUMBER
  });
});

router.get('/vendor/inventory', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'inventory.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    res.json({ data });
  } catch (err) {
    console.error('Inventory error:', err);          // ← add this
    res.status(500).json({ message: 'Failed to load inventory' });
  }
});

export default router;