import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

const init = () => {                                                    // Definimos si existe en localstorage algun usuario logeado
    return JSON.parse(localStorage.getItem('user')) || {logged: false}  // sino existe logged = false
}

export const HeroesApp = () => {
        //state                                                         // useReducer
    const [user, dispatch] = useReducer(authReducer, {}, init)          // El state (user) se modificará cuando se ejecute el dispatch
                                                                        // el cual disparará el authReducer que es la función que modifica ese state

    useEffect(() => {localStorage.setItem('user', JSON.stringify(user));}, [user]) // Cada vez que cambie el state de user ser grabará en localstorage

    return (
        <AuthContext.Provider value={{user, dispatch}}>                                       
            <AppRouter />
        </AuthContext.Provider>
    )//Usamos en el useContext los valores proporcionados por el useReducer                                                                   
}                                                                        
