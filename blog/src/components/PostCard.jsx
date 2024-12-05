import React from 'react'
import {Link} from 'react-router-dom'
import service from '../appwrite/configuration'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className=' h-20 bg-slate-200 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            {/* <img src={service.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' /> */}

        </div>
        <h2
        className='text-xl font-bold text-teal-900'
        >{title}</h2>
    </div>
</Link>
  )
}

export default PostCard