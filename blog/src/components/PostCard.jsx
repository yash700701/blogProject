import React from 'react'
import {Link} from 'react-router-dom'
import service from '../appwrite/configuration'
import { useSelector } from 'react-redux'
import paper from '../images/paper.jpg'

function PostCard({$id, title, featuredImage, name, date, likeCount}) {
  
  return (
    <Link to={`/post/${$id}`}>
    <div className='  bg-white hover:bg-blue-100 border-[1px] border-black rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            {/* <img src={service.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' /> */}

        </div>
        <p className='text-blue-500'>posted by : <p className='text-blue-800'>{name}</p> on <p className='text-blue-800'>{date}</p></p>
        <h2
        className='text-base pt-5 sm:text-3xl font-bold text-teal-900'
        >Title:  {title}</h2>
        <p className='pt-5 text-blue-800'>likes : {likeCount}</p>
    </div>
</Link>
  )
}

export default PostCard