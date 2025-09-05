import React, { useRef, useState } from 'react'
import openai from '../utils/openai'
import { options } from '../utlity';
import { useDispatch } from 'react-redux';
import { addGptSearchMovies } from '../utils/movieSlice';
import GptMoviesSearch from './GptMoviesSearch';
import { toast, ToastContainer } from 'react-toastify';
import Header from './Header';

export default function GptSearch() {
    const inputref = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const searchMoviefn = async (movie) => {
        try {
            const result = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, options)
            const response = await result.json();
            return response.results;
        } catch (error) {
            toast.error('Error While Fetching the movies', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setLoading(false)
        }
    }
    const onSearchHandle = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const query = `Act as a movie recommendation system and suggest some latest movie for the query : ${inputref.current.value} only give me 5 movies , comma-seperated like the example result ahead . Example : ['maar','jani dushman','andaz'] `
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: query }],
                model: 'gpt-3.5-turbo',
            });
            const gptMovies = chatCompletion.choices[0].message.content.split(',');
            const searchMovie = gptMovies.map(movie => searchMoviefn(movie))
            const TmbdMovie = await Promise.all(searchMovie)
            dispatch(addGptSearchMovies(TmbdMovie.flat()))
            setLoading(false);
        } catch (err) {
            toast.error('Sorry No Suggestion for now ☹️', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setLoading(false)
        }
    }
    return (
        <>
            <Header />
            <div className='bg-black'>
                <ToastContainer />
                <img className='min-h-screen relative' src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='bgImage' />
                <div className='absolute top-[40%] sm:top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4'>
                    <form className='flex gap-4 p-4 w-full justify-center items-center flex-col md:flex-row' onSubmit={onSearchHandle}>
                        <input ref={inputref} type="text" placeholder='what would you like to watch today ?' className='p-3 min-w-[370px] md:w-[600px] rounded-md focus:outline-none placeholder:text-xl placeholder:font-semibold placeholder:text-gray-500 text-xl font-semibold' />
                        <button className='py-3 px-8 bg-[#e50914] rounded-md text-white font-bold' disabled={loading}>{loading ? 'Loading..' : 'Search'}</button>
                    </form>
                </div>
                <GptMoviesSearch />
            </div>
        </>
    )
}
