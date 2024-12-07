import { createContext } from 'react';
import { useState } from 'react';


export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({ username }); // Set the user state when logging in
    };

    const logout = () => {
        setUser(null); // Reset the user state when logging out
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
