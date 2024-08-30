const mongoose = require("mongoose")

const listing = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{timestamps:true})

const listingModel = mongoose.model("Listings", listing);
module.exports = listingModel;