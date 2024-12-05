import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Container from '../container/Container'

function Header() {

  const authStatus = useSelector((state)=> state.auth.status)
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

  return (
    <header className='py-2 shadow  text-black bg-white opa'>
      <Container>
        <nav className='flex'>
          <div className='text-2xl  text-amber-800 font-bold px-2'>BlogApp</div>
          <div className='mr-4'>
            {/* <Link to='/'>
              <Logo width='70px'   />

              </Link> */}
          </div>
          <ul className='flex text-sm sm:text-lg pr-2 ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-3 py-2 duration-200 hover:bg-blue-100 rounded-full'
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
        </nav>
        </Container>
    </header>
  )
}

export default Header