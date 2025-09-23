import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import { toast, ToastContainer } from 'react-toastify';
export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSignup = async (data) => {
        setError('');
        try {
            setLoading(true)
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                setLoading(false)
                navigate('/')
            }
            if (!session) {
                throw "Not a number"
            }
        } catch (error) {
            toast.error('Something went wrong ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setError(error)
            setLoading(false)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='flex items-center flex-col formbg py-8 md:px-14 px-8'>
                <img src="https://th.bing.com/th/id/R.a0099a4b1217bb327b8bdda1fa8218e4?rik=0ZGk0VFbazCOuA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_24762.png&ehk=XBUZdc9M55C3M%2fhOI1Zvn9goc2SgWTMrUjph14iv0LI%3d&risl=&pid=ImgRaw&r=0" alt="logo" className='w-8 hover:bg-emerald-400 cursor-pointer rounded-[50%] transition-all' />
                <h2 className='text-lg font-bold'>Sign Up to your account</h2>
                <h3>Already have Account ? <span className='underline cursor-pointer hover:text-purple-400 font-semibold' onClick={() => navigate('/login')}>Login</span></h3>
                <form onSubmit={handleSubmit(handleSignup)} className='mt-8'>
                    <div className='space-y-5 flex flex-col'>
                        <div className='flex flex-col justify-center items-start'>
                            <Input
                                label="Name: "
                                placeholder="Enter your name"
                                type="text"
                                className='w-full'
                                {...register("name", {
                                    required: { value: true, message: "Please enter an name" },
                                    pattern: /^[A-Za-z ]+$/i
                                })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors.name?.type === "required" && (
                                <p role="alert" className='text-sm text-red-500  font-semibold'>Name is required</p>
                            )}
                            {errors?.name?.type === "pattern" && (
                                <p className='text-sm text-red-500  font-semibold'>Alphabetical characters only</p>
                            )}
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                className='w-full'
                                {...register("email", {
                                    required: { value: true, message: "Please enter an email" },
                                    validate: {
                                        matchPatern: (value) => /^\w/.test(value) || "Email address must a valid address"
                                    }
                                })}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === "required" && (
                                <p role="alert" className='text-sm text-red-500  font-semibold'>Email is required</p>
                            )}
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <Input
                                label="Password: "
                                placeholder="Enter your password"
                                type="password"
                                className='w-full'
                                {...register("password", {
                                    required: { value: true, message: "Please enter an password" },
                                    minLength: 8,
                                })}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password?.type === "required" && (
                                <p role="alert" className='text-sm text-red-500  font-semibold'>Password is required</p>
                            )}
                            {errors?.password?.type === "minLength" && (
                                <p className='text-sm text-red-500  font-semibold'>Minimum Length be must 8</p>
                            )}
                        </div>
                        <button type='submit' className='bg-green-400 py-2 px-4 rounded-md w-full'>{loading ? 'Signing...' : 'Sign Up'}</button>
                    </div>

                </form>
            </div>
        </>
    )
}
