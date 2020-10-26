var controller={}
var attribuer=require("../models/attribute");
var poste=require("../models/poste");
var Sequelize=require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/gestion_ordi');

controller.add= (req,res)=>{

    poste.create({nom:req.body.poste}).then( () =>{
        res.sendStatus(200);
    })
    
    }

    controller.delete=(req,res)=>{

attribuer.destroy({where:{posteId:req.body.poste_id}}).then(()=>{

        poste.destroy({where:{id:req.body.poste_id}}).then(()=>{
            res.sendStatus(200);
        })
        
        })
    }
    module.exports = controller;