const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id:{
      type:DataTypes.TEXT,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type:DataTypes.INTEGER
    },
    fuerza:{
      type:DataTypes.INTEGER
    },
    defensa:{
      type:DataTypes.INTEGER
    },
    velocidad:{
      type: DataTypes.INTEGER
    },
    altura:{
      type:DataTypes.INTEGER
    },
    peso:{
      type:DataTypes.INTEGER
    },
    urlImagen:{
      type:DataTypes.STRING
    },
    createinDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },{
    timestamps: false,
    createdAt: false,
  });
};

