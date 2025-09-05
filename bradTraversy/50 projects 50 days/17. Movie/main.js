let API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6811e998e59f8b45f17e81093c84f386&page=1';
const IMG_path = 'https://image.tmdb.org/t/p/w1280';
const SEarch_URL = 'https://api.themoviedb.org/3/search/movie?api_key=6811e998e59f8b45f17e81093c84f386&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const next = document.getElementById('next');
const back = document.getElementById('back')
const home = document.getElementById('home')
let page=1;
//get intial movies 
getMovies(API_URL);
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results);
    showMovies(data.results)
}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach(element => {
        const { title, backdrop_path, vote_average, overview } = element
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML =
            `
        <img src="${IMG_path + backdrop_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getclassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
           ${overview}
        </div>   
           `
        main.appendChild(movieElement)
    });
}
function getclassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const serachTerm = search.value
    if (serachTerm && serachTerm !== '') {
        getMovies(SEarch_URL + serachTerm)
        search.value = ''
    }
    else {
        window.location.reload()
    }
})
next.addEventListener('click',()=>{
    page=page+1;
    makeUrl(page)
  
})
back.addEventListener('click',()=>{
    if(page==1)
    {
        makeUrl(page);
    }
    else
    {
        page=page-1;
        makeUrl(page)
    }
})
home.addEventListener('click',()=>{
    page=1;
    makeUrl(page)
})
function makeUrl(page)
{
    API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6811e998e59f8b45f17e81093c84f386&page=';
    getMovies(API_URL+page);
}