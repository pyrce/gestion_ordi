const express = require('express');
const router=express();
const gestionController = require('../controllers/gestionController.js');
const userController=require("../controllers/usersController.js");
const posteController=require("../controllers/postesController.js");

router.get("/",gestionController.liste);
router.delete("/attribution/delete",gestionController.delete);
router.get("/attribution/filtre",gestionController.filtre);
router.post("/attribbution/attribuer",gestionController.attribuer);

router.post("/postes/add",posteController.add);
router.delete("/postes",posteController.delete);

router.get("/users",userController.liste);
router.post("/users/add",userController.add);
router.post("/users/login",userController.login);
router.get("/users/logout",userController.logout);
module.exports = router;