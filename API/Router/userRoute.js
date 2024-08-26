const express = require('express');
const { signUp, login, googleLogin } = require('../Controller/userController.js');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/google", googleLogin)

module.exports = router;