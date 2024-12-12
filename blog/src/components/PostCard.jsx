import React from 'react'
import {Link} from 'react-router-dom'
import service from '../appwrite/configuration'
import { useSelector } from 'react-redux'

function PostCard({$id, title, featuredImage, name, date}) {
  
  return (
    <Link to={`/post/${$id}`}>
    <div className='  bg-white hover:bg-blue-100 border-[1px] border-black rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' />

        </div>
        <p className='text-blue-500'>posted by : <p className='text-blue-700'>{name}</p> on <p className='text-blue-700'>{date}</p></p>
        <h2
        className='text-base pt-5 sm:text-xl font-bold text-teal-900'
        >Title:  {title}</h2>
    </div>
</Link>
  )
}

export default PostCard