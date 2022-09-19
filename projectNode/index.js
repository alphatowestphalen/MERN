const itineraireRoute = require("./Router/Itineraire")
const train = require("./Router/Train");
const reservation = require("./Router/Reservation");
const express = require("express");
const app = express();
const cors = require("cors");
const voyageur = require("./Router/Voyageurs");



app.use(cors());
app.use(express.json());
app.use("/itineraire",itineraireRoute);
app.use("/train",train);
app.use("/reservation",reservation);
app.use("/voyageur",voyageur);



app.listen(3001, () =>{
    console.log("server is running on port 3001");
})