const WebSocket = require('ws');
const port = 8060;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }
  
  function generateRandomOrder(type) {
    return {
      price: getRandomFloat(1, 500, 2).toString(),
      qty: getRandomInt(1, 100).toString(),
    };
  }
  
  function generateRandomOrderBook(numOrders) {
    const buy = [];
    const sell = [];
    for (let i = 0; i < numOrders; i++) {
        buy.push(generateRandomOrder("buy"));
    }
    for (let i = 0; i < numOrders; i++) {
        sell.push(generateRandomOrder("sell"));
    }
    return {"buy" : buy, "sell" : sell};
  }
  
  const numOrders = 5; // Change this number to generate more or fewer orders
   
// Create a WebSocket server
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send stock prices every 30 seconds to the connected client
  const sendStockPrices = setInterval(() => {
    const orderBook = generateRandomOrderBook(numOrders);
    console.log(orderBook);
    ws.send(JSON.stringify(orderBook));
  }, 3000);

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(sendStockPrices);
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
