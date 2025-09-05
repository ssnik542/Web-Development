import { useEffect, useState } from 'react';
import FilmList from './components/FilmList'
import Navbar from './components/Navbar'
import FilmComponent from './components/FilmComponent';
import { getPopularMovies, getTopRated } from './services/searchfilms';
import useStatus from './Utility/useStatus';


function App() {
  const [films, setFilms] = useState([]);
  const [searchFilms, setSearchFilms] = useState([]);
  const [id, setId] = useState()
  const [page, setPage] = useState(1)
  const [apicall, setApiCAll] = useState('movie')
  const [loading, setLoading] = useState(false);

  const status = useStatus();
  useEffect(() => {
    if (searchFilms.length > 0) {
      setFilms(searchFilms)
    }
    else {
      (async () => {
        setLoading(true)
        const data = apicall === 'movie' ? await getPopularMovies(page) : await getTopRated(page)
        setFilms(data.results)
        setLoading(false)
      })()
    }
  }, [searchFilms, page, apicall])

  const initialState = () => {
    setApiCAll('movie')
    setPage(1)
  }
  return (
    <>
      <Navbar setFilms={setSearchFilms} initialState={initialState} />
      {status ?
        <div className="comp">
          <div className='main'>
            <FilmList
              films={films}
              setId={setId}
              setPage={setPage}
              page={page}
              setApiCAll={setApiCAll}
              apicall={apicall}
              loading={loading}
              id={id}
            />
            <FilmComponent id={id} setId={setId} />
          </div>
        </div>
        :
        <div className='comp'>
          <h1 style={{ padding: '10px' }}>You are Offline 🔴</h1>
        </div>
      }
    </>
  )
}

export default App
