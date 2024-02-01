import React, { createContext, useState } from 'react'

export const loginContext = createContext();

const Context = ({ children }) => {

    const [logindata, setLoginData] = useState("");

    return (
        <loginContext.Provider value={{ logindata, setLoginData }}>
            {children}
        </loginContext.Provider>
    );
};

export default Context

