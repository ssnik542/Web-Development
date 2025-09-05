window.addEventListener('blur', () => {
    document.title = 'Come back 😩'
})

window.addEventListener('focus', () => {
    document.title = 'HTML Component 🔥'
})


const arr = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (cb) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(cb(this[i], i, this));
    }
    return result;
}

Array.prototype.myFilter = function (cb) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this))
            result.push(this[i])
    }
    return result
}

Array.prototype.myReduce = function (cb, initial) {
    let start = 0;
    let result = initial;
    if (!initial) {
        start = 1;
        result = this[0];
    }
    for (let i = start; i < this.length; i++) {
        result = cb(result, this[i], i, this);
    }
    return result;
}

Array.prototype.myForEach = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (this.indexOf(this[i] > -1))
            cb(this[i], i, this)
    }
}


let count = 0;
const Counter = () => {
    count++;
    console.log(count)
};

const debounceCounter = (cb, timer) => {
    let timerId = null;
    return function () {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(cb, timer);
    }
}

const x = debounceCounter(Counter, 1000)
setTimeout(x, 1000)
setTimeout(x, 2000)
setTimeout(x, 4000)
setTimeout(x, 6000)

function* generator() {
    yield 1;
    return 2;
}

const gen = generator();
console.log(gen.next().value);
console.log(gen.next()); // 1