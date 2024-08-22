const express = require('express');
const { signUp } = require('../Controller/userController.js');
const router = express.Router();

router.post("/signup", signUp)

module.exports = router;