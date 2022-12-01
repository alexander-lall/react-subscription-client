import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext({
    user: {},
    token: ''
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        user: {},
        token: ""
    });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")));
    }, []);

    // axios config
    const token = user && user.token ? user.token : "";
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };