const express = require('express');
const { signUp, login } = require('../Controller/userController.js');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)

module.exports = router;