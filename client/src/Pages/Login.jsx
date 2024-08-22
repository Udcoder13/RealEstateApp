import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

  const [userData, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event)=>{
    setData({...userData, [event.target.id]: event.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/user/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
      })
      const data = await res.json()
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold ,y-7'>
        Sign Up</h1>
        <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
          <input type="text" placeholder='email'
          className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
          <input type="password" placeholder='password'
          className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
          <button  type="submit" className='bg-slate-700 text-white p-3
          rounded-lg uppercase hower:opacity-95
          disabled:opacity-88'>{loading? "Loading...":"Login"}</button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Dont hane an account?</p>
          <Link to={"/signup"}>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}
