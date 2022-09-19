import React, { Fragment } from 'react'
import {NavLink} from "react-router-dom"
import './NavList.css'
const NavList = () => {
  return (  
    <Fragment>
        <ul>
          <li>
            <NavLink to='/itineraire'>Itineraire</NavLink>
          </li>
          <li>
            <NavLink to='/train'>Train</NavLink>
          </li>
          <li>
            <NavLink to='/reservation'>Reservation</NavLink>
          </li>
          <li>
            <NavLink to='/voyageur'>Voyageur</NavLink>
          </li>
        
        </ul>
    </Fragment>
  )
}

export default NavList