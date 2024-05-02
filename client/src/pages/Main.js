import React, { useEffect, useState } from "react";
import "../App.css";
// import EvalToggle from "../components/EvalToggle";
import ModelDrop from "../components/ModelDrop";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import ResponseBox from "../components/ResponseBox";
import KeySection from "../components/KeySection";
import { CookiesProvider, useCookies } from "react-cookie";
import Auth from "../components/Auth";

function Main() {
    const [cookies, setCookie] = useCookies([
        "openai-key",
        "gemini-key",
        "anthropic-key",
    ]);
    const [keys, setKeys] = useState([
        { "openai-key": cookies["openai-key"], valid: false },
        { "gemini-key": cookies["gemini-key"], valid: false },
        { "anthropic-key": cookies["anthropic-key"], valid: false },
    ]);
    const [model, setModel] = useState("gpt-3.5-turbo");
    // const [evaluate, setEval] = useState(false);
    const [respList, setRespList] = useState([]);
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        const keyTypes = ["openai-key", "gemini-key", "anthropic-key"];

        for (let i = 0; i < keys.length; i++) {
            if (keys[i][keyTypes[i]] !== undefined) {
                setCookie(keyTypes[i], keys[i][keyTypes[i]], { path: "/" });
            }
        }
    });

    return (
        <CookiesProvider>
            <div className="App">
                <div className="flex-container">
                    <div className="row top-row">
                        <div className="column first-column">
                            <Title />
                        </div>
                        <div className="column second-column">
                            <div className="bar-options">
                                <ModelDrop
                                    model={model}
                                    setModel={setModel}
                                    keys={keys}
                                />
                                {/* <EvalToggle evaluate={evaluate} setEval={setEval} /> */}
                                <Auth />
                            </div>
                        </div>
                    </div>
                    <div className="row middle-row">
                        <div className="column first-column"></div>
                        <div className="column second-column">
                            <ResponseBox respList={respList} />
                        </div>
                    </div>
                    <div className="row bottom-row">
                        <div className="column first-column">
                            <KeySection keys={keys} setKeys={setKeys} />
                        </div>
                        <div className="column second-column">
                            <PromptBox
                                model={model}
                                // evaluate={evaluate}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                respList={respList}
                                setRespList={setRespList}
                                keys={keys}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CookiesProvider>
    );
}

export default Main;
