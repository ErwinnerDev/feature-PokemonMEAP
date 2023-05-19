import React from "react";
import { useDispatch, useSelector} from "react-redux"; 
import {filterPokemon,
        setOrder,
        filterOrderByName,
        filterByFuerza,
        setPagina,
        setIsstatus404,
        setStatusRefresch,
        setPokemons,
        getPokemons} from '../../../../actions'
import {ORIGIN_DATABASE,
        ORIGIN_API,
        ORIGIN_ALL,
        ORDER_ASC,
        ORDER_DESC,
        ORDER_DEFAULT} from '../../../../utils/constante' 
import style from "./Select.module.css";

export default function Select(params) {

        const dispatch = useDispatch();

        const is404                = useSelector(state => state.isNotFound);
        const listTypes            = useSelector(state => state.types);
        const selectOrigenInfo     = useSelector(state => state.filterOrigenInfo);
        const selectType           = useSelector(state => state.filterType);
        const orderName            = useSelector(state => state.orderName);
        const orderAttack          = useSelector(state => state.orderAttack);

        
    function handletFiltertype(e){ 
        dispatch(setOrder({name:ORDER_DEFAULT,attack:ORDER_DEFAULT})) 
        dispatch(filterPokemon({type:e.target.value}));
        dispatch(setPagina(1))
        params.render(`Ordenado type ${e.target.value}`) 
    }

    function handlefilterOrigeninfo(e) {
        e.preventDefault();
        dispatch(setOrder({name:ORDER_DEFAULT,attack:ORDER_DEFAULT})) 
        dispatch(filterPokemon({origenInfo:e.target.value}));
        dispatch(setPagina(1))
        params.render(`Ordenado origenInfo ${e.target.value}`) 
    }

    function handleOrdeName(e) {
        dispatch(setOrder({name:e.target.value,attack:ORDER_DEFAULT})) 
        dispatch(filterOrderByName(e.target.value));
        dispatch(setPagina(1))
        params.render(`Ordenado ${e.target.value}`)
    }

    function handleOrderFuerza(e) {
        dispatch(setOrder({name:ORDER_DEFAULT,attack:e.target.value})) 
        dispatch(filterByFuerza(e.target.value))
        dispatch(setPagina(1))
        params.render(`Ordenado attact${e.target.value}`) 
    }

    function handleLimpiar(e) {
        dispatch(setPagina(1))
        dispatch(setIsstatus404(false));
        dispatch(setStatusRefresch(true))
        dispatch(setPokemons([]));
        dispatch(getPokemons());
    }
    return (
        <div>
            <select name="typeOrder" id="idTypeOrder" onChange={handletFiltertype} disabled={!params.paginaAct.length && !is404} value={selectType}>
                <option value={ORIGIN_ALL} >All type</option>
                {
                    listTypes.map(type => (
                            <option key={type.id} value={type.name}>{type.nombre}</option>
                    ))
                } 
            </select> 
            <select name="origenInfo" id="idOrigenInfo" onChange={handlefilterOrigeninfo} disabled={!params.paginaAct.length && !is404} value={selectOrigenInfo}>
                    <option value={ORIGIN_ALL}>All origen info</option>
                    <option value={ORIGIN_DATABASE}>Origin DataBase</option>
                    <option value={ORIGIN_API}>Origin Api</option>
                   
            </select>
            <select name="orderName" id="idOrderName" onChange={handleOrdeName} disabled={!params.paginaAct.length && !is404} value={orderName}>
                    <option value={ORDER_DEFAULT}>Order Name</option>
                    <option value={ORDER_ASC}>A-Z</option>
                    <option value={ORDER_DESC}>Z-A</option>
            </select>
            <select name="orderFuerza" id="idTOrderFuerza" onChange={handleOrderFuerza} disabled={!params.paginaAct.length && !is404} value={orderAttack}>
                    <option value={ORDER_DEFAULT}>Order Attack</option>
                    <option value={ORDER_ASC}>Min-Max</option>
                    <option value={ORDER_DESC}>Max-Min</option>
            </select>
            <button onClick={handleLimpiar} id={style.Btn}>
                   Reset
            </button>
        </div>
    )
    
}