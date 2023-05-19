import React, {Component, useState } from "react";
import { Link,useNavigate ,Redirect   } from "react-router-dom";
import {posCrete, setPokemons,setStatusRefresch,setPagina} from '../../actions/index';
import { connect, useDispatch,useSelector } from "react-redux";
import style from './CreatePokemon.module.css' 

export  class CreatePokemon extends Component{
    
        state={input:{
            name:"",
            vida:"",
            fuerza:"",
            defensa:"",
            velocidad:"",
            altura:"",
            peso:"",
            urlImagen:"",
            tipos:[]
            },
        error:{},
        formulario:true
        }

        caratreMaximo= {
            name:30,
            vida:3,
            fuerza:3,
            defensa:3,
            velocidad:3,
            altura:3,
            peso:3,
            urlImagen:200
        }
    
            
        
  
   disableButon=(input) => {
    for(const elemeto in input){
        if(Array.isArray(input[elemeto])){
            if(input[elemeto].length>0){ return false}
        }else{
            if(input[elemeto]){ return false}
        }
      }
      return true;
    }
    
 

    handleInput = (e) =>  {
        this.setInputValida(e);
        // this.state.setError(this.vailidacion({...this.state.input,[e.target.name]:e.target.value}));
        const objError=this.vailidacion(this.state.input);
        this.setState({...this.state,['error']:this.vailidacion(this.state.input)});
        // this.state.setFormulario(this.disableButon({...this.state.input,[e.target.name]:e.target.value}));
        this.setState({formulario:this.disableButon({...this.state.input,[e.target.name]:e.target.value})});
    }

    handleAtras = (e) => {
        console.log("La eee : ");
        console.log(this.props);
    <link to='/home' />
    window.location.replace("http://localhost:3000/home");
        //aqui va ña redireccion
    }

    handleCheckbox = (e) => {
        const objInput=this.state.input;
        
        if(e.target.checked){
            objInput.tipos=[...this.state.input.tipos,e.target.value.trim()];
            this.setState({...this.state,['input']:objInput});
        }else{
            objInput.tipos=this.state.input.tipos.filter(data => data!==e.target.value);
            this.setState({...this.state,['input']:objInput})
        }
    }

    vailidacion = (input)  =>{
        console.log(input);
        let msgerrors= {};
        if(!input.name){msgerrors.name="El campo nombre es requerido"}
        else if(!/^[a-zA-Z][a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name)){
            msgerrors.name="Solo se permite letras y espacios";
        }
        
        if(!input.vida){msgerrors.vida="El campo vida es requerido"}
        else if(Number(input.vida)<0){msgerrors.vida="Los valores deben de ser positivos"}

        const validarNumMinimo={
            fuerza:0,
            defensa:0,
            velocidad:0,
            altura:0,
            peso:0,
        }
        for(const elemeto in validarNumMinimo){
            if(input[elemeto] && Number(input[elemeto])<validarNumMinimo[elemeto]){
                msgerrors[elemeto]="Los valores deben de ser positivos"
            }else{
                if(input[elemeto] && Number(input[elemeto]) % 1 !==0){
                    msgerrors[elemeto]="Los valores deben de ser enteros"
                }
            }
          }

        if(!input.urlImagen){msgerrors.urlImagen="La imagen es requerida"}
        return msgerrors;
    }


    setInputValida =(e) => {
        const ObjInput=this.state.input;
        if(this.caratreMaximo[e.target.name]){
            if(e.target.value.length<=this.caratreMaximo[e.target.name]){
                ObjInput[e.target.name]=e.target.value;
                this.setState({...this.state,['input']:{ObjInput}})
            }else{
                
                e.target.value=e.target.value.substring(0,this.caratreMaximo[e.target.name]);
            }
        }else{
            ObjInput[e.target.name]=e.target.value;
            this.setState({...this.state,['input']:{ObjInput}})
        }
    }


    handleSubmit =(e) =>{
        e.preventDefault();
        this.props.setPagina(1);
        this.props.setStatusRefresch(true);
        this.props.setPokemons([]);
        this.props.posCrete(this.state.input);
        //crear un dialog
        alert("Se creo el pokemon")
        this.setState({input:{
            name:"",
            vida:"",
            fuerza:"",
            defensa:"",
            velocidad:"",
            altura:"",
            peso:"",
            urlImagen:"",
            tipos:[]
            },
        error:{},
        formulario:true
        })
        
        window.location.replace("http://localhost:3000/home");
        // this.navigate('/home');
        // return <useNavigate to='/home' />
    }


    render(){
        return (
            <div className={style.login_html}>
            <h1 className={style.styleTitle} id="Title">Create your Pokemon!!</h1>
            <form>
            <div className={style.container}>
                <div className={style.group}>
                    <div>
                        <label className={style.label}>Nombre*: </label>
                        <input
                            name="name"
                            type="text"
                            onChange={this.handleInput}
                            value={this.state.input.nombre}
                            className={style.inputTex}
                            
                        />
                    </div>
                    <div><label>{this.state.error.name && (<label>{this.state.error.name}</label>)}</label></div>
                    <div>
                        <label className={style.label}>Vida*: </label>
                        <input
                            name="vida"
                            type="number"
                            value={this.state.input.vida}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.vida && (<label>{this.state.error.vida}</label>)}</div>
                    <div>
                        <label className={style.label}>Fuerza: </label>
                        <input
                            name="fuerza"
                            type="number"
                            value={this.state.input.fuerza}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.fuerza && (<label>{this.state.error.fuerza}</label>)}</div>
                    <div>
                        <label className={style.label}>Defensa: </label>
                        <input
                            name="defensa"
                            type="number"
                            value={this.state.input.defensa}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.defensa && (<label>{this.state.error.defensa}</label>)}</div>
                    <div>
                        <label className={style.label}>Velocidad: </label>
                        <input
                            name="velocidad"
                            type="number"
                            value={this.state.input.velocidad}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.velocidad && (<label>{this.state.error.velocidad}</label>)}</div>
                    <div>
                        <label className={style.label}>Altura: </label>
                        <input
                            name="altura"
                            type="number"
                            value={this.state.input.altura}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.altura && (<label>{this.state.error.altura}</label>)}</div>
                    <div>
                        <label className={style.label}>Peso: </label>
                        <input
                            name="peso"
                            type="number"
                            value={this.state.input.peso}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div>{this.state.error.peso && (<label>{this.state.error.peso}</label>)}</div>
                    <div>
                        <label className={style.label}>Imagen*: </label>
                        <input
                            name="urlImagen"
                            type="text"
                            value={this.state.input.urlImagen}
                            onChange={this.handleInput}
                            className={style.inputTex}
                        />
                    </div>
                    <div><label>{this.state.error.urlImagen && (<label>{this.state.error.urlImagen}</label>)}</label></div>
                </div>
               
                <div className={style.contenedorTypos}>
                    <ol className={style.switches}>
                        {
                            this.props.listTypes.map(type => (
                                <li key={type.id} >
                                        <input
                                            type="checkbox"
                                            name={type.nombre}
                                            value={type.nombre}
                                            onChange={(e)=>this.handleCheckbox(e)}
                                            id={type.id}
                                        />
                                        <label htmlFor={type.id}><span className={style.taxtType}>{type.nombre}</span><span></span></label>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>

                
            </form>
            <button onClick={this.handleAtras} >Cancelar</button>
                <button onClick={this.handleSubmit} disabled={this.state.formulario || Object.keys(this.state.error).length>0} >Crear</button>
        </div>
        )
    }
}

export const mapStateToProps = (state) =>{
    return {listTypes:state.types}
}

export const mapDispatchToProps =(dispatch) =>{
    return {setStatusRefresch:(boolean) =>dispatch(setStatusRefresch(boolean)),
        setPagina:(numPag) => dispatch(setPagina(numPag)),
        setPokemons:(array) => dispatch(setPokemons(array)),
        posCrete:(input) =>dispatch(posCrete(input)),
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <CreatePokemon {...props} navigate={navigate} />
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePokemon);