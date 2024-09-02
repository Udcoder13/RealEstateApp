import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";

export default function CreateListing() {

    const [images, setImages] = useState([])
    const [listingData, setListingData] = useState({
        imageURLs: [],
    })
    const { user }= useSelector((state)=> state.user)
    const [type, setType] = useState(undefined)
    const [parking, setParking] = useState(false)
    const [furnished, setFurnished] = useState(false)
    const [offer, setOffer] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate()

    const handleListingInput = (e)=>{
        setListingData({...listingData, [e.target.id]: e.target.value})
    }
    // console.log(listingData)
    // console.log("type: ", type)
    // console.log("parking: ", parking)
    // console.log("furnished: ", furnished)

    const handleImagesubmit = (e)=>{
        const promises = [];
        // console.log(uploading, imageUploadError)
        if(images.length > 0 && images.length + listingData.imageURLs.length < 7){
            setUploading(true);
            setImageUploadError(false);
            // console.log(uploading, imageUploadError)

            for(let i =0; i<images.length; i++){
                // console.log("downloadImg:",storeImage(images[i]))
                promises.push(storeImage(images[i]));
            }
            Promise.all(promises).then((urls)=>{
                setListingData({...listingData, imageURLs: listingData.imageURLs.concat(urls),})
                setImageUploadError(false);
                setUploading(false);
            })
            .catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image)');
                setUploading(false);
              });
        }else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
          }
    }

    const storeImage = async(images) =>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app)
            const fileName = new Date().getTime() + images.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, images);
            uploadTask.on(
                "state_changed",
                null,
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        console.log(downloadURL)
                        resolve(downloadURL)
                    }).catch(reject)
                }
            )
        })
    }
    // console.log("image:", promises)

    const handleListingSubmit = async(e)=>{
        e.preventDefault()
        try {
            if (listingData.imageURLs.length < 1)
                return setError('You must upload at least one image');
            if (+listingData.price < +listingData.discountPrice)
                return setError('Discount price must be lower than regular price');
            setLoading(true);
            setError(false);
            const response = await fetch('/api/listing/createListing', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title:listingData.title,description:listingData.description,address:listingData.address,
                    area:listingData.area, price:listingData.price, discountPrice:listingData.discountPrice,
                    bathrooms:listingData.bathrooms, bedrooms:listingData.bedrooms, furnished:furnished,
                    parking:parking, type:type, images:listingData.imageURLs, userId: user._id
                })
            })
            const data = await response.json()
            setLoading(false)
            if(data.success === false){
                setError(data.message);
            }
            navigate("/")
        } catch (error) {
            setError(error);
        }
    }

    const hanldleDeleteImg = (index)=>{
        setListingData({...listingData, imageURLs: listingData.imageURLs.filter((_,i)=>
            i!== index
        )})
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleListingSubmit}>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Title' className='
                border p-3 rounded-lg' id='title' maxLength='62'
                minLength='10' required onChange={handleListingInput}/>
                <textarea type='text' placeholder='Description' className='
                border p-3 rounded-lg' id='description' required onChange={handleListingInput}/>
                <input type='text' placeholder='Address' className='
                border p-3 rounded-lg' id='address' required onChange={handleListingInput}/>
                <input type='text' placeholder='Area' className='
                border p-3 rounded-lg' id='area' required onChange={handleListingInput}/>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' onChange={()=>setType("sell")}/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' onChange={()=>setType("rent")}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' onChange={()=>setParking(!parking)}/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' onChange={()=>setFurnished(!furnished)}/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' onChange={()=>setOffer(!offer)}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='1' max='10'
                        className='p-3 border border-gray-300 rounded-lg' onChange={handleListingInput}/>
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='1' max='10'
                        className='p-3 border border-gray-300 rounded-lg' onChange={handleListingInput}/>
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='price' 
                        className='p-3 border border-gray-300 rounded-lg' onChange={handleListingInput}/>
                        <div className='flex flex-col items-center'>
                            <p>Price</p>
                            <span className='text-xs'>(₹ / month)</span>
                        </div>
                    </div>
                    {offer && 
                        <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' 
                        className='p-3 border border-gray-300 rounded-lg' onChange={handleListingInput}/>
                        <div className='flex flex-col items-center'>
                            <p>Discounted price</p>
                            <span className='text-xs'>(₹ / month)</span>
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple 
                    onChange={(e) => setImages(e.target.files)}/>
                    <button type='button' disabled = {uploading} onClick={handleImagesubmit} className='p-3 text-green-700 border border-green-700
                    rounded uppercase hover:shadow-lg hover:text-white hover:bg-green-700 disabled:opacity-80'>
                        {uploading ? "Uploading..." : "Upload"}</button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    listingData.imageURLs.length > 0 && 
                    listingData.imageURLs.map((url,index)=>(
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt='listing image'
                            className='w-20 h-20 object-cover rounded-lg'/>
                            <MdDelete className='text-xl hover:opacity-75 cursor-pointer' type='button' onClick={()=>hanldleDeleteImg(index)}/>
                        </div>
                    ))
                }
            <button disabled = {loading} type='submit' className='p-3 bg-slate-700 text-white
            rounded-lg uppercase hover:opacity-80 '>{loading? "Creating" : "Create Listing"}</button>{
                uploaded ? <p className='text-green-700 text-sm'>Listing upoaded successfully</p> : 
                <p className='text-red-700 text-sm'>{error && error}</p>
            }
            
            </div>
        </form>
    </main>
  )
}
