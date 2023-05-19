const { default: axios } = require("axios");
const { Tipo } = require('../db');
const {URLAPI_TYPE} = process.env;

exports.getTypes = async (req,res) =>{
    const previoLlenado= await Tipo.findAll();
    if(previoLlenado.length>0){
        return res.json(previoLlenado);
    }

    const typesApi=await axios.get(URLAPI_TYPE)
        .catch( (error) => {
            console.log("Error data:"+error.response?.data);
            console.log("Error status:"+error.response?.status);
            return [];
        });
    if(typesApi?.status===200){  
        const listTypes=typesApi.data.results.map(data => data.name);
        listTypes.forEach(element => {
            Tipo.findOrCreate({
                where:{ nombre:element}
            })
        });
        const listTypesDB= await Tipo.findAll();
        res.json(listTypesDB);
    }else{
        res.status(404).json({message:"No pudo obtener los types de la api"});
    }
}