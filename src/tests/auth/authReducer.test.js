import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto ', () => {
        
        const state = authReducer({logged:false}, {}); // Supondremos que el estado inicial estará en false y la action será {}
        expect(state).toEqual({logged:false});         // Esperariamos que el state = logged:false  
    })
    
    test('Debe de autenticar y colocar el name del usuario ', () => {
        
        const action = {                // Al loguear disparamos un dispatch -> action -> authReducer -> Cambia el state
            type:types.login,
            payload:{
                name:'Hernando'
            }
        }

        const state = authReducer({logged:false}, action); // Supondremos que el estado inicial estará en false y la action será la definida
        expect(state).toEqual({
            logged:true,
            name: 'Hernando'});     
    })

    test('Debe de borrar el name del usuario y logged en false ', () => {
        
        const action = {                // Al desloguear disparamos un dispatch -> action -> authReducer -> Cambia el state
            type:types.logout,
            
        }

        const state = authReducer({logged:true, name:'Pedro'}, action); // Supondremos que el estado inicial de logged estará en true y la action = logout
        expect(state).toEqual({                                         // Esperariamos que logged=false y el name desapareciría.   
            logged:false,
        });
    })
})
