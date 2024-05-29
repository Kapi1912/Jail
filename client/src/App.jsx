import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {Login, isLogged} from './components/Login'
import Prison from './components/Prison'
import PrisonerAdding from './components/PrisonerAdding'



function App() {
  const [token, setToken] = useState();


  
  return (
    <>
    

      <Routes>
          <Route exact path="/" element={<Prison/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/prisoner-adding" element={<PrisonerAdding/>}></Route>

        </Routes>

    </>
  )
}

export default App
