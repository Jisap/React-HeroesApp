import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';


export const Navbar = () => {

    const {user, dispatch} = useContext(AuthContext);   // Usamos el useContext aquí

    const history = useHistory();   // Este hook proporciona información sobre el objeto history. como el navBar esta dentro de un contextProvider
                                    // puede acceder a el.
    const handleLogout = () => {
        
        history.replace('/login');                  // Cuando demos click redireccionaremos a '/'. Usamos replace para evitar que se de <- en el navegador
        
        dispatch({                                                                                            //-----------useReducer-------------  
            type: types.logout,                // Cuando demos click ejecutaremos el dispatch->authReducer->cambia el estado: {name:' y login:false}
            payload:{                                                                //(action) 
                name:''
            }
        });
    }
    

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">

                <span className="nav-item nav-link text-info">
                    {user.name}
                </span>

                    <button 
                        className="nav-item nav-link btn" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}