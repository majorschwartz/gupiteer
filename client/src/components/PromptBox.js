import React from "react";

const PromptBox = ({ model, evaluate, prompt, setPrompt, respList, setRespList }) => {
    async function call_api(event) {
        event.preventDefault();

        try {
            var givenPrompt = {user: true, response: prompt, eval_score: 0, model: model};
            var responses = JSON.parse(JSON.stringify(respList));
            responses.push(givenPrompt);
            console.log(responses);
            setRespList(responses);
        } catch (e) {
            console.log(e);
            console.log("\n\nIssues with adding the new prompt.\n\n");
        }

        try {
            console.log("\nModel: " + model +
                "\n\nEvaluate: " + evaluate +
                "\n\nPrompt: " + prompt +
                "\n\nrespList: " + respList)
            
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ model: model, evaluate: evaluate, prompt: prompt, respList: respList }),
            });

            const result = await response.json();
            console.log("Result:");
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
                <button className="prompt-button">
                    &rarr;
                </button>
            </form>
        </div>
    );
}

export default PromptBox;