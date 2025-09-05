class Drumkit{
    constructor()
    {
        this.pads = document.querySelectorAll(".pad");
        this.playbutton = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index=0;
        this.bpm = 150;
    }
    activePad()
    {
        //this.classList.toggle("active");
        console.log(this);
    }
    repeat()
    {
        let step = this.index % 8;
        const activebar = document.querySelectorAll('.b${step}');
        this.index++;

    }
    start()
    {
        const interval = (60/this.bpm)*1000;
        setInterval(() => {
            this.repeat();
        },interval);
    }
}
const drumkit = new Drumkit();
drumkit.pads.forEach(pad =>{
    pad.addEventListener('click',drumkit.activePad);
})
drumkit.playbutton.addEventListener('click',function(){
    drumkit.start();
}

);
const playbutton = document.querySelector(".play");
playbutton.addEventListener("click",alert("helo"));