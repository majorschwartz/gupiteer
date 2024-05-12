import React from "react";

const KeySection = ({ modalShown, setModalShown }) => {
    function toggleModal() {
        setModalShown(!modalShown);
    }

    return (
        <>
            <button className="key-click-wrapper" onClick={toggleModal}>
                API Keys
            </button>
        </>
    );
};

export default KeySection;
