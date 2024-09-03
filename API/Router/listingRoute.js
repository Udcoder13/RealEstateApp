const express = require("express")
const validateUser = require("../Utils/validateUser");
const { createListing, displayListings, deleteListing }= require("../Controller/listingController");
const router = express.Router()

router.post("/createListing", validateUser, createListing)
router.get("/displayListings/:id", validateUser, displayListings)
router.delete("/deleteListing/:userid/:listingid",validateUser,deleteListing)

module.exports = router;