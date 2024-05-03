import React from "react";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="auth-wrapper">
            {isLoggedIn ? (
                <button onClick={logout} className="log-out auth-button">
                    Log Out
                </button>
            ) : (
                <>
                    <a href="/login">
                        <button className="log-in auth-button">Log In</button>
                    </a>
                    <a href="/register">
                        <button
                            href="/register"
                            className="register auth-button"
                        >
                            Register
                        </button>
                    </a>
                </>
            )}
        </div>
    );
};

export default Auth;
