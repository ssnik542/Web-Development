import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { options } from '../utlity'
import { Play } from 'lucide-react';
import { Info } from 'lucide-react';
export const MainCont = () => {

    const movies = useSelector(state => state.movies?.nowPlayingMovies)
    if (!movies) return;
    const idx = Math.floor(Math.random() * movies.length)
    const mainMovies = movies[idx]

    return (
        <div className='text-white w-screen aspect-video bg-gradient-to-b from-black'>
            <div className='pt-48 px-12 absolute'>
                <h1 className='text-3xl md:text-8xl font-bold cursor-pointer'>{mainMovies.title}</h1>
                <p className='py-6 text-base md:text-lg md:w-1/3'>{`${mainMovies.overview.slice(0, mainMovies.overview.length / 2)}`}</p>
                <div className='flex gap-4'>
                    <span className='flex bg-white  text-black  py-3 px-10 text-lg  rounded font-semibold hover:opacity-70 cursor-pointer'>
                        <Play className='mr-1 mt-[2px]' fill="black" /> Play</span>
                    <span className='flex cursor-pointer bg-[#8c8c8c] opacity-70 text-white py-3 px-14 text-lg rounded font-semibold hover:opacity-100'>
                        <Info className='mr-1 mt-[2px]' />More Info</span>

                </div>
            </div>
            <VideoComp id={mainMovies.id} />
        </div>
    )
}



const VideoComp = ({ id }) => {
    const [trailerid, setTrailerid] = useState('');
    useEffect(() => {
        (() => {
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
                .then(response => response.json())
                .then(response => {
                    setTrailerid(response.results.filter(movie => movie.type === 'Trailer')[0].key)
                })
                .catch(err => console.error(err));
        })()
    }, [])

    return <div className='w-screen aspect-video'>
        <iframe
            src={"https://www.youtube.com/embed/" + trailerid + "?autoplay=1&loop=1&mute=1&controls=0"}
            className='w-screen aspect-video h-full pointer-events-none'
            title='Yotube video player'
            allowfullscreen="allowfullscreen"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" />
    </div>
}