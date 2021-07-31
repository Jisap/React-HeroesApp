import React from 'react';
import { mount } from 'enzyme'
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en <HeroScreen />>', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    
    test('Debe de mostrarel componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history }/>
            </MemoryRouter>
        )

        expect(wrapper.find('Redirect').exists()).toBe(true);
    })
    
    test('Debe de mostrar un hero si el parámetro existe y se encuentra', () => {
                                                                    // En el memory router simulamos los params que vienen por url
                                                                    // En route establecemos el esquema para acceder a HeroScreen
                                                                    // Con esto definimos el hero y el heroId
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />    
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);           // Esperariamos encontrar una fila -> implicaría que se renderizo el hero
    })
    
    test('Debe de regresar a la pantalla ppal("/") con PUSH', () => {
        
        const history = {
            length: 1,          // Simulamos un history < 2
            push: jest.fn(),
            goBack: jest.fn(),
        }
                                                                    // Proporcionamos el history como una prop del componente HeroScreen
                                                                    // ya que este es generado con una función.
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen  history={history} />} 
                />    
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/'); // Esperariamos que se ejecutará el push con '/'
        expect(history.goBack).not.toHaveBeenCalled();  // Esperariamos que no se llamará al goBack
    });

    test('Debe regresar a la patanlla anterior con goBack ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen  history={history} />} 
                />    
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.goBack).toHaveBeenCalled(); 
        expect(history.push).toHaveBeenCalledTimes(0); // 
    })
    
    test('Debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(                                                  // Simulamos un heroe que no existe
            <MemoryRouter initialEntries={['/hero/marvel-spider293842984729']}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen  history={history} />} 
                />    
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe(''); // El resultado es que no renderize nada.
         
    })
    
});
