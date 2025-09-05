import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import { useSelector } from 'react-redux'
import { Play } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Check } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { ThumbsDown } from 'lucide-react';

export default function MovieDetails() {
  const params = useParams();
  const gptMoviesSearch = useSelector(state => state.movies?.gptSearchMovies)
  // const gptMoviesSearch = useSelector(state => state.movies?.nowPlayingMovies)
  const movie = gptMoviesSearch?.filter(m => m.id == params.id)
  const [isAdd, setisAdd] = useState(false);
  const handleAdd = () => {
    setisAdd(prev => !prev)
  }

  const getImg = () => {
    return `${movie[0].poster_path ? `https://image.tmdb.org/t/p/w500/${movie[0].poster_path}` : 'https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg'}`
  }
  return (
    <div className=''>
      <Header />
      <div className='pt-[72px] min-w-screen'>
        <img src={`${movie[0].backdrop_path ? `https://image.tmdb.org/t/p/original/${movie[0].backdrop_path}` : getImg()}`} alt={movie[0].title} className='h-[92vh] w-full' />
        <div className='-mt-[600px] sm:-mt-96 md:-mt-72 z-40 mx-10 bg-black relative bg-opacity-80 p-4 rounded-lg'>
          <div className='w-6 h-4 mb-2'>
            <span className='flex font-bold text-red-600'>
              <img src="https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png" alt="NetflixLogo" />
              MOVIE
            </span>
          </div>
          <h1 className='text-2xl md:text-6xl font-bold text-white'>{movie[0].title}</h1>
          <div className='mt-2 flex gap-4 items-center flex-wrap'>
            <span className='flex bg-white  text-black  py-3 px-10 text-lg  rounded font-semibold hover:opacity-90 cursor-pointer'>
              <Play className='mr-1 mt-[2px]' fill="black" /> Play</span>
            <span className=' border-2 border-white p-2 rounded-[50%] cursor-pointer' onClick={handleAdd}>
              {isAdd ? <Check color='white' /> : <Plus color='white' />}
            </span>
            <span className='border-2 border-white p-2 rounded-[50%] cursor-pointer'>
              <ThumbsUp color='white' />
            </span>
            <span className='border-2 border-white p-2 rounded-[50%] cursor-pointer'>
              <ThumbsDown color='white' />
            </span>
          </div>
          <div className='text-lg text-white font-semibold mt-2 flex gap-3'>
            <h1 className='text-green-600'>{Math.floor(movie[0].vote_average * 10)}% Match</h1>
            <h1 className='text-[#8c8c8c]'>{new Date(movie[0].release_date).getFullYear()}</h1>
            <h1 className='text-red-600'>{movie[0].original_language}</h1>
          </div>
          <div className='text-base text-white'>
            {movie[0].overview}
          </div>
        </div>
      </div>
    </div>
  )
}
