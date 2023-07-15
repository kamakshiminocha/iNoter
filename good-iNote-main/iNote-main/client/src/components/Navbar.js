import { Link } from "react-router-dom";

export default function Navbar() {

    const token = localStorage.getItem('token')
    let link = '/login';
    if(token)
    {
        link = '/my-notes'
    }

    return (
        <div id="Navbar">
            <div id="Nav">
            <Link id="iNoteNav" className="NavLinks" to="/">iNote</Link>
                <div id="LinkArea">
                    <Link className="NavLinks" to="/">Home</Link>
                    <Link className="NavLinks" to="/about">About</Link>
                    <Link className="NavLinks" to={link}>Notes</Link>
                </div>
            </div>

            {!token &&
                <div className="UserButtons">
                <span><Link to="/login">Login</Link></span>
                <span><Link to="/signup">Sign Up</Link></span>
            </div>}
            {token &&
                <div id="Logout" className="UserButtons">
                <span><Link to="/login">Logout</Link></span>
                </div>
            }
        </div>
    )
}