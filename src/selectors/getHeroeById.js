import { heroes } from "../data/heroes";

export const getHeroesById = (id) => {
    
    return heroes.find( hero => hero.id === id);    // De Heroes mostraremos los elementos cuyo id coincida con el pasado por argumento.
}
                                                    