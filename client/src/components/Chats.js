import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Chats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const { chat_id } = useParams();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        async function getChats() {
            const apiUrl = process.env.REACT_APP_API_ENDPOINT;
            const chats = await fetch(apiUrl + "/chats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const data = await chats.json();
            if (!data.chats) return console.log("No Chats Found");
            const user_chats = data.chats.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            console.log("Chats: ", user_chats);
            setChats(user_chats);
        };
        if (isLoggedIn) {
            getChats();
        } else {
            setChats([]);
            if (chat_id) {
                navigate("/");
            }
        }
    }, [isLoggedIn]);

    return (
        <>
            <div className="chat-top-bar">
                <div className="section-title">
                    Chats
                </div>
                <div className="new-chat-area">
                    <Link to="/">
                    <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        >
                            <path fill="#000000" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="chats-wrapper">
                {chats.length !== 0 ? (
                    <>
                        {chats.map((chat) => (
                            <div key={chat._id} className={`chat-item${chat._id === chat_id ? " active-chat" : ""}`}>
                                <Link to={`/chat/${chat._id}`}>{chat._id}</Link>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="no-chats"><span>No chats found.</span></div>
                )}
            </div>
        </>
    );
}

export default Chats;