import React from 'react'
import {Link} from 'react-router-dom'
import service from '../appwrite/configuration'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import bg from '../images/bg.jpg'

function PostCard({$id, title, featuredImage, name, date, likeCount}) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
      if (featuredImage) {
          const fetchImage = async () => {
              try {
                  const url = await service.getFilePreview(featuredImage);
                  setImageUrl(url);
              } catch (error) {
                  console.error("Error fetching image URL:", error);
                  setImageUrl("/path/to/default/image.jpg");
              }
          };
          fetchImage();
      }
  },[featuredImage]);
  return (
    <Link to={`/post/${$id}`}>
    <div className='shadow-[5px_5px_0px_0px_white] hover:shadow-[7px_7px_0px_0px_white] bg-white border-[2px] border-black p-3'>
      <div className='w-full justify-center mb-4'>
          <img src={imageUrl}  alt={title}
          className=' h-60 w-full object-cover' />
      </div>
      <h2
      className=' pb-4 sm:text-3xl text-5xl font-bold text-black'
      >{title}</h2>
      <p className='text-teal-700'>BY : <span className='text-teal-600'>{name}</span></p>
      <p> <span className='text-blue-800'>{date}</span></p>
      <div className='flex gap-5'>
      <p className='pt-5 text-blue-800'>Likes : {likeCount}</p>
      <p className='pt-5 text-blue-800'>Comments : {likeCount}</p>
      </div>
    </div>
</Link>
  )
}

export default PostCard