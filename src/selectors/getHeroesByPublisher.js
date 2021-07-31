
import { heroes } from "../data/heroes";

export const getHeroesByPublisher = ({publisher}) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if(!validPublishers.includes(publisher)){                       // Si el publisher no esta en la lista

        throw new Error(`Publisher "${publisher}" no es correcto`)  // Lanzamos mensaje de error.

    }

    return heroes.filter( hero => hero.publisher === publisher);    // Si si esta en la lista el array de heroes lo filtraremos segun ese publisher válido.
                                                                    // De Heroes mostraremos los elementos cuyo publisher coincida con el pasado por argumento.
}