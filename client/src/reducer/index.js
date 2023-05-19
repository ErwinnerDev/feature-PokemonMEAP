
import {GET_POKEMONS,
    FILTER_ORDER_FUERZA,
    FILTER_ORDER_NAME,
    GET_POKEMON_NAME,
    GET_TYPES,
    POST_CREATE_POKEMON,
    FILTER_POKEMON_DETALLE,
    SET_POKEMON_DETALLE,
    FILTER_POKEMON,
    SET_STATUS_REFRESH,
    SET_STATUS_404,
    SET_POKEMONS,
    SET_FILTER,
    SET_ORDER,
    SET_PAGINA_ACTUAL,
    DELETE_POKEMON,
    UPDATE_POKEMON,
    SET_DETALLE_UPDATE} from '../actions/actions'
import {ORIGIN_DATABASE,ORIGIN_ALL,ORDER_ASC,ORDER_DEFAULT,} from '../utils/constante' 
const initialState = {
    pokemons:[],
    allPokemons:[],
    types:[],
    detalle:[],
    isNotFound:false,
    filterType:ORIGIN_ALL,
    filterOrigenInfo:ORIGIN_ALL,
    orderName:ORDER_DEFAULT,
    orderAttack:ORDER_DEFAULT,
    isRefreshPokemons:true,
    paginaActual:1,
    detalleUpdate:[]
}

const rootReducer = (state=initialState,action)=>{
    console.log(action.type);
    switch (action.type) {
        case GET_POKEMONS:
            return {...state,
                pokemons:action.payload,
                allPokemons:action.payload.slice(),
                filterType:ORIGIN_ALL,
                filterOrigenInfo:ORIGIN_ALL,
                orderName:ORDER_DEFAULT,
                orderAttack:ORDER_DEFAULT,
                }
        case GET_TYPES:
            return {
                ...state,
                types:action.payload
            }
        case POST_CREATE_POKEMON:
            return {
                ...state
            }
        case GET_POKEMON_NAME:
            return{
                ...state,
                pokemons:action.payload
            }     
        case DELETE_POKEMON:
            return {
                ...state,
            }
        case UPDATE_POKEMON:
            return {
                ...state
            }
        case FILTER_ORDER_NAME:   
            const defaulrOderName= functionFilter({});//state.allPokemons.slice();
            let pokeOrderName;
            if(action.payload===ORDER_DEFAULT){
                pokeOrderName=defaulrOderName;
             }else{
                pokeOrderName= action.payload===ORDER_ASC?
                state.pokemons.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase()){return 1;}
                    if(b.name.toLowerCase() > a.name.toLowerCase()){return -1;}
                    return 0;
                }) :
                state.pokemons.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase()){return -1;}
                    if(b.name.toLowerCase() > a.name.toLowerCase()){return 1;}
                    return 0;
                })
            } ;
            return {
                ...state,
                pokemons:  pokeOrderName
            }
        case FILTER_ORDER_FUERZA:
                let pokeOrderFuerza;
                if(action.payload===ORDER_DEFAULT){
                    pokeOrderFuerza=functionFilter({});//state.allPokemons.slice();
                 }else{
                     pokeOrderFuerza =action.payload===ORDER_ASC?
                    state.pokemons.sort((a,b) =>{
                        return a.fuerza-b.fuerza;
                    })
                    : state.pokemons.sort((a,b) =>{
                        return b.fuerza-a.fuerza;
                    })
                }
                return {
                    ...state,
                    pokemons:pokeOrderFuerza
                };
        case GET_POKEMON_NAME:
                    return {
                        ...state,
                        pokemons: action.payload
                    }
        case FILTER_POKEMON_DETALLE:
                return {
                    ...state,
                    detalle:action.payload
                }
        case SET_POKEMON_DETALLE:
                return{
                    ...state,
                    detalle:action.payload
                }

        // case FILTER_POKEMON_TYPE:
        //     let resFilterType;
        //     if(action.payload===ORIGIN_ALL){
        //         resFilterType=state.allPokemons.slice();
        //     }else{
        //         resFilterType=state.allPokemons.slice().filter(pokemon => {
        //             const resSupfilter=pokemon.tipos.filter(tipo =>tipo.nombre===action.payload)
        //             if(resSupfilter.length>0){
        //                 return pokemon
        //             }
        //         })
        //     }
            
            // console.log(resFilterType);
            //     return {
            //         ...state,
            //         pokemons:resFilterType,
            //         isNotFound:resFilterType.length===0
            //     }
        case FILTER_POKEMON:
            const resFilterFuction= functionFilter(action.payload);
            return {
                ...state,
                pokemons:resFilterFuction,
                isNotFound:resFilterFuction.length===0
            }
        case SET_STATUS_REFRESH:
                return {
                    ...state,
                    isRefreshPokemons:action.payload
                }
        case SET_STATUS_404:
                return {
                    ...state,
                    isNotFound:action.payload
                }
        case SET_POKEMONS:
            return {
                ...state,
                pokemons:action.payload
            }
        case SET_FILTER:
            return{
                ...state,
                //paginaActual:1,
                filterType:action.payload.type?action.payload.type:state.filterType,
                filterOrigenInfo:action.payload.origenInfo?action.payload.origenInfo:state.filterOrigenInfo,
            }
        case SET_ORDER:
            return {
                ...state,
                orderName:action.payload.name?action.payload.name:state.orderName,
                orderAttack:action.payload.attack?action.payload.attack:state.orderAttack
            }
        case SET_PAGINA_ACTUAL:
            return {
                ...state,
                paginaActual:action.payload
            }
        case SET_DETALLE_UPDATE:
            return {
                ...state,
                detalleUpdate:action.payload
            }
            
        default:
            return initialState;
    }

    function functionFilter(payload) {
        let dataFuente;
        let resultFilter;
        state.filterOrigenInfo=payload.origenInfo
            ?payload.origenInfo
            :state.filterOrigenInfo
        if(state.filterOrigenInfo===ORIGIN_ALL){
            dataFuente=state.allPokemons.slice();
        }
        else if(state.filterOrigenInfo===ORIGIN_DATABASE){
            dataFuente=state.allPokemons.filter(data => data.createinDb)
        }
        else{
            dataFuente=state.allPokemons.filter(data => !data.createinDb)
        }
        state.filterType=payload.type
            ?payload.type
            :state.filterType
        if(state.filterType===ORIGIN_ALL){
            resultFilter=dataFuente;
        }
        else{
            resultFilter=dataFuente.filter(pokemon => {
                const resSupfilter=pokemon.tipos.filter(tipo =>tipo.nombre===state.filterType)
                if(resSupfilter.length>0){
                    return pokemon
                }
            })
        }
        return resultFilter;
    }
}

export default rootReducer;