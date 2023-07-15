import { Route } from "react-router-dom";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";
import LeftBar from "./LeftBar";
import NoteTemplate from "./NoteTemplate";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
import Navbar from "./Navbar";

export default function MyNotes() {

    const context = useContext(NoteContext)
    const {token} = context;

    const LeftBarSlide = () => {
        let left = document.getElementById('LeftBar')
        left.style.left = 0
        left.style.transition = '1s'
    }

    // const LeftBarHide = () => {
    //     let left = document.getElementById('LeftBar')
    //     left.style.left = '-90%'
    //     left.style.transition = '1s'
    // }

    console.log(token)
    return (
        <div className="Home">
            <Navbar />
            <div id="Menu" onClick={LeftBarSlide}><i className="fa-solid fa-ellipsis-vertical fa-2x"></i></div>
            <LeftBar />
                
                <Route strict path={`/my-notes/view`}>
                    <NoteTemplate />
                </Route>
                <Route exact path="/my-notes/add-note">
                    <AddNote />
                </Route>
                <Route strict path="/my-notes/update-note">
                    <UpdateNote />
                </Route>
                <Route exact path="/my-notes/">
                    <div id="NoSelectedNote">
                        <p id="NoNoteTitle">iNote</p>
                        <p id="NoNoteSubtitle">Save Your Notes Here</p>
                    </div>
                </Route>
        
            {/* {
                !token && 
                <div style={{'fontSize':'400%','width':'100%','textAlign':'center','margin': '10%' }}>
                    Please Login To Access
                </div>
            } */}
        </div>
    )
}