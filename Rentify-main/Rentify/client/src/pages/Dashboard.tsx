import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface User {
  username: string;
  email: string;
}

const Dashboard = ({ user }: { user: User }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop",
      description: "High-performance laptop",
      price: 1000,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Camera",
      description: "DSLR camera for high-quality photos",
      price: 600,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Bicycle",
      description: "Mountain bike for outdoor enthusiasts",
      price: 200,
      image: "https://via.placeholder.com/150",
    },
  ]);

  useEffect(() => {
    console.log("User data:", user);
    // Placeholder fetch logic for dynamic content if needed
  }, [user]);

  return (
    <div className="dashboard">
      {/* User Info Column */}
      <div className="column user-info">
        <h2>User Information</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Saved Posts:</strong> None (for now)
        </p>
      </div>

      {/* Items on Rent Column */}
      <div className="column items-feed">
        <h2>Items on Rent</h2>
        <div className="items-container">
          {products.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;