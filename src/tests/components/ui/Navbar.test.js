import React from 'react';
import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { MemoryRouter, Router } from 'react-router-dom';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';
import '@testing-library/jest-dom'




describe('Pruebas en <Navbar />', () => {

    const historyMock = {       // Simulamos un history
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }
    
    const contextValue = {      // Simulamos el context
        dispatch: jest.fn(),    // Simulamos el dispatch como una función
        user:{                  // Simulamos logged en false
            logged:true,
            name: 'Fernando',
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value = {contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                   <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() =>{
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente ', () => {
        
        expect(wrapper).toMatchSnapshot();                                  // Simulamos la renderización del Navbar
        expect(wrapper.find('.text-info').text().trim()).toBe('Fernando')   // Buscamos una clase text-info que contenga el user

    });

    test('Debe de llamar el logout y usar el history ', () => {
        
        wrapper.find('button').prop('onClick')();                           // Buscamos un boton y simulamos un click
    
        expect(contextValue.dispatch).toHaveBeenCalledWith({                // Esperariamos que el dispatch se llame con el tipo:logout
            type: types.logout,
            payload:{                                                                
                name:''
            }
        });
    
        expect(historyMock.replace).toHaveBeenCalledWith('/login');         // Esperariamos que al dar al boton de logout se activara el
                                                                            // history.replace('/login')
    });


    
    
});
