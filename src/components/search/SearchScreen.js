import React, { useMemo } from 'react'

import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../heroes/HeroCard'
import { useLocation } from 'react-router-dom'
import { getHeroesByName } from '../../selectors/getHeroesByName'

//npm install query-string

export const SearchScreen = ({history}) => {

    const queryString = require('query-string'); // queryString convierte a strings separados los querys del pathname
                                                 // Los querys aparecen como q="strings"&casa="Marvel" etc. Solo interesa q   

    const location = useLocation(); // hook que devuelve el objeto de ubicación que contiene información sobre la URL actual.
   
    const {q=''} = queryString.parse(location.search); // De este objeto ubicación desestructuramos para obtener q, este q
                                                       // será igual al query generado despues de dar al boton de busqueda.
     
    
    const [values, handleInputChange] = useForm({searchText: q }); // El estado inicial del hook será el name del form
                                                                   // y por defecto tendrá el valor de los querys 
    const {searchText} = values;                                   // Cuando se rellene el searchText dará valor a values 
                                                                   // y activará al función handelInputChange que cambiará
                                                                   // el state de values {searchText}

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]); // Obtenido q podemos filtrar.
    

    const HandleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);   // Al pulsar el submit introducimos en el pathname un query q = searchText
                                            // pero es un string, necesitamos sacar de ahi el valor de q mediante queryString 
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={HandleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}>

                        </input>
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary">
                            Search...
                        </button>
                    </form>

                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                        (q==='')
                            && 
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }

                    {
                        (q !=='' && heroesFiltered.length === 0)
                            && 
                            <div className="alert alert-danger">
                                There is no a hero with {q}
                            </div>
                    }

                        {
                            heroesFiltered.map(hero => (
                                <HeroCard 
                                    key={hero.id}
                                    {...hero}
                                />
                            ))
                        }
                </div>
            </div>
        </div>
    )
}
