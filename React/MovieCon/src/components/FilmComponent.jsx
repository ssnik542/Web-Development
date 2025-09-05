import React, { useEffect, useState, useRef } from 'react'
import { getFilmCast, getFilmID } from '../services/searchfilms'
import CastComp from './castComp';
import WatchSummary from './WatchSummary';
import WatchListComp from './WatchListComp';
import StarRating from './StarRating';
export default function FilmComponent({ id, setId }) {
    const [film, setFilm] = useState();
    const [cast, setCast] = useState();
    const [view, setView] = useState()
    const [loading, setLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

    const [watched, setWatched] = useState(function () {
        const storedValue = JSON.parse(localStorage.getItem("watched")) || [];
        return storedValue;
    });

    const isWatched = watched.map((movie) => movie.id).includes(id);
    const watchedUserRating = watched.find(
        (movie) => movie.id === id
    )?.userRating;


    useEffect(() => {
        id && (async function () {
            setLoading(true)
            const data = await getFilmID(id)
            setFilm(data)
            const casteData = await getFilmCast(id)
            setCast(casteData.cast)
            setView(true)
            setLoading(false)
        })()
    }, [id])

    useEffect(
        function () {
            localStorage.setItem("watched", JSON.stringify(watched));
        },
        [watched]
    );



    const handleAdd = () => {
        const x = {
            id: film.id,
            img: film.poster_path,
            title: film.title,
            vote: film.vote_average,
            time: film.runtime,
            userRating,
            countRatingDecisions: countRef.current,
        }
        if (!watched) {
            setWatched([x]);
        }
        else {
            setWatched((watched) => [x, ...watched]);
        }
        setView(false)
        setId(0)
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.id !== id));
    }

    return (
        <div className='box'>
            {(view && film) ?
                <>
                    {!loading ? <>
                        <div className="content">
                            <a href={film?.homepage} target="_blank">
                                <div className='filmposter'>

                                    <img src={film.poster_path
                                        ? `https://image.tmdb.org/t/p/original/${film.poster_path
                                        }` : 'https://th.bing.com/th/id/R.d5a84412aab1a3ddd1fe6a027ad4d7fc?rik=BL9s%2bVwzodkyqA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fLcK%2fzrE%2fLcKzrEXbi.png&ehk=UMmQGeFhT3cHjck5e%2bOrGXtdtf1VwaHnL61OdnoJmDE%3d&risl=&pid=ImgRaw&r=0'}
                                        alt={film.title} />

                                </div>
                            </a>
                            <div className="filmdetails">
                                <div className="title">{film.title}</div>
                                <div style={{ marginTop: '3px', color: '#986745', fontWeight: 'bold' }}>{film.tagline}</div>
                                <div className="releaseDate">
                                    <span>{film.release_date} </span>
                                    <span>| {film.runtime} mins</span>
                                </div>
                                <div className="genre">
                                    {film.genres.map(gen => <span key={film.id * Math.random()}> {gen.name} |</span>)}
                                </div>
                                <div style={{ marginTop: '10px' }}>⭐ {film.vote_average.toFixed(1)}</div>
                            </div>
                            <div className='close' onClick={() => {
                                setView(false)
                                setId(0)
                            }} >❌</div>
                        </div>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    <button className="btn-add" onClick={handleAdd}>
                                        + Add to list
                                    </button>
                                </>
                            ) : (
                                <div className='title'>
                                    You rated this movie {watchedUserRating} <span>⭐️</span>
                                </div>
                            )}
                        </div>
                        <div className="filminfo">
                            {film.overview}
                        </div>
                        <div className="cast">
                            {cast && cast.map(c => <CastComp name={c.name} image={c.profile_path} key={c.id} />)}
                        </div></> : <span className="loader"></span>}
                </>
                :
                <div>
                    <WatchSummary watched={watched} />
                    <WatchListComp watched={watched} onDeleteWatched={handleDeleteWatched} />
                </div>


            }
        </div >
    )
}
