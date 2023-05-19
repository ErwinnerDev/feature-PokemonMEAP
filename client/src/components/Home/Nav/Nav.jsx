import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search/Search";
import Select from "./Select/Select"
import {  useSelector} from "react-redux"; 
import style from './Nav.module.css'
import logo from '../../../img/logo_pokemon.png'


export default function Nav({paginado,render,paginaActual}) {

    const is404  = useSelector(state => state.isNotFound);

    return (
        <div className={style.main_container}>
            <div>
                <Link to='/'> <img className={style.navbar__img} src={logo} width="150px"></img></Link>
            </div>
            <div>
                <Search habiliarInput={paginaActual} is404={is404} className={style.navSeacht}/>
                <Select paginaAct={paginaActual} render={render} habiliarInput={paginaActual}/>
            </div>
            <div className={style.contexAdd}>
                <Link to='/create'><button id={style.Btn}>+</button></Link>
            </div>
        </div>
    );
}