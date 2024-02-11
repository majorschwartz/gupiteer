import React from "react";

const EvalToggle = () => {
    return (
        <div>
            <label>Evaluation</label>
            <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
            </label>
        </div>
    );
}

export default EvalToggle;