import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/AuthSlice'
import authService from '../appwrite/auth'
import Input from './Input'
import Bttn from './Bttn'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  console.log("entered into login form");

  const login = async (data)=>{
    console.log(`login func called with data ${data}`);
    
    setError("")
    try {
        const session = await authService.login(data)
      if(session){
        const userData = await authService.getCurrentUser()
        
        if(userData) dispatch(authLogin(userData))
          console.log(`received data by redux on login ${userData}`);
        navigate("/")  
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div
    className='flex items-center text-teal-900  mt-20 justify-center w-full'
    >
        <div className={`mx-5 w-full border border-black max-w-lg  rounded-lg p-10 `}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" />logo */}
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-900 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label = "email"
                placeholder='enter your email'
                type='email'
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                  }
                })} 
                />
                <Input
                label = "password"
                placeholder='enter your password'
                type='password'
                {...register("password", {
                  required: true
                })} 
                />
                <Bttn
                text={"sign in"}
                type="submit"
                className="w-full"
                >
                  Sign in
                </Bttn>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login