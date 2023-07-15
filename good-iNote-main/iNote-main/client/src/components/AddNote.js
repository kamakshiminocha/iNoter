import { useContext, useState } from "react"
import { useHistory } from 'react-router-dom'
import NoteContext from "../context/NoteContext"

export default function AddOrUpdateNote() {

    const context = useContext(NoteContext)

    const{createnote} = context;
    const history = useHistory()

    const [note,setNNote] = useState({title:'',content:'',tags:''})

    const changeHandler = (e) => {
        setNNote({...note,[e.target.name]: e.target.value})
    }

    const addNote = async (e) => {
        e.preventDefault()
        await createnote(note.title,note.content,note.tags)
        history.push(`/my-notes/`)
    }

    return (
        <div className="AddOrUpdateNote">
            <form className="AllContent" onSubmit={addNote}>
                <input type="text" name="title" value={note.title} onChange={changeHandler} id="NewTitle" className="NewNote" placeholder="Title" required />
                <input type="text" name="tags" value={note.tags} onChange={changeHandler} id="NewTag" className="NewNote" placeholder="Tag"/>
                <textarea name="content" rows="11" cols="200" value={note.content} onChange={changeHandler} id="NewContent" className="NewNote ScrollEffect" placeholder="Content" />
                <input type="submit" value='Add' className="PostButton" />
            </form>
        </div>
    )
}