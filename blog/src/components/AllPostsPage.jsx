import React from 'react'
import Container from './container/Container'
import PostCard from './PostCard'
import service from '../appwrite/configuration'
import { useEffect } from 'react'
import { useState } from 'react'

function AllPostsPage() {


    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
    </div>
  )
}

export default AllPostsPage