const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messagesController.js');

router.post('/:UserName', getMessages);
router.post('/:UserName/send', sendMessage);


module.exports = router;