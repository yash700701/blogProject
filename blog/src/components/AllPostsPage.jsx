import React from 'react'
import Container from './container/Container'
import PostCard from './PostCard'
import service from '../appwrite/configuration'
import { useEffect } from 'react'
import { useState } from 'react'

function AllPostsPage() {

    const [posts, setPosts] = useState([])

    service.getPosts([]).then((posts) => {
        console.log(`posts fetch from databse in form of array ${JSON.stringify(posts)}`);
        
        if (posts) {
            setPosts(posts.documents)
        }
    })
    
  return (
    <div className='w-full mb-10 mt-20  px-5'>
    <Container>
        <div className='grid sm:grid-cols-2'>
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