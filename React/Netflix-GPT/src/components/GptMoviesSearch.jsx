import React from 'react'
import { useSelector } from 'react-redux'
import MovieContainer from './movieContainer';


export default function GptMoviesSearch() {
    const gptMoviesSearch = useSelector(state => state.movies?.gptSearchMovies)
    // const gptMoviesSearch = useSelector(state => state.movies?.nowPlayingMovies)
    if (!gptMoviesSearch) return null;
    return (
        <div className='absolute bg-black top-[70%] flex flex-wrap gap-12 justify-center pb-10 bg-opacity-90 pt-4 rounded-md'>
            {gptMoviesSearch.map(m => <MovieContainer movie={m} />)}
        </div>
    )
}
