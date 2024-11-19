import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {

  const authStatus = useSelector((state)=> state.status)
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
    <header> 
      <div>
        <nav>
          <div>
            <Link to='/'>
            logo
            </Link>
          </div>
          <ul>
            {
              navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                    <button onClick={()=> navigate(item.slug)}>
                      {item.name}
                    </button>
                </li>
              ) : null
              )
            }
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header