import { useSelector } from 'react-redux'
import { UserCircle, Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react';
import storageService from '../appwrite/storageService';
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { addPost } from '../store/postSlice'
import { toast, ToastContainer } from 'react-toastify';
export default function MyAccount() {
    const user = useSelector(state => state.authReducer?.user)
    const post = useSelector(state => state.postReducer.post)
    const myPosts = post.filter(pst => pst.userID === user?.$id)
    const [isDelete, setIsDelete] = useState(false)
    const [delid, setDelid] = useState('');
    const dispatch = useDispatch();
    const deletePost = (id) => {
        setIsDelete(true)
        setDelid(id)
        storageService.deletePost(id).then((status) => {
            if (status) {
                post.FeaturedImg && storageService.deleteFile(post.FeaturedImg);
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

    useEffect(() => {
        storageService.getAllPosts([]).then(post => {
            dispatch(addPost(post.documents))
        })
    }, [isDelete])

    return (
        <>
            <ToastContainer />
            <div className='flex justify-start items-center h-[80vh] flex-col gap-4'>
                <div className='p-4 flex gap-4 '>
                    <UserCircle className='h-full w-16 text-emerald-400' />
                    <div>
                        <p className='text-3xl font-bold'>{user?.name.toUpperCase()}</p>
                        <span className='text-lg font-semibold'>Total posts : {myPosts.length}</span>
                    </div>
                </div>
                <div className='formbg w-4/5 flex flex-col gap-3 py-2'>
                    {myPosts.map(post => (
                        <div className='p-2 border border-white rounded-lg mx-2 shadow-md cursor-pointer flex justify-between items-center gap-1' key={post.$id}>
                            <Link to={`/post/${post.$id}`}>
                                <p className='md:text-lg md:font-semibold '>{post.Title}
                                    <span className={`text-sm p-1 ml-2 relative rounded-md text-[#333] ${post.status === 'active' ? 'bg-green-500 w-12 text-black' : 'bg-yellow-500 w-16'}`}>{post.status}</span>
                                </p>
                            </Link>
                            <div className='flex gap-2'>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Edit className='text-green-400' />
                                </Link>
                                {isDelete ? <>{delid === post.$id ? <span className='loader'></span> : <Trash2 className='text-red-400' onClick={() => deletePost(post.$id)} />}</> : <Trash2 className='text-red-400' onClick={() => deletePost(post.$id)} />}
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}
