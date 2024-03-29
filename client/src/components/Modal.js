import React, { useEffect } from "react";

const Modal = ({ shown, setShown, keys, setKeys }) => {
    const givenKeys = [ ...keys ];

    useEffect(() => {
        console.log("Keys: ", givenKeys);

        for (let i = 0; i < givenKeys.length; i++) {
            if (givenKeys[i]['valid'] == false) {
                console.log("Invalid key: ", givenKeys[i]);
                // Update keys
            }
        }
    }, [givenKeys]);

    return (
        <div className={"modal" + (shown ? " shown" : " hidden")}>
            <div
                className="modal-background"
                onClick={() => {
                    setShown(false);
                }}
            ></div>
            <div className="modal-box">
                <div className="modal-header">
                    <div>API Keys</div>
                    <button
                        className="modal-close"
                        onClick={() => {
                            setShown(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="modal-content">
                    <div>
                        <span className="key-text">OpenAI API Key: </span>
                        <input
                            type="text"
                            id="openai-key"
                            placeholder="sk-..."
                            onChange={(e) => {
                                givenKeys[0]["openai-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">Gemini API Key: </span>
                        <input
                            type="text"
                            id="gemini-key"
                            placeholder="..."
                            onChange={(e) => {
                                givenKeys[1]["gemini-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">Anthropic API Key: </span>
                        <input
                            type="text"
                            id="anthropic-key"
                            placeholder="sk-ant-api03-..."
                            onChange={(e) => {
                                givenKeys[2]["anthropic-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
