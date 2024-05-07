import React, { useState } from "react";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            console.log(response);
            if (response.ok) {
                console.log("Registration successful.");
                navigate("/login");
            } else {
                throw new Error("Failed to register.");
            }
        } catch (error) {
            console.error("Failed to register.");
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <p>You are already logged in.</p>
                    <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                    <br />
                    <a href="/"><button>Back to Home</button></a>
                </>
            ) : (
                <>
                    <div>
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
                            <br />
                            <button type="submit">Register</button>
                        </form>
                        <br />
                        <a href="/"><button>Back to Home</button></a>
                    </div>
                </>
            )}
        </div>
    );
};

export default Register;