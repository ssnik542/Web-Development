export default function WatchListComp({ watched, onDeleteWatched }) {
    return (
        <div>
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.id}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </div>
    );
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <>
            <div className='dankFilm'>
                <div className="pp">
                    <img src={movie.img
                        ? `https://image.tmdb.org/t/p/original/${movie.img
                        }` : 'https://th.bing.com/th/id/R.d5a84412aab1a3ddd1fe6a027ad4d7fc?rik=BL9s%2bVwzodkyqA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fLcK%2fzrE%2fLcKzrEXbi.png&ehk=UMmQGeFhT3cHjck5e%2bOrGXtdtf1VwaHnL61OdnoJmDE%3d&risl=&pid=ImgRaw&r=0'} alt={movie.title} />
                    <div className="dank">
                        <div className="title">{movie.title}</div>
                        <div className="det">
                            <span>⭐️</span>
                            <span>{movie.vote.toFixed(1)}</span>
                            {' | '}
                            <span>🌟</span>
                            <span>{movie.userRating.toFixed(1)}</span>
                            {' | '}
                            <span>⏳</span>
                            <span>{movie?.time} min</span>
                        </div>
                    </div>
                </div>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.id)}
                >
                    X
                </button>
            </div>
        </>
    );
}