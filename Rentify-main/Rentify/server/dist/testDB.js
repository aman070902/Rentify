"use strict";

const dotenv = require('dotenv');
dotenv.config({ path: 'C:/Users/ashut/Desktop/E81 CSE 503S/Rentify Project/Rentify-main/Rentify/server/.env' }); // Explicit path

const { connectDB } = require('./config/db');

const testConnection = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Debug MONGO_URI
    await connectDB();
    console.log('Test connection successful!');
  } catch (error) {
    console.error(`Test connection failed:`, error);
  }
};

testConnection();