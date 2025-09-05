const auth = '563492ad6f91700001000001d7e34e66a3474227838de6e3d49932a9'
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
const DarkMode = document.querySelector('.dark')
let searchValue;
let checkHome = true;
let page = 1;
const renderImages = (image) => {
    gallery.innerHTML = '';
    image.photos.forEach(photo => {
        const galImg = document.createElement('div')
        galImg.classList.add('gallery-img')
        galImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>downoad ⬇</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galImg)
    });
    checkHome ? searchInput.value = '' : '';
}
const getImages = async (page) => {
    const images = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    const image = await images.json();
    renderImages(image)
}
getImages();

searchInput.addEventListener('input', (e) => {
    searchValue = e.target.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    SearchPhotos(searchValue);

})
more.addEventListener('click', () => {
    page++
    if (checkHome) {
        getImages(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
        SearchPhotos(searchValue, page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

})
async function SearchPhotos(search, page) {
    checkHome = false;
    const images = await fetch(`https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    const image = await images.json();
    renderImages(image)
}

DarkMode.addEventListener('click', () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
    DarkMode.classList.toggle('ligth')
})