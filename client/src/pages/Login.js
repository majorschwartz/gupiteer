import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
            const response = await fetch(apiUrl + "/login", {
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
            if (!response.ok) {
                throw new Error("Failed to login.");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            console.log("Login successful.");
            navigate("/");
        } catch (error) {
            console.error("Failed to login.");
        }
    };

    return (
        <div className="auth-page">
            <div className="form-wrapper">
                <div className="auth-title">Login</div>
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
                                Login
                            </button>
                        </form>
                        <div className="already-done">
                            <div>Don't have an account?</div>
                            <button
                                className="already-button"
                                onClick={() => navigate("/register")}
                            >
                                Register
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

export default Login;
