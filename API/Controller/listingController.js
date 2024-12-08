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
            console.log(listingId);
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

const getListings = async(req,res,next)=>{
    try {
        
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        // let area = req.query.area;

        // if(area === undefined || offer === 'false'){
        //     offer = { $in: [false, true] };
        // }

        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === 'false'){
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false'){
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if(type === undefined || type === 'all'){
            type = { $in: ["sell", "rent"] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await listingModel.find({
            title: { $regex: searchTerm, $options: 'i' },
            // offer,
            furnished,
            parking,
            type,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex)

        return res.status(200).json(listings)

    } catch (error) {
        next(error);
    }
}

module.exports = { createListing, displayListings, deleteListing, updateListing, getListing, getListings };