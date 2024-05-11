import React, { useState } from "react";
import Modal from "./Modal";

const KeySection = () => {
    const [shown, setShown] = useState(false);
    function toggleModal() {
        setShown(!shown);
    }

    return (
        <>
            <a className="key-click-wrapper" onClick={toggleModal}>
                API Keys
            </a>
            <Modal
                shown={shown}
                setShown={setShown}
            />
        </>
    );
};

export default KeySection;
