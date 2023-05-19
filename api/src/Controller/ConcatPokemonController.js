const {getSearchDB, getAllDb}  =require('./BdPokemonController')
const {getSearchApi,getAllApi,getNameApi} = require('./ApiPokemonController')

const getSearchApiDB = async (searPokemon,origenBD) =>{
    try {
        let infoAll= [];
        if(origenBD===undefined){
            const infoApi = await getSearchApi(searPokemon);
            const infoDB  = await getSearchDB(searPokemon);
            infoAll= [].concat(infoApi).concat(infoDB);
        }else if(origenBD==='true'){
            const infoDB  = await getSearchDB(searPokemon);
            infoAll= [].concat(infoDB);
        }else{
            const infoApi = await getSearchApi(searPokemon);
            infoAll= [].concat(infoApi);
        }
       
        return infoAll;
    } catch (error) {
        console.log("Ocurrio un error en Constroller/ Pokemon /getSearchApiDB:"+error);
    }
}

const getAllApiDb = async  (name) => {
    try {
        let respApi;
        if(name){
            respApi = await getNameApi(name);
        }else{
            respApi = await getAllApi();
        }
       const respDB = await getAllDb(name);
        const respAll = [].concat(respApi).concat(respDB);
        return respAll;   
    } catch (error) {
        console.log("Ocurrio un error en Constroller/ Pokemon /getAllApiDb:"+error);
    }
}


module.exports={
    getSearchApiDB,
    getAllApiDb
}