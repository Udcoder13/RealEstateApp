import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'


export default function Listing() {

  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null)
  const [error, setError] = useState(false);

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

  return (
    <main>
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !error && 
        <div>
          <Swiper navigation >
            {listing.images.map((image, index) => (
              <SwiperSlide key={image}>
                <div className='h-[550px]' style={{background:`url(${image}) 
                center no-repeat`, backgroundSize: 'cover' ,}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </main>
  )
}
