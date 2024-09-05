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

const deleteListing = async(req,res,next)=>{
    if(req.user.id === req.params.userid){
        try {
            const listingId = req.params.listingid;
            await listingModel.findByIdAndDelete(listingId)
            res.status(200).json({message: "listing deleted"})
        } catch (error) {
            next(error)
        }
    }else{
        errorHandler(401, "You can delete only your listings")
    }
}

const updateListing = async(req,res,next)=>{
    // console.log("update listing called")
    if(req.user.id === req.params.userid){
        try {
            const updatedListing = await listingModel.findByIdAndUpdate(req.params.listingid,{
                $set:req.body
            },{new: true})
            res.status(200).json(updatedListing)
        } catch (error) {
            next(error)
        }
    }else{
        errorHandler(401, "You can update only your listings")
    }
}

const getListing = async(req,res,next)=>{
    try {
        const listing = await listingModel.findById(req.params.listingid)
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

module.exports = { createListing, displayListings, deleteListing, updateListing, getListing };