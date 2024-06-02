import axios from "axios"
import { useState, useEffect } from "react"
import './Prison.css'
import {Login, isLogged} from "./Login"
import { useNavigate } from "react-router-dom";


function Prison() {

    const [prisonersList, setPrisonersList] = useState([])
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [detailsPrisoner, setDetailsPrisoner] = useState({})

    const [bgImg, setBgImg] = useState("");

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);


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
                          <li style={{cursor: "pointer"}} key={prisoner._id} onClick={() => {setDetailsPrisoner(prisoner); openPopup(); setBgImg("url('sigma.png')")} }>{prisoner.name} {prisoner.surname} 

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
                          <li style={{cursor: "pointer"}} key={prisoner._id} onClick={() => {setDetailsPrisoner(prisoner); openPopup(); setBgImg("")}}>{prisoner.name} {prisoner.surname} 
      
                                              </li>)
                      }

                    })
                }
                </ul>
         </fieldset>

            <button class="login" onClick={() => navigate('/login')}>Login</button>
         </div>
            
         {isOpen && (
        <div className="dynamic-popup" style={{backgroundImage: bgImg}}>
        <li key={detailsPrisoner._id}>
          {detailsPrisoner.name} {detailsPrisoner.surname} {detailsPrisoner.sentence} {detailsPrisoner.reason}
        </li>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    
    </>
    )
}


export default Prison