import { types } from '../types/types';

// const state = {             // Este sería el estado si estuvieramos autenticados
//     name:'Fernando',
//     logged: true
// }

export const authReducer = (state = {}, action) => { // Esta función modifica un estado a traves de un parámetro llamado action. 
                                                     // Integrada en un useReducer modificará a su vez su state a traves de otro   
    switch (action.type) {                           // parámetro llamado dispatch 
        case types.login:
            return{
                ...action.payload,
                logged: true
            }
        case types.logout:
            return{
                logged:false
            }
            
    
        default:
            return state;
    }
}
