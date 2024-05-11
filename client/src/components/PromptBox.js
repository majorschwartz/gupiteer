import React, { useState, useEffect } from "react";
// import { useKeys } from "../providers/KeyContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const PromptBox = ({
    model,
    // prompt,
    // setPrompt,
    respList,
    setRespList,
}) => {
    const navigate = useNavigate();
    // const { keys } = useKeys();
    const { chat_id } = useParams();
    const { isLoggedIn } = useAuth();
    const [prompt, setPrompt] = useState("");

    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    useEffect(() => {
        async function getChatInfo() {
            if (chat_id) {
                try {
                    const chat_info = await fetch(apiUrl + "/chat/" + chat_id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    });
                    const data = await chat_info.json();
                    console.log("Chat Info:", data);
                    if (data.error) {
                        console.log("Error fetching chat info.");
                        setRespList([]);
                        navigate("/");
                    } else {
                        setRespList(data.chat);
                    }
                } catch (e) {
                    console.log(e);
                    console.log("Error fetching chat info.");
                    navigate("/");
                }
            }
        }
        getChatInfo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, chat_id]);

    useEffect(() => {
        if (!chat_id) {
            console.log("Clearing chat.");
            setRespList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat_id]);

    async function call_api(event) {
        event.preventDefault();

        if (!prompt) {
            return;
        }

        setRespList([
            ...respList,
            {
                role: "user",
                content: prompt,
                model: model,
            },
            {
                role: "system",
                content: false,
                model: model,
            },
        ]);

        const user_prompt = structuredClone(prompt);
        console.log("Emptying prompt.");
        setPrompt("");

        if (isLoggedIn && !chat_id) {
            try {
                const new_chat = await fetch(apiUrl + "/chat/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        model: model,
                        prompt: user_prompt,
                    }),
                });
                const data = await new_chat.json();
                console.log("New Chat Response: ", data);
                navigate("/chat/" + data.chat_id);
            } catch (e) {
                console.log(e);
                console.log("\n\nError creating new chat.\n\n");
            }
        }

        if (isLoggedIn && chat_id) {
            try {
                const new_message = await fetch(
                    apiUrl + "/chat/" + chat_id + "/message",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                        body: JSON.stringify({
                            model: model,
                            prompt: user_prompt,
                        }),
                    }
                );
                const chat = await new_message.json();
                setRespList(chat);

                console.log("Message Response: ", chat);
            } catch (e) {
                console.log(e);
                console.log("\n\nError sending chat message.\n\n");
            }
        }
    }

    return (
        <div>
            <form onSubmit={call_api} className="prompt-comps">
                <textarea
                    className="prompt-box"
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                    }}
                    placeholder="Enter your prompt..."
                ></textarea>
                <button className="prompt-button">&rarr;</button>
            </form>
        </div>
    );
};

export default PromptBox;
