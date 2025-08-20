const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();

// Serve static files from the current directory (or use 'public' if you prefer)
app.use(express.static(path.join(__dirname)));

// Route to fetch gold and silver prices
app.get('/api/gold', async (req, res) => {
  try {
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METAL_API_KEY || '8e7c6e98f3f353f84ed8fced82411658'}&base=INR&currencies=XAU,XAG`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`MetalpriceAPI error ${response.status}: ${errorBody}`);
      return res.status(response.status).json({ 
        error: 'Failed to fetch metal prices', 
        details: errorBody 
      });
    }

    const data = await response.json();

    // Invert because base=INR returns ounces per INR, but we want INR per ounce
    const inrPerXau = 1 / data.rates.XAU; // INR per ounce Gold
    const inrPerXag = 1 / data.rates.XAG; // INR per ounce Silver

    // Convert ounces to grams (1 troy ounce = 31.1035 grams)
    const inrPerGramGold = inrPerXau / 31.1035;
    const inrPerGramSilver = inrPerXag / 31.1035;

    res.json({
      goldPriceINR: {
        perXAU: inrPerXau,
        perGram: inrPerGramGold,
      },
      silverPriceINR: {
        perXAG: inrPerXag,
        perGram: inrPerGramSilver,
      }
    });

  } catch (error) {
    console.error('Fetch to MetalpriceAPI failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
