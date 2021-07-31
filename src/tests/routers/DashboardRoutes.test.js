import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';



describe('Pruebas en <DashboardRoutes />', () => {
    
    const contextValue = {      // simulamos el context
        dispatch: jest.fn(),    // simulamos el dispatch como una función
        user:{                  // simulamos logged en false
            name: 'Fernando',
            logged:true
        }
    }
    test('Debe mostrarse correctamente ', () => {
        

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}> 
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Fernando');
    })
    
});
