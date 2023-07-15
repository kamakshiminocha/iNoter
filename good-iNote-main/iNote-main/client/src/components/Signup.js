import { useContext,useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import Navbar from "./Navbar";
import Alert from './Alert'

export default function Signup() {

    const context = useContext(NoteContext)
    const { host } = context
    const history = useHistory();

    const [credentials,setCredentials] = useState({name:'',email:'',password:''})

    const signupUser = async (name,email,password) => {
        const response = await fetch(`${host}/users/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})
        })

        const auth = await response.json();
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

    const signup = (e) => {
        e.preventDefault()
        signupUser(credentials.name,credentials.email,credentials.password)
    }

    return (
        <div className="Home">
            <Navbar />
            <Alert message="Email Already Exists" style={{'background-color':'red'}} />
            <form className="UserIn" onSubmit={signup}>
                <p className="InHeading">Sign Up</p>
                <input type="text" id="Name" name="name" className="NewNote InContent" placeholder="Name" value={credentials.name} onChange={changeHandler} />
                <input type="email" id="Email" name="email" className="NewNote InContent" placeholder="Email" value={credentials.email} onChange={changeHandler} />
                <input type="password" id="Password" name="password" className="NewNote InContent" placeholder="Password" value={credentials.password} onChange={changeHandler} />
                <input type="submit" value="Sign Up" className="InButton" />
            </form>
        </div>
    )
}