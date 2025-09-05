const input = document.querySelector('input');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r')*2*Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);
let duration = 0;
const timer = new Timer(input,start,pause,{
    onStart(totalDuration){
       duration = totalDuration;
    },
    onTick(timeReamaining)
    {
        let x = perimeter * timeReamaining / duration - perimeter ;
        circle.setAttribute('stroke-dashoffset',x);
        if(-1* x >= perimeter/2)
        {
            circle.setAttribute('stroke','orange')
        }
        if(-1*x>=perimeter*80/100)
        {
            circle.setAttribute('stroke','red')
        }
        
    },
    onComplete()
    {
            console.log('time is over');
    }
}); 