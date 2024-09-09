import React from 'react'
import { BiArea } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6'
import { IoBed } from 'react-icons/io5';
import { MdBathtub } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

export default function ListingCard(props) {

    const navigate = useNavigate();
    
  return (
    <div className='max-w-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer' onClick={()=>navigate(`/listing/${props.listingInfo._id}`)}>
        <img src={props.listingInfo.images[0]} alt='listing image' className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105'/>
        <div className="p-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-gray-800">{props.listingInfo.title}</h2>
            <p className="text-gray-600 line-clamp-3">{props.listingInfo.description}</p>
            <div className='flex font-semibold text-gray-800'><FaLocationDot className='text-xl'/><span>{props.listingInfo.address}</span></div>
            <div className="flex justify-between items-center">
                <h2 className="text-gray-900 font-bold text-lg">₹{props.listingInfo.discountPrice ? props.listingInfo.discountPrice : props.listingInfo.price}
                <span>{props.listingInfo.type === 'rent' && '/month'}</span>
                </h2>
            </div>
            <div className='flex flex-row'>
              <div className='flex text-blue-950 font-semibold mr-5'><BiArea /><span className='text-sm px-1'>{props.listingInfo.area}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><IoBed /><span className='text-sm px-1'>{props.listingInfo.bedrooms}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><MdBathtub /><span className='text-sm px-1'>{props.listingInfo.bathrooms}</span></div>
            </div>
    </div>
    </div>
  )
}
