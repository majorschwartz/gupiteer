import React from "react";

const EvalToggle = ({ evaluate, setEval }) => {
    function updateEval() {
        setEval(!evaluate);
        console.log(evaluate);
    }

    return (
        <div className="eval-comps">
            <div className="eval-text">Evaluation</div>
            <button
                className={"eval-toggle" + (evaluate ? " on" : " off")}
                onClick={updateEval}
            >
                X
            </button>
        </div>
    );
};

export default EvalToggle;
