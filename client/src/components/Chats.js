import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Chats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const { chat_id } = useParams();
    const { isLoggedIn, authChecked } = useAuth();
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        async function getChats() {
            const apiUrl = process.env.REACT_APP_API_ENDPOINT;
            const chats = await fetch(apiUrl + "/chats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await chats.json();
            if (!data.chats) return console.log("No Chats Found");
            const user_chats = data.chats.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            console.log("Chats:", user_chats);
            setChats(user_chats);
        }
        if (authChecked) {
            if (isLoggedIn) {
                getChats();
            } else {
                setChats([]);
                if (chat_id) {
                    navigate("/");
                }
            }
        }
    }, [isLoggedIn, chat_id, navigate, authChecked]);

    const deleteChats = async () => {
        const apiUrl = process.env.REACT_APP_API_ENDPOINT;
        const delete_chats = await fetch(apiUrl + "/chats", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await delete_chats.json();
        if (data) {
            setChats([]);
            navigate("/");
        }
    };

    return (
        <>
            <div className="inner-wrapper">
                {chats.length !== 0 ? (
                    <>
                        <div className="chats-header">
                            <div className="chat-title">Chats</div>
                            <button className="chats-delete" onClick={() => {
                                setShowDelete(!showDelete);
                            }}>
                                <svg
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20px"
                                    height="20px"
                                >
                                    <path
                                        fill="#f5f5f5"
                                        d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2M9 4h6v2H9zm8 16H7V8h10z"
                                    />
                                </svg>
                            </button>
                            <div className={`are-you-sure${showDelete ? " shown" : ""}`}>
                                <div>Are you sure you want to delete all chats?</div>
                                <div className="delete-buttons">
                                    <button
                                        className="delete-button yes"
                                        onClick={() => {
                                            setShowDelete(false);
                                            deleteChats();
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="delete-button no"
                                        onClick={() => {
                                            setShowDelete(false);
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ol className="chat-list">
                            {chats.map((chat) => (
                                <li className="chat-item" key={chat._id}>
                                    <div
                                        className={`chat-inner-wrap${
                                            chat._id === chat_id
                                                ? " active-chat"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            to={`/chat/${chat._id}`}
                                            className="chat-link"
                                        >
                                            <div className="chat-inner-content">
                                                {chat.title}
                                                <div className="chat-fade" />
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </>
                ) : isLoggedIn ? (
                    <div className="no-chats">
                        <span>No chats.</span>
                    </div>
                ) : (
                    <div className="no-chats">
                        <span>You must be logged in to save chats.</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chats;
