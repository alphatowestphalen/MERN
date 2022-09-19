import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import "./TrainTable.css"


const ItiTable = () => {

  const [donne,setData] = useState([]);
  const loaData = async () =>{
    const response = await axios.get("http://localhost:3001/train");
    setData(response.data);
  }
  useState(()=>{
    loaData()
  },[])
  const deleteTrain = (id) =>{
    if(window.confirm("Vous etes vraiment supprimer cette itineraire")){
      axios.post('http://localhost:3001/train/remove',{id:id});
      setTimeout(() => {
        loaData();
      },500)
    }
  }

 
  return (
    <div className='itiTable'>  
    
    <Link to={'/train/trainLogin'}>
      <button className="btn btn-outline-info btn-sm add">Ajouter Train</button>
    </Link> 
    <hr/>   
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>NUMERO TRAIN</th>
            <th>NOMBRE PLACE</th>
            <th>DESINGATION</th>
            <th>NUMERO ITINERAIRE</th>
            <th>OPTION</th>
          </tr>
        </thead>
        <tbody>
        {donne.map((item,index) =>{
          return(
            <tr key={item.id}>
              <td>{item.NumTrain}</td>
              <td>{item.NbrPlace}</td>
              <td>{item.Desing}</td>
              <td>{item.NumItineraire}</td>
              <td>
                <Link to={`/train/edit/${item.id}`}>
                  <button type="button"   className="btn btn-info ml-1 btn-sm">Edit</button> 
                </Link>
                  <button type="button" onClick={() => deleteTrain(item.id)} className="btn btn-danger ml-1 btn-sm">Suprimer</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
  </div>
  )
}

export default ItiTable