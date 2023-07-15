import { useContext } from "react"
import { Link } from "react-router-dom"
import NoteContext from "../context/NoteContext"

export default function NotePreview(props){
    
    const context = useContext(NoteContext)

    const {deleteNote} = context

    const {note} = props

    return (
        <div className="NotePreview">
            <Link to={`/my-notes/view/${note._id}`} ><p className="PreviewHeading">{note.title}</p>
            </Link>
            <p className="PreviewContent">
                {note.content.slice(0,105)}...
            </p>
            <span className="MoreIcon">
                <Link to={`/my-notes/update-note/${note._id}`}><i id="EditButton" className="fa-solid fa-pen-to-square fa-1x" ></i> </Link>
                <i id="DeleteButton" className="fa-solid fa-trash fa-1x" onClick={()=>{deleteNote(note._id)
                alert('Note Deleted')
                }}></i>
            </span>
        </div>
    )
}