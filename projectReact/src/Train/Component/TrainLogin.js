import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import "./TrainLogin.css"

const inite = {
  numTrain: "",
  nbrPlace: "",
  design: "",
  numIti: ""
}

const TrainLogin = () => {
  const [state,setState] = useState(inite);
  const [donne,setDonne] = useState([])
  const {numTrain,nbrPlace,design,numIti} = state;
  const history = useNavigate();


  const handelSubmit = (e) =>{
       e.preventDefault();
      if (!numTrain || !nbrPlace || !design || !numIti) {
        alert("veillez remplire tous les champ ?")
      }
      else{
        axios.post("http://localhost:3001/train",{        
            "numTrain":numTrain,
            "nbrPlace":nbrPlace,
            "design":design,
            "numIti":numIti
        }).then((reponse) =>{
            setState({numTrain:"",nbrPlace:"",design:"",numIti:""})
        }).catch((err) =>toast.error(err.response.data));
        setTimeout(() => {
          history('/train')
        }, 500);
      }
  }
  const handelInput = (e) =>{
    const {name, value} = e.target;
    setState({...state,[name]:value})
  }
  const numTrainDefault = () =>{
    axios.get("http://localhost:3001/train/numTrainDefault")
          .then((resp) => {
              setState({...state,numTrain:resp.data.idTrain})
            })
  }
  const numItineraire = () =>{
    axios.get("http://localhost:3001/train/numIti")
          .then((resp) => {
            const numItDef = resp.data;
            setDonne(numItDef);
            })
  }
  useEffect(()=>{
      numTrainDefault();
      numItineraire();
    },[])
  return (
      <div className='w-50 train'>
        <h4 className="modal-title">AJOUTER TRAIN</h4>
        <hr/>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <label htmlFor="">Numero Train</label>
          <input type="text" readOnly name='numTrain' value={numTrain} onChange={handelInput} placeholder='Ex:T004' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Nombre de Place</label>
          <input type="text" name='nbrPlace' value={nbrPlace} onChange={handelInput} placeholder='Ex: 20' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Designation</label>
          <input type="text" name='design' value={design} onChange={handelInput} placeholder='Ex:Designation' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="sel1">Numero Itineraire</label>
          <select className="form-control form-control-sm" name='numIti' value={numIti} onChange={handelInput} placeholder='Ex: I001' id="sel1">
            {donne.map((item,index)=>{
              return(
                <option key={index}>{item.NumItinaire}</option>
              )
            })}
            
          </select>
        </div>
        <div className='bouton'>
            <button type="submit" className="btn w-25 btn-outline-info btn-sm">Save Train</button>
            <Link to={'/train'}>
              <button  className="btn btn-outline-danger btn-sm" >Annuler</button>
            </Link>
          </div>
      </form>
  </div>
  )
}

export default TrainLogin