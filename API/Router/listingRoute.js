const express = require("express")
const validateUser = require("../Utils/validateUser");
const createListing = require("../Controller/listingController");
const router = express.Router()

router.post("/createListing", validateUser, createListing)

module.exports = router;