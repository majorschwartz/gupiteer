import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Chats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const { chat_id } = useParams();
    const { isLoggedIn, authChecked } = useAuth();

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
    }

    return (
        <>
            <div className="inner-wrapper">
                {chats.length !== 0 ? (
                    <>
                        <div className="chats-header">Chats</div>
                        <ol className="chat-list">
                            {chats.map((chat) => (
                                <li className="chat-item" key={chat._id}>
                                    <div
                                        className={`chat-inner-wrap${
                                            chat._id === chat_id ? " active-chat" : ""
                                        }`}
                                    >
                                        <Link to={`/chat/${chat._id}`} className="chat-link">
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
