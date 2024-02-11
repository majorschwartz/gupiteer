import React from "react";

const Response = ({ user, response, eval_score, model }) => {
    return (
        <div className={"resp" + (user ? " user" : " system")}>
                {!user &&
                    <div className="info-section">
                        <span className="model-tag">{model}</span>
                        <span className="middle-bar">&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</span>
                        <span className="eval-tag">{eval_score}</span>
                    </div>
                }
            <pre>
                {response}
            </pre>
        </div>
    );
}

export default Response;