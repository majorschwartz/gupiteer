import React, { useState } from "react";

const ModelDrop = ({ model, setModel }) => {
    return (
        <div>
            Model Drop
            <div>
                <select value={model} onChange={(e) => {
                    setModel(e.target.value);
                }}>
                    <option value="gpt-3.5">GPT 3.5</option>
                    <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
                    <option value="gpt-4">GPT 4</option>
                </select>
            </div>
        </div>
    );
}

export default ModelDrop;