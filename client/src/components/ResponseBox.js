import React from "react";
import Response from "./Response";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useKeys } from "../providers/KeyContext";

const ResponseBox = ({ respList }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { keys } = useKeys();

    function areAllKeysEmpty(obj) {
        return Object.values(obj).every(value => value === "");
    };

    if (!respList || respList.length === 0) {
        return (
            <div className="hello-box">
                <div className="hello-message">
                    <span>
                        Start a conversation with a model of your choice.
                    </span>
                </div>
                <div className="support">
                    <span>Currently Supported Models</span>
                    <div className="supported-models">
                        <div className="model-card">
                            <div className="model-logo">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="205.34 69.34 671.19 680.26"
                                >
                                    <path
                                        fill="#74aa9c"
                                        d="M832.28,347.74c15.43-46.33,10.12-97.06-14.56-139.19c-37.11-64.63-111.73-97.87-184.59-82.23 c-32.41-36.52-78.99-57.29-127.81-56.98c-74.5-0.18-140.58,47.78-163.5,118.67c-47.85,9.8-89.15,39.76-113.32,82.21 c-37.4,64.45-28.88,145.68,21.08,200.97c-15.43,46.33-10.12,97.06,14.56,139.19c37.11,64.63,111.73,97.87,184.59,82.23 c32.41,36.52,78.99,57.29,127.81,56.98c74.54,0.19,140.65-47.8,163.55-118.74c47.85-9.8,89.15-39.76,113.32-82.21 C890.77,484.19,882.23,403,832.28,347.74L832.28,347.74z M576.6,705.11c-29.82,0.04-58.7-10.4-81.6-29.5 c1.03-0.56,2.84-1.56,4.02-2.28l135.44-78.24c6.92-3.94,11.18-11.31,11.13-19.27V384.87l57.25,33.06c0.61,0.3,1.03,0.89,1.11,1.57 v158.14C703.87,647.95,646.92,704.95,576.6,705.11z M302.7,588.13c-14.94-25.81-20.32-56.05-15.21-85.43 c1.01,0.6,2.76,1.68,4.02,2.4l135.44,78.24c6.87,4.02,15.38,4.02,22.25,0l165.36-95.48v66.11c0.04,0.69-0.27,1.34-0.82,1.76 l-136.92,79.05C415.86,669.9,337.96,649.03,302.7,588.13L302.7,588.13z M267.07,292.44c14.87-25.84,38.36-45.63,66.35-55.89 c0,1.17-0.07,3.23-0.07,4.67v156.47c-0.05,7.96,4.2,15.32,11.12,19.26l165.36,95.47l-57.25,33.05c-0.57,0.38-1.3,0.44-1.93,0.18 l-136.93-79.12C252.86,431.27,231.99,353.41,267.07,292.44z M737.43,401.9l-165.37-95.48l57.25-33.04c0.57-0.38,1.3-0.44,1.93-0.17 l136.93,79.05c60.98,35.22,81.86,113.21,46.64,174.18c-14.9,25.8-38.37,45.57-66.34,55.87V421.16 C748.54,413.21,744.32,405.85,737.43,401.9z M794.41,316.14c-1.01-0.62-2.76-1.68-4.02-2.4L654.94,235.5 c-6.87-4.01-15.37-4.01-22.25,0l-165.36,95.48v-66.11c-0.04-0.69,0.27-1.34,0.82-1.76l136.92-78.99 c61-35.17,138.96-14.24,174.13,46.76C794.06,256.66,799.44,286.82,794.41,316.14L794.41,316.14z M436.2,433.98l-57.26-33.06 c-0.61-0.3-1.03-0.89-1.11-1.57V241.22c0.05-70.41,57.16-127.46,127.58-127.41c29.78,0.02,58.61,10.46,81.49,29.51 c-1.03,0.56-2.83,1.56-4.02,2.28l-135.44,78.24c-6.92,3.93-11.18,11.3-11.13,19.26L436.2,433.98z M467.3,366.93l73.65-42.54 l73.65,42.51v85.05l-73.65,42.51l-73.65-42.51L467.3,366.93z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="comp-title">
                                <span className="comp-big">ChatGPT</span>
                                <span className="comp-small">OpenAI</span>
                            </div>
                        </div>
                        <div className="model-card">
                            <div className="model-logo">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid"
                                    viewBox="0 0 256 175.78"
                                >
                                    <title>Anthropic</title>
                                    <g fill="#ae5630">
                                        <path d="M147.486878,0 C147.486878,0 217.568251,175.780074 217.568251,175.780074 C217.568251,175.780074 256,175.780074 256,175.780074 C256,175.780074 185.918621,0 185.918621,0 C185.918621,0 147.486878,0 147.486878,0 C147.486878,0 147.486878,0 147.486878,0 Z"></path>{" "}
                                        <path d="M66.1828124,106.221191 C66.1828124,106.221191 90.1624677,44.4471185 90.1624677,44.4471185 C90.1624677,44.4471185 114.142128,106.221191 114.142128,106.221191 C114.142128,106.221191 66.1828124,106.221191 66.1828124,106.221191 C66.1828124,106.221191 66.1828124,106.221191 66.1828124,106.221191 Z M70.0705318,0 C70.0705318,0 0,175.780074 0,175.780074 C0,175.780074 39.179211,175.780074 39.179211,175.780074 C39.179211,175.780074 53.5097704,138.86606 53.5097704,138.86606 C53.5097704,138.86606 126.817544,138.86606 126.817544,138.86606 C126.817544,138.86606 141.145724,175.780074 141.145724,175.780074 C141.145724,175.780074 180.324935,175.780074 180.324935,175.780074 C180.324935,175.780074 110.254409,0 110.254409,0 C110.254409,0 70.0705318,0 70.0705318,0 C70.0705318,0 70.0705318,0 70.0705318,0 Z"></path>{" "}
                                    </g>
                                </svg>
                            </div>
                            <div className="comp-title">
                                <span className="comp-big">Claude</span>
                                <span className="comp-small">Anthropic</span>
                            </div>
                        </div>
                        <div className="model-card">
                            <div className="model-logo">
                                <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                                        fill="url(#prefix__paint0_radial_980_20147)"
                                    />
                                    <defs>
                                        <radialGradient
                                            id="prefix__paint0_radial_980_20147"
                                            cx="0"
                                            cy="0"
                                            r="1"
                                            gradientUnits="userSpaceOnUse"
                                            gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                                        >
                                            <stop
                                                offset=".067"
                                                stopColor="#9168C0"
                                            />
                                            <stop
                                                offset=".343"
                                                stopColor="#5684D1"
                                            />
                                            <stop
                                                offset=".672"
                                                stopColor="#1BA1E3"
                                            />
                                        </radialGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="comp-title">
                                <span className="comp-big">Gemini</span>
                                <span className="comp-small">Google</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!isLoggedIn || areAllKeysEmpty(keys) ? (
                    <div className="to-begin">
                        <span>To begin, please </span>
                        {!isLoggedIn ? (
                            <>
                                <span>
                                    <button
                                        className="begin-login-button"
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        log in
                                    </button>
                                </span>
                                <span> and</span>
                            </>
                        ) : (null)}
                        <span> enter your api keys.</span>
                    </div>
                ): (null)}
                
            </div>
        );
    }
    return (
        <div className="resp-box">
            {respList.length > 0 &&
                respList.map((resp, index) => (
                    <Response key={index} {...resp} />
                ))}
        </div>
    );
};

export default ResponseBox;
