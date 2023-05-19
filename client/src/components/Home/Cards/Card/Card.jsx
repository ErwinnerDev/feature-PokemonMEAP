import React from "react";
import Types from "./Types/Types";
import { IMG_POKEMON_DAFULT } from '../../../../Constans/img';
import style from './Card.module.css'

export default function Card({nombre,urlImagen,tipos,fuerza,createinDb}) {

    const colors = {
        fire: 'fire',
        grass: 'grass',
        electric: 'electric',
        water: 'water',
        ground: 'ground',
        rock: 'rock',
        fairy: 'fairy',
        poison: 'poison',
        bug: 'bug',
        dragon: 'dragon',
        psychic: 'psychic',
        flying: 'flying',
        fighting: 'fighting',
        normal: 'normal',
        ice:'ice'
    };

    const colorBackground= colors[tipos?.length>0?tipos[0].nombre:colors.normal];
    return(
        <div  className={style.card}>
                <div className={style.cover}  >
                    <img src={urlImagen?urlImagen :IMG_POKEMON_DAFULT} alt={nombre} />
                    <div className={`${style.img__back} ${style[colorBackground]}`} ></div>
                </div>
                <div className={style.description}>
                    <label className={style.text}>{nombre.charAt(0).toUpperCase()+nombre.slice(1)}</label>
                    {
                    <Types tipos={tipos}/>
                    }
                </div>
            
        </div>
    );
}