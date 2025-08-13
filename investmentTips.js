// ===== Investment Tips Array =====
// These cover stock market, mutual funds, budgeting, personal finance, real estate, crypto, and general investing
const investmentTips = [
    "Invest consistently, even in small amounts.",
    "Diversify your portfolio to reduce risk.",
    "Avoid putting all your money in one stock.",
    "Start investing as early as possible to benefit from compounding.",
    "Keep an emergency fund before investing.",
    "Review your portfolio every 6 months.",
    "Avoid emotional decisions when markets fluctuate.",
    "Focus on long-term growth, not short-term gains.",
    "Reinvest dividends to accelerate returns.",
    "Don’t time the market — time in the market matters more.",
    "Understand the risk before investing.",
    "Never invest in something you don’t understand.",
    "Use dollar-cost averaging to reduce volatility risk.",
    "Cut losses early if fundamentals change.",
    "Avoid high-interest debt before investing.",
    "Invest in index funds for stable growth.",
    "Gold can be a good hedge against inflation.",
    "Consider ETFs for diversified exposure.",
    "Track your net worth regularly.",
    "Read annual reports before buying a company’s stock.",
    "Keep investment costs and fees low.",
    "Buy quality businesses, not hot trends.",
    "Don’t chase past performance.",
    "Asset allocation is more important than stock picking.",
    "Consider tax implications before selling.",
    "Keep a written investment plan.",
    "Rebalance your portfolio annually.",
    "Don’t panic during market crashes.",
    "Learn basic accounting to analyze companies.",
    "Be patient — wealth takes time.",
    "Set financial goals before investing.",
    "Real estate can provide rental income and appreciation.",
    "Avoid penny stocks unless you can handle high risk.",
    "Beware of get-rich-quick schemes.",
    "Track your expenses to save more for investing.",
    "Invest in yourself — skills pay lifelong dividends.",
    "Keep cash for opportunities during downturns.",
    "Use stop-loss orders to protect downside risk.",
    "Research before following social media tips.",
    "Avoid lifestyle inflation as income grows.",
    "Maintain a good credit score to reduce loan costs.",
    "Consider sustainable and ethical investing.",
    "Don’t invest based on rumors.",
    "Use SIPs (Systematic Investment Plans) for discipline.",
    "Automate investments to stay consistent.",
    "Stay updated with global economic trends.",
    "Understand inflation’s impact on returns.",
    "Don’t check your portfolio daily.",
    "Avoid overtrading to reduce fees.",
    "Property can hedge against currency depreciation.",
    "Invest in blue-chip stocks for stability.",
    "Consider bonds for fixed income.",
    "Learn about risk-adjusted returns.",
    "Emergency fund = 3-6 months of expenses.",
    "Keep investments liquid if you need cash soon.",
    "Review mutual fund ratings annually.",
    "Avoid borrowing to invest unless experienced.",
    "Focus on income-generating assets.",
    "Hedge against currency risks in foreign investments.",
    "Don’t ignore small fees — they add up.",
    "Learn from past mistakes.",
    "Invest based on data, not fear.",
    "Avoid over-diversification — it dilutes returns.",
    "Maintain insurance to protect wealth.",
    "Cryptocurrency is high-risk — invest wisely.",
    "Understand blockchain before investing in crypto.",
    "Government bonds are safe but low return.",
    "Index funds beat most active managers.",
    "Avoid speculative bubbles.",
    "Balance risk and reward in every investment.",
    "Stay disciplined during bull and bear markets.",
    "Separate short-term money from long-term investments.",
    "Invest with a margin of safety.",
    "Don’t buy IPOs without research.",
    "Reinvest profits into new opportunities.",
    "Use compounding calculators to plan.",
    "Educate yourself continuously.",
    "Invest for retirement early.",
    "Don’t borrow against your home recklessly.",
    "Evaluate company debt before investing.",
    "Dividends can provide passive income.",
    "Understand the business model before buying shares.",
    "Follow credible analysts, not hype.",
    "Beware of scams in alternative investments.",
    "Small, steady gains beat risky bets.",
    "ETFs are cost-effective for diversification.",
    "Foreign markets can offer growth opportunities.",
    "Factor in transaction costs.",
    "Avoid frequent portfolio changes.",
    "Be wary of complex derivative products.",
    "Focus on total returns, not just price changes.",
    "Invest during downturns for better valuations.",
    "Use tax-advantaged accounts.",
    "Set stop-loss limits for risky trades.",
    "Understand liquidity risk.",
    "Consider REITs for real estate exposure.",
    "Don’t ignore inflation in retirement planning.",
    "Financial literacy is the best investment.",
    "Track asset performance yearly.",
    "Be realistic about returns.",
    "Avoid putting retirement savings at high risk.",
    "Limit speculative trades to a small portion.",
    "Stay diversified across asset classes.",
    "Research management quality in companies.",
    "Invest with a long-term perspective.",
    "Markets recover — patience is key.",
    "Study historical market trends.",
    "Avoid investing based solely on media headlines.",
    "Wealth preservation is as important as growth.",
    "Rebalance after major market moves.",
    "Use SIPs for volatile markets.",
    "Be prepared for market corrections.",
    "Invest regularly, regardless of market mood.",
    "Check mutual fund expense ratios.",
    "Monitor sector-specific risks.",
    "Avoid emotional selling during dips.",
    "Set a sell target before buying.",
    "Don’t risk money you can’t afford to lose.",
    "Understand your own risk tolerance.",
    "Keep learning about financial products.",
    "Hedge high-risk bets.",
    "Review investment goals annually.",
    "Market timing rarely works.",
    "Be cautious with leverage.",
    "Hold quality stocks for decades.",
    "Follow a budget to increase investable surplus.",
    "Save bonuses and windfalls.",
    "Avoid unnecessary bank charges.",
    "Study company earnings reports.",
    "Invest in growing industries.",
    "Look beyond short-term news.",
    "Keep your strategy simple.",
    "Avoid following the herd.",
    "Focus on fundamentals.",
    "Don’t fall for FOMO trades.",
    "Use limit orders instead of market orders.",
    "Plan for taxes before selling assets.",
    "Diversify across geographies.",
    "Set clear exit strategies.",
    "Avoid mixing insurance and investment products.",
    "Look at price-to-earnings ratios before buying.",
    "Avoid chasing high-yield bonds blindly.",
    "Check credit ratings for bond investments.",
    "Dividend reinvestment can compound wealth.",
    "Hold cash for market opportunities.",
    "Avoid concentrated bets unless confident.",
    "Look at 5–10 year trends, not weeks.",
    "Stay calm during volatility.",
    "Invest gradually in new sectors.",
    "Don’t buy just because prices are low.",
    "Quality is better than quantity in stocks.",
    "Understand market cycles.",
    "Track your financial goals.",
    "Review asset allocation with age.",
    "Avoid risky assets before retirement.",
    "Know your investment horizon.",
    "Invest in what you believe in.",
    "Learn basic chart analysis.",
    "Avoid excessive day trading.",
    "Minimize taxes with smart planning.",
    "Buy businesses, not tickers.",
    "Control spending to grow capital.",
    "Stay patient — time builds wealth.",
    "Reinvest gains into growth assets.",
    "Avoid market predictions from non-experts.",
    "Understand correlation between assets.",
    "Don’t overpay for hype stocks.",
    "Avoid assets you can’t easily sell.",
    "Track inflation-adjusted returns.",
    "Beware of overleveraging in property.",
    "Have multiple income streams.",
    "Separate emotions from decisions.",
    "Learn from great investors’ strategies.",
    "Don’t panic in bear markets.",
    "Plan investments around life goals.",
    "Compound interest is your friend.",
    "Avoid high-risk bets in retirement.",
    "Invest steadily and wisely."
];

// ===== Tip Display Logic =====
const showTipBtn = document.getElementById("show-tip-btn");
const toastContainer = document.getElementById("toast-container");

function showRandomTip() {
    const tip = investmentTips[Math.floor(Math.random() * investmentTips.length)];

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = tip;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

showTipBtn.addEventListener("click", showRandomTip);

// ===== Toast Styling =====
const style = document.createElement("style");
style.textContent = `
.toast-message {
    background: #333;
    color: white;
    padding: 12px 16px;
    margin-top: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    animation: fadeInOut 5s ease forwards;
}
@keyframes fadeInOut {
    0% {opacity: 0; transform: translateY(-10px);}
    10% {opacity: 1; transform: translateY(0);}
    90% {opacity: 1; transform: translateY(0);}
    100% {opacity: 0; transform: translateY(-10px);}
}
`;
document.head.appendChild(style);
