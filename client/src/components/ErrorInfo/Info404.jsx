import React from "react";
import imagen404  from '../../img/404_pokemon.png'
import style from './Info404.module.css'
export default function Info404() {
    return (
        <div className={style.fondo}>
            <span className={style.styleTitle}>404</span><br/>
            <img src={imagen404} width="200px"/>
            <br/><br/>
            <p className={style.styleMessage}>"No se pudo encontra el Pokemon solicitado"</p>
        </div>
    )
}