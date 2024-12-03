import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Store bids for each room (in-memory storage for simplicity)
const roomBids: { [roomId: string]: string[] } = {};

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Join a specific product room
  socket.on('join_room', (roomId) => {
    console.log(`Client ${socket.id} joining room: ${roomId}`);
    socket.join(roomId);

    // Send existing bids for the room to the newly connected client
    const existingBids = roomBids[roomId] || [];
    socket.emit('existing_bids', existingBids); // Notify the client of existing bids in this room
  });

  // Handle new bids
  socket.on('send_bid', ({ roomId, bid }: { roomId: string; bid: string }) => {
    console.log(`Received bid for room ${roomId}: ${bid}`);

    // Save the bid in memory for the specific room
    if (!roomBids[roomId]) {
      roomBids[roomId] = [];
    }
    roomBids[roomId].push(bid);

    // Broadcast the new bid to all clients in the room
    io.to(roomId).emit('bid_update', bid); // Notify all clients in the room of the new bid
  });

  // Leave a room
  socket.on('leave_room', (roomId: string) => {
    console.log(`Client ${socket.id} leaving room: ${roomId}`);
    socket.leave(roomId);
  });

  // Handle client disconnection
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

