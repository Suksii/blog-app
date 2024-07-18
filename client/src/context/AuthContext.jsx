import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

    const login = async (user) => {
        const response = await axios.post('/auth/login', user)
        console.log(response)
        setCurrentUser(response.data)
    }
    const logout = async () => {
        await axios.post('/auth/logout')
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}