import React, { useEffect } from "react";

const Chats = () => {
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
            console.log("Chats: ", data);
        };
        getChats();
    }, []);

    return (
        <div>
            Chat
        </div>
    );
}

export default Chats;