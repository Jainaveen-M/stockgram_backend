const WebSocket = require('ws');
const port = 8080;

const stocks = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

// Function to generate random stock prices
function generateStockPrices() {
  let prices = {};
  stocks.forEach(stock => {
    prices[stock] = (Math.random() * 1400 + 100).toFixed(2);
  });
  return prices;
}

// Create a WebSocket server
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send stock prices every 30 seconds to the connected client
  const sendStockPrices = setInterval(() => {
    const stockPrices = generateStockPrices();
    console.log(stockPrices);
    ws.send(JSON.stringify(stockPrices));
  }, 3000);

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(sendStockPrices);
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
