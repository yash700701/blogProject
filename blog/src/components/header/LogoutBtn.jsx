import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/AuthSlice'

function LogoutBtn() {

  const dispatch = useDispatch()

  const logoutHandler = ()=>{
      authService.logout().then(()=>{
          dispatch(logout())
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