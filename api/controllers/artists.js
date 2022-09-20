const Artist = require('../models/Artist');

async function index(req, res) {
    try {
        const artists = await Artist.all;
        res.status(200).json(artists);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function show(req, res) {
    try {
        const artist = await Artist.findById(req.params.id);
        const songs = await artist.songs;
        res.status(200).json({ ...artist, songs });
    } catch (err) {
        res.status(404).send(err);
    };
}

async function create (req, res) {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist)
    } catch (err) {
        res.status(422).json({err})
    }
}
module.exports = { index, create, show }
