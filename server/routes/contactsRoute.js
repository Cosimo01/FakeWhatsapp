const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/friendshipsController.js');

router.post('/:UserName', getContacts);

module.exports = router;