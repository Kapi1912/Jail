import axios from "axios"
import { useState, useEffect } from "react"
import './Prison.css'
import {Login, isLogged} from "./Login"
import { useNavigate } from "react-router-dom";


function Prison() {

    const [prisonersList, setPrisonersList] = useState([])
    const navigate = useNavigate();

    async function fetchData(){
        try{
          const response = await axios.get("http://localhost:5000/prisoners")
          setPrisonersList(response.data)
    
        }catch(err){
          console.log("Error: ", err)
        }
    
      }
    
      useEffect(()=>{ 
        fetchData() 
      }, [])



    return(
    <>
    <h1>Lista więźniów</h1>
    <div class="bloki">
        
         <fieldset class="blok-a">
         <legend>Gity</legend>
            <ul style={{listStyle:'none'}}>
                {
                    prisonersList.map(prisoner=>{
                      if(!prisoner.is60){
                        return (
                          <li key={prisoner._id}>{prisoner.name} {prisoner.surname} 

                                              </li>)
                      }
                    })
                }
                </ul>
         </fieldset>
         <fieldset class="blok-b">
         <legend>Frajerzy</legend>
            <ul style={{listStyle:'none'}}>
                {
                    prisonersList.map(prisoner=>{


                      if(prisoner.is60){
                        return (
                          <li key={prisoner._id}>{prisoner.name} {prisoner.surname} 
      
                                              </li>)
                      }

                    })
                }
                </ul>
         </fieldset>

            <button class="login" onClick={() => navigate('/login')}>Login</button>
         </div>
            
    
    </>
    )
}


export default Prison