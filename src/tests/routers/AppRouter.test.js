import React from 'react';
import { mount } from "enzyme"
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';



describe('Pruebas en <AppRouter />', () => {
    
    const contextValue = {      // simulamos el context
        dispatch: jest.fn(),    // simulamos el dispatch como una función
        user:{                  // simulamos logged en false
            logged:false
        }
    }

    test('Debe de mostrar login si no está autenticado', ()=>{

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}> 

                <AppRouter />

            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();    
    })

    test('Debe de mostrar el componente de marvel si esta autenticado', () => {
        
        const contextValue = {      // simulamos el context
            dispatch: jest.fn(),    // simulamos el dispatch como una función
            user:{                  // simulamos logged en false
                logged:true,
                name:'Juan'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}> 

                <AppRouter />

            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true);    // Esperariamos que el navbar se halla renderizado 

    })
    
})
