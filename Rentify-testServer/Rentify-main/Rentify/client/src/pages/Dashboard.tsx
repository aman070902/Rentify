import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface User {
  username: string;
  email: string;
}

interface DashboardProps {
  user: User;
}

// Function to fetch items based on search term
async function fetchItems(searchTerm: string): Promise<Product[]> {
  const endpoint = searchTerm ? `/api/search?query=${encodeURIComponent(searchTerm)}` : "/api/items";
  const url = `http://localhost:3001${endpoint}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems(searchTerm).then(setProducts);
  }, [searchTerm]); // Fetch items based on search term change

  return (
    <div className="dashboard">
      <div className="column user-info">
        <h2>User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="column items-feed">
        <h2>Items on Rent</h2>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <div className="items-container">
          {products.length > 0 ? (
            products.map(product => (
              <ItemCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  image: product.imageUrl || "https://via.placeholder.com/150"
                }}
              />
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
