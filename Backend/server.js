const WebSocket = require('ws');
const port = 8080; // Choose your desired port

const server = new WebSocket.Server({ port });

server.on('connection', (websocket) => {
    console.log('Client connected');

    websocket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        server.clients.forEach((client) => {
            if (client !== websocket && client.readyState === WebSocket.OPEN) {
                client.send(message); // Broadcast to other clients
            }
        });
    });

    websocket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server listening on port ${port}`);