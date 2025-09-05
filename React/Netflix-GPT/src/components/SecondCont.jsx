import React from 'react'
import { useSelector } from 'react-redux'
import MoiveList from './MoiveList';

export default function SecondCont() {
    const nowPlayingmovies = useSelector(state => state.movies?.nowPlayingMovies)
    const trendingMovies = useSelector(state => state.movies?.trendingMovies)
    const popularMovies = useSelector(state => state.movies?.popularMovies)
    const upComingMovies = useSelector(state => state.movies?.upComingMovies)
    return nowPlayingmovies && (
        <div className='bg-black pb-6'>
            <div className='-mt-40 flex flex-col gap-4 z-20'>
                <MoiveList title={'Now Playing'} nowPlayingmovies={nowPlayingmovies} />
                <MoiveList title={'Popular'} nowPlayingmovies={popularMovies} />
                <MoiveList title={'Trending'} nowPlayingmovies={trendingMovies} />
                <MoiveList title={'Up coming'} nowPlayingmovies={upComingMovies} />
            </div>
        </div>
    )
}
