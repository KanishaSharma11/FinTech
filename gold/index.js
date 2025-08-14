const express = require('express');
const router = express.Router();
const { getGoldPrice } = require('./goldApi');

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.GOLD_API_KEY; // Store in .env
    const priceData = await getGoldPrice(apiKey);
    res.json(priceData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
