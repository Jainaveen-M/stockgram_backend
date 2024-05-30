const WebSocket = require('ws');
const url = 'ws://localhost:8060';

const connection = new WebSocket(url);

connection.onopen = () => {
  console.log('Connected to the server');
};

connection.onmessage = (event) => {
  const stockPrices = JSON.parse(event.data);
  console.log('Received stock prices:', stockPrices);
};

connection.onclose = () => {
  console.log('Disconnected from the server');
};
