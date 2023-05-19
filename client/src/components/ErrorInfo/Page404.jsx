import React from "react";
import imagen404  from '../../img/404_pokemon.png'
import style from './Info404.module.css'
import style2 from '../Welcome/Welcome.module.css'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import {setPokemons,setIsstatus404,setStatusRefresch,setPagina} from '../../actions/index'
export default function Info404() {

    const dispatch = useDispatch();

    function handleReset() {
        dispatch(setPagina(1))
        dispatch(setStatusRefresch(true));
        dispatch(setIsstatus404(false));
        dispatch(setPokemons([]));    
    }
    return (
        <div className={style.fondo}>
            <span className={style.styleTitle}>404</span><br/>
            <img src={imagen404} width="200px"/>
            <br/><br/>
            <p className={style.styleMessage}>"Esta página no está disponible. Disculpa las molestias."</p>
            <br/><br/>
            <Link to="/">
                <button id={style2.shareBtn} onClick={handleReset}  className={style2.boton}>Go Welcome</button>
            </Link>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}