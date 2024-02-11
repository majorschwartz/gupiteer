import React from "react";

const Response = ({ user, response, eval_score, model }) => {
    return (
        <div className={"resp" + (user ? " user" : " system")}>
            <div className="info-section">
                <span className="model-tag">{model}</span>
                {!user &&
                    <>
                        <span className="middle-bar"> | </span>
                        <span className="eval-tag">{eval_score}</span>
                    </>
                }
            </div>
            <pre>
                {response}
            </pre>
        </div>
    );
}

export default Response;