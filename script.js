// SIP Calculator
function calculateSIP() {
  const monthly = parseFloat(document.getElementById('monthly').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const years = parseFloat(document.getElementById('years').value);

  if (isNaN(monthly) || isNaN(rate) || isNaN(years)) {
    alert('Please enter valid numbers in all fields.');
    return;
  }

  const months = years * 12;
  const monthlyRate = rate / 12 / 100;

  const totalInvested = monthly * months;
  const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const returns = futureValue - totalInvested;

  document.getElementById('sip-results').innerHTML = `
    <p><strong>Total Invested:</strong> ₹${totalInvested.toFixed(2)}</p>
    <p><strong>Estimated Returns:</strong> ₹${returns.toFixed(2)}</p>
    <p><strong>Total Value:</strong> ₹${futureValue.toFixed(2)}</p>
  `;
}

// Mutual Fund Calculator
function calculateMF() {
  const amount = parseFloat(document.getElementById('mf-amount').value);
  const rate = parseFloat(document.getElementById('mf-rate').value);
  const years = parseFloat(document.getElementById('mf-years').value);

  if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
    alert('Please enter valid numbers in all fields.');
    return;
  }

  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const returns = futureValue - amount;

  document.getElementById('mf-results').innerHTML = `
    <p><strong>Invested Amount:</strong> ₹${amount.toFixed(2)}</p>
    <p><strong>Estimated Returns:</strong> ₹${returns.toFixed(2)}</p>
    <p><strong>Total Value:</strong> ₹${futureValue.toFixed(2)}</p>
  `;
}

// Fetch Finance News
async function fetchNews() {
  const newsContainer = document.getElementById('news-articles');
  newsContainer.innerHTML = 'Loading news...';

  try {
    const response = await fetch('https://api.marketaux.com/v1/news/all?api_token=A9FlHwdX2uFPeEuZPheK0YsoPzprL7LVSsl7renq&language=en&filter_entities=true&limit=5');
    const data = await response.json();

    newsContainer.innerHTML = '';
    data.data.forEach(article => {
      const articleElement = document.createElement('p');
      articleElement.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      newsContainer.appendChild(articleElement);
    });
  } catch (error) {
    newsContainer.innerHTML = 'Failed to load news.';
    console.error('Error fetching news:', error);
  }
}

// Fetch Stock Data using Alpha Vantage API
function fetchStockData() {
  const symbol = document.getElementById('stock-symbol').value.toUpperCase();
  if (!symbol) {
    alert('Please enter a stock symbol.');
    return;
  }

  const apiKey = ' WWJF4M4ZUZWBNRTC'; // Replace with your Alpha Vantage API key
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data['Error Message']) {
        document.getElementById('stock-data').innerText = 'Invalid stock symbol. Please try again.';
        return;
      }

      const timeSeries = data['Time Series (5min)'];
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      const open = parseFloat(latestData['1. open']).toFixed(2);
      const high = parseFloat(latestData['2. high']).toFixed(2);
      const low = parseFloat(latestData['3. low']).toFixed(2);
      const close = parseFloat(latestData['4. close']).toFixed(2);
      const volume = parseInt(latestData['5. volume']).toLocaleString();

      document.getElementById('stock-data').innerHTML = `
        <p><strong>Symbol:</strong> ${symbol}</p>
        <p><strong>Open:</strong> $${open}</p>
        <p><strong>High:</strong> $${high}</p>
        <p><strong>Low:</strong> $${low}</p>
        <p><strong>Close:</strong> $${close}</p>
        <p><strong>Volume:</strong> ${volume}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching stock data:', error);
      document.getElementById('stock-data').innerText = 'Error fetching stock data. Please try again later.';
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
  fetchPrices();
  fetchNews();
});


// Fetch Real-Time Prices
const apiKey = 'goldapi-10egv19mb0g83yk-io'; // Replace with your GoldAPI key
const goldPriceEl = document.getElementById('gold-price');
const silverPriceEl = document.getElementById('silver-price');
const statusEl = document.getElementById('status-message');
const btn = document.getElementById('fetch-prices-btn');

btn.addEventListener('click', fetchPrices);

function showTrend(el, currentPrice, prevPrice, metalName) {
  if (prevPrice === null) {
    el.textContent = `${metalName} Trend: No previous data`;
    el.style.color = 'gray';
  } else if (currentPrice > prevPrice) {
    el.textContent = `${metalName} Trend: ↑ Increase`;
    el.style.color = 'green';
  } else if (currentPrice < prevPrice) {
    el.textContent = `${metalName} Trend: ↓ Decrease`;
    el.style.color = 'red';
  } else {
    el.textContent = `${metalName} Trend: → No change`;
    el.style.color = 'orange';
  }
}

async function fetchPrices() {
  btn.disabled = true;
  statusEl.textContent = 'Fetching latest prices...';
  goldPriceEl.textContent = 'Loading gold price...';
  silverPriceEl.textContent = 'Loading silver price...';

  // Prepare trend display elements
  let goldTrendEl = document.getElementById('gold-trend');
  if (!goldTrendEl) {
    goldTrendEl = document.createElement('div');
    goldTrendEl.id = 'gold-trend';
    goldPriceEl.parentNode.insertBefore(goldTrendEl, goldPriceEl.nextSibling);
  }

  let silverTrendEl = document.getElementById('silver-trend');
  if (!silverTrendEl) {
    silverTrendEl = document.createElement('div');
    silverTrendEl.id = 'silver-trend';
    silverPriceEl.parentNode.insertBefore(silverTrendEl, silverPriceEl.nextSibling);
  }

  try {
    // Fetch gold price (XAU = Gold)
    const goldResponse = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
    });
    if (!goldResponse.ok) throw new Error(`Gold API error: ${goldResponse.status}`);

    const goldData = await goldResponse.json();

    // Fetch silver price (XAG = Silver)
    const silverResponse = await fetch('https://www.goldapi.io/api/XAG/USD', {
      headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
    });
    if (!silverResponse.ok) throw new Error(`Silver API error: ${silverResponse.status}`);

    const silverData = await silverResponse.json();

    const goldPrice = goldData.price;
    const silverPrice = silverData.price;

    goldPriceEl.textContent = `Gold Price: $${goldPrice.toFixed(2)} per ounce`;
    silverPriceEl.textContent = `Silver Price: $${silverPrice.toFixed(2)} per ounce`;

    // Get previous prices from localStorage (null if none)
    const prevGoldPrice = localStorage.getItem('prevGoldPrice') ? parseFloat(localStorage.getItem('prevGoldPrice')) : null;
    const prevSilverPrice = localStorage.getItem('prevSilverPrice') ? parseFloat(localStorage.getItem('prevSilverPrice')) : null;

    // Show trends
    showTrend(goldTrendEl, goldPrice, prevGoldPrice, 'Gold');
    showTrend(silverTrendEl, silverPrice, prevSilverPrice, 'Silver');

    // Save current prices for next comparison
    localStorage.setItem('prevGoldPrice', goldPrice);
    localStorage.setItem('prevSilverPrice', silverPrice);

    statusEl.textContent = 'Prices updated successfully!';
    statusEl.style.color = 'green';

  } catch (error) {
    goldPriceEl.textContent = 'Error loading gold price';
    silverPriceEl.textContent = 'Error loading silver price';
    statusEl.textContent = `Failed to fetch prices: ${error.message}`;
    statusEl.style.color = 'red';
    console.error('FetchPrices Error:', error);
  } finally {
    btn.disabled = false;
  }
}

//Expense Calculator (your existing code continues here)
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');
const clearExpensesBtn = document.getElementById('clearExpensesBtn');

let expenses = [];

function formatCurrency(num) {
  return '$' + num.toFixed(2);
}

function updateExpensesUI() {
  expensesList.innerHTML = '';

  expenses.forEach((expense) => {
    const div = document.createElement('div');
    div.classList.add('expense-item');
    div.innerHTML = `
      <span class="description">${expense.description}</span>
      <span class="amount">${formatCurrency(expense.amount)}</span>
    `;
    expensesList.appendChild(div);
  });

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  totalAmount.textContent = `Total: ${formatCurrency(total)}`;
}

addExpenseBtn.addEventListener('click', () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc) {
    alert('Please enter a description.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid positive amount.');
    return;
  }

  expenses.push({ description: desc, amount: amount });

  descInput.value = '';
  amountInput.value = '';

  updateExpensesUI();
});

clearExpensesBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all expenses?')) {
    expenses = [];
    updateExpensesUI();
  }
});

// Initial render
updateExpensesUI();

window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}