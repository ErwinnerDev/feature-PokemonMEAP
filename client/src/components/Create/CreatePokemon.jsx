import React, {useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import {posCrete, setPokemons,setStatusRefresch,setPagina} from '../../actions/index';
import { useDispatch,useSelector } from "react-redux";
import style from './CreatePokemon.module.css' 
export default function CreatePokemon() {
    const dispach   = useDispatch();
    const navigate  = useNavigate();
    const listTypes = useSelector(state => state.types);

    const [input,setInput] =useState({
        name:"",
        vida:"",
        fuerza:"",
        defensa:"",
        velocidad:"",
        altura:"",
        peso:"",
        urlImagen:"",
        tipos:[]
    })
    const [error,setError] = useState({})
    const [formulario,setFormulario] = useState(true);
    
    const caratreMaximo= {
        name:30,
        vida:3,
        fuerza:3,
        defensa:3,
        velocidad:3,
        altura:3,
        peso:3,
        urlImagen:200
    }

    function disableButon(input) {
        for(const elemeto in input){
            if(Array.isArray(input[elemeto])){
                if(input[elemeto].length>0){ return false}
            }else{
                if(input[elemeto]){ return false}
            }
          }
          return true;
    }

    function handleInput(e) {
        setInputValida(e);
        setError(vailidacion({...input,[e.target.name]:e.target.value}));
        setFormulario(disableButon({...input,[e.target.name]:e.target.value}));
    }

    function handleGoBack(e) {
        dispach(setStatusRefresch(false))
        navigate('/home');
    }

    function handleCheckbox(e) {
        if(e.target.checked){
            setInput({...input,tipos:[...input.tipos,e.target.value.trim()]})
        }else{
            setInput({...input,tipos:input.tipos.filter(data => data!==e.target.value)})
        }
    }

    function vailidacion(input) {
        let errors= {};
        if(!input.name){errors.name="El campo nombre es requerido"}
        else if(!/^[a-zA-Z][a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name)){
            errors.name="Solo se permite letras y espacios";
        }
        
        if(!input.vida){errors.vida="El campo vida es requerido"}
        else if(Number(input.vida)<0){errors.vida="Los valores deben de ser positivos"}

        const validarNumMinimo={
            fuerza:0,
            defensa:0,
            velocidad:0,
            altura:0,
            peso:0,
        }
        for(const elemeto in validarNumMinimo){
            if(input[elemeto] && Number(input[elemeto])<validarNumMinimo[elemeto]){
                errors[elemeto]="Los valores deben de ser positivos"
            }else{
                if(input[elemeto] && Number(input[elemeto]) % 1 !==0){
                    errors[elemeto]="Los valores deben de ser enteros"
                }
            }
          }

        if(!input.urlImagen){errors.urlImagen="La imagen es requerida"}
        return errors;
    }

    function setInputValida(e) {
        if(caratreMaximo[e.target.name]){
            if(e.target.value.length<=caratreMaximo[e.target.name]){
                setInput({...input,[e.target.name]:e.target.value});
            }else{
                e.target.value=e.target.value.substring(0,caratreMaximo[e.target.name]);
            }
        }else{
            setInput({...input,[e.target.name]:e.target.value});
        }
       
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispach(setPagina(1))
        dispach(setStatusRefresch(true));
        dispach(setPokemons([]));
        const result=  dispach(posCrete(input));
   
        setInput({
            name:"",
            vida:"",
            fuerza:"",
            defensa:"",
            velocidad:"",
            altura:"",
            peso:"",
            urlImagen:"",
            tipos:[]
        })

        navigate('/home');
    }

    return(
        <div className={style.login_html}>
            <h1 className={style.styleTitle} id="Title">Create your Pokemon!!</h1>
            <form onSubmit={handleSubmit}   >
            <div className={style.container}>
                <div className={style.group}>
                    <div>
                        <label className={style.label}>{ 'Name*:'}</label>
                        <input
                            name="name"
                            type="text"
                            onChange={handleInput}
                            value={input.nombre}
                            className={style.inputTex}
                            
                        />
                    </div>
                    <div><label>{error.name && (<label>{error.name}</label>)}</label></div>
                    <div>
                        <label className={style.label}>HP*: </label>
                        <input
                            name="vida"
                            type="number"
                            value={input.vida}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.vida && (<label>{error.vida}</label>)}</div>
                    <div>
                        <label className={style.label}>Attack: </label>
                        <input
                            name="fuerza"
                            type="number"
                            value={input.fuerza}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.fuerza && (<label>{error.fuerza}</label>)}</div>
                    <div>
                        <label className={style.label}>Defense: </label>
                        <input
                            name="defensa"
                            type="number"
                            value={input.defensa}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.defensa && (<label>{error.defensa}</label>)}</div>
                    <div>
                        <label className={style.label}>Speed: </label>
                        <input
                            name="velocidad"
                            type="number"
                            value={input.velocidad}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.velocidad && (<label>{error.velocidad}</label>)}</div>
                    <div>
                        <label className={style.label}>Height: </label>
                        <input
                            name="altura"
                            type="number"
                            value={input.altura}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.altura && (<label>{error.altura}</label>)}</div>
                    <div>
                        <label className={style.label}>Weight: </label>
                        <input
                            name="peso"
                            type="number"
                            value={input.peso}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{error.peso && (<label>{error.peso}</label>)}</div>
                    <div>
                        <label className={style.label}>Picture*: </label>
                        <input
                            name="urlImagen"
                            type="text"
                            value={input.urlImagen}
                            onChange={handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div><label>{error.urlImagen && (<label>{error.urlImagen}</label>)}</label></div>
                </div>
               
                <div className={style.contenedorTypos}>
                    <ol className={style.switches}>
                        {
                            listTypes.map(type => (
                                <li key={type.id} >
                                        <input
                                            type="checkbox"
                                            name={type.nombre}
                                            value={type.nombre}
                                            onChange={(e)=>handleCheckbox(e)}
                                            id={type.id}
                                        />
                                        <label htmlFor={type.id}><span className={style.taxtType}>{type.nombre.charAt(0).toUpperCase()+type.nombre.slice(1)}</span><span></span></label>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>

                <button onClick={handleGoBack} id={style.shareBtn}>Cancelar</button>
                <button type="submit" disabled={formulario || Object.keys(error).length>0} id={style.shareBtn}>Crear</button>
            </form>
        </div>
    )

    
}

