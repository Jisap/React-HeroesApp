import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => { // Cuando se crean los componentes se crean también unas props por defecto una de ellas es el history

    const {dispatch} = useContext(AuthContext);  // Extraemos del useContext el dispatch   

    const handleLogin = () => {
        
        const lastPath = localStorage.getItem('lastPath') || '/'; // Recuperamos la última página visitada

        dispatch({
            type: types.login,                  // Cuando demos click ejecutaremos el dispatch->authReducer->cambia el estado: {name:Fernando y login:true}
            payload:{                                                                //(action) 
                name:'Fernando'
            }
        })
        
        history.replace(lastPath);             // Cuando demos click redireccionaremos a la última página guardada. 
    }                                          // Usamos replace para evitar que se de <- en el navegador. Y todo esto solo sucederá si estamos autenticados.

    return (
        <div className="container mt-5">
            <h1>LoginScreen</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
            Login
            </button>
  
        </div>
    )
}
