import React from "react";
import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";
import { useContext } from "react";


function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3002/api/auth/register',{name, email, password})
        .then(response=>{
            if(response.data.status){
                navigate("/login");
            }
            console.log(response)
            
        }).catch(err=>{
                    console.log(err)
                })

        console.log("Register details", email)

        
    }

   


return (
    <>
        <div className="LoginWrapper">
            <div>
                <h2 style={{color:"white"}}>Register</h2>
                <form onSubmit={handleSubmit} className="text-center">
                    <label>Enter your name:
                        <input
                            type="text"
                            name="name"
                            className="login-input"
                            value={name || ""}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </label>

                    <label>Enter your email:
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            value={email || ""}
                            onChange={(e)=>setEmail(e.target.value)}

                        />
                    </label>
                    <br />
                    <label>Enter your password:
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            value={password || ""}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit" className="">Register</button>
                    <p>Have an Account?<Link to="/login">Login here</Link></p>
                </form>
            </div>
        </div>
    </>
)
}


export default Register;