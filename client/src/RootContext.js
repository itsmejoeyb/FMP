import React, { useEffect, useState } from 'react';

export const RootContext = React.createContext();

export default ({ children }) => {
    const prevToken = window.localStorage.getItem('token');
    const prevUser = window.localStorage.getItem('user')
    const [token, setToken] = useState(prevToken);
    const [authenticated, setAuthenticated] = useState(token ? true : false );
    const [user, setUser] = useState(prevUser ? JSON.parse(prevUser) : {
        isUser: authenticated,
        id: "",
        firstName: "",
        lastName: "",
        email: "",
    })

    useEffect(
        () => {
            window.localStorage.setItem('authenticated', authenticated);
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user))
        },
        [authenticated, token, user]
    );

    const defaultContext = {
        authenticated,
        setAuthenticated,
        token,
        setToken,
        user,
        setUser
    };

    return (
        <RootContext.Provider value={defaultContext}>
            {children}
        </RootContext.Provider>
    );
};