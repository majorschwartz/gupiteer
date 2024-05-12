import React from "react";
import loading from "../imgs/load.gif";

const Response = ({ role, model = "Model unavailable", content }) => {
    return (
        <div className={`resp${role === "user" ? " user" : " system"}`}>
            <div className="resp-narrow">
                <div className={`color-bar${role === "user" ? " user" : " system"}`}>&nbsp;</div>
                <div className="main-resp">
                    <div className="tag">{role === "user" ? "You" : model}</div>
                    <div className="response">
                        {!content && (
                            <div className="loading">
                                <img src={loading} alt="loading" />
                            </div>
                        )}
                        {content && <pre>{content}</pre>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Response;
