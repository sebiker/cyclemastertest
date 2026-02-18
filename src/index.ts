import { WebSocketServer } from 'ws';
import * as http from 'http';

const PORT = process.env.PORT || 8080;

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    // Echo message back to client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Send welcome message
  ws.send('Welcome to CycleMaster WebSocket Server');
});

server.listen(PORT, () => {
  console.log(`CycleMaster WebSocket server listening on port ${PORT}`);
});
