var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}
const sequelize = new Sequelize('mysql://root:root@localhost:3306/gestion_ordi',opts);

const attribute = sequelize.define('attribuer', {
    // attributes
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {         // User belongsTo Company 1:1
        model: 'client',
       // field: 'id_client',
        key: 'id'
      }
    //  field:"id_client",references:"client"
    },
    posteId: {
        type: Sequelize.INTEGER,
        references: {         // User belongsTo Company 1:1
            model: 'poste',
            references:"poste",
            field: 'id_ordi',
            key: 'id'
          }
        //  field:"id_ordi",references:"poste"
      },
      jour: {
        type: Sequelize.STRING,
      },
      heure:{
          type:Sequelize.TIME
      }
 } ,{ sequelize, timestamps: false});

 module.exports =attribute;