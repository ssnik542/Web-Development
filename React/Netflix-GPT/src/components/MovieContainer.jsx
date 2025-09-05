import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function MovieContainer({ movie }) {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col cursor-pointer hover:scale-105 transition-all w-48 rounded-md' onClick={() => navigate(`/movie/${movie.id}`)}>
            <img src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_small.jpg'}`} alt={movie.title} className='rounded-tr-md rounded-tl-md h-60' />
            <h1 className='text-black text-sm font-bold bg-white p-2 text-center rounded-br-md rounded-bl-md'>{movie.title.slice(0, 21)}</h1>
        </div>
    )
}
