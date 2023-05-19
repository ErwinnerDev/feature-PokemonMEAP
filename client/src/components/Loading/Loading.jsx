import React from "react";
import style from './Loading.module.css'
import imagenLoading from '../../img/loading2.gif'

export default function Loading() {
    return (
        <div className={style.fondo}> 
            <div className={style.container}>
                 <img src={imagenLoading} atl="Defensa" width="100px" height="100px"/>
            </div>
        </div>
    )
}