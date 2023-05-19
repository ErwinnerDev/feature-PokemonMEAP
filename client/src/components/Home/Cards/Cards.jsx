import React from "react";
import Card from './Card/Card'
import { Link  } from "react-router-dom";
import style from './Cards.module.css'

export default function Cards({cards}) {

    return(
        <div className={style.container__cards}>
            {
                cards?.map(pokemon => {
                    return(
                            <Link to={'/home/'+pokemon.id+'?origenBD='+pokemon.createinDb}  key={pokemon.id} className={style.eleiminaLink}>
                            <Card 
                                nombre={pokemon.name} 
                                urlImagen={pokemon.urlImagen} 
                                tipos={pokemon.tipos} 
                                fuerza={pokemon.fuerza}
                                createinDb={pokemon.createinDb}/>
                            </Link>
                    ); 
                })
            }
           
        </div>
    )
}