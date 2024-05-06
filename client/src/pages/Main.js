import React, { useState } from "react";
import "../App.css";
import ModelDrop from "../components/ModelDrop";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import ResponseBox from "../components/ResponseBox";
import KeySection from "../components/KeySection";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "../providers/AuthContext";
import { KeyProvider } from "../providers/KeyContext";

import Auth from "../components/Auth";

function Main() {
    const [model, setModel] = useState("gpt-3.5-turbo");
    const [respList, setRespList] = useState([]);
    const [prompt, setPrompt] = useState("");

    return (
        <CookiesProvider>
            <AuthProvider>
                <KeyProvider>
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
                                        />
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
                                    <KeySection />
                                </div>
                                <div className="column second-column">
                                    <PromptBox
                                        model={model}
                                        prompt={prompt}
                                        setPrompt={setPrompt}
                                        respList={respList}
                                        setRespList={setRespList}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </KeyProvider>
            </AuthProvider>
        </CookiesProvider>
    );
}

export default Main;
