import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async()=>{
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
        console.log(result)
        const res = await fetch('/api/user/google',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
        })
        const data = await res.json()
        dispatch(loginSuccess(data))
        navigate("/")
    } catch (error) {
        console.log('Could not sign in with google', error)
    }
  }

  return (
    <button 
  onClick={handleGoogleClick} 
  type="button"
  className="bg-white p-3 rounded-lg uppercase flex items-center justify-center 
  hover:bg-gray-100 transition duration-300 ease-in-out space-x-2">
  <FcGoogle className="text-xl" />
  <span>Continue with Google</span>
</button>

  )
}
