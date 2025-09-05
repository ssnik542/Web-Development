const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus= document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummytransaction = [
    {id:1,text:'flower',amount:-20},
    {id:2,text:'car',amount:400},
    {id:3,text:'flour',amount:-30},
    {id:4,text:'flag',amount:10}
];

let transaction = dummytransaction;
//add transaction
function addTransxtions(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()==='')
    {
        alert("Please add a text and amount");
    }
    else
    {
        const transactions = {
                id:generateId(),
                text: text.value,
                amount: +amount.value
        };
        //console.log(transactions);
        transaction.push(transactions);
       // console.log(transaction);
        addTransaction(transaction);
        updateValues();
        text.value='';
        amount.value='';
    }
}
//generate id
function generateId()
{
    return Math.floor(Math.random()*100000000);
}

//add transaction to dom list
function addTransaction(transaction){
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    //add class based on avlue
    item.classList.add(transaction.amount <0 ? 'minus' : 'plus');
    item.innerHTML=`
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
    `;
    list.appendChild(item)
}
//update the balance and income
function updateValues()
{
    const amounts =transaction.map(transaction => transaction.amount)
    const total =amounts.reduce((acc,item)=> (acc+=item),0).toFixed(2);
    const income = amounts
                        .filter(item => item>0)
                        .reduce((acc,item)=> (acc+=item),0)
                        .toFixed(2);
    const expense = amounts
                        .filter(item => item<0)
                        .reduce((acc,item)=> (acc+=item),0)*-1
                        .toFixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML =`$${income}`
    money_minus.innerHTML=`$${expense}`
}
//init app
function init(){
    list.innerHTML = '';

    transaction.forEach(addTransaction);
    updateValues();
}
init();
form.addEventListener('submit',addTransxtions);