import React from "react";
import { useKeys } from "../providers/KeyContext";
// import { useAuth } from "../providers/AuthContext";

const PromptBox = ({
    model,
    prompt,
    setPrompt,
    respList,
    setRespList,
}) => {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const { keys } = useKeys();
    // const { isLoggedIn } = useAuth();

    async function call_api(event) {
        event.preventDefault();

        var givenPrompt = {
            user: true,
            response: prompt,
            model: model,
        };
        var pending = {
            user: false,
            response: false,
            model: model,
        };

        var responses = structuredClone(respList);
        responses.push(givenPrompt);
        var pending_list = structuredClone(responses);
        pending_list.push(pending);
        setRespList(pending_list);

        try {
            console.log(
                "\nModel: " +
                    model +
                    "\nPrompt: " +
                    prompt +
                    "\n\n"
            );

            if (responses.length === 1) {
                console.log("New chat.");
            }
            
            const response = await fetch(apiUrl + "/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    respList: responses,
                    keys: keys,
                }),
            });

            const result = await response.json();
            console.log("Result: ", result);

            if (response.ok) {
                setRespList(result);
            }
        } catch (e) {
            console.log(e);
            console.log("\n\nError sending fetch request.\n\n");
        }
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
