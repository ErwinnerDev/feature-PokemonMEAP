import React from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import {setPokemons,setIsstatus404,setStatusRefresch,setPagina} from '../../actions/index'
import style from './Welcome.module.css';

export default function Welcome() {
    const dispatch = useDispatch();

    function handleReset() {
        dispatch(setPagina(1))
        dispatch(setStatusRefresch(true));
        dispatch(setIsstatus404(false));
        dispatch(setPokemons([]));    
    }

    return(
        <div>
            <div className={style.posicion}>
                <h1 className={style.testPokemon}>Welcome</h1>
                <Link to="/home">
                    <button id={style.shareBtn} onClick={handleReset} className={style.boton}>Go</button>
                </Link>
            </div>
            <div className={style.food}>
                <footer className={style.by}>
                    <small>Made with <span>❤</span> by <a href="https://www.linkedin.com/in/erwincm/" >Erwin Cruz Mayo</a>
                    </small>
                </footer>
            </div>
        </div>
    )    
}