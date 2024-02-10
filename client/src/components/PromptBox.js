import React from "react";

const PromptBox = ({ model, prompt, setPrompt, setResp }) => {
    async function callAPI(event) {
        event.preventDefault();

        try {
            var context = "";
            console.log("\nModel: " + model +
                "\n\nPrompt: " + prompt +
                "\n\nContext: " + context)
            
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ model: model, prompt: prompt, context: context }),
            });

            const result = await response.json();
            console.log("Result:");
            console.log(result);

            if (response.ok) {
                setResp(result);
            }

        } catch (e) {
            console.log(e);
        }
    }
    
    
    return (
        <div>
            <form onSubmit={callAPI}>
                <textarea 
                    className="prompt-box"
                    onChange={(e) => {
                        setPrompt(e.target.value);
                    }}
                ></textarea>
                <button>
                    Call API
                </button>
            </form>
        </div>
    );
}

export default PromptBox;