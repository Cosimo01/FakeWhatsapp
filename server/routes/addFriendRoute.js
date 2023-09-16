const express = require('express');
const router = express.Router();
const {addFriend} = require('../controllers/friendsController');

router.get("/:UserName", addFriend);

module.exports = router;