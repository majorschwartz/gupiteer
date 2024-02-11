import React from "react";

const EvalToggle = () => {
    return (
        <div className="eval-comps">
            <div className="eval-text">Eval Toggle</div>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default EvalToggle;