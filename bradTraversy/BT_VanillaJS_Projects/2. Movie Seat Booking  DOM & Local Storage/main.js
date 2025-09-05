const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied-seat)");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;       //plus likho int meh convert karo

populateUI();


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected-seat');

    //copy selected seats int arr  //spread function ...
    //map thru array     Map function return the values 
    //return a new arr indexes
    const seatIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    const selectedSeatCounts = selectedSeats.length;
    //console.log(selectedSeatCounts);
    count.innerText = selectedSeatCounts;
    total.innerText = selectedSeatCounts * ticketPrice;
}


//get data from local storage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected-seat');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!=null)
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//seats click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied-seat')) {
        //console.log(e.target);
        e.target.classList.toggle("selected-seat")
        updateSelectedCount();
    }
})

//initial count and total set
updateSelectedCount();
