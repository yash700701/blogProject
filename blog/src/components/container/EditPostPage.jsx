import React, {useEffect, useState} from 'react'
import Container from './Container'
import PostForm from '../PostForm'
import service from '../../appwrite/configuration'
import { useNavigate, useParams } from 'react-router-dom'

function EditPostPage() {

    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

export default EditPostPage