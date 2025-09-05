const quoteContainer = document.getElementById('quote-container');
const quotetext = document.getElementById('quote');
const authortext = document.getElementById('author');
const twitterbtn = document.getElementById('tweet');
const quotebtn = document.getElementById('new-quote');
const loading = document.getElementById('loading');
//get quote from api
var data;
(async function Quote() {
    loading.style.display = "block";
    try {
        const response = await fetch('https://type.fit/api/quotes');
        data = await response.json();
    }
    catch (error) {
        Quote();
        console.log('whoops,no quote', error)

    }
    loading.style.display = "none";
})();
function getQuote() {
    loading.style.display = "block";
    let x = Math.floor(Math.random() * data.length)
    if (data[x].author === '') {
        authortext.innerText = 'unknown'
    }
    else {
        authortext.innerText = data[x].author;
    }
    if (data[x].text.length > 120) {
        quotetext.classList.add('long-quote');
    }
    else {
        quotetext.classList.remove('long-quote');
    }
    quotetext.innerText = data[x].text;
    loading.style.display = "none";
}
function tweetQuote() {
    const quote = quotetext.innerText;
    const author = authortext.innerText;
    const twtUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twtUrl, '_blank');
}
quotebtn.addEventListener('click', getQuote);
twitterbtn.addEventListener('click', tweetQuote);
