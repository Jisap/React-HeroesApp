import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroeById';


export const HeroScreen = ({history}) => {

    const { heroeId} = useParams();             // Este hook nos permite extraer los params que vengan por url, obtenemos su id
    
    //const hero = getHeroesById(heroeId);      // Con el Id obtenemos sus registros de la bd
    const hero = useMemo(() => getHeroesById(heroeId), [heroeId])


    if (!hero){                                 // Si no existe el hero nos redirecciona a marvel
        return <Redirect to="/" />
    }
    
    const {                                     // Obtenido los registros del hero desestructuramos sus props
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero

    const handleReturn = () => { 
        
        if(history.length <=2){     // Si pulsamos return y no hay registros en el history del navegador
            history.push('/');      // nos devolverá a marvel.
        }else{
            history.goBack();}      // Con esta función el boton nos lleva a la página anterior.
        }


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={`../assets/heroes/${heroeId}.jpg`}
                    alt={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />    
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"><b>Publisher: </b> { publisher } </li>
                    <li className="list-group-item"><b>First Appaearance: </b> { first_appearance } </li>
                </ul>
                <h5>Characters</h5>
                <p>{ characters }</p>

                <button className="btn btn-outline-info"
                        onClick = { handleReturn }>
                    Return
                </button>    
            </div>
            

            
        </div>
    )
}
