const { default: axios } = require("axios");
const {URLAPI} = process.env;

const getSearchApi = async (idPokemon) =>{
    try {
        const apiResp =await axios.get(URLAPI+'/'+idPokemon.toLowerCase())
                .catch( (error) => {
                    console.log("Error data:"+error.response?.data);
                    console.log("Error status:"+error.response?.status);
                    return [];
                });
                //console.log(apiResp);
        if(apiResp?.status===200){  
            const dataApiResp= await apiResp.data;
            const stats=await dataApiResp.stats;
                const infoCart=  {
                    id:String(dataApiResp.id),
                    name:dataApiResp.name,
                    vida:stats.find(x => x.stat.name==='hp')?.base_stat,
                    fuerza:stats.find(x => x.stat.name==='attack')?.base_stat,
                    defensa:stats.find(x => x.stat.name==='defense')?.base_stat,
                    velocidad:stats.find(x => x.stat.name==='speed')?.base_stat,
                    altura:dataApiResp.height,
                    peso:dataApiResp.weight,
                    urlImagen:dataApiResp.sprites?.other?.home?.front_default,
                    tipos:dataApiResp.types.map(x => {
                        return {
                            id: x.slot,
                            nombre: x.type.name
                        }
                    }),
                    createinDb:false
                }
            return infoCart;
        }else{
            return [];
        }
    } catch (error) {
        console.log("Ocurrio un error en ApiPokemonConstroller/ Pokemon /getSearchApi:"+error);
    }
}


const range =   async(start, stop, step) => {
        return Array.from({ length: (stop - start) / step + 1}, (_, i) => String(start + (i * step)));
    }

const getAllApi = async () =>{
    try{
        const listIDDd=await range(1,20,1)
        const respMap = listIDDd.map(async data => {
                const pomesa=await axios.get(URLAPI+'/'+data).catch( (error) => {
                    console.log("Error data:"+error.response?.data);
                    console.log("Error status:"+error.response?.status);
                    return undefined;
                });
                return pomesa;
        });
        const apiResp =await Promise.all(respMap.filter(data => data!==undefined)) .catch( (error) => {
            console.log("Error data:"+error.response?.data);
            console.log("Error status:"+error.response?.status);
            return undefined;
        });

        const listPokemons =apiResp.filter(data => data!==undefined).map(data => {
            if(data?.status===200){  
                const dataApiResp=  data.data;
                const stats= dataApiResp.stats;
                    const infoCart=  {
                        id:String(dataApiResp.id),
                        name:dataApiResp.name,
                        vida:stats.find(x => x.stat.name==='hp')?.base_stat,
                        fuerza:stats.find(x => x.stat.name==='attack')?.base_stat,
                        defensa:stats.find(x => x.stat.name==='defense')?.base_stat,
                        velocidad:stats.find(x => x.stat.name==='speed')?.base_stat,
                        altura:dataApiResp.height,
                        peso:dataApiResp.weight,
                        urlImagen:dataApiResp.sprites?.other?.home?.front_default,
                        tipos:dataApiResp.types.map(x => {
                            return {
                                id: x.slot,
                                nombre: x.type.name
                            }
                        }),
                        createinDb:false
                    }
                return infoCart;
            }else{
                return [];
            }
        });
        return listPokemons
    }catch(err){
        console.log("Ocurrio un error en ApiPokemonConstroller/ Pokemon /getAllApi:"+error);
    }
}

const getNameApi = async (name) =>{
    try{
        return axios.get(`${URLAPI}/${name.toLowerCase()}`)
        .then((pokemomList) => {
                return pokemomList.data.name;
        })
        .then((respName)=> {
            return getSearchApi(respName);
        })
        .then((responses) => responses)
        .catch( (error) => {
                console.log("Error data:"+error.response?.data);
                console.log("Error status:"+error.response?.status);
                return [];
            })
       
    }catch(err){
        console.log("Ocurrio un error en ApiPokemonConstroller/ Pokemon /getNameApi:"+error);
    }
}

module.exports={
    getSearchApi,
    getAllApi,
    getNameApi
}