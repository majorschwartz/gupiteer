import React from "react";

const Auth = () => {
    return (    
        <div className="auth-wrapper">
            <a href="/login"><button className="log-in auth-button">Log In</button></a>
            <a href="/register"><button href="/register" className="register auth-button">Register</button></a>
            <button style={{ display: "none" }} className="sign-out auth-button">Sign Out</button>
        </div>
    );
}

export default Auth;