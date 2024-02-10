import React from "react";

const ResponseBox = ({ resp }) => {
    console.log(resp);
    return (
        <div className="resp-box">
            <pre className="">
                {resp}
            </pre>
        </div>
    );
}

export default ResponseBox;