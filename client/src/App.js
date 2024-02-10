import React, { useState } from "react";
import "./App.css";
import EvalToggle from "./components/EvalToggle";
import ModelDrop from "./components/ModelDrop";
import PromptBox from "./components/PromptBox";
import Title from "./components/Title";
import ResponseBox from "./components/ResponseBox";

function App() {
    var tester = ""
    const [model, setModel] = useState("");
    const [resp, setResp] = useState("Pending...");
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
                            <EvalToggle />
                        </div>
                    </div>
                </div>
                <div className="row middle-row">
                    <div className="column first-column">3</div>
                    <div className="column second-column">
                        <ResponseBox resp={resp} />
                    </div>
                </div>
                <div className="row bottom-row">
                    <div className="column first-column">5</div>
                    <div className="column second-column">
                        <PromptBox prompt={prompt} setPrompt={setPrompt} setResp={setResp} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
