import React from "react";
import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getPokemons,getTypes,setPagina} from "../../actions";
import Paginado from "./Paginado/Paginado";
import Loading from "../Loading/Loading";
import Nav from './Nav/Nav'
import Cards from "./Cards/Cards";
import Info404  from "../ErrorInfo/Info404";
import style from './Home.module.css'


export default function Home(){
    const dispatch             = useDispatch();
    const allPokemon           = useSelector(state => state.pokemons);
    const listTypes            = useSelector(state => state.types);
    const is404                = useSelector(state => state.isNotFound);
    const isRefreshPokemons    = useSelector(state => state.isRefreshPokemons);
    const numPaginaActual      = useSelector(state => state.paginaActual) ;


    //paginado
    //const [pagina,setPagina]                    = useState(1);
    const [elementosPagina,setElementosPagina]  = useState(12);
    const [render,setRender]                    = useState('');
    const indexUltimoElemeto = numPaginaActual * elementosPagina;
    const indexPrimerElemento = indexUltimoElemeto - elementosPagina;
    const paginaActual = allPokemon.slice(indexPrimerElemento,indexUltimoElemeto);

    const paginado = (numPagina) =>{
        dispatch(setPagina(numPagina))
    }

    React.useEffect(() => {
        if(listTypes.length===0){dispatch(getTypes());}
        if(isRefreshPokemons){dispatch(getPokemons());}
    },[])

    return(
        <div className={style.constainer}>
            <div id="/" className={style.bagOscuro}>
            <Nav render={setRender} paginaActual={paginaActual}/>
                {
                   paginaActual.length>0 && !is404
                   ?<Cards cards={paginaActual}/>
                    :is404
                        ?<Info404/>
                        :<Loading/>
                }
            <div>
                {
                    paginaActual.length>0 && !is404
                    ?<Paginado
                        elementosPorPagina={elementosPagina}
                        totalElementos={allPokemon.length}
                        paginado={paginado}
                    />
                     :<></>
                }
            </div>
            </div>
        </div>        
    )
}