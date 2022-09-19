import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./ResLog.css"
import { toast } from 'react-toastify';

const init = {
    "numRes":"",
    "numTrain":"",
    "numPlace":"",
    "dateRes":"",
    "nomVoy":"",
}
const ResLog = () => {


  const [data,setData] = useState(init);
  const {numRes,numTrain,numPlace,dateRes,nomVoy} = data;
  const [numTrianDef,SetTrianDef] = useState([]);

  const history = useNavigate();

  const handelSubmit = (e) =>{
      e.preventDefault();
    if (!numRes || !numTrain || !numPlace || !dateRes || !nomVoy) {
      toast.error('Remplire tous les champ! ');

    } else {
      axios.post("http://localhost:3001/reservation",{
          "numRes": numRes,
          "numTrain": numTrain,
          "numPlace": numPlace,
          "dateRes": dateRes,
          "nomVoy": nomVoy
      }).then((reponse) => {
        toast.success('Ajout avec succee');
        
        setData({numRes:"",numTrain:"",numPlace:"",dateRes:"",nomVoy:""})
      })
      .catch((err) =>toast.error(err.reponse.data));
      setTimeout(()=>{
        history("/reservation");
      },500)
    }  

  } 
  const numTrains = () =>{
    axios.get("http://localhost:3001/reservation/numTrains")
          .then((resp) => {
            const numItDef = resp.data;
            SetTrianDef(numItDef);
            })
  }
  useEffect(()=>{
    axios.get("http://localhost:3001/reservation/numTrainDefault")
          .then((resp) => {
            console.log(resp)
              setData({...data,numRes:resp.data.idRes})
            })
            numTrains();
  },[])
  const handelInputChange = (e) =>{
    const {name, value} = e.target;
    setData({...data,[name]:value})
  }
  return (
  
    <div className='w-50 res '>
      
        <h4 className="modal-title">AJOUTER RESERVATION</h4>
          <hr/>
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label htmlFor="">Numero Reservation</label>
            <input type="text" readOnly name='numRes' value={numRes} onChange={handelInputChange} placeholder='Ex: R001' className="form-control form-control-sm" id="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Numero Train</label>
            <select value={numTrain} name='numTrain' onChange={handelInputChange} className="form-control form-control-sm"  id="sel1">
            <option> Numero Train</option>
                      {numTrianDef.map((item,index) =>{
                    return(

                      <option>{item.numTrain} </option>                  
                    
                    )
                  })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Numero Place</label>
            <select value={numPlace} name='numPlace' onChange={handelInputChange} className="form-control form-control-sm" id="sel1">
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Date de Reservation</label>
            <input value={dateRes} name='dateRes' onChange={handelInputChange} type="Date" placeholder='Date de Reservation' className="form-control form-control-sm" id="pwd"/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Nom Voyageu</label>
            <input type="text" name='nomVoy' value={nomVoy} onChange={handelInputChange} placeholder='Ex: Alphato' className="form-control form-control-sm" id="pwd"/>
          </div>
          <div className='bouton'>
            <button type="submit" className="btn w-25 btn-outline-info btn-sm">Save Reservation</button>
            <Link to={'/reservation'}>
              <button className="btn btn-outline-danger btn-sm"> Annuler </button>
            </Link>
          </div>
        </form>
    </div>
  )
}

export default ResLog