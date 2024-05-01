import React from "react";

const Modal = ({ shown, setShown, keys, setKeys }) => {
    const givenKeys = [...keys];

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
                            value={givenKeys[0]["openai-key"]}
                            onChange={(e) => {
                                givenKeys[0]["openai-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            {/* <span className="coming-soon">Coming Soon</span> */}
                            Gemini API Key:{" "}
                        </span>
                        <input
                            // disabled
                            type="text"
                            id="gemini-key"
                            placeholder="..."
                            spellCheck="false"
                            value={givenKeys[1]["gemini-key"]}
                            onChange={(e) => {
                                givenKeys[1]["gemini-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            {/* <span className="coming-soon">Coming Soon</span> */}
                            Anthropic API Key:{" "}
                        </span>
                        <input
                            // disabled
                            type="text"
                            id="anthropic-key"
                            placeholder="sk-ant-api03-..."
                            spellCheck="false"
                            value={givenKeys[2]["anthropic-key"]}
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
