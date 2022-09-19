import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import "./TrainLogin.css"

const inite = {
  NumTrain: "",
  NbrPlace: "",
  Desing: "",
  NumItineraire: ""
}

const TrainLoginEdit = () => {
  const [state,setState] = useState(inite);
  const [donne,setDonne] = useState([])

  const {NumTrain,NbrPlace,Desing,NumItineraire} = state;
  const history = useNavigate();
  const {id} = useParams();

  const handelSubmit = (e) =>{
       e.preventDefault();
      if (!NumTrain || !NbrPlace || !Desing || !NumItineraire) {
        alert("veillez remplire tous les champ ?")
      }
      else{
        const val = { 
          "id":id,
          "NumTrain":NumTrain,
          "NbrPlace":NbrPlace,
          "Desing":Desing,
          "NumItineraire":NumItineraire
      }
        axios.post("http://localhost:3001/train/modifier",val).then((reponse) =>{
            setState({NumTrain:"",NbrPlace:"",Desing:"",NumItineraire:""})
        }).catch((err) =>console.log(err.response.data));
        toast.success('Modification avec succee');
        setTimeout(() => {
          history('/train')
        }, 500);
      }
  }
  useEffect(()=>{
    axios.get("http://localhost:3001/train/edit/"+id+"")
          .then((resp) =>{
            const datas = resp.data[0]
            setState(datas);
          })
          axios.get("http://localhost:3001/train/numIti")
          .then((resp) => {

            const numItDef = resp.data;
            setDonne(numItDef);
            })
  },[id])


  const handelInput = (e) =>{
    const {name, value} = e.target;
    setState({...state,[name]:value})
  }

  return (
      <div className='w-50 train'>
        <h4 className="modal-title">MODIFICATION TRAIN</h4>
        <hr/>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <label htmlFor="">Numero Train</label>
          <input type="text" name='NumTrain' value={state.NumTrain} onChange={handelInput} placeholder='Ex:T004' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Nombre de Place</label>
          <input type="text" name='NbrPlace' value={state.NbrPlace} onChange={handelInput} placeholder='Ex: 20' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Designation</label>
          <input type="text" name='Desing' value={state.Desing} onChange={handelInput} placeholder='Ex:Designation' className="form-control form-control-sm" id="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="sel1">Numero Itineraire</label>
          <select className="form-control form-control-sm" name='NumItineraire' value={state.NumItineraire} onChange={handelInput} placeholder='Ex: I001' id="sel1">
          {donne.map((item,index)=>{
              return(
                <option key={index}>{item.NumItinaire}</option>
              )
            })}
          </select>
        </div>
        <div className='bouton'>
            <button type="submit" className="btn w-25 btn-outline-info btn-sm">MODIFICATION</button>
            <Link to={'/train'}>
              <button  className="btn btn-outline-danger btn-sm" >Annuler</button>
            </Link>
          </div>
      </form>
  </div>
  )
}

export default TrainLoginEdit;