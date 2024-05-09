import React from "react";
import loading from "../imgs/load.gif";

const Response = ({ role, model="Model unavailable", content }) => {
    return (
        <div className={`resp${role === "user" ? " user" : " system"}`}>
            {(role !== "user") && (
                <div className="info-section">
                    <span className="model-tag">{model}</span>
                </div>
            )}
            {!content && (
                <div className="loading">
                    <img src={loading} alt="loading" />
                </div>
            )}
            {content && (
                <pre className="response">{content}</pre>
            )}
        </div>
    );
};

export default Response;
