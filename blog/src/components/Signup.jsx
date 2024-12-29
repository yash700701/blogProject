import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/AuthSlice'
import authService from '../appwrite/auth'
import Input from './Input'
import Bttn from './Bttn'


function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    console.log("entered into signup component");

    const create = async (data)=>{
        console.log("Create function called with data:", data);
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    console.log("account created successfully : forward to home page");
                    console.log(`received data by redux on signup ${userData}`);

                    navigate("/")
            }
        } catch (error) {
            console.error("Error in creating account:", error);
            setError(error.message || "An error occurred while creating the account.");
        }
    }

  return (
    <div className="flex items-center text-teal-900 my-10 mx-5 justify-center">
    <div className={`mx-auto w-full max-w-lg rounded-lg p-10 border border-white mt-20`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                {/* <Logo width="100%" />logo */}
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-white">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary text-teal-700 transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <Bttn text="Create Account" type="submit" className="w-full">
                
                </Bttn>
            </div>
        </form>
    </div>

</div>
  )
}

export default Signup