const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select  media stram pass to video element the play
async function selectMediaStream(){
    try {
        
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = ()=>{
            videoElement.play();
        }
    } catch (error) {
        console.log(error);
    }
}  
button.addEventListener('click',async ()=>{
    
    //disable button ;
    button.disabled= true;
    //startr poicture is picture
    await videoElement.requestPictureInPicture();
    //reset button
    button.disabled= false;

});
selectMediaStream();