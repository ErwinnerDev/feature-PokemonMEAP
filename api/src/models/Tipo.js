const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tipo',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        },
    } ,{
        timestamps: false,
        createdAt: false,
      });
}