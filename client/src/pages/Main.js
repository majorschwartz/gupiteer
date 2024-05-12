import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import ModelDrop from "../components/ModelDrop";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import ResponseBox from "../components/ResponseBox";
import KeySection from "../components/KeySection";
import Modal from "../components/Modal";
import Auth from "../components/Auth";
import Chats from "../components/Chats";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "../providers/AuthContext";
import { KeyProvider } from "../providers/KeyContext";

function Main() {
    const [model, setModel] = useState("gpt-3.5-turbo");
    const [respList, setRespList] = useState([]);
    const [modalShown, setModalShown] = useState(false);

    const scrollRef = useRef(null);
    useEffect(() => {
        try {
            const div = scrollRef.current;
            div.scrollTop = div.scrollHeight;
        } catch (e) {
            console.log(e);
        }
    }, [respList]);

    return (
        <CookiesProvider>
            <AuthProvider>
                <KeyProvider>
                    <div className="App">
                        <Modal shown={modalShown} setShown={setModalShown} />
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
                                                <KeySection modalShown={modalShown} setModalShown={setModalShown} />
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-primary">
                            <main className="main-section">
                                <div className="main-content">
                                    <div className="conversation-section">
                                        <div className="relative-full">
                                            <div className="inner-convo-banner" ref={scrollRef}>
                                                <div className="convo-wrap">
                                                    <div className="inner-convo-content">
                                                        <div className="chat-interactive-bar">
                                                            <ModelDrop
                                                                model={model}
                                                                setModel={setModel}
                                                            />
                                                            <Auth />
                                                        </div>
                                                        <ResponseBox respList={respList} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prompt-section">
                                        <PromptBox
                                            model={model}
                                            respList={respList}
                                            setRespList={setRespList}
                                        />
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </KeyProvider>
            </AuthProvider>
        </CookiesProvider>
    );
}

export default Main;
