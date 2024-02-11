import React from "react";

const PromptBox = ({ model, evaluate, prompt, setPrompt, respList, setRespList }) => {
    async function call_api(event) {
        event.preventDefault();

        try {
            console.log("\nModel: " + model +
                "\n\nPrompt: " + prompt +
                "\n\nContext: ")
            
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ model: model, prompt: prompt }),
            });

            const result = await response.json();
            console.log("Result:");
            console.log(result);

            if (response.ok) {
                setRespList(result);
            }

        } catch (e) {
            console.log(e);
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