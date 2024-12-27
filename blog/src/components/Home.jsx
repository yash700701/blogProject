import React, {useEffect, useState} from 'react'
import service from '../appwrite/configuration'
import Container from './container/Container'
import PostCard from './PostCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const navigate = useNavigate();
    const handleOnclick = ()=>{
        navigate("/login")
    }
  
    if (useSelector((state)=>state.auth.status) == false) {
        console.log("Login to read posts")
        return (
            
            <div className="w-full h-screen ">
                <Container>
                <div className="flex flex-col w-full h-screen items-center justify-center ">
                    <p className="text-gray-800 text-xl p-2">It Seems You Are Not Logged In</p>
                    <button onClick={handleOnclick} className='text-3xl text-teal-700 border border-black py-1 px-3 rounded-lg'>Login To Continue</button>
                </div>

                </Container>
            </div>
        )
    }
    console.log("you are into allpost page")
    return (
        <div className='w-full mt-10 py-8'>
            
            <Container>
                <div className='grid sm:grid-cols-2 lg:grid-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home