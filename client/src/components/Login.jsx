import axios from "axios"
import '../App.css'

function Login() {
    return(
    <>

        
        <main class="form-container">
        <h1>Login</h1>
            <form action="POST">

                <div class="user">
                    <label for="custom-input">Username</label>
                    <input type="text" class="custom-input" />
                </div>

                <div class="password">
                    <label for="custom-input">Password</label>
                    <input type="text" class="custom-input" />
                </div>

                <button type="submit">Log In</button>
            </form>
            
        </main>
    </>
    )
}


export default Login