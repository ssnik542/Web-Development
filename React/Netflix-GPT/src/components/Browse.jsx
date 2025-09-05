import { useEffect } from 'react';
import Header from './Header';
import { options } from '../utlity';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies, addTrendingMovies, addPopularMovies, addUpComingMovies, toggleGpt } from '../utils/movieSlice';
import { MainCont } from './MainCont';
import SecondCont from './SecondCont';


function Browse() {
    const dispatch = useDispatch();
    const isGpt = useSelector(state => state.movies.isGpt)
    useEffect(() => {
        (() => {
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => dispatch(addNowPlayingMovies(response.results)))
                .catch(err => console.error(err));
        })()
        const popular = () => {
            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => dispatch(addPopularMovies(response.results)))
                .catch(err => console.error(err));
        }
        const Trnding = () => {
            fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
                .then(response => response.json())
                .then(response => dispatch(addTrendingMovies(response.results)))
                .catch(err => console.error(err));
        }
        const upComing = () => {
            fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => dispatch(addUpComingMovies(response.results)))
                .catch(err => console.error(err));
        }
        Trnding()
        upComing()
        popular()
    }, [])

    const onclickHandle = () => {
        dispatch(toggleGpt())
    }
    return (
        <div className='flex flex-col'>
            <Header onclickHandle={onclickHandle} isGpt={isGpt} />
            <>
                <MainCont />
                <SecondCont />
            </>
        </div>
    )
}

export default Browse