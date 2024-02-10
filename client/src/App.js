import React, { useState } from "react";
import "./App.css";
import EvalToggle from "./components/EvalToggle";
import ModelDrop from "./components/ModelDrop";
import PromptBox from "./components/PromptBox";
import Title from "./components/Title";
import ResponseBox from "./components/ResponseBox";

function App() {
    const [resp, setResp] = useState("Pending...");

    return (
        <div className="App">
            <div class="flex-container">
                <div class="row top-row">
                    <div class="column first-column">
                        <Title />
                    </div>
                    <div class="column second-column">
                        <div className="bar-options">
                            <ModelDrop />
                            <EvalToggle />
                        </div>
                    </div>
                </div>
                <div class="row middle-row">
                    <div class="column first-column">3</div>
                    <div class="column second-column">
                        <ResponseBox resp={resp} />
                    </div>
                </div>
                <div class="row bottom-row">
                    <div class="column first-column">5</div>
                    <div class="column second-column">
                        <PromptBox setResp={setResp} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
