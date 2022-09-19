const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/",(req,res)=>{
    const sqlGet = "SELECT * FROM train";
    db.query(sqlGet,(err,resulta)=>{
        res.send(resulta);
    })
})
router.post("/",(req,res) =>{
    const dataReq = req.body;
    const sqlInsert = "INSERT INTO `train` (`NumTrain`, `NbrPlace`, `Desing`, `NumItineraire`) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert,[dataReq.numTrain,dataReq.nbrPlace,dataReq.design,dataReq.numIti],(err,result) =>{
        
        if(err){
           res.send(err)
        }else{
            res.send("mety le ajouter Train")
        }
    })
})
router.post("/remove",(req,res) =>{
    const id  = req.body.id;
    const sqlDelet = "DELETE FROM `train` WHERE `train`.`id` = ?";
    db.query(sqlDelet, id ,(err,result) =>{
        if(err){
           res.send(err)
        }
        else{
            res.send("mety le delete")
        }
    })
})

router.get("/edit/:id",(req,res)=>{
    const id = req.params.id  
    // res.send(id)  
    const sqlGet = "SELECT * FROM train WHERE `train`.`id` = ? ";
    db.query(sqlGet,id,(err,resulta)=>{
        res.send(resulta);
    })
})

router.post("/modifier",(req,res) =>{
    const dataReq = req.body;
    const sqlInsert = "UPDATE `train` SET `NumTrain` = ?, `NbrPlace` = ?, `Desing` = ?, `NumItineraire` = ? WHERE `train`.`id` = ?";
    db.query(sqlInsert,[dataReq.NumTrain,dataReq.NbrPlace,dataReq.Desing,dataReq.NumItineraire,dataReq.id],(err,result) =>{
        res.send(result)
        
        if(err){
           res.send(err)
        }
    })
})
router.get("/numTrainDefault",(req,res) =>{
    const sqlInsert = "SELECT id+1 as id FROM train ORDER BY id Desc LIMIT 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        else{
            if (result[0]) {
                const numIt = result[0].id;
                const num = (numIt<10) ? 'T00'+numIt : ((numIt<100) ? 'T0'+numIt : 'T'+numIt) 
                const numItidef = {
                    id:num  
                }
                res.send(numItidef)
            } else {
                res.send({
                    idTrain:'T001'
                })
                
            }
        }
    })
})
router.get("/numIti",(req,res) =>{
    const dataReq = req.body;
    const sqlInsert = "SELECT DISTINCT(NumItinaire) FROM `itineraire` WHERE 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        res.send(result)
    })
})
module.exports = router; 