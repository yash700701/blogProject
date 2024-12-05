import React from 'react'
import Container from './container/Container'
import PostForm from './PostForm'

function AddPostPage() {
  return (
    <div className='py-8'>
    <Container>
        <PostForm />
    </Container>
    </div>
  )
}

export default AddPostPage