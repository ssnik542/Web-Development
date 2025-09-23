Array.prototype.myMap = function (callback, thisArgs) {
    if (this == null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    const array = Object(this);
    const length = array.length >>> 0;
    const result = new Array(length)

    for (let i = 0; i < length; i++) {
        if (i in array) {
            result[i] = callback.call(thisArgs, array[i], i, array)
        }
    }
    return result;
}

const nums = [1, 2, 3];
const doubled = nums.myMap(num => num * 2);
console.log(doubled)

Array.prototype.myReduce = function (callback, initialValue) {
    if (this == null) throw new TypeError('Array.prototype.myReduce called on null or undefined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    const array = Object(this);
    const length = array.length >>> 0;
    let accumulator = initialValue;
    let startIndex = 0;
    if (initialValue === undefined) {
        if (this.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = this[0]
        startIndex = 1;
    }

    for (let i = startIndex; i < length; i++) {
        if (i in array) {
            accumulator = callback.call(undefined, accumulator, array[i], i, array)
        }
    }
    return accumulator;
}
const sum = nums.myReduce(function (acc, num) {
    return acc + num;
}, 0);

console.log(sum)

const createMultiplier = (multiper) => {
    return function (number) {
        return multiper * number
    }
}

const double = createMultiplier(2);
console.log(double(5)); // 10
const base = { kind: "base", describe() { console.log(this.kind); } };
const child = Object.create(base);


const debounce = (fn,delay) =>{
    let timer;
    return (...args)=>{
        if(timer) clearInterval(timer)
        timer = setTimeout(()=>{
        fn(...args)
        timer=null;
         } ,delay)    
    }
}
function throttle(fn,delay){
    let lastCl=0 ;
    return function(...args){
        let now = Date().now
        if(now-lastCl >= delay)
        {
            lastCl = now;
            fn.apply(this,args)
        }
    }
}