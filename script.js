// utils
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message; 
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createToastContainer() {
  if (document.getElementById('toast-container')) return;
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
}

function highlightErrorInput(input, isError) {
  if (isError) {
    input.classList.add('input-error');
  } else {
    input.classList.remove('input-error');
  }
}

function formatCurrencyLive(input) {
  input.addEventListener('input', () => {
    const value = input.value.replace(/\D/g, '');
    const formatted = new Intl.NumberFormat('en-IN').format(value);
    input.value = formatted;
  });
}

// SIP Calculator
function calculateSIP() {
  const monthly = parseFloat(document.getElementById('monthly').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const years = parseFloat(document.getElementById('years').value);
  const errorEl = document.getElementById('sip-error');
  const resultEl = document.getElementById('sip-results');

  resultEl.innerHTML = '';
  errorEl.textContent = '';

  if (isNaN(monthly) || monthly <= 0) {
    errorEl.textContent = 'Please enter a valid monthly amount.';
    speak('Please enter a valid monthly amount.');
    return;
  }
  if (isNaN(rate) || rate <= 0) {
    errorEl.textContent = 'Please enter a valid return rate.';
    speak('Please enter a valid return rate.');
    return;
  }
  if (isNaN(years) || years <= 0) {
    errorEl.textContent = 'Please enter a valid duration.';
    speak('Please enter a valid duration.');
    return;
  }

  const months = years * 12;
  const monthlyRate = rate / 12 / 100;
  const totalInvested = monthly * months;
  const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const returns = futureValue - totalInvested;

  resultEl.innerHTML = `
    <p><strong>Total Invested:</strong> ₹${totalInvested.toFixed(2)}</p>
    <p><strong>Estimated Returns:</strong> ₹${returns.toFixed(2)}</p>
    <p><strong>Total Value:</strong> ₹${futureValue.toFixed(2)}</p>
  `;
  showToast('SIP calculation completed', 'success');
  speak(`SIP calculation completed. Total Invested: ₹${totalInvested.toFixed(2)}, Estimated Returns: ₹${returns.toFixed(2)}, Total Value: ₹${futureValue.toFixed(2)}`);
}

// Mutual Fund Calculator
function calculateMF() {
  const amount = parseFloat(document.getElementById('mf-amount').value);
  const rate = parseFloat(document.getElementById('mf-rate').value);
  const years = parseFloat(document.getElementById('mf-years').value);
  const errorEl = document.getElementById('mf-error');
  const resultEl = document.getElementById('mf-results');

  resultEl.innerHTML = '';
  errorEl.textContent = '';

  if (isNaN(amount) || amount <= 0) {
    errorEl.textContent = 'Please enter a valid investment amount.';
    speak('Please enter a valid investment amount.');
    return;
  }
  if (isNaN(rate) || rate <= 0) {
    errorEl.textContent = 'Please enter a valid return rate.';
    speak('Please enter a valid return rate.');
    return;
  }
  if (isNaN(years) || years <= 0) {
    errorEl.textContent = 'Please enter a valid duration.';
    speak('Please enter a valid duration.');
    return;
  }

  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const returns = futureValue - amount;

  resultEl.innerHTML = `
    <p><strong>Invested Amount:</strong> ₹${amount.toFixed(2)}</p>
    <p><strong>Estimated Returns:</strong> ₹${returns.toFixed(2)}</p>
    <p><strong>Total Value:</strong> ₹${futureValue.toFixed(2)}</p>
  `;
  showToast('Mutual Fund calculation completed', 'success');
  speak(`Mutual Fund calculation completed. Invested Amount: ₹${amount.toFixed(2)}, Estimated Returns: ₹${returns.toFixed(2)}, Total Value: ₹${futureValue.toFixed(2)}`);
}

// Fetch Finance News
async function fetchNews() {
  const newsContainer = document.getElementById('news-articles');
  newsContainer.innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch('https://api.marketaux.com/v1/news/all?api_token=A9FlHwdX2uFPeEuZPheK0YsoPzprL7LVSsl7renq&language=en&filter_entities=true&limit=5');
    const data = await response.json();

    newsContainer.innerHTML = '';
    data.data.forEach(article => {
      const articleElement = document.createElement('p');
      articleElement.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      newsContainer.appendChild(articleElement);
    });
    showToast('News loaded.', 'success');
  } catch (error) {
    newsContainer.innerHTML = '<div class="error-card">Failed to load news.</div>';
    console.error('Error fetching news:', error);
    showToast('Failed to fetch news.', 'error');
  }
}

// Fetch Stock Data
function fetchStockData() {
  const symbol = document.getElementById('stock-symbol').value.toUpperCase();
  const stockContainer = document.getElementById('stock-data');

  if (!symbol) {
    showToast('Please enter a stock symbol.', 'error');
    return;
  }

  stockContainer.innerHTML = '<div class="loader"></div>';

  const apiKey = 'WWJF4M4ZUZWBNRTC';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data['Error Message']) {
        stockContainer.innerHTML = '<div class="error-card">Invalid stock symbol. Please try again.</div>';
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

      stockContainer.innerHTML = `
        <p><strong>Symbol:</strong> ${symbol}</p>
        <p><strong>Open:</strong> $${open}</p>
        <p><strong>High:</strong> $${high}</p>
        <p><strong>Low:</strong> $${low}</p>
        <p><strong>Close:</strong> $${close}</p>
        <p><strong>Volume:</strong> ${volume}</p>
      `;
      showToast('Stock data fetched.', 'success');
    })
    .catch(error => {
      console.error('Error fetching stock data:', error);
      stockContainer.innerHTML = '<div class="error-card">Error fetching stock data. Please try again later.</div>';
      showToast('Failed to fetch stock data.', 'error');
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  createToastContainer();
  fetchPrices();
  fetchNews();
});

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
  statusEl.innerHTML = '<div class="loader"></div>';
  goldPriceEl.textContent = 'Loading gold price...';
  silverPriceEl.textContent = 'Loading silver price...';

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
    const response = await fetch('/api/gold');
    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();

    const goldPrice = data.goldPriceINR ? data.goldPriceINR.perGram : null;
    const silverPrice = data.silverPriceINR ? data.silverPriceINR.perGram : null;

    goldPriceEl.textContent = goldPrice !== null
      ? `Gold Price: ₹${goldPrice.toFixed(2)} per gram`
      : 'Gold price unavailable';

    silverPriceEl.textContent = silverPrice !== null
      ? `Silver Price: ₹${silverPrice.toFixed(2)} per gram`
      : 'Silver price unavailable';

    const prevGoldPrice = localStorage.getItem('prevGoldPrice') ? parseFloat(localStorage.getItem('prevGoldPrice')) : null;
    const prevSilverPrice = localStorage.getItem('prevSilverPrice') ? parseFloat(localStorage.getItem('prevSilverPrice')) : null;

    showTrend(goldTrendEl, goldPrice, prevGoldPrice, 'Gold');
    showTrend(silverTrendEl, silverPrice, prevSilverPrice, 'Silver');

    if (goldPrice !== null) localStorage.setItem('prevGoldPrice', goldPrice);
    if (silverPrice !== null) localStorage.setItem('prevSilverPrice', silverPrice);

    statusEl.textContent = 'Prices updated successfully!';
    statusEl.style.color = 'green';
    showToast('Gold & Silver prices updated.', 'success');
  } catch (error) {
    goldPriceEl.textContent = 'Error loading gold price';
    silverPriceEl.textContent = 'Error loading silver price';
    statusEl.innerHTML = `<div class="error-card">${error.message}</div>`;
    statusEl.style.color = 'red';
    showToast('Failed to fetch metal prices.', 'error');
    console.error('FetchPrices Error:', error);
  } finally {
    btn.disabled = false;
  }
}

// Expense tracker
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');
const clearExpensesBtn = document.getElementById('clearExpensesBtn');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function formatCurrency(num) {
  return '₹' + num.toFixed(2);
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
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

addExpenseBtn.addEventListener('click', () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc) {
    showToast('Please enter a description.', 'error');
    speak('Please enter a description.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showToast('Please enter a valid positive amount.', 'error');
    speak('Please enter a valid positive amount.');
    return;
  }

  expenses.push({ description: desc, amount: amount });

  descInput.value = '';
  amountInput.value = '';

  updateExpensesUI();
  showToast('Expense added.', 'success');
  speak(`Expense added: ${desc} for ₹${amount.toFixed(2)}`);
});

clearExpensesBtn.addEventListener('click', () => {
  showConfirm('Are you sure you want to clear all expenses?', () => {
    expenses = [];
    updateExpensesUI();
    showToast('All expenses cleared.', 'info');
    speak('All expenses cleared.');
  });
});

function showConfirm(message, onYes) {
  const box = document.getElementById('confirm-box');
  const msg = document.getElementById('confirm-msg');
  const ok = document.getElementById('confirm-ok');
  const cancel = document.getElementById('confirm-cancel');

  msg.textContent = message;
  box.style.display = 'block';

  const cleanup = () => box.style.display = 'none';

  ok.onclick = () => { cleanup(); onYes(); };
  cancel.onclick = cleanup;
}

// Initial render
updateExpensesUI();

// Currency Converter
function convertCurrency() {
  const amount = parseFloat(document.getElementById('amountToConvert').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const resultDiv = document.getElementById('conversionResult');

  if (!amount || isNaN(amount)) {
    resultDiv.innerText = "Please enter a valid amount.";
    speak('Please enter a valid amount.');
    return;
  }

  const apiUrl = `https://open.er-api.com/v6/latest/${from}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.result === "success" && data.rates[to]) {
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
        showToast('Currency conversion completed.', 'success');
        speak(`Converted ${amount} ${from} to ${converted} ${to}`);
      } else {
        resultDiv.innerText = "Conversion failed. Please check the currencies.";
        showToast('Conversion failed.', 'error');
        speak('Conversion failed. Please check the currencies.');
      }
    })
    .catch(error => {
      console.error("Error:", error);
      resultDiv.innerText = "Error fetching conversion rates.";
      showToast('Error fetching conversion rates.', 'error');
      speak('Error fetching conversion rates.');
    });
}

// Voice Command Functionality
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Speak function for audio feedback
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  // Function to parse voice input and trigger appropriate calculator
  function processVoiceCommand(transcript, calculatorType) {
    transcript = transcript.toLowerCase().trim();

    if (calculatorType === 'sip') {
      // Expected format: "calculate sip for monthly [amount] rate [rate] years [years]"
      const sipRegex = /calculate sip for monthly (\d+) rate (\d+\.?\d*) years (\d+)/;
      const match = transcript.match(sipRegex);
      if (match) {
        const monthly = parseFloat(match[1]);
        const rate = parseFloat(match[2]);
        const years = parseFloat(match[3]);
        document.getElementById('monthly').value = monthly;
        document.getElementById('rate').value = rate;
        document.getElementById('years').value = years;
        calculateSIP();
      } else {
        showToast('Invalid SIP command. Say: "calculate sip for monthly [amount] rate [rate] years [years]"', 'error');
        speak('Invalid SIP command. Please say: calculate sip for monthly [amount] rate [rate] years [years]');
      }
    } else if (calculatorType === 'mf') {
      // Expected format: "calculate mutual fund for amount [amount] rate [rate] years [years]"
      const mfRegex = /calculate mutual fund for amount (\d+) rate (\d+\.?\d*) years (\d+)/;
      const match = transcript.match(mfRegex);
      if (match) {
        const amount = parseFloat(match[1]);
        const rate = parseFloat(match[2]);
        const years = parseFloat(match[3]);
        document.getElementById('mf-amount').value = amount;
        document.getElementById('mf-rate').value = rate;
        document.getElementById('mf-years').value = years;
        calculateMF();
      } else {
        showToast('Invalid Mutual Fund command. Say: "calculate mutual fund for amount [amount] rate [rate] years [years]"', 'error');
        speak('Invalid Mutual Fund command. Please say: calculate mutual fund for amount [amount] rate [rate] years [years]');
      }
    } else if (calculatorType === 'expense') {
      // Expected format: "add expense [description] [amount]" or "spent [amount] on [description]"
      const expenseRegex = /(?:add expense (\w+) (\d+\.?\d*)|spent (\d+\.?\d*) on (\w+))/;
      const match = transcript.match(expenseRegex);
      if (match) {
        const desc = match[1] || match[4]; // Use description from either pattern
        const amount = parseFloat(match[2] || match[3]); // Use amount from either pattern
        document.getElementById('desc').value = desc;
        document.getElementById('amount').value = amount;
        addExpenseBtn.click();
      } else {
        showToast('Invalid Expense command. Say: "add expense [description] [amount]" or "spent [amount] on [description]"', 'error');
        speak('Invalid Expense command. Please say: add expense [description] [amount] or spent [amount] on [description]');
      }
    } else if (calculatorType === 'currency') {
      // Expected format: "convert [amount] from [currency] to [currency]"
      const currencyRegex = /convert (\d+\.?\d*) from (\w+) to (\w+)/;
      const match = transcript.match(currencyRegex);
      if (match) {
        const amount = parseFloat(match[1]);
        const fromCurrency = match[2].toUpperCase();
        const toCurrency = match[3].toUpperCase();
        if (['INR', 'USD', 'EUR', 'GBP', 'JPY'].includes(fromCurrency) && ['INR', 'USD', 'EUR', 'GBP', 'JPY'].includes(toCurrency)) {
          document.getElementById('amountToConvert').value = amount;
          document.getElementById('fromCurrency').value = fromCurrency;
          document.getElementById('toCurrency').value = toCurrency;
          convertCurrency();
        } else {
          showToast('Invalid currency codes. Use INR, USD, EUR, GBP, or JPY.', 'error');
          speak('Invalid currency codes. Please use INR, USD, EUR, GBP, or JPY.');
        }
      } else {
        showToast('Invalid Currency command. Say: "convert [amount] from [currency] to [currency]"', 'error');
        speak('Invalid Currency command. Please say: convert [amount] from [currency] to [currency]');
      }
    }
  }

  // Function to start voice recognition
  function startVoiceRecognition(calculatorType) {
    recognition.start();
    showToast(`Listening for ${calculatorType.toUpperCase()} command...`, 'info');
    speak(`Please say your ${calculatorType} command.`);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      showToast(`Heard: "${transcript}"`, 'info');
      processVoiceCommand(transcript, calculatorType);
    };
    recognition.onerror = (event) => {
      showToast(`Voice recognition error: ${event.error}`, 'error');
      speak(`Voice recognition error: ${event.error}`);
    };
    recognition.onend = () => {
      showToast('Voice recognition stopped.', 'info');
    };
  }

  // Add event listeners for voice buttons
  document.getElementById('sip-voice-btn').addEventListener('click', () => startVoiceRecognition('sip'));
  document.getElementById('mf-voice-btn').addEventListener('click', () => startVoiceRecognition('mf'));
  document.getElementById('expense-voice-btn').addEventListener('click', () => startVoiceRecognition('expense'));
  document.getElementById('currency-voice-btn').addEventListener('click', () => startVoiceRecognition('currency'));
} else {
  // Disable voice buttons if Web Speech API is not supported
  document.querySelectorAll('#sip-voice-btn, #mf-voice-btn, #expense-voice-btn, #currency-voice-btn').forEach(btn => {
    btn.disabled = true;
    btn.title = 'Voice commands not supported in this browser';
  });
  showToast('Voice commands not supported in this browser.', 'error');
}