import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GetEmail from "./pages/GetEmail";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/chat/:chat_id" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/email" element={<GetEmail />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
