const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/",(req,res)=>{
    const sqlGet = "SELECT * FROM itineraire";
    db.query(sqlGet,(err,resulta)=>{
        res.send(resulta);
    })
})
router.post("/",(req,res) =>{
    const dataReq = req.body;
    // res.send(dataReq);
    const sqlInsert = "INSERT INTO `itineraire` (`NumItinaire`, `VilleDepart`, `VilleArriver`, `frais`) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert,[dataReq.numIti,dataReq.villeDep,dataReq.villeArr,dataReq.frais],(err,result) =>{
        if(err){
           res.send(err)
        }else{
            res.send("mety le ajouter")
        }
    })
})
router.get("/numTrain",(req,res) =>{
    const sqlInsert = "SELECT DISTINCT(numTrain) FROM `reservation` WHERE 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        res.send(result)
    })
})

router.post("/remove",(req,res) =>{
    const id  = req.body.id;
    const sqlDelet = "DELETE FROM `itineraire` WHERE `itineraire`.`idIti` = ?";
    db.query(sqlDelet, id ,(err,result) =>{
        if(err){
           res.send(err)
        }
        res.send("mety le delete")
    })
})

router.get("/edit/:id",(req,res)=>{
    const id = req.params.id;   
    const sqlGet = "SELECT * FROM itineraire WHERE `itineraire`.`idIti` = ? ";
    db.query(sqlGet,id,(err,resulta)=>{
        res.send(resulta);
    })
})

router.post("/modifier",(req,res) =>{
    const dataReq = req.body;
    const sqlInsert = "UPDATE `itineraire` SET `VilleDepart` = ?, `VilleArriver` = ?, `frais` = ? WHERE `itineraire`.`idIti` = ?";
    db.query(sqlInsert,[dataReq.VilleDepart,dataReq.VilleArriver,dataReq.frais,dataReq.id],(err,result) =>{
        if(err){
           res.send(err)
        }
    })
})
router.get("/numTrainDefault",(req,res) =>{
    const sqlInsert = "SELECT idIti+1 as idIti FROM itineraire ORDER BY idIti Desc LIMIT 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        else{
            if (result[0]) {
                const numIt = result[0].idIti;
                const num = (numIt<10) ? 'I00'+numIt : ((numIt<100) ? 'I0'+numIt : 'I'+numIt) 
                const numItidef = {
                    idIti:num  
                }
                res.send(numItidef)
            } else {
                res.send({
                    idIti:'I001'
                })
                
            }
        }
    })
})
module.exports = router; 