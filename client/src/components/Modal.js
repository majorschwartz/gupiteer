import React, { useState } from "react";

const Modal = () => {
    const [shown, setShown] = useState(false);
    
    return (
        <div className={"modal" + (shown ? " shown" : " hidden")}>
        </div>
    );
}

export default Modal;