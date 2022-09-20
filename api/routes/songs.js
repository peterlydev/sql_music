const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs')

router.get('/', songsController.index)
router.get('/:id', songsController.show)
router.post('/', songsController.create)
router.delete('/:id', songsController.destroy)

module.exports = router;
