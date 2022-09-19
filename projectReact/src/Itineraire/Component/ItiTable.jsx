import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./ItiTable.css";
// import {toast} from "react-toastify";
import axios from "axios";

const ItiTable = () => {
  const [donne, setData] = useState([]);
  const loaData = async () => {
    const response = await axios.get("http://localhost:3001/itineraire");
    setData(response.data);
  }
  useEffect(() => {
    loaData()
  }, [])
  const deleteIti = (id) => {
    if (window.confirm("Vous etes vraiment supprimer cette itineraire")) {
      axios.post('http://localhost:3001/itineraire/remove', { id: id });
      setTimeout(() => {
        loaData();
      }, 500);
    }
  }
  return (
    <div className='itiTable'>
      <Link to={'/itineraire/ItiLogin'}>
        <button className="btn btn-outline-info btn-sm add">Ajouter Itineraire</button>
      </Link>
      <hr />
      <table className="table table-lg table-condensed">
        <thead>
          <tr>
            <th>NUMERO ITINERAIRE</th>
            <th>VILLE DEPART</th>
            <th>VILLE ARRIVE</th>
            <th>FRAIS</th>
            <th>OPTION</th>
          </tr>
        </thead>
        <tbody>
          {donne.map((item, index) => {
            return (
              <tr key={item.idIti}>
                <td>{item.NumItinaire}</td>
                <td>{item.VilleArriver}</td>
                <td>{item.VilleDepart}</td>
                <td>{item.frais}</td>
                <td>
                  <Link to={`/itineraire/edit/${item.idIti}`}>
                    <button type="button" className="btn btn-info ml-1 btn-sm">Edit</button>
                  </Link>
                  <button type="button" onClick={() => deleteIti(item.idIti)} className="btn btn-danger ml-1 btn-sm">Suprimer</button>
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