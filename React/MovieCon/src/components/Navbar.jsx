import { useEffect, useState } from 'react'
import { getFilms } from '../services/searchfilms';
export default function Navbar({ setFilms, initialState }) {
    const [value, setValue] = useState('');
    useEffect(() => {
        const getFilm = async () => {
            const data = await getFilms(value);
            setFilms(data.results);
        }
        getFilm();
    }, [value])
    return (
        <div className="nav-bar">
            <div style={{ cursor: 'pointer' }} onClick={initialState}>MovieCon 🍿</div>
            <div>
                <input type="text" placeholder='search' className='search' value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div >
    )
}
