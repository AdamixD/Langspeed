import { createContext, useState } from 'react';

export const MainContext = createContext({});

export const MainProvider = ({ children }) => {
    const [sidebarState, setSidebarState] = useState("active");

    const toggleSidebarState = () => {
        setSidebarState((state) => (state === "active" ? "disabled" : "active"));
    };

    return (
        <MainContext.Provider value={{sidebarState, toggleSidebarState}}>
            {children}
        </MainContext.Provider>
    )
}
