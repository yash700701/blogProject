import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/AuthSlice'
import { Navigate, useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = ()=>{
      authService.logout().then(()=>{
          dispatch(logout())
          navigate("/")
      })
  }

  return (
    <button
    className='inline-bock px-2 py-1 hover:text-emerald-500 font-semibold'
    style={{fontFamily: "montserrat alternates"}}
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn