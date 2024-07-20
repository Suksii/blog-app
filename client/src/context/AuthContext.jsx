import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

    const login = async (user) => {
        try{
            const response = await axios.post('/auth/login', user)
            setCurrentUser(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    const logout = async () => {
        try{
            await axios.post('/auth/logout')
            setCurrentUser(null)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}