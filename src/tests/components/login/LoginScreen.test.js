import React from 'react';
import { LoginScreen } from '../../../components/login/LoginScreen'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';


describe('Debe de mostrarse correctamente <LoginScreen />', () => {
    
    const history = {           // De history solo necesitamos el replace
        replace: jest.fn(),
    }

    const contextValue = {      // simulamos el context
        dispatch: jest.fn(),    // simulamos el dispatch como una función
        user:{                  // simulamos logged en false
            logged:false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value = { contextValue }>
            <LoginScreen history = { history } />
        </AuthContext.Provider>
    )

    test('Debe de mostrarse correctamente ', () => {
        
        expect(wrapper).toMatchSnapshot();
    })
    
    test('Debe de realizar el dispatch y la navegación', () => {

        wrapper.find('button').prop('onClick')();       // Identificamos el boton y simulamos click en el.

        expect(contextValue.dispatch).toHaveBeenCalledWith({        // Esperariamos que el context llamara al dispatch con este contenido
            type: types.login,
            payload:{
                name: 'Fernando'
            }
        })
        
        expect(history.replace).toHaveBeenCalled();                 // Esperariamos que el history replace halla sido llamado al pulsar el boton.
    })
    
});
