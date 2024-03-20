import React from "react";

const Modal = ({ shown, setShown, keys, setKeys }) => {
    const givenKeys = { ...keys };

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
                                givenKeys["openai-key"] = e.target.value;
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
                                givenKeys["gemini-key"] = e.target.value;
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
                                givenKeys["anthropic-key"] = e.target.value;
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
