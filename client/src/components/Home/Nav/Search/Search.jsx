import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonByName,
        clearFilter,
        setOrder
    } from "../../../../actions";
import { ORIGIN_ALL ,ORDER_DEFAULT } from "../../../../utils/constante";
import style from './Search.module.css'


export default function Search(params) {
        const [pokemonName,setPokemonName]      = useState('');
        const [messageError,setMessageError]    = useState('');
        const dispatch                          = useDispatch();


    function handleWriteName(e) {
        e.preventDefault();
        setPokemonName(e.target.value.trimStart());
        setMessageError(validacion(e.target.value))
    }
    function handleSearhforName(e) {
        e.preventDefault();
        dispatch(getPokemonByName(pokemonName))
        dispatch(clearFilter({origenInfo:ORIGIN_ALL,type:ORIGIN_ALL}))
        dispatch(setOrder({name:ORDER_DEFAULT,attack:ORDER_DEFAULT}))
        setPokemonName('');
        setMessageError('');
    }

    function validacion(input) {
        if(input){
            if(!/^[a-zA-Z][a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.trimStart())){
                return "Solo se permite letras y espacios";
            }
        }
        return "";
    }

    return(
        <>
            <div className={style.input_group} >
                <input name="inputName" 
                        id="idInputName" type='text' 
                        placeholder="Escribe un pokemon"  
                        onChange={handleWriteName} value={pokemonName} disabled={!params.habiliarInput.length && !params.is404}
                        className={style.style_input}/>
                <button type="submit" 
                        onClick={handleSearhforName} 
                        disabled={(!pokemonName || messageError.length>0)}
                        className={style.button}
                        > 
                        Buscar
                </button>
            </div>
            <div>
                <label>{messageError && messageError}</label>
            </div>
        </>
    )
}