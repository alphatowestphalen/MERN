import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./ItiLogin.css"
const initialiser = {
  numIti : "",
  villeDep : "",
  villeArr : "",
  frais : "",
}
const ItiLogin = () => {

  const [state,setState] = useState(initialiser);
  const {numIti,villeDep,villeArr,frais} = state;
  const history = useNavigate();
  const {id} = useParams();
  
  const handleSubmite = (e)=>{
      e.preventDefault();
      if(!numIti || !villeDep || !villeArr || !frais){
        alert("Remplire tous les champs !")
      }
      else{
        axios.post("http://localhost:3001/itineraire",{
          "numIti":numIti,
          "villeDep":villeDep,
          "villeArr":villeArr,
          "frais":frais
        }).then((reponse)=>{
          setState({numIti:"", villeDep:"", villeArr:"",frais:""});
        })
        .catch((err) =>toast.error(err.response.data));
          setTimeout(() => {
            history('/itineraire')
          }, 500);
      };

  }
  useEffect(()=>{
    axios.get("http://localhost:3001/itineraire/numTrainDefault")
          .then((resp) => {
            console.log(resp)
              setState({...state,numIti:resp.data.idIti})
            })
  },[])
  const handelInputChange = (e) =>{
      const {name, value} = e.target;
      setState({...state,[name]:value})
  }
  return (
  
    <div className='w-50 itineraire '>
      
        <h4 className="modal-title">AJOUTER ITINERAIRE</h4>
        <hr/>
        <form  onSubmit={handleSubmite}>
          <div className="form-group">
            <label htmlFor="">Numero Itineraire</label>
            <input type="text" id='numIti' re name='numIti' value={numIti} onChange={handelInputChange} placeholder='Ex:I001' className="form-control form-control-sm" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Ville de part</label> 
            <input type="text" id='villeDep' name='villeDep' value={villeDep}  onChange={handelInputChange} placeholder='Ex: Antsohihy' className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Ville arrive</label>
            <input type="text" id='villeArr' name='villeArr' value={villeArr} onChange={handelInputChange} placeholder='Ex: Sambava' className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Frais</label>
            <input type="text" id='frais' name='frais' value={frais}  onChange={handelInputChange} placeholder='Ex: 10000' className="form-control form-control-sm" />
          </div>
          <div className='bouton'>
            <button type="submit" className="btn w-25 btn-outline-info btn-sm"> Save Itineraire</button> 
            <Link to={'/itineraire'}>
              <button  className="btn btn-outline-danger btn-sm" >Annuler</button>
            </Link>
          </div>
        </form>
    </div>
  )
}

export default ItiLogin