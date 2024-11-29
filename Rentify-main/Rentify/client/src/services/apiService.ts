import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your server's base URL if different
  timeout: 5000, // Set a timeout for requests
});

// Add a request interceptor if you need to add headers like tokens
api.interceptors.request.use(
  (config) => {
    // For example, add a token to the Authorization header
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the Axios instance for reuse
export default api;

