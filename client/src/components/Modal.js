import React, { useState } from "react";

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
                        OpenAI API Key:{" "}
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
                        Gemini API Key:{" "}
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
                        Anthropic API Key:{" "}
                        <input
                            type="text"
                            id="anthropic-key"
                            placeholder="sk-ant-api03-"
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
