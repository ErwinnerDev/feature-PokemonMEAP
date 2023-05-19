import React from "react";
import style from './Paginado.module.css'

export default function Paginado({elementosPorPagina,totalElementos,paginado}){
    const numerosDePaginas=[];
    for (let index = 0; index < Math.ceil(totalElementos/elementosPorPagina); index++) {
        numerosDePaginas.push(index+1);
    }
 
    return(
        <div className={ style.pagination}>
            <ul className={style.crumbs}>
                {
                    numerosDePaginas?.map(numPagina =>(
                        <a onClick={() => paginado(numPagina) } href="#/" key={numPagina} className={style.crumb}>{numPagina}</a>
                    ))
                }
            </ul>
            <div className={style.bar}></div>
        </div>
    )
}
