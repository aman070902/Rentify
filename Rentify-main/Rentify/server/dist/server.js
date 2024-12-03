"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000', // React client URL
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
    },
    allowEIO3: true,
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Store bids for each room (in-memory for simplicity)
const roomBids = {};
// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    // Join a specific product room
    socket.on('join_room', (roomId) => {
        console.log(`Client ${socket.id} joining room: ${roomId}`);
        socket.join(roomId);
        // Send existing bids for the room
        const existingBids = roomBids[roomId] || [];
        socket.emit('existing_bids', existingBids); // Notify the client of past bids in this room
    });
    // Handle new bids
    socket.on('send_bid', ({ roomId, bid }) => {
        console.log(`Received bid for room ${roomId}: ${bid}`);
        // Save the bid in memory (for simplicity)
        if (!roomBids[roomId]) {
            roomBids[roomId] = [];
        }
        roomBids[roomId].push(bid);
        // Broadcast the bid to all clients in the room
        io.to(roomId).emit('bid_update', bid); // Notify all clients in the room of the new bid
    });
    // Leave a room
    socket.on('leave_room', (roomId) => {
        console.log(`Client ${socket.id} leaving room: ${roomId}`);
        socket.leave(roomId);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
// Default route for testing
app.get('/', (req, res) => {
    res.send('Socket.IO server is running!');
});
// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
