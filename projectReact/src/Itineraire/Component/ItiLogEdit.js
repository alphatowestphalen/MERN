import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,Link, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import "./ItiLogin.css"
let initialiser = {
  NumItinaire : "",
  VilleDepart : "",
  VilleArriver : "",
  frais : "",
}
const ItiLoginEdit = () => {

  const [state,setState] = useState(initialiser);
  const {NumItinaire,VilleArriver,VilleDepart,frais} = state;
  const history = useNavigate();
  const {id} = useParams();
  const handleSubmite = (e)=>{
      e.preventDefault();
      if(!NumItinaire || !VilleDepart || !VilleArriver || !frais){
        alert("Remplire tous les champs!")
      }
      else{
        const val = {
          "id":id,
          "NumItinaire":NumItinaire,
          "VilleDepart":VilleDepart,
          "VilleArriver":VilleArriver,
          "frais":frais
        } 
        axios.post("http://localhost:3001/itineraire/modifier",val).then((reponse)=>{
        
          setState({NumItinaire:"", VilleDepart:"", VilleArriver:"",frais:""});
        })
        .catch((err) =>console.log(err));
          setTimeout(() => {
            history('/itineraire')
          }, 500);
      };

  }
  useEffect(()=>{
    axios.get("http://localhost:3001/itineraire/edit/"+id+"")
          .then((resp) =>{
            const datas = resp.data[0];
            setState(datas)
          } 
          )
  },[id])

  const handelInputChange = (e) =>{
      const {name, value} = e.target;
      setState({...state,[name]:value})
  }
  return (
  
    <div className='w-50 itineraire '>
      
        <h4 className="modal-title">MODIFICATION ITINERAIRE</h4>
        <hr/>
        <form  onSubmit={handleSubmite}>
          <div className="form-group">
            <label htmlFor="">Numero Itineraire</label>
            <input type="text" id='numIti' name='NumItinaire' value={state.NumItinaire} onChange={handelInputChange} placeholder='Ex:I001' className="form-control form-control-sm" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Ville de part</label> 
            <input type="text" id='villeDep' name='VilleDepart' value={state.VilleDepart }  onChange={handelInputChange } placeholder='Ex: Antsohihy' className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Ville arrive</label>
            <input type="text" id='villeArr' name='VilleArriver' value={state.VilleArriver} onChange={handelInputChange} placeholder='Ex: Sambava' className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Frais</label>
            <input type="text" id='frais' name='frais' value={state.frais}  onChange={handelInputChange} placeholder='Ex: 10000' className="form-control form-control-sm" />
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

export default ItiLoginEdit