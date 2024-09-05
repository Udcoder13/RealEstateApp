const express = require("express")
const validateUser = require("../Utils/validateUser");
const { createListing, displayListings, deleteListing, updateListing, getListing }= require("../Controller/listingController");
const router = express.Router()

router.post("/createListing", validateUser, createListing)
router.get("/displayListings/:id", validateUser, displayListings)
router.delete("/deleteListing/:userid/:listingid",validateUser,deleteListing)
router.post("/updateListing/:userid/:listingid",validateUser,updateListing)
router.get("/getListing/:listingid",getListing)

module.exports = router;