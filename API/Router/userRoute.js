const express = require('express');
const { test } = require('../Controller/userController.js');
const router = express.Router();

router.get("/test", test)

module.exports = router;