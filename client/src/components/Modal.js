import React from "react";
import { useKeys } from "../providers/KeyContext";

const Modal = ({ shown, setShown }) => {
    const { keys, setKeys } = useKeys();
    
    const handleChange = (keyName, newValue) => {
        setKeys({ ...keys, [keyName]: newValue });
    }

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
                            spellCheck="false"
                            value={keys["openai-key"] || ''}
                            onChange={(e) => handleChange("openai-key", e.target.value)}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            Gemini API Key:{" "}
                        </span>
                        <input
                            type="text"
                            id="gemini-key"
                            placeholder="..."
                            spellCheck="false"
                            value={keys["gemini-key"] || ''}
                            onChange={(e) => handleChange("gemini-key", e.target.value)}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            Anthropic API Key:{" "}
                        </span>
                        <input
                            type="text"
                            id="anthropic-key"
                            placeholder="sk-ant-api03-..."
                            spellCheck="false"
                            value={keys["anthropic-key"] || ''}
                            onChange={(e) => handleChange("anthropic-key", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
