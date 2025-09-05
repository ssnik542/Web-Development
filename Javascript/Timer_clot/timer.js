class Timer{
    constructor(input,start,pause,callbacks)
    {
        this.input=input;
        this.start=start;
        this.pause=pause;
        if(callbacks)
        {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.start.addEventListener('click',this.startTimer);
        this.pause.addEventListener('click',this.pauseTimer);
    }
    startTimer=()=> {
        if(this.onStart)   ///if it is there 
        {
            this.onStart(this.timeReamaining);
        }
        this.tick();
        this.tmr=setInterval(this.tick,20);
    };
    tick=()=>{
        if(this.timeReamaining <= 0)
        {
            this.pauseTimer();
            if(this.onComplete) this.onComplete();
        }
        else
        {
            this.timeReamaining = this.timeReamaining - 0.02; 
            if(this.onTick) this.onTick(this.timeReamaining);
        }     
    }
    pauseTimer=()=>{
        clearInterval(this.tmr);
    }
    get timeReamaining()  
    {
        return parseFloat(this.input.value);
    }
    set timeReamaining(time)
    {
        this.input.value = time.toFixed(2); 
    }
}