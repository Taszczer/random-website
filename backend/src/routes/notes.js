const express = require('express');
const Note = require('../models/note');
const router = express.Router();


router.post("/notes/upload", async (req, res) => {
    const { title, descriptionText } = req.body
    try {
        const newNote = new Note({ title, descriptionText })
        await newNote.save()
        res.status(201).send(newNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find({})
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.get("/notes/:id", async (req, res) => {
    try {
        const noteId = await Note.findById(req.params.id)
        res.status(200).json(noteId)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.put("/notes/edit/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findById(req.body.id)

        updatedNote.overwrite({
            title: req.body.title,
            descriptionText: req.body.descriptionText
        }).save()
        res.status(201).send(updatedNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

module.exports = router