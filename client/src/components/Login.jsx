import axios from "axios"
import '../App.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export let isLogged = false;

export function Login() {
    const navigate = useNavigate();


    if(isLogged == true){
        navigate("/prisoner-adding")
    }

    async function LoginTo(e){
        e.preventDefault()
        const login = document.querySelector("#login-input")
        const pass = document.querySelector("#pass-input")
        console.log(login.value, pass.value)
        if(login.value == "admin" && pass.value == "pass"){
isLogged = true
navigate("/prisoner-adding")
        }
    }

    return (
        <>

            <div class="title-container">
                <h1>Login</h1>
            </div>

            <div class="form-container">
                <form action="POST" onSubmit={LoginTo}>
                    <div class="user">
                        <label for="custom-input">Username</label>
                        <input type="text" class="custom-input" id="login-input" />
                    </div>

                    <div class="password">
                        <label for="custom-input">Password</label>
                        <input type="text" class="custom-input" id="pass-input"/>
                    </div>

                    <button type="submit" class="loger">Log In</button>
                </form>
            </div>
        
        </>
    )
}
