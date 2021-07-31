import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = (publisher) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); //useMemo que le permite memorizar funciones costosas para que pueda evitar llamarlas en cada render.
    //const heroes = getHeroesByPublisher(publisher);                           //useMemo solo volverá a calcular el valor memorizado cuando una de las entradas haya cambiado

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map(hero => (
                    <HeroCard 
                        key={hero.id}
                        { ...hero }>
                    </HeroCard>
                ))
            }
        </div>
    )
}
