import React, { useEffect } from "react";
import { useKeys } from "../providers/KeyContext";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../providers/AuthContext";

const PromptBox = ({
    model,
    prompt,
    setPrompt,
    respList,
    setRespList,
}) => {
    const navigate = useNavigate();
    const { keys } = useKeys();
    const { chat_id } = useParams();
    // const { isLoggedIn } = useAuth();

    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    useEffect(() => {
        async function getChatInfo() {
            if (chat_id) {
                const chat_info = await fetch(apiUrl + "/chat/" + chat_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const data = await chat_info.json();
                console.log("Chat Info: ", data);
            }
        }
        getChatInfo();
    }, [apiUrl, chat_id]);

    async function call_api(event) {
        event.preventDefault();

        try {
            const new_chat = await fetch(apiUrl + "/chat/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    keys: keys,
                }),
            });
            const data = await new_chat.json();
            console.log("New Chat Response: ", data);
            navigate("/chat/" + data.chat_id);
        }
        catch (e) {
            console.log(e);
            console.log("\n\nError sending fetch request.\n\n");
        }
        

        // var givenPrompt = {
        //     user: true,
        //     response: prompt,
        //     model: model,
        // };
        // var pending = {
        //     user: false,
        //     response: false,
        //     model: model,
        // };

        // var responses = structuredClone(respList);
        // responses.push(givenPrompt);
        // var pending_list = structuredClone(responses);
        // pending_list.push(pending);
        // setRespList(pending_list);

        // try {
        //     console.log(
        //         "\nModel: " +
        //             model +
        //             "\nPrompt: " +
        //             prompt +
        //             "\n\n"
        //     );

        //     if (responses.length === 1) {
        //         console.log("New chat.");
        //     }
            
        //     const response = await fetch(apiUrl + "/submit", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*",
        //         },
        //         body: JSON.stringify({
        //             model: model,
        //             prompt: prompt,
        //             respList: responses,
        //             keys: keys,
        //         }),
        //     });

        //     const result = await response.json();
        //     console.log("Result: ", result);

        //     if (response.ok) {
        //         setRespList(result);
        //     }
        // } catch (e) {
        //     console.log(e);
        //     console.log("\n\nError sending fetch request.\n\n");
        // }
    }

    return (
        <div>
            <form onSubmit={call_api} className="prompt-comps">
                <textarea
                    className="prompt-box"
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
