const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {return res.status(200).json({"hello": "anirudh"})});

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;