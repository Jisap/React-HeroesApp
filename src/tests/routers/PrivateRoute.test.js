//npm i --save-dev enzyme enzyme-adapter-react-16
//npm install --save-dev enzyme-to-json
//install --save-dev @wojtekmaj/enzyme-adapter-react-17

import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';



describe('Pruebas en <PrivateRoute />', () => {
    
    test('Debe de mostrar el componente si está autenticado y guardar localStorage', () => {
        
        const props = {
            location:{
                pathname:'/marvel'
            }
        }

        Storage.prototype.setItem = jest.fn(); // Clon del localStorage

        const wrapper = mount(    // Clon de la App // El clon del PrivateRouter tiene que pertenecer a un router

            <MemoryRouter> 
                <PrivateRoute
                    isAuthenticated={true}                  // Le pasamos sus props
                    component={() => <span>Listo</span>}
                    {...props} />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists()).toBe(true); // Esperariamos encontrar en el clon de la app un span
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel'); // Esperariamos que se halla llamado al localStorage
                                                                                    // en la ruta lastPath = /marvel        
    })
    
    test('Debe de bloquear el componente sino está autenticado', () => {
       
       const props = {
            location:{
                pathname:'/marvel'
            }
        }

        const wrapper = mount(    // Clon de la App // El clon del PrivateRouter tiene que pertenecer a un router

            <MemoryRouter> 
                <PrivateRoute
                    isAuthenticated={false}                  // Le pasamos sus props donde isAuthenticated es false
                    component={() => <span>Listo</span>}
                    {...props} />
            </MemoryRouter>
        );
        
        expect( wrapper.find('span').exists()).toBe(false); // Ene este caso el span no debería de existir

    });
    
});
