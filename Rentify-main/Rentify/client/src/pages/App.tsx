import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import "./App.css";

function App() {
    // Initialize user state with data from localStorage
    const [user, setUser] = useState<{ username: string; email: string } | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Sync user state with localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <Router>
            <Header user={user} setUser={setUser} /> {/* Pass both user and setUser */}
            <Routes>
                {/* Redirect logged-in users to the dashboard */}
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                
                {/* Protect chat and dashboard routes */}
                <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                />
                
                {/* Default fallback */}
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;