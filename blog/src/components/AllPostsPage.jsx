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
    <div className='w-full my-10 px-5'>
    <Container>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4'>
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

export default AllPostsPage