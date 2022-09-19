import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./ResLog.css"
import { toast } from 'react-toastify';

const init = {
    "numReservation":"",
    "numTrain":"",
    "numPlace":"",
    "dateReservation":"",
    "nomVoyageur":"",
}
const ResLogEdit = () => {


  const [data,setData] = useState(init);
  const {numReservation,numTrain,numPlace,dateReservation,nomVoyageur} = data;
  const history = useNavigate();
  const {id} = useParams();

  const handelSubmit = (e) =>{
      e.preventDefault();
    if (!numReservation || !numTrain || !numPlace || !dateReservation || !nomVoyageur) {
        alert("Veillez Remplire tous les champs?")
    } else {
      const val = {
        "id":id,
        "numReservation": numReservation,
        "numTrain": numTrain,
        "numPlace": numPlace,
        "dateReservation": dateReservation,
        "nomVoyageur": nomVoyageur
    }
      axios.post("http://localhost:3001/reservation/modifier",val).then((reponse) => {
        setData({numReservation:"",numTrain:"",numPlace:"",dateReservation:"",nomVoyageur:""})
      })
      .catch((err) =>toast.error(err.reponse.data));
      setTimeout(()=>{
        history("/reservation");
      },500)
    }
  } 

  const formatdate = (date)=>{
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
  useEffect(()=>{
    axios.get("http://localhost:3001/reservation/edit/"+id+"")
        .then((reponse) =>{
          const datas = reponse.data[0];
          setData(datas);
        })
  },[id])
  const handelInputChange = (e) =>{
    const {name, value} = e.target;
    setData({...data,[name]:value})
  }
  return (
  
    <div className='w-50 res '>
      
        <h4 className="modal-title">MODIFICATION RESERVATION</h4>
          <hr/>
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label htmlFor="">Numero Reservation</label>
            <input type="text" name='numReservation' value={data.numReservation} onChange={handelInputChange} placeholder='Ex: R001' className="form-control form-control-sm" id="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Numero Train</label>
            <select value={data.numTrain} name='numTrain' onChange={handelInputChange} className="form-control form-control-sm"  id="sel1">
              <option>T001</option>
              <option>T002</option>
              <option>T003</option>
              <option>T004</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Numero Place</label>
            <select value={data.numPlace} name='numPlace' onChange={handelInputChange} className="form-control form-control-sm" id="sel1">
              <option>1</option>
              <option>2</option>
              <option>P003</option>
              <option>P004</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Date de Reservation</label>
            <input value={formatdate(data.dateReservation)} name='dateReservation' onChange={handelInputChange} type="Date" placeholder='Date de Reservation' className="form-control form-control-sm" id="pwd"/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Nom Voyageu</label>
            <input type="text" name='nomVoyageur' value={nomVoyageur} onChange={handelInputChange} placeholder='Ex: Alphato' className="form-control form-control-sm" id="pwd"/>
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

export default ResLogEdit