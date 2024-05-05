import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthContext";

const GetEmail = () => {
    const [email, setEmail] = useState("");
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_API_ENDPOINT + "/email",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch email.");
                }

                const data = await response.json();
                setEmail(data.email);
            } catch (error) {
                console.error("Failed to fetch email.");
            }
        };

        if (isLoggedIn) {
            fetchEmail();
        }
    }, [isLoggedIn]);
    
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    Your email is {email}
                </div>
            ) : (
                <div>
                    <p>You must be logged in to view this page.</p>
                    <a href="/login"><button>Login</button></a>
                </div>
            )}
        </div>
    );
}

export default GetEmail;