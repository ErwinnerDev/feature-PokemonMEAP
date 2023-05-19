const { Pokemons, Tipo } = require('../db');
const { Op } = require("sequelize") 

 const getSearchDB = async (searPokemon) =>{
    try {
        const respName= await Pokemons.findAll({
            include:Tipo,
            where:{
                [Op.or]:[{name:searPokemon.toLowerCase()},{id:searPokemon}]
            }
        });
    return  respName
    } catch (error) {
        console.log("Ocurrio un error en BdPokemonConstroller/ Pokemon /getSearchDB:"+error);
    }
    
}

const getAllDb = async (name) => {
    try {
        let respName;
        if(name){
             respName= await Pokemons.findAll({
                include:Tipo,
                where:{
                    name:name.toLowerCase(),
                }
            });
        }else{
            respName=await Pokemons.findAll({ include:Tipo})
        }
        return respName;
    } catch (error) {
        console.log("Ocurrio un error en BdPokemonConstroller/ Pokemon /getAllDb:"+error);
    }
}

module.exports ={
    getSearchDB,
    getAllDb
}