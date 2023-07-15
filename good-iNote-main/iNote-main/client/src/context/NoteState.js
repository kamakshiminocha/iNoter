import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = "http://localhost:9669"
    const token = localStorage.getItem('token')
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)
    const [view,setView] = useState(null)

    const getAllNotes = async () => {
        //API Call
        const response = await fetch(`${host}/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        })

        const note = await response.json()
        setNotes(note)
    }

    const createnote = async (title,content,tags) => {

        const tag = tags.split(',')

        const response = await fetch(`${host}/notes/createnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({title,content,tag})
        })

        //Get the uploaded note
        const note = await response.json();

        //Add it to to the fetched notes
        setNotes(notes.concat(note))
    }

    const editNote = async (id,title,content,tags) => {

        let tag;

        try {
            tag = tags.split(',')
        } catch (error) {
            tag = tags
        }

        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({title,content,tag})
        })

        console.log(response.json())

        const allNotes = JSON.parse(JSON.stringify(notes))

        for(let i=0;i<allNotes.length;i++)
        {
            if(allNotes[i]._id === id) 
            {
                allNotes[i].title = title
                allNotes[i].content = content
                allNotes[i].tag = tag
                break
            }
        }

        // const json = await response.json()
        // console.log(json)

        setNotes(allNotes)
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        })

        const allNotes = notes.filter((note) => {return note._id !== id})

        const json = await response.json()
        console.log(json)

        setNotes(allNotes)
    }

    const viewNote = async (id) => {
        const response = await fetch(`${host}/notes/viewnote/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        })

        const note = await response.json()

        setView(note)
        console.log(view)
    }

    return (
        <NoteContext.Provider value={{notes,setNotes,view,setView,getAllNotes,createnote,editNote,deleteNote,viewNote,host}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState