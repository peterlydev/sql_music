const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const songsRoutes = require('./routes/songs')
const artistsRoutes = require('./routes/artists')
server.use('/songs', songsRoutes)
server.use('/artists', artistsRoutes)

server.get('/', (req, res) => res.send('Welcome to the music hub'))

module.exports = server
