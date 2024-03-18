import React, { useState } from "react";

const ModelDrop = ({ model, setModel }) => {
    return (
        <div className="model-comps">
            <div className="model-name">Model:</div>
            <div className="model-select">
                <select
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                    }}
                >
                    <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-32k">GPT-4-32k</option>
                    <option value="gpt-4-0125-preview">
                        GPT-4-0125-Preview
                    </option>
                    <option value="mistral-7b">Mistral 7B</option>
                    <option value="google-gemini">Google Gemini</option>
                </select>
            </div>
        </div>
    );
};

export default ModelDrop;
