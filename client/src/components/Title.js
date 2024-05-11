import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
    return (
        <Link to={"/"} className="title-new-wrap">
            <div className="title">name.</div>
            <div className="new-chat-wrap">
                <span>
                    <div>
                        <svg
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"
                        >
                            <path
                                fill="#ffffff"
                                d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"
                            />
                        </svg>
                    </div>
                </span>
            </div>
        </Link>
    );
};

export default Title;
