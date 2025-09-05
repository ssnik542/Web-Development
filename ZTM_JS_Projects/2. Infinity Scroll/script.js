const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
// unsplash api
const count = 5;
const apiKey='TBEds4DCPbsGLhyypWS5bhUy2bItokFvW_qKky7-DJA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// helper function
function setAttribute(element,attribute)
{
    for(const key in attribute)
    {
        element.setAttribute(key,attribute[key]);
    }
}
let ready=false;
let imageload=0;
let totalimage=0;
//check if image is laoded
function imageloaded()
{
    imageload++;
    if(imageload===totalimage)
    {
        loader.hidden = true;
        ready=true;
    }

}
// create elements for links ohots
function displayphotos(){
    imageload = 0;
    totalimage = photosArray.length;
    photosArray.forEach((photo)=>{
        // creat <a> link for unslash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttribute(item,{
            href : photo.links.html,
            target:'_blank',
        });
        // creat <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttribute(img,{
            src : photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        img.addEventListener('load',imageloaded);
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// get pgotos from api
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos();
    }
    catch(error){
    }
}
// scroll function
window.addEventListener('scroll',()=>{
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
     {
         ready =false;
         getPhotos()
         console.log('loaad more');
     }
})
getPhotos();
