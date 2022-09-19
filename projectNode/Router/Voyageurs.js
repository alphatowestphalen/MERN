const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/",(req,res)=>{
    const sqlGet = "SELECT reservation.nomVoyageur,reservation.numTrain,reservation.dateReservation FROM reservation";
    db.query(sqlGet,(err,resulta)=>{
        res.send(resulta);
    })
})
router.post("/",(req,res)=>{
    const dataReq = req.body;
    const sqlGet = "SELECT reservation.nomVoyageur,reservation.numTrain,reservation.dateReservation FROM `reservation` WHERE NumTrain = ? AND MONTH(DateReservation) = ?";
    db.query(sqlGet,[dataReq.numTrain,dataReq.dateTrie],(err,resulta)=>{
        // console.log(resulta)
        res.send(resulta);
        
    })
})
router.put("/",(req,res)=>{
    const dataReq = req.body;

    const sqlGet = "SELECT reservation.nomVoyageur,reservation.numTrain,reservation.dateReservation FROM `reservation` WHERE NumTrain = ? AND (YEAR(DateReservation) = ?)";
    db.query(sqlGet,[dataReq.numTrain,dataReq.dateTrie],(err,resulta)=>{
        // console.log(sqlGet,[dataReq.numTrain,dataReq.dateTrie])
        res.send(resulta);
    })
})

router.get("/recette",(req,res)=>{
    const sqlGet = "SELECT SUM(itineraire.frais) AS somme FROM `itineraire` INNER JOIN train ON itineraire.NumItinaire = train.NumItineraire INNER JOIN reservation ON train.NumTrain = reservation.NumTrain";
    db.query(sqlGet,(err,resulta)=>{
        res.send(resulta);
    })
})
router.post("/recetteAnner",(req,res)=>{
    const dataReq = req.body;

    const sql =  "SELECT SUM(itineraire.frais) as somme FROM itineraire INNER JOIN train ON itineraire.NumItinaire = train.NumItineraire INNER JOIN reservation ON train.NumTrain = reservation.NumTrain WHERE reservation.numTrain = ? AND (YEAR(reservation.dateReservation) = ?)";
    db.query(sql,[dataReq.numTrain,dataReq.dateTrie],(err,resulta) =>{
        res.send(resulta);
    })
})
router.post("/recetteMois",(req,res)=>{
    const dataReq = req.body;
    const sql =  "SELECT SUM(itineraire.frais) as somme FROM itineraire INNER JOIN train ON itineraire.NumItinaire = train.NumItineraire INNER JOIN reservation ON train.NumTrain = reservation.NumTrain WHERE reservation.numTrain = ? AND (MONTH(reservation.dateReservation) = ?)";
    db.query(sql,[dataReq.numTrain,dataReq.dateTrie],(err,resulta) =>{
        res.send(resulta);
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
module.exports = router;