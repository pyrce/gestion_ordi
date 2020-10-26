var controller={}

var client=require("../models/client");
var user=require("../models/user");
var bcrypt = require('bcrypt');


controller.liste=(req,res)=>{

    client.findAll({}).then(users=>{

        res.send(users);
    })

}

controller.add=(req,res)=>{
client.create({
    nom:req.body.nom_client,
    prenom:req.body.prenom_client}).then( () =>{
        res.sendStatus(200);
    })

}

controller.login=(req,res)=>{

var login=req.body.login;
var mdp=req.body.password;

user.findOne({where:{login:login}}).then(async (current) => {
console.log("user found")
    //compare le hashh du mot de pass entré avec celui dans la base de donées
    const match = await bcrypt.compare(mdp, current.password);

if(match){
  res.cookie('user', user, { maxAge: 1000*60*60, httpOnly: true ,signed:true});
  res.redirect("/");
}else{
    res.send({"msg":"ko pass"});
}
  
    
    }).catch((err)=>{
        console.log(err);
      res.send({"msg":"ko"});
    });
}


controller.logout=(req,res) => {
    console.log("ddeconnection");
    res.clearCookie('user');
       res.redirect("/");
  }
module.exports = controller;