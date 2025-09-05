import React, { useRef, useState } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
    const [isSignIn, setIsSignIn] = useState(true);
    const dispatch = useDispatch()
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const nameRef = useRef(null);

    const toggleSingUpIn = () => {
        setIsSignIn(!isSignIn)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: nameRef.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        const { uuid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uuid: uuid, email: email, displayName: displayName }))
                    }).catch((error) => {
                        toast.error(error, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                });
        } else {
            signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    toast.error('Invalid login credentials', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });
        }
    }
    return (
        <div>
            <ToastContainer />
            <Header />
            <img className='min-h-screen brightness-50 mix-blend-overlay' src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='bgImage' />
            <form className='absolute w-3/12 p-12  mx-auto right-0 left-0 top-24 bg-black bg-opacity-75 rounded-lg min-h-[660px] min-w-[450px]' onSubmit={(e) => handleSubmit(e)}>
                <h4 className='text-3xl mb-2 text-white'>{isSignIn ? 'Sign In' : 'Sign Up'}</h4>
                {!isSignIn && <input ref={nameRef} type="text" placeholder='Name' className='p-4 my-4 w-full bg-[#333] rounded-lg text-[#8c8c8c]' />}
                <input ref={emailRef} type="text" placeholder='Email or phone number' className='p-4 my-4 w-full bg-[#333] rounded-lg text-[#8c8c8c]' />
                <input ref={passRef} type="password" placeholder='Password' className='p-4 my-4 w-full bg-[#333] rounded-lg text-[#8c8c8c]' />
                {isSignIn ? <button className='p-4 my-8 bg-[#e50914] w-full rounded-lg text-white'>Sign in</button> :
                    <button className='p-4 my-8 bg-[#e50914] w-full rounded-lg text-white'>Sign up</button>}
                {isSignIn ? <p className='text-lg text-[#8c8c8c] p-2'>New to Netflix? <span className='text-lg text-white cursor-pointer hover:underline' onClick={toggleSingUpIn}>Sign up now.</span></p> :
                    <p className='text-lg text-[#8c8c8c] p-2'>Already Registered? <span className='text-lg text-white cursor-pointer hover:underline' onClick={toggleSingUpIn}>Sign In now.</span></p>}
            </form>
        </div>
    )
}
