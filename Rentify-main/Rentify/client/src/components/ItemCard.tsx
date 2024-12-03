import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:3001'); // Replace with your backend URL if hosted remotely

interface Product {
  id: number; // `id` is treated as a number
  name: string;
  description: string;
  price: number;
  image: string;
}

interface User {
  username: string;
}

export interface ItemCardProps {
  product: Product;
  user: User;
}

const ItemCard = ({ product, user }: ItemCardProps) => {
  const [bids, setBids] = useState<string[]>([]); // Holds the bids for this product

  // Effect to handle real-time bid updates and room joining
  useEffect(() => {
    // Test WebSocket connection
    socket.on('test', (message) => {
      console.log(message); // Should log "WebSocket connection successful!"
    });

    // Join the room for this product when component mounts
    socket.emit('join_room', product.id.toString());
    console.log(`Joined room for product ${product.id}`);

    // Fetch existing bids for the room
    socket.on('existing_bids', (existingBids: string[]) => {
      console.log(`Fetched existing bids for room ${product.id}:`, existingBids);
      setBids(existingBids); // Update the bids state with existing bids
    });

    // Listen for real-time updates of new bids
    socket.on('bid_update', (newBid: string) => {
      console.log(`Bid update received on client: ${newBid}`);
      setBids((prevBids) => [...prevBids, newBid]); // Append new bids
    });

    // Cleanup listeners when the component unmounts
    return () => {
      socket.emit('leave_room', product.id.toString());
      console.log(`Left room for product ${product.id}`);

      socket.off('existing_bids');
      socket.off('bid_update');
      socket.off('test');
    };
  }, [product.id]);

  // Handle submitting a bid
  const handleBid = () => {
    const inputElement = document.getElementById(`bid-input-${product.id}`) as HTMLInputElement;
    const bidAmount = inputElement?.value;

    if (bidAmount) {
      const bidMessage = `${user.username} placed a bid of $${bidAmount}`;
      console.log(`Sending bid: ${bidMessage} for room ${product.id}`);
      socket.emit('send_bid', { roomId: product.id.toString(), bid: bidMessage });
      inputElement.value = ''; // Clear the input
    } else {
      console.log('No bid amount entered');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <input
          id={`bid-input-${product.id}`}
          type="number"
          placeholder="Enter your bid"
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleBid}>Place Bid</button>
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: '20px',
          borderLeft: '1px solid #ccc',
          paddingLeft: '10px',
        }}
      >
        <h4>Bids</h4>
        <ul>
          {bids.length > 0 ? (
            bids.map((bid, index) => <li key={index}>{bid}</li>)
          ) : (
            <li>No bids yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ItemCard;
