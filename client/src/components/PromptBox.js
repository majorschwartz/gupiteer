import React from "react";

const PromptBox = ({ setResp }) => {
    async function callAPI(event) {
        event.preventDefault();

        try {
            var model = "gpt-3.5-turbo";
            var prompt = "Give me a haiku about coding.";
            var context = "";
            
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
                <textarea></textarea>
                <button>
                    Call API
                </button>
            </form>
        </div>
    );
}

export default PromptBox;