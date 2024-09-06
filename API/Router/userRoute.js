const express = require('express');
const { signUp, login, googleLogin, getLandlord } = require('../Controller/userController.js');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/google", googleLogin)
router.get("/getLandlord/:userId",getLandlord)

module.exports = router;