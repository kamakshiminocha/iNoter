import { useContext, useState } from "react"
import NoteContext from "../context/NoteContext"
import { useHistory } from 'react-router-dom'
import Navbar from "./Navbar"
import Alert from './Alert'

export default function Login() {

    const context = useContext(NoteContext)
    const history = useHistory()

    localStorage.removeItem('token')

    const [credentials,setCredentials] = useState({email:'',password:''})

    const {host} = context

    const loginUser = async (email,password) => {

        const response = await fetch(`${host}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password})
        })

        const auth = await response.json()
        if(auth.success)
        {
            await localStorage.setItem('token',auth.authtoken)
            history.push('/my-notes')
        }
        else{
            let alert = document.getElementById('Alert')
            alert.style.display = 'block'
            setTimeout(()=>{alert.style.display = 'none'},2000)
        }
    }

    const changeHandler = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const login = (e) => {
        e.preventDefault()
        loginUser(credentials.email,credentials.password)
    }

    return (
        <div className="Home" onSubmit={login}>
            <Navbar />
            <Alert message="Invalid Credentials" style={{'background-color':'red'}} />
            <form className="UserIn">
                <p className="InHeading">Login</p>
                <input type="email" id="Email" name="email" className="NewNote InContent" placeholder="Email" value={credentials.email} onChange={changeHandler} />
                <input type="password" id="Password" name="password" className="NewNote InContent" placeholder="Password" value={credentials.password} onChange={changeHandler} />
                <input type="submit" value="Login" className="InButton" />
            </form>
        </div>
    )
}