var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});

const sequelize = new Sequelize('mysql://root:root@localhost:3306/gestion_ordi');

const client = sequelize.define('client', {
    // attributes
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
        type: Sequelize.STRING,
      }
 } ,{sequelize, timestamps: false});

  module.exports =  client;