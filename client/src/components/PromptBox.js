import React from "react";

const PromptBox = ({
    model,
    evaluate,
    prompt,
    setPrompt,
    respList,
    setRespList,
    keys,
}) => {
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    async function call_api(event) {
        event.preventDefault();

        var givenPrompt = {
            user: true,
            response: prompt,
            eval_score: 0,
            model: model,
        };
        var pending = {
            user: false,
            response: false,
            eval_score: 0,
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
                    "\n\nEvaluate: " +
                    evaluate +
                    "\n\nPrompt: " +
                    prompt +
                    "\n\nrespList: " +
                    responses
            );
            
            const response = await fetch(apiUrl + "/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    model: model,
                    evaluate: evaluate,
                    prompt: prompt,
                    respList: responses,
                    keys: keys,
                }),
            });

            const result = await response.json();
            console.log("Result: ");
            console.log(result);

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
