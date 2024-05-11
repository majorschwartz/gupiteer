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
import Chats from "../components/Chats";

function Main() {
    const [model, setModel] = useState("gpt-3.5-turbo");
    const [respList, setRespList] = useState([]);

    return (
        <CookiesProvider>
            <AuthProvider>
                <KeyProvider>
                    <div className="App">
                        <div className="left-primary">
                            <div className="width-height">
                                <div className="flex-full">
                                    <div className="flex-wrap">
                                        <nav className="navigation">
                                            <div className="title-section">
                                                <div className="title-bar">
                                                    <Title />
                                                </div>
                                            </div>
                                            <div className="chat-section">
                                                <div className="chats-wrap">
                                                    <div className="chats">
                                                        <Chats />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="options-section">
                                                <KeySection />
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-primary">
                            <main className="main-section">
                                {/* <div className="menu-toggle">
                                    <button className="menu-button">
                                        <span className="menu-obj-wrapper">
                                            <div className="obj-center">
                                                <div className="obj-alignment">
                                                    <div className="menu-button top" />
                                                    <div className="menu-button buttom" />
                                                </div>
                                            </div>
                                        </span>
                                    </button>
                                </div> */}
                                <div className="main-content">
                                    <div className="conversation-section">
                                        <div className="relative-full">
                                            <div className="inner-convo-banner">
                                                <div className="convo-wrap">
                                                    <div className="inner-convo-content">
                                                        <div className="chat-interactive-bar">
                                                        <ModelDrop
                                                            model={model}
                                                            setModel={setModel}
                                                        />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prompt-section">

                                    </div>
                                </div>
                            </main>
                        </div>


                        <div>
                            <Auth />
                            <ResponseBox respList={respList} />
                            <PromptBox
                                model={model}
                                respList={respList}
                                setRespList={setRespList}
                            />
                        </div>
                    </div>
                </KeyProvider>
            </AuthProvider>
        </CookiesProvider>
    );
}

export default Main;
