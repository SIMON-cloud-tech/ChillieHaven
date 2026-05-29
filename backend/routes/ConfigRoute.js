import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    whatsappNumber: process.env.WHATSAPP_NUMBER || '254703433014',
    phoneNumber: process.env.PHONE_NUMBER || '254703433014'
  });
});

export default router;