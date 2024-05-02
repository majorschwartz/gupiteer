import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/register",
                {
                    email,
                    password,
                }
            );
            console.log("Registration successful", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Failed to register", error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
