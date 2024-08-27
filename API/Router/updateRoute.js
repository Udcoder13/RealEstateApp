const express = require('express')
const router = express.Router()
const validateUser = require("../Utils/validateUser")
const { updateUser } = require("../Controller/updateController")

router.post("/updateProfile/:id", validateUser, updateUser )

module.exports = router;
