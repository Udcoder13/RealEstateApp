import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable }  from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const { user }= useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePercent,  setFilePercent] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(filePercent)
  // console.log(formData)

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask  = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress))
        console.log('Upload is ' + progress + '% done')
      },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData, avatar:downloadURL})
      })
    }
  )
  }

  const handleUpdateChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();
    const id = user._id
    try {
      const res = await fetch(`api/update/updateProfile/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4'onSubmit={handleUpdateSubmit}>
        <input  onChange = {(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} style={{display: "none"}}/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || user.avatar} alt='profile pic' className='
        rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2'/>
        <p className='text-sm text-center'>
          {
            fileUploadError ? <span className='text-red-700'>Image upload error
            [Image must be less than 2mb]</span>
            : filePercent > 0 && filePercent < 100 ?(
              <span className='text-slate-700'>
                {`Uploading ${filePercent}%`}
              </span>
            ): filePercent === 100 ?(
              <span className='text-green-700'>Image uploaded successfuly</span>
            ) : ("")
          }
        </p>
        <input type="text" placeholder={user.username} className='
        border p-3 rounded-lg' id='username'onChange={handleUpdateChange}/>
        <input type="email" placeholder={user.email} className='
        border p-3 rounded-lg' id='email'onChange={handleUpdateChange}/>
        <input type="password" placeholder='password' className='
        border p-3 rounded-lg' id='password'onChange={handleUpdateChange}/>
        <button className='bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer hover:underline'>Delete Account</span>
        <span className='text-red-700 cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </div>
  )
}
