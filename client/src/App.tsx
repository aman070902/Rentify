import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/dashboard" element={<Dashboard user={{ name: "John Doe" }} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
