import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Container from '../container/Container'
import menu from '../../images/menu.png'


function Header() {

  const authStatus = useSelector((state)=> state.auth.status)
  const name = useSelector((state) => state.auth.userData?.name || "Guest");
  localStorage.setItem("Name", name)
  const Name = localStorage.getItem("Name");
  console.log(`name ${name}`);
  
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },

  ]

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = ()=>{
      if(isOpen){
        document.querySelector("#menu").style.display = "none";
        setIsOpen(false)
      }else{
        document.querySelector("#menu").style.display = "flex";
        setIsOpen(true)
      }
  }

  return (
    <header className='py-2 z-10 fixed top-0 w-full bg-black bg-opacity-40 backdrop-blur-lg text-white '>
      <Container>
        <nav className='grid sm:grid-cols-10'>
          <div className='text-4xl col-span-2 font-extrabold pl-4' style={{fontFamily: "agu display"}}>BlogGram</div>
          <ul className='lg:flex col-span-5 hidden text-xs sm:text-lg px-2 py-1 border border-white mr-4 rounded-lg ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-4 hover:text-emerald-500 font-semibold py-1 '
                style={{fontFamily: "montserrat alternates"}}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <div className='flex absolute col-span-3 right-0'>
            
            <div>
              {authStatus && (
                <div className='py-2 text-xs font-semibold text-teal-700 px-2  mr-5 ' style={{fontFamily: "montserrat alternates"}}>
                  <p>{name}<span  className='text-green-400'>  .</span></p>
                </div>
              )}
            </div>
             
            <div onClick={handleToggle} className='flex lg:hidden mr-5'>
              <img src={menu} className='w-8 h-8 my-auto' alt="" />
            </div>
          </div>
         
        </nav>
        <div  className='absolute right-5 bg-white shadow-2xl text-black py-5  rounded-lg top-16'>
          <ul id='menu' className='col-span-5 flex-col text-xs sm:text-lg px-2 py-1 border border-white mr-4 rounded-lg ml-auto' style={{display: "none"}}>
              {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => {handleToggle() ; navigate(item.slug)}}
                  className='inline-bock px-4 hover:text-emerald-500 font-semibold py-1 '
                  style={{fontFamily: "montserrat alternates"}}
                  >{item.name}</button>
                </li>
              ) : null
              )}
              {authStatus && (
                <li className='ml-2 text-red-600'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
        </div>
        </Container>
    </header>
  )
}

export default Header