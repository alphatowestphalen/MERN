import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import "./ResTable.css"

const ResTable = () => {
  const [donne,setData] = useState([]);

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
  const loaData = async () =>{
    const response = await axios.get("http://localhost:3001/reservation");
    setData(response.data);
  }
  useEffect(()=>{
    loaData()
  },[])

  const deleteRes = (id) =>{
      if(window.confirm("Vous etes vraiment supprimer cette Reservation ?")){
        axios.post('http://localhost:3001/reservation/remove',{id:id})
        setTimeout(() =>{
          loaData();
        },500);      
      }

  }
  return (
    <div className='itiTable'>  
     <Link to={'/reservation/resLogin'}>
      <button className="btn btn-outline-info btn-sm add">Ajouter Reservation</button>
      <hr/>
    </Link>     
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>NUMERO RESERVATION</th>
            <th>NUMERO TRAIN</th>
            <th>NUMERO PLACE</th>
            <th>DATE RESERVATION</th>
            <th>NON VOYAGEUR</th>
            <th>OPTION</th>
          </tr>
        </thead>
        <tbody>
          {
            donne.map((item,index) =>{
              return(
                <tr key={index}>
                  <td>{item.numReservation}</td>
                  <td>{item.numTrain}</td>
                  <td>{item.numPlace}</td>
                  <td>{formatdate(item.dateReservation)}</td>
                  <td>{item.nomVoyageur}</td>
                  <td>
                    <Link to={`/reservation/edit/${item.id}`}>
                      <button type="button"  className="btn btn-info ml-1 btn-sm">Edit</button> 
                    </Link>
                      <button type="button" onClick={() => deleteRes(item.id)} className="btn btn-danger ml-1 btn-sm">Suprimer</button>
                  </td>
              </tr>
              )
            })
          }
          
        </tbody>
      </table>
      
  </div>
  )
}

export default ResTable