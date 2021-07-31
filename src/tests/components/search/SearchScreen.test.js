import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';


describe('Pruebas en <SearchScreen />', () => {
    
    test('Debe de mostrarse correctamente con valores por defecto', () => {
        
        const wrapper = mount(         // Valor del URL
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a Hero'); // Esperariamos que la clase alert-info contuviera el texto 'Search a Hero'
    })
    
    test('Debe de mostrar a Batman y el input con el valor del querystring ', () => {
        
        const wrapper = mount(          // En el url el query será batman
            <MemoryRouter initialEntries={['/search?q=batman']}>        
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value')).toBe('batman'); // Esperariamos que el input tuviera el valor igual al query
    })
    
    test('Debe de mostrar un error si no se encuentra el Hero', () => {
        
        const wrapper = mount(          // En el url el query será un hero que no existe
            <MemoryRouter initialEntries={['/search?q=batman123']}>        
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').text().trim()).toBe(`There is no a hero with batman123`) // Esperariamos encontrar una etiqueta con la classname
    })                                                                                                // alert-danger y en su interior el mensaje indicado.  
    
    test('Debe de llamar el push del history', () => {
        
        const history = {
            push: jest.fn()
        };

         const wrapper = mount(          // El componente que se monta lleva consigo el history
            <MemoryRouter initialEntries={['/search?q=batman']}>        
                <Route path="/search" 
                       component={ () => <SearchScreen  history={ history }/>}    
                       />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change',{   // Simulamos un cambio en el valor del input
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({     // Simulamos el submit del formulario
            preventDefault(){}
        })

        expect(history.push).toHaveBeenCalledWith(`?q=batman`); // Esperariamos que el history.push se halla llamado con el query batman
    })
    
});


