import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailiure } from '../Redux/userSlice'
import GoogleAuth from '../Components/GoogleAuth';


export default function Login() {
  const dispatch = useDispatch();
  const [userData, setData] = useState({
    email: '',
    password: '',
  })
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate()

  const handleChange = (event)=>{
    setData({...userData, [event.target.id]: event.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      dispatch(loginStart())
      const res = await fetch('/api/user/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(loginFailiure(data.message))
        return;
      }
      dispatch(loginSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(loginFailiure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold ,y-7'>
        Login</h1>
        <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
          <input type="text" placeholder='email'
          className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="password" placeholder='password'
          className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button  type="submit" className='bg-slate-700 text-white p-3
          rounded-lg uppercase hower:opacity-95
          disabled:opacity-88'>{loading? "Loading...":"Login"}</button>
          <GoogleAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Dont have an account?</p>
          <Link to={"/signup"}>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}
