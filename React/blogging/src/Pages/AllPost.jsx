import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards/Cards'
import storageService from '../appwrite/storageService'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/postSlice'
import { toast, ToastContainer } from 'react-toastify';
export default function AllPost() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true)
        storageService.getAllPosts([]).then(post => {
            setPost(post.documents)
            dispatch(addPost(post.documents))
            setLoading(false)
        }
        ).catch((err) => {
            toast.error('Something went wrong ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setLoading(false)
        });
    }, [])
    return (
        <>
            <ToastContainer />
            <div className='flex items-center justify-center py-4 px-2'>
                {loading ? <span className="loader"></span> :
                    <Cards post={post} />
                }
            </div>
        </>
    )
}
