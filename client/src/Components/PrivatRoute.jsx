import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivatRoute() {
    const { user } = useSelector(state=>state.user)
  return (
    user? <Outlet/> : <Navigate to="/login" />
  )
}
