// context/user.js

import { createContext, useContext, useEffect, useState } from "react";
// Creating the user context
const UserContext = createContext();


// Making the function which will wrap the whole app using Context Provider
const ISSERVER = typeof window === "undefined";
export default function AppStore({ children }) {
    function setLocalTheme() {
        if (!localStorage.getItem("theme")) {
            return localStorage.setItem("theme", "dark")
        }
        return localStorage.getItem("theme")
    }
    const [theme, setTheme] = useState(() => {
        if (!ISSERVER) {

            return setLocalTheme()
        } else {
            return ""
        }
    });
    
    useEffect(() => {
        
        if (!ISSERVER) {
            document.body.classList.add(localStorage.getItem("theme"))
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.replace("light", "dark")
            } else {
                document.body.classList.replace("dark", "light")
            }
        }

    }, [() => ISSERVER == false ? localStorage.getItem("theme") : ""]);
    return (
        <UserContext.Provider value={{ theme, setTheme }}>
            {children}
        </UserContext.Provider>
    );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
    return useContext(UserContext);
}