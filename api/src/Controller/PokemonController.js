const { Pokemons, Tipo } = require('../db');

const {getSearchApiDB,getAllApiDb} = require('./ConcatPokemonController')

exports.getSearch = async (req,res) => {
    try {     
            const {searPokemon}= req.params;
            const {origenBD} = req.query;
            const pokemon = await  getSearchApiDB(searPokemon,origenBD);
            if(pokemon?.length> 0){
                return res.json(pokemon) ;
            }else{
                return res.status(404).json({message:"No se encontró el pokemon"});
            }
    } catch (error) {
        console.log("Ocurrio un error en Constroller/ Pokemon /getSearch:"+error);
    }
}

exports.getAll = async (req,res) => {
    try {
        const {name} = req.query;
        const respAllPokemon= await getAllApiDb(name);
        respAllPokemon?.length>0?
        res.status(200).json(respAllPokemon?.map(data => {
            return {
                id:data.id,
                name:data.name,
                fuerza:data.fuerza,
                urlImagen:data.urlImagen,
                tipos:data.tipos.map(data => {return {id:data.id,nombre:data.nombre}}),
                createinDb:data.createinDb
            }
        }))
        :   res.status(404).json({message:"No se encontró el pokemon"});
    } catch (error) {
        console.log("Ocurrio un error en Constroller/ Pokemon /getAll:"+error);
    }
}

exports.postPokemons = async (req, res) => {
    const {name,vida,fuerza,defensa, velocidad,altura,peso,urlImagen,tipos} = req.body;
    try{
        const newPokemon = await Pokemons.create({
            name,
            vida,
            fuerza,
            defensa, 
            velocidad,
            altura,
            peso,
            urlImagen
        })
        const typeDB= await Tipo.findAll({
            where:{
                nombre:tipos
            }
        });
        await newPokemon.addTipo(typeDB)
        const  objetFinal={
            ...newPokemon.dataValues,
            tipos:[...typeDB]
        }
        res.status(201).json(objetFinal);
    }catch(err){
        res.status(500).send("No se pudo insertar el Pokemon: "+err)
    }

}


exports.deletePokemon = async(req,res) => {
        const {id} = req.params;
        try {
            const resDelete = await Pokemons.destroy({
                where:{
                    id :id
                }
            })
            if(resDelete>0){
                res.status(204).send("Se eleiminó exitosamente el id: "+id);
            }else{
                res.status(500).send("No se encontro el recuros");
            }
            
        } catch (error) {
            console.log("Ocurrio un error en BdPokemonConstroller/ Pokemon /deletePokemon:"+error);
        }
}

exports.putPokemon = async(req,res) =>{
    const {id} = req.params;
    const objPokemon = req.body;
    try {
        const resPut = await Pokemons.update(
            {
                name:objPokemon.name,
                vida:objPokemon.vida,
                fuerza:objPokemon.fuerza,
                defensa:objPokemon.defensa,
                velocidad:objPokemon.velocidad,
                altura:objPokemon.altura,
                peso:objPokemon.peso,
                urlImagen:objPokemon.urlImagen,
                tipos:[...objPokemon.tipos]
            },{
                where:{id:id} 
                , include: [Tipo]
            }
        )
        if(resPut>0){
            const pokemonRefres= await Pokemons.findByPk(id);

            const typeAllDB= await Tipo.findAll();
            pokemonRefres.removeTipos(typeAllDB);
            const typeDB= await Tipo.findAll({
                where:{
                    nombre:objPokemon.tipos
                }
            });            
            pokemonRefres.addTipos(typeDB);

           
            const  objetFinal={
                ...pokemonRefres.dataValues,
                tipos:[...typeDB]
            }

            res.status(201).send(objetFinal);
        }else{
            res.status(500).send(resPut);
        }
    } catch (error) {
        console.log("Ocurrio un error en BdPokemonConstroller/ Pokemon /putPokemon:"+error);
    }

}