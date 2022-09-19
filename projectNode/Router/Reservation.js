const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/",(req,res) => {
    const sqlGet = "SELECT * FROM reservation";
    db.query(sqlGet,(err,resulte) =>{
        res.send(resulte);
    })
})
router.post("/",(req,res) =>{
    const dataReq = req.body;
    const sqlAdd = "INSERT INTO `reservation` (`numReservation`, `numTrain`, `numPlace`, `dateReservation`, `nomVoyageur`) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlAdd,[dataReq.numRes,dataReq.numTrain,dataReq.numPlace,dataReq.dateRes,dataReq.nomVoy])
})
router.get("/edit/:id",(req,res)=>{
    const id = req.params.id;   
    const sqlGet = "SELECT * FROM reservation WHERE `reservation`.`id` = ? ";
    db.query(sqlGet,id,(err,resulta)=>{
        res.send(resulta);
    })
})
router.post("/modifier",(req,res) =>{
    const dataReq = req.body;

    const sqlInsert = "UPDATE `reservation` SET `numReservation` = ?,`numTrain` = ?, `numPlace` = ?, `dateReservation` = ?, `nomVoyageur` = ? WHERE `reservation`.`id` = ?";
    db.query(sqlInsert,[dataReq.numReservation,dataReq.numTrain,dataReq.numPlace,dataReq.dateReservation,dataReq.nomVoyageur,dataReq.id],(err,result) =>{
        console.log([dataReq.numReservation,dataReq.numTrain,dataReq.numPlace,dataReq.dateReservation,dataReq.nomVoyageur,dataReq.id])
        if(err){
           res.send(err)
        }
        res.send(result)
    })
})


router.post("/remove",(req,res) => {
    const id = req.body.id;
    const sqlDelet = "DELETE FROM `reservation` WHERE `reservation`.`id` = ?"
    db.query(sqlDelet,id,(err,resulte) =>{
        res.send(resulte)
    })
})
router.get("/numTrainDefault",(req,res) =>{
    const sqlInsert = "SELECT id+1 as id FROM reservation ORDER BY id Desc LIMIT 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        else{
            if (result[0]) {
                const numIt = result[0].id;
                const num = (numIt<10) ? 'R00'+numIt : ((numIt<100) ? 'R0'+numIt : 'R'+numIt) 
                const numItidef = {
                    idRes:num  
                }
                res.send(numItidef)
            } else {
                res.send({
                    idRes:'R001'
                })
                
            }
        }
    })
})
router.get("/numTrains",(req,res) =>{
    const sqlInsert = "SELECT DISTINCT(numTrain) FROM `reservation` WHERE 1";
    db.query(sqlInsert,(err,result) =>{
        if(err){
           res.send(err)
        }
        res.send(result)
    })
})

router.post("/numTrain",(req,res) => {
    const id = req.body.id;
    const sqlDelet = "DELETE FROM `reservation` WHERE `reservation`.`id` = ?"
    db.query(sqlDelet,id,(err,resulte) =>{
        res.send(resulte)
    })
})
module.exports = router;
