import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from '../appwrite/storageService';
import Container from '../components/container/container'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ThumbsUp, ThumbsDown, User2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [isLiked, setIsLiked] = useState(false);
    const [disLiked, setIsDisLiked] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const userData = useSelector((state) => state.authReducer.user);


    useEffect(() => {
        if (slug) {
            setLoading(true)
            storageService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false)
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setIsDelete(true)
        storageService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.FeaturedImg);
                navigate("/");
            }
            setIsDelete(false)
        }).catch(() => {
            toast.error('Something went wrong ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsDelete(false)
        });
    };

    const handleLike = async () => {
        if (isLiked) {
            const dbPost = await storageService.updatePost(post.$id, {
                ...userData,
                likeCount: post.likeCount ? post.likeCount - 1 : 1
            });
            setPost(dbPost)
        }
        else {
            const dbPost = await storageService.updatePost(post.$id, {
                ...userData,
                likeCount: post.likeCount ? post.likeCount + 1 : 1
            });
            setPost(dbPost)
        }
        setIsLiked(prev => !prev)
    }

    const handleDislike = async () => {
        if (disLiked) {
            const dbPost = await storageService.updatePost(post.$id, {
                ...userData,
                dislikeCount: post.dislikeCount ? post.dislikeCount - 1 : 1
            });
            setPost(dbPost)
        }
        else {
            const dbPost = await storageService.updatePost(post.$id, {
                ...userData,
                dislikeCount: post.dislikeCount ? post.dislikeCount + 1 : 1
            });
            setPost(dbPost)
        }
        setIsDisLiked(prev => !prev)
    }
    const getDate = (date) => {
        return new Date(date).toLocaleDateString()
    }
    if (loading) return <h1 className="text-center text-3xl text-white"><span className="loader"></span></h1>
    const isAuthor = post && userData ? post.userID === userData.$id : false;
    return post ? (
        <div className="py-8">
            <ToastContainer />
            <Container>
                <div className="flex md:items-start gap-4 flex-col md:flex-row items-center">
                    <div className="md:w-1/2 flex justify-center mb-4 relative h-[400px]">
                        <img
                            src={post.imgUrl ? post.imgUrl : storageService.getFilePreview(post.FeaturedImg)}
                            alt={post.Title}
                            className="rounded-xl md:w-1/2 "
                            loading='lazy'
                        />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <h1 className="text-2xl md:text-4xl font-bold">{post.Title}
                            <span className={`text-sm p-1 ml-2 relative bottom-1 rounded-md text-[#333] ${post.status === 'active' ? 'bg-green-500 w-12' : 'bg-yellow-500 w-16'}`}>{post.status}</span>
                        </h1>
                        <p className="flex gap-2">
                            <User2 />
                            <span className="text-md">{post.username}</span> |
                            <span>{getDate(post['$createdAt'])}</span>
                        </p>

                        {/* <div className="flex gap-4">
                            <span className="flex flex-col gap-1 items-center justify-center">
                                <ThumbsUp className={`cursor-pointer hover:text-green-400 ${isLiked && 'text-green-400'}`} onClick={handleLike} />
                                <p className="text-sm">{post.likeCount}</p>
                            </span>
                            <span className="flex flex-col gap-1">
                                <ThumbsDown className={`cursor-pointer hover:text-red-400 ${disLiked && 'text-red-400'}`} onClick={handleDislike} />
                                <p className="text-sm">{post.dislikeCount}</p>
                            </span>
                        </div> */}
                        <div className="browser-css">
                            {parse(post.Content)}
                        </div>

                        {isAuthor && (
                            <div >
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="mr-3 bg-green-500 px-4 py-1 rounded-md font-semibold text-[#15191d]">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={deletePost} className="bg-red-500 px-4 py-1 rounded-md font-semibold">
                                    {isDelete ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}