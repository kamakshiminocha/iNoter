const express = require('express')
const Note = require('../models/Note')
const fetchuser = require('../middlewares/fetchuser')

const router = express.Router()

// @desc fetch all post
// @route POST /notes/fetchnotes
// @access Private

router.get('/fetchnotes', fetchuser , async (req,res) => {
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// @desc create a new note
// @route POST /notes/createnote
// @access Private

router.post('/createnote', fetchuser , async (req,res) => {
    try {
        const {title,content,tag} = req.body;
        let note = new Note({
            title,content,tag,user: req.user.id
        })

        const savednote = await note.save()

        res.json(savednote)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// @desc view a note
// @route POST /notes/viewnote
// @access Private

router.get('/viewnote/:id', fetchuser , async (req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        res.json(note)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// @desc create a new note
// @route POST /notes/createnote
// @access Private

router.post('/createnote', fetchuser , async (req,res) => {
    try {
        const {title,content,tag} = req.body;
        let note = new Note({
            title,content,tag,user: req.user.id
        })

        const savednote = await note.save()

        res.json(savednote)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// @desc update a note
// @route PUT /notes/updatenote
// @access Private

router.put('/updatenote/:id', fetchuser , async (req,res) => {
    try {
        const {title,content,tag} = req.body;

        // const newNote = {}

        // if(title)
        // {
        //     newNote.title = title
        // }
        // if(content)
        // {
        //     newNote.title = content
        // }
        // if(tag)
        // {
        //     newNote.title = tag
        // }

        let note = await Note.findById(req.params.id)

        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {title:title,content:content,tag:tag} , {new:true})

        res.json(note)

    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// @desc delete a note
// @route DELETE /notes/deletenote
// @access Private

router.delete('/deletenote/:id', fetchuser ,async (req,res)=> {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)

        res.status(200).json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router