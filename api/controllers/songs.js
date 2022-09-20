const Song = require('../models/Song');

async function index (req, res) {
    try {
        const songs = await Song.all;
        res.status(200).json(songs)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function show (req, res) {
    try {
        const song = await Song.findById(req.params.id);
        res.status(200).json(song)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const song = await Song.create(req.body);
        res.status(201).json(song)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroy(req, res) {
    try {
        const song = await Song.findById(req.params.id);
        const resp = await song.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { index, show, create, destroy }
