import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

interface Product {
  _id: number; // Updated to reflect MongoDB's ObjectId
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional since some items may not have an image
}

interface User {
  username: string;
  email: string;
}

interface DashboardProps {
  user: User; // Accepts user as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]); // No sample items

  // Fetch items from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/items"); // Adjust API endpoint as needed
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="dashboard">
      <div className="column user-info">
        <h2>User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Saved Posts:</strong> None (for now)</p>
      </div>
      <div className="column items-feed">
        <h2>Items on Rent</h2>
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
                  image: product.imageUrl || "https://via.placeholder.com/150",
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

