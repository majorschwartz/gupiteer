import React from "react";
import logo from "./gupiteer.png";
const Title = () => {
    return (
        <div className="title">
            <img src={logo} alt="Gupiteer Logo" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            <div>Gupiteer</div>
        </div>
    );
}

export default Title;