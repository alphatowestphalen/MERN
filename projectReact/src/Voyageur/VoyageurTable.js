import React, { useState,useEffect } from 'react'
import axios from 'axios';
import "./voy.css"

const initialiser = {
  recette : "",
  dateTrie : "",
  numTrains : "",
  montant    : ""
}
const VoyageurTable = () => {
  const [donne,setDonne] = useState([]);
  const [numTrianDef,SetTrianDef] = useState([]);
  const [state,setState] = useState(initialiser);
  const {recette,dateTrie,numTrains,montant} = state;
  const loaData = async () =>{
    const response = await axios.get("http://localhost:3001/voyageur");
    setDonne(response.data);
  }
 
  const numTrain = () =>{
    axios.get("http://localhost:3001/voyageur/numTrain")
          .then((resp) => {
            const numItDef = resp.data;
            SetTrianDef(numItDef);
            })
  }
  const formatdateComplet = (date)=>{
    var d = new Date(date),
      month = '' + (d.getMonth()+1),
      day = '' + (d.getDay()),
      taona = '' + (d.getFullYear());
      if(month.length < 2){
          month = '0' + month
      }
      if(day.length < 2){
          day = '0' + day
      }
      return [taona,month,day].join('-')
  }
  
  const formatdateMois = (date)=>{
    var d = new Date(date),
      month = d.getMonth()+1
      return month
  }
  const formatdateAnne = (date)=>{
    var d = new Date(date),
    taona = '' + (d.getFullYear());
      return taona
  }
  const recetteTotal = () =>{
    axios.get("http://localhost:3001/voyageur/recette")
          .then((resp) => {
            console.log(resp)
              setState({...state,montant:resp.data[0].somme})
            })
  }

  useEffect(() => {
    loaData();
    recetteTotal();
    numTrain();
  },[])


  const handelSubmit = () =>{
    if (!recette || !dateTrie || !numTrains) {
      alert("Remplire tous les champs !")
    }
    else{
      if (recette === "ANNEE") {
        const dateTrieAnne = formatdateAnne(dateTrie)
        const val= {
            "recette":recette,
            "dateTrie":dateTrieAnne,
            "numTrain":numTrains
        } 

        axios.put("http://localhost:3001/voyageur",val)
        .then((reponse)=>{
          setDonne(reponse.data);
          
        })
        axios.post("http://localhost:3001/voyageur/recetteAnner",val)
        .then((reponse)=>{
          setState({...state,montant:reponse.data[0].somme})
          
        })
        .catch((err) =>console.log(err.response.data));
           
      }  
      else {
        const dateTrieMois = formatdateMois(dateTrie)
        const val= {
            "recette":recette,
            "dateTrie":dateTrieMois,
            "numTrain":numTrains
        } 
        axios.post("http://localhost:3001/voyageur",val)
        .then((reponse)=>{

          setDonne(reponse.data);
          
        })
        axios.post("http://localhost:3001/voyageur/recetteMois",val)
        .then((reponse)=>{
          setState({...state,montant:reponse.data[0].somme})
          
        })
        .catch((err) =>console.log(err.response.data));
         
      }       
    }
  }
  const handelInputChange = (e) =>{
    const {id, value} = e.target;
    setState({...state,[id]:value})
}
  return (
    <div>
        <div className='itiTable'>
            <div>
                <div className='tirage'>
                  <select  id='recette' value={recette}  onChange={handelInputChange} className="form-control form-control-sm" placeholder='Ex: I001' >
                      <option>Recette</option>
                      <option>MOIS</option>
                      <option>ANNEE</option>
                  </select>
                  <input type="DATE" id='dateTrie' name='dateTrie' value={dateTrie}  onChange={handelInputChange}  className="form-control form-control-sm" />
                  <select id='numTrains' value={numTrains}  onChange={handelInputChange} className="form-control form-control-sm" placeholder='Ex: I001'>
                      <option> Numero Train</option>
                      {numTrianDef.map((item,index) =>{
                    return(

                      <option>{item.numTrain} </option>                  
                    
                    )
                  })}
                  </select>
                </div>
                <button onClick={handelSubmit} className="btn btn-outline-info btn-sm add">Recherche</button>
              
            </div>
            <hr/>   
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>NOM VOYAGEUR</th>
                    <th>NUMERO TRAIN</th>
                    <th>DATE RESERVATION</th>
                  </tr>
                </thead>
                <tbody>
                  {donne.map((item,index) =>{
                    return(
                      <tr key={index}>
                        <td>{item.nomVoyageur}</td>
                        <td>{item.numTrain}</td>
                        <td>{formatdateComplet(item.dateReservation)}</td>
                      </tr>  
                    )
                  })}
                  
                </tbody>
              </table>
              
          <div className='recette'>
            <h6>Recette(Ariary)</h6>
            <input type="number" id='montant' readOnly name='montant' value={montant}  onChange={handelInputChange}  className="form-control form-control-sm" />        
          </div>
        </div>
    </div>
  )
}

export default VoyageurTable