import React from "react";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <div className="auth-wrapper">
            {isLoggedIn ? (
                <button onClick={logout} className="log-out auth-button">
                    Log Out
                </button>
            ) : (
                <>
                    <button
                        onClick={() => navigate("/login")}
                        className="log-in auth-button"
                    >
                        Log In
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        href="/register"
                        className="register auth-button"
                    >
                        Register
                    </button>
                </>
            )}
        </div>
    );
};

export default Auth;
