import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import ItemUploadForm from "../pages/ItemUploadForm";
import "./App.css";

interface User {
  username: string;
  email: string;
}

function App() {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) as User : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Directly pass the user to the component
    const getAuthenticatedComponent = (Component: React.ComponentType<{ user: User }>) => {
        return user ? <Component user={user} /> : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
                <Route path="/chat" element={getAuthenticatedComponent(Chat)} />
                <Route path="/dashboard" element={getAuthenticatedComponent(Dashboard)} />
                <Route path="/uploads" element={getAuthenticatedComponent(ItemUploadForm)} />
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
