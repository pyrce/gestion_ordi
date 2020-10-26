var controller={}
var poste=require("../models/poste");
var client=require("../models/client");
var attribuer=require("../models/attribute");
var Sequelize=require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost:3306/gestion_ordi');
var bcrypt = require('bcrypt');
var user=require("../models/user");
const { DateTime } = require("luxon");


attribuer.belongsTo(poste);
attribuer.belongsTo(client);

client.hasOne(attribuer);
poste.hasOne(attribuer);
controller.liste=  (req,res)=>{
  
  /* bcrypt.hash("password", 1, function(err, hash) {
        // Store hash in your password DB.
     
        user.create(
          { password: hash,
        login:"admin" },
        )

})*/
if(req.signedCookies["user"]){

    attribuer.findAll({include:[{model:client},{model:poste}]}).then(async attributions=>{
    var ordi = await poste.findAll({});
//res.send(attributions);
            res.render("index",{postes:ordi,attributions:attributions});
        });
    }else{
        res.render("login");
    }
}


controller.filtre=  (req,res)=>{

    if(req.signedCookies["user"]){

       // var jour = DateTime.fromSQL(req.query.jour+"  00:00:00");
      jour=req.query.jour; 
      //var jour=day.getFullYear()+"-"+day.getMonth()+"-"+day.getDate();
    jour=  DateTime.fromISO(jour).toFormat('dd/LL/yyyy');

    if(req.query.jour){  

        attribuer.findAll({where:{jour: jour },include:[{model:client},{model:poste}]}).then(async attributions=>{
        var postes = await poste.findAll({});
        var content="";
        
        for(let p in postes){
     //  console.log(postes[p])
          content+=" <div class='card col-md-4 col-xs-12 poste'>"+
              " <div class='card-body d-flex flex-column'>"+
                  " <h5 class='card-title'>"+ postes[p].nom+""+
               
                    "   <button class='btn btn-danger d-flex flex-row justify-content-around delete_poste' data-id='"+postes[p].id +"' > "+
                          " <i class='fas fa-trash-alt'></i> "+
                    " </button>"+
                "</h5>"      
                          for(var i=8;i<19;i++ ){
                        //  postes[p].jour
      content+= "<span class='row d-flex justify-content-between heures'>" +i+  "h "
       
        h=(i<10) ? '0'+i :i;

       ordi=attributions.filter(o=>{return o.posteId==postes[p].id} );
       t=  ordi.filter( x=>{ return x.heure.match([h])} );
       //console.log(t);
       
       if(t.length>0){
       
       content+= t[0].client.nom +" "+t[0].client.prenom +"<button class='btn-small btn-warning remove' data-id='"+t[0].id+"' > <i class='fas fa-trash-alt'></i></button>";
       }else{
     content+=  "<button class='btn-small btn-info add' data-heure='"+h+"' data-poste='"+ postes[p].id+"'><i class='fas fa-plus-circle'></i></button> "
       }
       
       content+="</span> "               
          }  
           content+=  " </div>"+
       "</div>"
           }

                res.send({content:content});
            });

        }else{
            res.redirect("/");
        }
        }else{
            res.render("login");
        }
    }

controller.attribuer=(req,res)=>{

data=req.body;
date=new Date();
jour=date.toLocaleDateString();
attribuer.create({
    posteId:data.poste,
    clientId:data.user,
    jour:jour,
    heure:data.heure+":00:00"
}).then( () =>{
    res.sendStatus(200);
})
}

controller.delete= (req,res)=>{

id=req.body.attr

attribuer.destroy({where:{id:id}}).then(()=>{
    res.sendStatus(200);
} )
}
module.exports = controller;