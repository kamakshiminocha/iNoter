import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import NotePreview from "./NotePreview";
import Search from "./Search";

export default function LeftBar() {

    const context = useContext(NoteContext);
    const {notes,getAllNotes} = context;

    useEffect(() => {
        getAllNotes()
    },[])

    const HideLeftBar = () => {
        let left = document.getElementById('LeftBar')
        left.style.left = '-90%'
        left.style.transition = '1s'
    }

    return (
        <div id="LeftBar">
            <div id="Hide" onClick={HideLeftBar}><i className="fa-solid fa-xmark fa-2x"></i></div>
            <Search />
            <div id="NotePreviewArea" className="ScrollEffect">
                {
                    notes && notes.map((note) => {
                        return (
                            <NotePreview key={note._id} note={note} />
                        )
                    })
                }
            </div>
            <div className="Icon">
                <Link to="/my-notes/add-note">
                    <i id="AddIcon" className="fa-solid fa-plus fa-3x"></i>
                </Link>
            </div>
        </div>
    )
}