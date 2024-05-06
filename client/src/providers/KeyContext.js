import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const KeyContext = createContext(null);

export const KeyProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies([
        "openai-key",
        "gemini-key",
        "anthropic-key",
    ]);

    const [keys, setKeys] = useState({
        "openai-key": cookies["openai-key"] || "",
        "gemini-key": cookies["gemini-key"] || "",
        "anthropic-key": cookies["anthropic-key"] || "",
    });

    useEffect(() => {
        const cookieOptions = {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        };
        Object.entries(keys).forEach(([key, value]) => {
            setCookie(key, value, cookieOptions);
        });
    }, [keys]);

    return (
        <KeyContext.Provider value={{ keys, setKeys }}>
            {children}
        </KeyContext.Provider>
    );
}

export const useKeys = () => useContext(KeyContext);