import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [setIsLoggedIn]);

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
        <div className="auth-page">
            <div className="form-wrapper">
                <div className="auth-title">Register</div>
                {!isLoggedIn ? (
                    <>
                        <form onSubmit={handleSubmit} className="main-form">
                            <div className="form-line">
                                <div>Email:</div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-line">
                                <div>Password:</div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button className="action-button" type="submit">
                                Register
                            </button>
                        </form>
                        <div className="already-done">
                            <div>Already have an account?</div>
                            <button
                                className="already-button"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="error-banner">
                            You are already logged in.
                        </div>
                        <button
                            className="action-button"
                            onClick={() => {
                                localStorage.removeItem("token");
                                setIsLoggedIn(false);
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
                <button className="back-to-home" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Register;
