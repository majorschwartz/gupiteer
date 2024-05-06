import React, { useState } from "react";
import Modal from "./Modal";

const KeySection = () => {
    const [shown, setShown] = useState(false);
    function toggleModal() {
        setShown(!shown);
    }

    return (
        <>
            <button className="keys" onClick={toggleModal}>
                API Keys
            </button>
            <Modal
                shown={shown}
                setShown={setShown}
            />
        </>
    );
};

export default KeySection;
