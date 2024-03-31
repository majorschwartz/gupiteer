import React from "react";

const Modal = ({ shown, setShown, keys, setKeys }) => {
    const givenKeys = [...keys];
    // Necessary?

    // useEffect(() => {
    //     console.log("Keys: ", givenKeys);

    //     for (let i = 0; i < givenKeys.length; i++) {
    //         if (givenKeys[i]["valid"] == false) {
    //             console.log("Invalid key: ", givenKeys[i]);
    //             // Update keys
    //         }
    //     }
    // }, [givenKeys]);

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
                            spellcheck="false"
                            onChange={(e) => {
                                givenKeys[0]["openai-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            <span className="coming-soon">Coming Soon</span>
                            Gemini API Key:{" "}
                        </span>
                        <input
                            disabled
                            type="text"
                            id="gemini-key"
                            placeholder="..."
                            spellcheck="false"
                            onChange={(e) => {
                                givenKeys[1]["gemini-key"] = e.target.value;
                                setKeys(givenKeys);
                            }}
                        />
                    </div>
                    <div>
                        <span className="key-text">
                            <span className="coming-soon">Coming Soon</span>
                            Anthropic API Key:{" "}
                        </span>
                        <input
                            disabled
                            type="text"
                            id="anthropic-key"
                            placeholder="sk-ant-api03-..."
                            spellcheck="false"
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
