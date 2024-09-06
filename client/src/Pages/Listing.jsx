import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaLocationDot } from "react-icons/fa6";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { MdBathtub } from "react-icons/md";
import { FaSquareParking } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useSelector } from 'react-redux'
import { FaPaperPlane } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


export default function Listing() {

  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null)
  const [error, setError] = useState(false);
  const [contactBtnToggle, setContactBtnToggle] = useState(false)
  const { user } = useSelector((state) => state.user)
  const [landlord,setLandlord] = useState({})
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

    useEffect(()=>{
      try {
        async function fetchListing(){
          const response = await fetch(`/api/listing/getListing/${params.listingId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          const data = await response.json();
          console.log(data);
          if(data.success === false){
            setError(data.message)
            return;
          }
          setListing(data);
          setError(false)
        }
          fetchListing();
      }catch (error) {
        setError(error)
      }
      
    },[params.listingId])

    const handleContactBtnClick = async()=>{
      if(user === null){
        navigate("/login")
      }
      try {
        const userInfo = await fetch(`/api/user/getLandlord/${listing.userId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await userInfo.json();
        if(data.success === false){
          setError(data.message)
          return;
        }
        setLandlord(data);
        setContactBtnToggle(!contactBtnToggle);
      } catch (error) {
        setError(error)
      }
    }

    const handleMessage = (e)=>{
      setMessage(e.target.value);
    }

  return (
    <main>
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !error && 
        <div>
          <Swiper navigation >
            {listing.images.map((image, index) => (
              <SwiperSlide key={image}>
                <div className='h-[500px]' style={{background:`url(${image}) 
                center no-repeat`, backgroundSize: 'cover' ,}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='mx-32 mt-5 flex flex-col gap-3 mb-5'>
            <h1 className='text-2xl font-bold'>{listing.title}</h1>
            <h1 className='text-2xl font-bold'>₹{listing.discountPrice ? listing.discountPrice : listing.price}<span>{listing.type === 'rent' && '/month'}</span></h1>
            <div className='flex font-semibold'><FaLocationDot className='text-xl'/><span>{listing.address}</span></div>
            <div className='flex flex-row'>
              <span className='bg-green-700 rounded-lg uppercase text-white py-2 px-8 font-bold'>{listing.type === 'sell'? 'For Sale' : 'For Rent'}</span>
              <div className='flex mx-10 bg-green-700 rounded-lg uppercase text-white py-2 px-8 font-bold'><RiDiscountPercentLine className='text-xl'/><span className='mx-1'>₹{listing.price - listing.discountPrice} Off</span></div>
            </div>
            <div className='flex flex-row'>
              <div className='flex text-blue-950 font-semibold mr-5'><BiArea /><span className='text-sm px-1'>{listing.area}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><IoBed /><span className='text-sm px-1'>{listing.bedrooms}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><MdBathtub /><span className='text-sm px-1'>{listing.bathrooms}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><FaSquareParking /><span className='text-sm px-1'>{listing.parking ? 'Parking' : 'No Parking'}</span></div>
              <div className='flex text-blue-950 font-semibold mr-5'><MdChair /><span className='text-sm px-1'>{listing.furnished ? "Furnished" : "Not Furnished"}</span></div>
            </div>
            <p className='text-lg font-semibold'>{listing.description}</p>
            {!contactBtnToggle ? 
            <button className='bg-red-900 text-white p-3 rounded-lg uppercase flex items-center justify-center hover:opacity-85 font-semibold'
            onClick={handleContactBtnClick}>
            <IoMdMail className='text-xl'/>
            <span className='px-1'>Contact Landlord</span></button>:
            <div className='relative'>
              <div className='flex flex-col gap-3'>
                <p>Contact <b>{landlord.username}</b> for <b>{listing.title}</b></p>
                <div>
                  <textarea placeholder='Write your mail here...' className='p-3 w-full' onChange={handleMessage}/>
                  <button className='absolute top-0 right-0 mt-1 mr-1 text-red-900 hover:opacity-85' onClick={()=>setContactBtnToggle(!contactBtnToggle)}>
                    <MdCancel size={24} />
                  </button>
                </div>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.title}&body=${message}`} className='bg-red-900 text-white p-3 rounded-lg uppercase flex items-center justify-center hover:opacity-85 font-semibold'>
                <FaPaperPlane className='text-xl'/>
                <span className='px-1'>Send Mail</span></Link>
              </div>
            </div>
            }
                              
          </div>
        </div>       
      }
    </main>
  )
}
