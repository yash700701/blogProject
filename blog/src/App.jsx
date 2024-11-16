import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/AuthSlice'
import Header from './components/Header'
import Fotter from './components/Fotter'
import { Outlet } from 'react-router-dom'



function App() {
 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  
  return loading ? "Loading" : (
    <div className='text-red-700'>
      <Header/>
      <Outlet/>
      <Fotter/>
    </div>
  )

}

export default App
