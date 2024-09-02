const listingModel = require('../Models/listing')
const errorHandler = require('../Utils/errorHandler')


const createListing = async(req,res,next)=>{
    try {
        const listing = await listingModel.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

const displayListings = async(req,res,next)=>{
    if(req.user.id === req.params.id){
        try {
            const id = req.params.id;
            const listings = await  listingModel.find({userId: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }else{
        errorHandler(401, "You can get only your listings")
    }
}

module.exports = { createListing, displayListings };