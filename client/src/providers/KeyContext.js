import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from "./AuthContext";

const KeyContext = createContext(null);
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const KeyProvider = ({ children }) => {
    const { isLoggedIn } = useAuth();
    
    const [cookies, setCookie] = useCookies([
        "openai-key",
        "gemini-key",
        "anthropic-key",
    ]);

    const [keys, _setKeys] = useState({
        "openai-key": cookies["openai-key"] || "",
        "gemini-key": cookies["gemini-key"] || "",
        "anthropic-key": cookies["anthropic-key"] || "",
    });

    const updateKeysInDatabase = (newKeys) => {
        fetch(`${apiUrl}/update-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ keys: newKeys })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const updateCookies = (newKeys) => {
        const cookieOptions = {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        };
        Object.entries(newKeys).forEach(([key, value]) => {
            setCookie(key, value, cookieOptions);
        });
    }

    const setKeys = (newKeys) => {
        _setKeys(newKeys);
        updateCookies(newKeys);
        if (isLoggedIn) {
            updateKeysInDatabase(newKeys);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetch(`${apiUrl}/get-keys`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                const fetchedKeys = data.keys || {};
                const mergedKeys = {
                    "openai-key": fetchedKeys["openai-key"] || cookies["openai-key"] || "",
                    "gemini-key": fetchedKeys["gemini-key"] || cookies["gemini-key"] || "",
                    "anthropic-key": fetchedKeys["anthropic-key"] || cookies["anthropic-key"] || "",
                };
                if (JSON.stringify(mergedKeys) !== JSON.stringify(fetchedKeys)) {
                    setKeys(mergedKeys);
                }
            })
            .catch(error => console.error("Failed to fetch keys:", error));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return (
        <KeyContext.Provider value={{ keys, setKeys }}>
            {children}
        </KeyContext.Provider>
    );
}

export const useKeys = () => useContext(KeyContext);