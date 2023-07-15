import { useContext, useEffect } from "react";
import {useLocation} from "react-router-dom";
import NoteContext from "../context/NoteContext";

export default function NoteTemplate(){

    const context = useContext(NoteContext)
    const {viewNote,view} = context

    const location = useLocation();
    const noteId = location.pathname.slice(15,location.pathname.length)

    useEffect(() => {
        viewNote(noteId)
    },[])

    return (
        <>
        {view && 
        <div id="NoteTemplate" className="ScrollEffect">
            <div className="AllContent">
                <p className="NoteTitle">{view.title}</p>
                <div className="NoteDetail">
                    
                </div>
                <div className="Tags">
                    {
                        view.tag.map((t) => {
                            return (
                                <span key={t}>#{t}</span>
                            )
                        })
                    }
                </div>
                <p className="NoteContent">
                {view.content}
                </p>
            </div>
        </div>
        }
        </>
    )
}