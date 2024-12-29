import React, {useEffect, useState} from 'react'
import service from '../appwrite/configuration'
import Container from './container/Container'
import PostCard from './PostCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import bg from '../images/bg.jpg'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const navigate = useNavigate();
    const handleOnclickLogin = ()=>{
        navigate("/login")
    }
    const handleOnclickSignup = ()=>{
        navigate("/signup")
    }
  
    if (useSelector((state)=>state.auth.status) == false) {
        console.log("Login to read posts")
        return (
            
            <div className="w-full h-screen ">
                <Container>
                <div className="flex flex-col w-full h-screen items-center justify-center ">
                    <p className="text-gray-800 text-xl p-2">It Seems You Are Not Logged In</p>
                    <button onClick={handleOnclickLogin} className='text-3xl text-teal-700 border border-white py-1 px-3 rounded-lg'>Login To Continue</button>
                    <p className="text-gray-800 text-xl p-2 mt-5">Don&apos;t Have an Account</p>
                    <button onClick={handleOnclickSignup} className='text-3xl text-teal-700 border border-white py-1 px-3 rounded-lg'>Sign up</button>
                </div>

                </Container>
            </div>
        )
    }
    console.log("you are into allpost page")
    return (
        <>
        <div className="relative flex pt-28 px-5 w-full justify-center">
  <div className="relative">
    <img
      src={bg}
      className="h-96 border-[2px] bg-slate-200 border-black shadow-[5px_5px_0px_0px_white] hover:shadow-[7px_7px_0px_0px_white] object-cover"
      alt=""
    />
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-xl font-bold">
      Welcome to BlogGram
    </h1>
  </div>
</div>

        <div className='mt-20 text-center'>
            <h1 className='text-4xl font-semibold text-white' style={{fontFamily: "montserrat alternates"}}>Most Liked Blogs</h1>
            <div>
                sort on likes
            </div>
        </div>
        </>
        // <div className='w-full mt-10 py-8'>
            
        //     <Container>
        //         <div className='grid sm:grid-cols-2 lg:grid-4'>
        //             {posts.map((post) => (
        //                 <div key={post.$id} className='p-4'>
        //                     <PostCard {...post} />
        //                 </div>
        //             ))}
        //         </div>
        //     </Container>
        // </div>

        
    )
}

export default Home