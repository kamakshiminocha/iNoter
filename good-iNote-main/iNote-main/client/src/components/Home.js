import { Link} from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {

    const token = localStorage.getItem('token')

    console.log(token)
    let link = '/login';
    if(token)
    {
        link = '/my-notes'
    }


    return (
        <>
            <div className="Home">
                <Navbar />
                <div id="HomeComponent">
                    <p id="Welcome">Welcome to <b>iNote</b></p>
                    {/* <Link to="/my-notes/add-note" className="HomeButton">Add new Note</Link> */}
                    <Link to={link} className="HomeButton">My Notes</Link>
                </div>
                <div id="SocialLinks">
                    <i className="fa-brands fa-github fa-3x"></i>
                    <i className="fa-brands fa-instagram fa-3x"></i>
                    <i className="fa-brands fa-linkedin fa-3x"></i>
                </div>
            </div>
        </>
    )
}