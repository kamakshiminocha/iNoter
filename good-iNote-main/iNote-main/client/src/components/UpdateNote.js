import { useContext, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import NoteContext from "../context/NoteContext";

export default function AddOrUpdateNote() {

    const context = useContext(NoteContext)
    const {viewNote,view,setView,editNote} = context
    const history = useHistory()

    const location = useLocation();
    const noteId = location.pathname.slice(22,location.pathname.length)
    console.log(noteId)

    useEffect(() => {
        viewNote(noteId)
    },[])

    console.log(view)



    const changeHandler = (e) =>
    {
        setView({...view,[e.target.name]:e.target.value})
        console.log('hi')
    }

    const saveNote = async (e) => {
        e.preventDefault()
        await editNote(view._id,view.title,view.content,view.tag)
        history.push(`/my-notes/view/${view._id}`)
    }

    return (
        <>
        { view &&
            <div className="AddOrUpdateNote">
                <form className="AllContent" onSubmit={saveNote}>
                    <input type="text" name="title" id="NewTitle" className="NewNote" value={view.title} onChange={changeHandler} />
                    <input type="text" name="tag" id="NewTag" className="NewNote" value={view.tag} onChange={changeHandler} />
                    <textarea name="content" rows="11" cols="200" id="NewContent" className="NewNote ScrollEffect" value={view.content} onChange={changeHandler} />
                    <input type="submit" value='Save' className="PostButton" />
                </form>
            </div>
        }
        </>
    )
}