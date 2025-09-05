
export default function FilmPoster({ image, title, date, id, setId, selectid }) {
    return (
        <div className={`poster ${selectid === id ? 'highlight' : ''} `} onClick={() => setId(id)} data-testid="fimposter">
            <img src={image ? `https://image.tmdb.org/t/p/original/${image}` : 'https://th.bing.com/th/id/R.d5a84412aab1a3ddd1fe6a027ad4d7fc?rik=BL9s%2bVwzodkyqA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fLcK%2fzrE%2fLcKzrEXbi.png&ehk=UMmQGeFhT3cHjck5e%2bOrGXtdtf1VwaHnL61OdnoJmDE%3d&risl=&pid=ImgRaw&r=0'} alt={title} />
            <div className="info">
                <div className='title'>{title}</div>
                <div className='launch'>
                    <img width="18" height="18" src="https://img.icons8.com/color/18/calendar--v1.png" alt="calendar--v1" />
                    {new Date(date).getFullYear()}
                </div>
            </div>
        </div>
    )
}
