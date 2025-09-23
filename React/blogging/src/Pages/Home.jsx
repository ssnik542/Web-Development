import React, { useEffect, useState } from 'react'
import storageService from '../appwrite/storageService';
import Cards from '../components/Cards/Cards'
import Container from '../components/container/container'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import blogimage from '../assets/blogw.svg'
import { addActivePost } from '../store/postSlice';
import FilterBar from '../components/FilterBar/FilterBar';
import { Query } from 'appwrite'
import Paginate from '../components/common/Paginate';
function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoding] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const activePost = useSelector(state => state.postReducer.activePost);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
    const nPages = Math.ceil(posts?.length / postsPerPage);
    const [filter, setFilter] = useState('All')

    const handleFilter = (value) => {
        setFilter(value)
    }
    useEffect(() => {
        setLoding(true)
        if (filter === 'All') {
            storageService.getAllPosts([Query.equal("status", "active")]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    dispatch(addActivePost(posts.documents))
                }
                setLoding(false)
            })
        }
        else {
            storageService.getAllPosts([Query.equal("category", filter)]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    dispatch(addActivePost(posts.documents))
                }
                setLoding(false)
            })
        }
    }, [filter])
    const status = useSelector((state) => state.authReducer.status);
    if (!status) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col justify-center items-center">
                        <img src={blogimage} alt="" className='w-48' />
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-[#B91354] cursor-pointer" onClick={() => navigate('/login')}>
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='flex justify-center py-4 '>
            <div className='flex flex-col gap-1 px-4 justify-center items-center'>
                <FilterBar handleFilter={handleFilter} filter={filter} />
                <div className='min-h-[75vh] md:min-h-[55vh]'>
                    {loading ? <span className="loader md:mt-36 mt-56"></span> :
                        <>
                            {posts.length <= 0 ? <div className="flex flex-col justify-center items-center gap-4 mt-6">
                                <img src={blogimage} alt="" className='w-48' loading='lazy' />
                                <div className="w-full text-center">
                                    <h1 className="md:text-2xl font-bold " onClick={() => navigate('/login')}>
                                        Sorry no post for this Category yet !!
                                    </h1>
                                    <span className='font-semibold cursor-pointer text-blue-400 hover:text-purple-400' onClick={() => navigate('/add-post')}>Create a new Post🙂</span>
                                </div>
                            </div> :
                                <>
                                    <Cards post={currentPosts} />
                                    <div className='flex justify-center gap-4 mt-4'>
                                        <Paginate
                                            nPages={nPages}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage} />
                                    </div>
                                </>
                            }
                        </>


                    }
                </div>
            </div>

        </div >
    )
}

export default Home