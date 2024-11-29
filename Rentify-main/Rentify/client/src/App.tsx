import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);

    // Check localStorage for a logged-in user when the app initializes
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restore the user from localStorage
        }
    }, []);

    return (
        <Router>
            {/* Pass both user and setUser to Header */}
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
