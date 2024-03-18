import React, { useState } from "react";
import Modal from "./Modal";

const KeySection = ({ keys, setKeys }) => {
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
                keys={keys}
                setKeys={setKeys}
            />
        </>
    );
};

export default KeySection;
