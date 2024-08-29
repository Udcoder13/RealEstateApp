const express = require('express')
const router = express.Router()
const validateUser = require("../Utils/validateUser")
const { updateUser, deleteUser } = require("../Controller/updateController")

router.post("/updateProfile/:id", validateUser, updateUser )
router.delete("/deleteProfile/:id", validateUser, deleteUser)

module.exports = router;
