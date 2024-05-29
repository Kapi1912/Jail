import axios from "axios"
import '../App.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {Login, isLogged} from "./Login"
import { useEffect } from "react";
function PrisonerAdding() {

    const navigate = useNavigate();



        useEffect(() => {
            console.log(isLogged)
            if(!isLogged) navigate("/login")
          }, []);


    const [newPrisoner, setNewPrisoner] = useState({name:"", surname:"", age:0, reason: "", sentence: 0, is60: false})
    const [newPrisonerDelete, setNewPrisonerDelete] = useState({name:"", surname:""})
    async function submitHandler(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append("name",  newPrisoner.name)
        formData.append("surname",  newPrisoner.surname)
        formData.append("age",  newPrisoner.age)
        formData.append("reason",  newPrisoner.reason)
        formData.append("sentence",  newPrisoner.sentence)
        formData.append("is60",  newPrisoner.is60)

        for(let [key, values] of formData.entries()){
            console.log(`${key}: ${values}`)
        }

        try {
        const response = await axios.post("http://localhost:5000/prisoners", formData)
            if(!response.ok){
                throw new Error(`Network response was not ok ${response.status}`)
            }

            const data = await response.json()
            console.log(`user addded ${data}`)
            setNewPrisoner({name:"", surname:"", age: 0, reason: "", sentence: 0, is60: false})

        } catch(err) {
            console.error(`Some problems with your fetch operation: ${err.message}`)
        }


    }

    async function deletePrisoner(e){
        e.preventDefault()
      
              try {
              const response = await axios.delete(`http://localhost:5000/prisoners/${newPrisonerDelete.name}/${newPrisonerDelete.surname}`)
      
                  if(!response.ok){
                      throw new Error(`Network response was not ok ${response.status}`)
                  }
      
                  const data = await response.json()
                  setNewPrisonerDelete({name: "", surname: ""})
              } catch(err) {
                  console.error(`Some problems with your fetch operation: ${err.message}`)
              }
      
      }

    return (
        <>
            <div class="prisonerinfo">
                <div class="prisonerinfo-item">
                    <div>
                        <h2>Dodaj więźnia</h2>
                    </div>
                    <form class="prisonerslist" onSubmit={submitHandler}>
                        <div>
                            <input type="text" placeholder="Imię: " value={newPrisoner.name}
                        onChange={ e => setNewPrisoner({...newPrisoner, name: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Nazwisko: " value={newPrisoner.surname}
                        onChange={ e => setNewPrisoner({...newPrisoner, surname: e.target.value})}></input> 
                        </div>
                        <div>
                            <input type="number" placeholder="Wiek: " value={newPrisoner.age}
                        onChange={ e => setNewPrisoner({...newPrisoner, age: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Powód: " value={newPrisoner.reason}
                        onChange={ e => setNewPrisoner({...newPrisoner, reason: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="number" placeholder="Wyrok: " value={newPrisoner.sentence}
                        onChange={ e => setNewPrisoner({...newPrisoner, sentence: e.target.value})}></input>
                        </div>
                        <div>
                            <label>Czy jest 60?  </label>
                            <input type="checkbox" onChange={ e => setNewPrisoner({...newPrisoner, is60: e.target.checked})}></input>  
                        </div>
                        <div>
                            <button type="submit" class="adding">Dodaj</button>
                        </div>
                        </form>
                </div>
                <div class="prisonerinfo-item">
                    <div>
                        <h2>Usuń więźnia</h2>
                    </div>
                    <form onSubmit={deletePrisoner}>
                        <div>
                            <input type="text" placeholder="Imię: " value={newPrisonerDelete.name}
                        onChange={ e => setNewPrisonerDelete({...newPrisonerDelete, name: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Nazwisko: " value={newPrisonerDelete.surname}
                        onChange={ e => setNewPrisonerDelete({...newPrisonerDelete, surname: e.target.value})}></input> 
                        </div>
                        <div>
                            <button type="submit" class="adding">Usuń</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )

}



export default PrisonerAdding