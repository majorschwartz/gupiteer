import React, { useState } from "react";
import "./App.css";
import EvalToggle from "./components/EvalToggle";
import ModelDrop from "./components/ModelDrop";
import PromptBox from "./components/PromptBox";
import Title from "./components/Title";
import ResponseBox from "./components/ResponseBox";
import KeySection from "./components/KeySection";
import Modal from "./components/Modal";

function App() {
    const [keys, setKeys] = useState([
            {"openai-key": "", "valid": false},
            {"gemini-key": "", "valid": false},
            {"anthropic-key": "", "valid": false},
    ]);
    const [context, setContext] = useState([]);
    const [model, setModel] = useState("gpt-3.5-turbo");
    const [evaluate, setEval] = useState(false);
    const [respList, setRespList] = useState([]);
    const [prompt, setPrompt] = useState("");

    return (
        <div className="App">
            <div className="flex-container">
                <div className="row top-row">
                    <div className="column first-column">
                        <Title />
                    </div>
                    <div className="column second-column">
                        <div className="bar-options">
                            <ModelDrop model={model} setModel={setModel} />
                            <EvalToggle evaluate={evaluate} setEval={setEval} />
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
                            evaluate={evaluate}
                            prompt={prompt}
                            setPrompt={setPrompt}
                            respList={respList}
                            setRespList={setRespList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
