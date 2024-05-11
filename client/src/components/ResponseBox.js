import React from "react";
import Response from "./Response";

const ResponseBox = ({ respList }) => {
    if (!respList) {
        return <div className="resp-box"></div>;
    }
    return (
        <div className="resp-box">
            {respList.length > 0 &&
                respList.map((resp, index) => <Response key={index} {...resp} />)}
        </div>
    );
};

export default ResponseBox;
