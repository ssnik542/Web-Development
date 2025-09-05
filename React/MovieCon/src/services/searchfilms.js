export const getFilms = async (keyWord) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_REACT_APP_API_KEY_MOVIEDB
        }
    };
    const filmData = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyWord}`, options)
    const data = await filmData.json();
    return data;
}


export const getFilmID = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_REACT_APP_API_KEY_MOVIEDB
        }
    };
    const filmData = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    const data = await filmData.json();
    return data;
}



export const getFilmCast = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_REACT_APP_API_KEY_MOVIEDB
        }
    };
    const filmData = await fetch(`https://api.themoviedb.org/3/movie//${id}/credits`, options)
    const data = await filmData.json();
    return data;
}

export const getPopularMovies = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_REACT_APP_API_KEY_MOVIEDB
        }
    };
    const filmdata = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`, options)
    const data = await filmdata.json();
    return data;
}


export const getTopRated = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_REACT_APP_API_KEY_MOVIEDB
        }
    };
    const filmdata = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, options)
    const data = await filmdata.json();
    return data;
}