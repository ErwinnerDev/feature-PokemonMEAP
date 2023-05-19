import axios from 'axios';
import {GET_POKEMONS,
    API_POKEMON,
    FILTER_ORDER_FUERZA,
    FILTER_ORDER_NAME,
    GET_POKEMON_NAME
    ,API_TYPES
    ,POST_CREATE_POKEMON
    ,GET_TYPES
    ,API_CREATE
    ,FILTER_POKEMON_DETALLE
    ,SET_POKEMON_DETALLE
    ,FILTER_POKEMON
    ,SET_STATUS_REFRESH
    ,SET_STATUS_404
    ,SET_POKEMONS
    ,SET_FILTER
    ,SET_ORDER
    ,SET_PAGINA_ACTUAL
    ,API_DELETE
    ,DELETE_POKEMON
    ,API_UPDATE
    ,UPDATE_POKEMON
    ,SET_DETALLE_UPDATE } from './actions'

export const getPokemons=() =>{
    return async function (dispatch) {
        try {
            axios.get(API_POKEMON)
                .then((resPokemons) =>{
                    return  resPokemons?.data;
                })
                .then((payload) =>{
                    dispatch({type: GET_POKEMONS, payload });
                    dispatch({type:SET_STATUS_404,payload:false});
                }).catch((error) =>{
                    console.log("Frot Error Action / getPokemons: "+error);
                    dispatch({type:SET_STATUS_404,payload:true})
                })
        } catch (error) {
            console.log("Frot Error Action / getPokemons: "+error);
            dispatch({type:SET_STATUS_404,payload:true})
        }
    };
  }

  export const getPokemonByName=(payload)=>{
    return async function(dispatch){
        try {
            const resPkemon = await axios.get(`${API_POKEMON}?name=${payload}`)
            dispatch({type:GET_POKEMON_NAME,   payload:resPkemon?.data})
            dispatch({type:SET_STATUS_404,     payload:false})
            dispatch({type:SET_PAGINA_ACTUAL,  payload:1})
        } catch (error) {
            console.log("Front Error Action / getPokemonByName: "+error);
            dispatch({type:SET_STATUS_404,payload:true})
        }
    }
  }

  export const getTypes = () =>{
    return async function(dispatch){
        try {
            const resType= await axios.get(API_TYPES);
            dispatch({type:GET_TYPES,payload:resType?.data})
        } catch (error) {
            console.log("Front Error Action / getTypes: "+error);
        }
    }
  }

  export const posCrete = (dataPokemon) =>{
    return async function(dispatch){
        try { 
            const busqueda = await axios.get(API_POKEMON);
            const resultBusqueda =await busqueda.data.filter(pokemon => pokemon.name.toLowerCase()===dataPokemon.name.toLowerCase());
            console.log("RESULT BUSQUEDA");
            console.log(resultBusqueda);
            if(resultBusqueda.length>0){
                console.log("Entrooo ek el IF");
                alert("No se pudo crear el pokemon");
                dispatch({type:SET_STATUS_404,payload:true})
            }else{
                console.log("ELESEEE");
                dataPokemon.name=dataPokemon.name.toLowerCase();
                const payload= await axios.post(API_CREATE,dataPokemon);
            dispatch({type:SET_STATUS_REFRESH,  payload:true})
            dispatch({type:POST_CREATE_POKEMON, payload:payload?.data})
            }
        } catch (error) {
            console.log("Front Error Action / posCrete: "+error);
        }
    }
  }

  export const deletePokemon = (idPokemon) => {
      return async function(dispatch) {
          try {
              const payload = await axios.delete(`${API_DELETE}/${idPokemon}`);
              dispatch({type:DELETE_POKEMON, payload})
              dispatch({type:SET_STATUS_404,     payload:false})
          } catch (error) {
            console.log("Front Error Action / deletePokemon: "+error);
            dispatch({type:SET_STATUS_404,payload:true})
          }
      }
  }

  export const updatePokemon = (idPokemon,dataPokemon) =>{
      return async function(dispatch){
          try {
              const payload = await axios.put(`${API_UPDATE}/${idPokemon}`,dataPokemon);
              dispatch({type:UPDATE_POKEMON,payload})
              dispatch({type:SET_STATUS_404,     payload:false})
          } catch (error) {
            console.log("Front Error Action / updatePokemon: "+error);
            dispatch({type:SET_STATUS_404,payload:true})
          }
      }
  }

export const filterOrderByName=(payload) =>{
    return{
        type:FILTER_ORDER_NAME,
        payload
    }
}

export const filterByFuerza=(payload) => {
    return {
        type:FILTER_ORDER_FUERZA,
        payload}
}

export const getDetalle=(id) => {
    return async function (dispatch) {
        try {
                const  payload =await axios.get(`${API_POKEMON}/${id}`)
                dispatch({type:FILTER_POKEMON_DETALLE,payload:payload?.data});
        } catch (error) {
             console.log("Front Error Action / getDetalle: "+error);
        }
    }
}

export const deleteDetalle=(payload) => {
    return {
        type:SET_POKEMON_DETALLE,
        payload
    }
}

export const filterPokemon= (payload)=>{
    return{
        type:FILTER_POKEMON,
        payload
    }
}

export const setStatusRefresch = (payload) =>{
    return {
        type:SET_STATUS_REFRESH,
        payload
    }

}

export const setIsstatus404 = (payload) =>{
    return {
        type:SET_STATUS_404,
        payload
    }
}


export const setPokemons = (payload) =>{
    return{
        type:SET_POKEMONS,
        payload
    }
}

export const clearFilter = (payload) => {
    return {
        type:SET_FILTER,
        payload
    }
}

export const setOrder = (payload) => {
    return{
        type: SET_ORDER,
        payload
    }
}

export const setPagina = (payload) => {
    return {
        type:SET_PAGINA_ACTUAL,
        payload
    }
}

export const setDetalleUpdate = (payload) => {
    return {
        type:SET_DETALLE_UPDATE,
        payload
    }
}