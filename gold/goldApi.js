// Handles external API fetch
const fetch = require('node-fetch');
const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';

async function getGoldPrice(apiKey) {
  const response = await fetch(GOLD_API_URL, {
    headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error(`GoldAPI error ${response.status}`);
  return response.json();
}

module.exports = { getGoldPrice };
