import React from 'react'

export default function MoiveList({ title, nowPlayingmovies }) {
    return (
        <div className='px-12'>
            <h1 className='text-white text-3xl font-semibold'>{title}</h1>
            <div className='flex overflow-x-scroll mt-4 scroll-smooth dark:scrollbar-thumb-blue-100  scrollbar-thin dark:scrollbar-track-gray-700 scrool'>
                <div className='flex gap-4'>
                    {nowPlayingmovies?.map(movie => <div className='cursor-pointer hover:scale-105 transition-all w-48'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    </div>)
                    }
                </div>
            </div >
        </div >
    )
}
