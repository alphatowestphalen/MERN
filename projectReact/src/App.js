import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './NavBar/NavBar'
import ItiTable from './Itineraire/Component/ItiTable'
import ItiLogin from './Itineraire/Component/ItiLogin'
import ItiLoginEdit from './Itineraire/Component/ItiLogEdit'
import TrainTable from './Train/Component/TrainTable'
import TrainLogin from './Train/Component/TrainLogin'
import TrainLoginEdit from './Train/Component/TrainLoginEdit'
import ResTable from './Reservation/Component/ResTable'
import ResLog from './Reservation/Component/ResLog'
import ResLogEdit from './Reservation/Component/ResLogEdit'
import VoyageurTable from './Voyageur/VoyageurTable'
import "bootstrap/dist/css/bootstrap.css"


const App = () => {
  return (
    <BrowserRouter>
        <ToastContainer position='top-center'/>
        <Navbar />
        <Routes>
          <Route  path="/" element={<ItiTable/>}></Route>
          <Route path="/itineraire" element={<ItiTable/>}></Route>
          <Route path="/itineraire/ItiLogin" element={<ItiLogin/>}></Route>
          <Route path="/itineraire/edit/:id" element={<ItiLoginEdit/>}></Route>
          <Route path="/itineraire/numTrainDefault" element={<ItiLogin/>}></Route>
          <Route path="/train" element={<TrainTable/>}></Route>
          <Route path="/train/trainLogin" element={<TrainLogin/>}></Route>
          <Route path="/train/edit/:id" element={<TrainLoginEdit/>}></Route>
          <Route path="/reservation" element={<ResTable/>}></Route>
          <Route path="/reservation/resLogin" element={<ResLog/>}></Route>
          <Route path="/reservation/edit/:id" element={<ResLogEdit/>}></Route>
          <Route path="/voyageur" element={<VoyageurTable/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
