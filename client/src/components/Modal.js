import React, { useState } from "react";

const Modal = () => {
    const [shown, setShown] = useState(false);
    
    return (
        <div className={"modal" + (shown ? " shown" : " hidden")}>
            Modal placeholder.
        </div>
    );
}

export default Modal;