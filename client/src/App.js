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
    const [context, setContext] = useState([]);
    const [model, setModel] = useState("gpt-3.5");
    const [respList, setRespList] = useState([
        {user: true, response: "This is a question.", eval_score: 0, model: "GPT-4"},
        {user: false, response: "This is a response.", eval_score: 1, model: "GPT-4"}
    ]);
    const [prompt, setPrompt] = useState("");
    const [modalState, toggleModal] = useState(false);

    return (
        <div className="App">
            <Modal />
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
                    <div className="column first-column"></div>
                    <div className="column second-column">
                        <ResponseBox respList={respList} />
                    </div>
                </div>
                <div className="row bottom-row">
                    <div className="column first-column">
                        <KeySection onClick={() => {
                            toggleModal(false)
                        }} />
                    </div>
                    <div className="column second-column">
                        <PromptBox model={model} prompt={prompt} setPrompt={setPrompt} setRespList={setRespList} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
