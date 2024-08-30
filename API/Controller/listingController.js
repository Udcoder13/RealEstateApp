const listingModel = require('../Models/listing')


const createListing = async(req,res,next)=>{
    try {
        const listing = await listingModel.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

module.exports = createListing;