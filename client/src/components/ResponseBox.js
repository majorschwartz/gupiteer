import React from "react";

const ResponseBox = ({ resp }) => {
    console.log(resp);
    return (
        <pre>
            {resp}
        </pre>
    );
}

export default ResponseBox;