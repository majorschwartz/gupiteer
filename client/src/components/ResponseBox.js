import React from "react";
import Response from "./Response";

const ResponseBox = ({ respList }) => {
    return (
        <div className="resp-box">
            {respList.length > 0 &&
                respList.map((resp) => <Response {...resp} />)}
        </div>
    );
};

export default ResponseBox;
