const debounce=(func,delay=1000)=>{
    let timeoutId;
    return (...args)=>{
        if (timeoutId) {              //dus bar call na ho uske liye krre hai kyu ki apne pass srf 1000hi ccall allowed
            clearTimeout(timeoutId);
        }
        //debouncing an input
        timeoutId = setTimeout(() => {         //in 0.5sec call fetchdata
            func.apply(null,args);
        },delay)
    }
}