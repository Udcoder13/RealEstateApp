import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listingToUpdate, userListings } from '../Redux/userSlice'
import OptionsButton from '../Components/OptionsButton'
import { useNavigate } from 'react-router-dom'

export default function UserListings() {

    const { user, listings } = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const [userListing, setUserListings] = useState(listings)
    const navigate = useNavigate()
    
    console.log("listings",listings)
    console.log("userListing",userListing)
    useEffect(()=>{
        async function getListings(){
            const response = await fetch(`/api/listing/displayListings/${user._id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("response",response)
            const data = await response.json()
            console.log("data",data)
            dispatch(userListings(data))
        }
        getListings();
    },[])
    
    console.log("useSelect listings: ",listings)

    const deletelisting = async(index,id)=>{
        const res = await fetch(`/api/listing/deleteListing/${user._id}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if(data.success === false){
            console.log(data.message)
        }
        setUserListings(userListing.filter((_,i)=>
        i!==index))
    }

    const updateListingClick = (l)=>{
        dispatch(listingToUpdate(l))
        navigate("/updateListings")
    }

  return (
    // <></>
    <div>
        <h1 className='my-5 font-bold text-2xl text-center'>My Listings</h1>
        {userListing.length < 1? <h1 className='text-3xl text-center font-bold'>You don't have any listings</h1> :userListing.map((listing,index)=>(
            <div className='flex p-4 border gap-5'>
                <img src={listing.images[0]} alt='cover image' className='w-80 h-80 object-cover rounded-lg'></img>
                <div className='mx-5' >
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-lg font-bold'>{listing.title}</h2>
                        <p>{listing.description}</p>
                        <p>{listing.address}</p>
                        <p>{listing.area}</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 mt-3'>
                        <div>
                            <p className='font-bold'>{listing.furnished ? "Fully furnished" : "Not furnished"}</p>
                            <p className='font-bold'>{listing.parking ? "Parking available" : "Parking not awailable"}</p>
                        </div>
                        <div>
                            <p><span className='font-bold'>Bedrooms:</span> {listing.bedrooms}</p>
                            <p><span className='font-bold'>Bathrooms:</span> {listing.bathrooms}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-4 my-3'>
                        <p><span className='font-bold'>Regular price:</span> ₹{listing.price}</p>
                        {listing.discountPrice ? 
                        <p><span className='font-bold'>Discount price:</span> ₹{listing.discountPrice}</p> : ""}
                    </div>
                </div>
                <div><OptionsButton deleteFunction = {()=>deletelisting(index,listing._id)} updateFunction = {()=>updateListingClick(listing)}/></div>
    
            </div>
        ))}
    </div>
  )
}
