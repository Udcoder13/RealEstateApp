const express = require("express")
const validateUser = require("../Utils/validateUser");
const { createListing, displayListings }= require("../Controller/listingController");
const router = express.Router()

router.post("/createListing", validateUser, createListing)
router.get("/displayListings/:id", validateUser, displayListings)

module.exports = router;