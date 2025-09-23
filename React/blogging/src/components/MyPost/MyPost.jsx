import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import storageService from '../../appwrite/storageService'
import { Edit, Trash2 } from 'lucide-react'
import { Link } from "react-router-dom";
function MyPost({ post }) {
    const [isDelete, setIsDelete] = useState(false)
    const deletePost = (id) => {
        setIsDelete(true)
        storageService.deletePost(id).then((status) => {
            if (status) {
                storageService.deleteFile(post.FeaturedImg);
                toast.success('Post Delete Successfully 🙂', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            setIsDelete(false)
        }).catch(() => {
            toast.error('Something went wrong ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsDelete(false)
        });
    };

    // useEffect(() => {
    //     storageService.getAllPosts([]).then(post => {
    //         setPost(post.documents)
    //         dispatch(addPost(post.documents))
    //         setLoading(false)
    //     })
    // }, [isDelete])
    return (
        <div className='p-2 border border-white rounded-lg mx-2 shadow-md cursor-pointer flex justify-between items-center gap-1'>
            <p className='md:text-lg md:font-semibold '>{post.Title}
                <span className={`text-sm p-1 ml-2 relative rounded-md text-[#333] ${post.status === 'active' ? 'bg-green-500 w-12 text-black' : 'bg-yellow-500 w-16'}`}>{post.status}</span>
            </p>
            <div className='flex gap-2'>
                <Link to={`/edit-post/${post.$id}`}>
                    <Edit className='text-green-400' />
                </Link>
                {isDelete ? <span className='loader'></span> : <Trash2 className='text-red-400' onClick={() => deletePost(post.$id)} />}
            </div>
        </div>
    )
}

export default MyPost