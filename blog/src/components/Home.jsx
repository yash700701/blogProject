import React, {useEffect, useState} from 'react'
import service from '../appwrite/configuration'
import Container from './container/Container'
import PostCard from './PostCard'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (useSelector((state)=>state.auth.status) == false) {
        console.log("Login to read posts")
        return (
            
            <div className="w-full  py-8 mt-10 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-sm font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
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