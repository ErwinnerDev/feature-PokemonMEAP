import React from "react";
import Type from "./Type/Type";
import style from './Types.module.css'

export default function Types({tipos}) {
    return(
        <div className={style.conTypes}>
            {
                tipos?.map(tipo =><Type key={tipo.id} tipo={tipo.nombre} />)
            } 
        </div>
    )
    
}