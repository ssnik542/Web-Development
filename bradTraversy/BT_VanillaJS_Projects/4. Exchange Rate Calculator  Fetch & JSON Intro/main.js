const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch exchange rates and update the dom
function calculate(){
    const cur1 = currencyEl_one.value;
    const cur2 = currencyEl_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${cur1}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[cur2];

      rateEl.innerText = `1 ${cur1} = ${rate} ${cur2}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}
//event listner
currencyEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('change',calculate); 

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
  });

  calculate(); 