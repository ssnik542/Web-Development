const closeModal = document.querySelector('#close')
const modal = document.getElementById('modal')
const stLimitbtn = document.querySelector('#setLimit')
const content = document.querySelector('#content')
const addWork = document.getElementById('addWork')
const workout = document.getElementById('workout')
const addMeal = document.getElementById('addMeal')
const meals = document.getElementById('meals')
const mealForm = document.getElementById('addMealForm')
const workoutForm = document.getElementById('addWorkoutForm')
const openMealForm = document.getElementById('openMealForm')
const openWorkForm = document.getElementById('openWorkForm')
const cancelbtn = document.getElementById('cancelmeal')
const cancelbtn2 = document.getElementById('cancelwork')
const reset = document.getElementById('reset')
const calInput = document.getElementById('calInput')
const save = document.getElementById('save')

const dailyCal = document.getElementById('dailyCal')
const gain_loss = document.getElementById('totalCal')
const calConsumed = document.getElementById('calConsumed')
const calBurned = document.getElementById('calBurned')
const calRemain = document.getElementById('calRemain')

const mealInput = document.getElementById('mealInput')
const mealCalInput = document.getElementById('mealCalInput')
const workInput = document.getElementById('workInput')
const workCalInput = document.getElementById('workCalInput')
let mealArray = [];
let ToalMealCount = 0
let TotalWorkCount = 0

stLimitbtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    content.classList.add('brightness-50');
})

reset.addEventListener('click', () => {
    dailyCal.innerText = 0
    gain_loss.innerText = 0
    calConsumed.innerText = 0
    calBurned.innerText = 0
    calRemain.innerText = 0
    ToalMealCount = 0
    TotalWorkCount = 0;
    CalculateProgressBar()
})

function closeModalFunction() {
    modal.classList.add('hidden')
    content.classList.remove('brightness-50');
}

function CalculateProgressBar() {
    const x = document.querySelector('#progressBar')
    let prevClasslist = x.classList[4]
    x.classList.remove(prevClasslist)
    let newValue = Math.floor(Number(gain_loss.innerText) / Number(dailyCal.innerText) * 100)
    if (newValue >= 100) {
        newValue = 100;
        x.classList.add('bg-red-500')

    }
    x.classList.add(`w-[${newValue}%]`)
}
function CheckCalRemaingColor() {
    const x = document.querySelector('#calRemainDabba')
    if (Number(calRemain.innerText) < 0) {
        x.classList.add('bg-red-500')
    }
    else {
        x.classList.remove('bg-red-500')
    }
}

function deleteWorkout(e) {
    document.getElementById(e.srcElement.id).remove();
    mealArray = mealArray.filter(x => x !== e.srcElement.id)
}
closeModal.addEventListener('click', closeModalFunction)

addMeal.addEventListener('click', () => {
    const node = document.createElement("div");
    node.id = mealInput.value
    node.classList.add('border');
    node.classList.add('p-4')
    node.classList.add('my-1')
    node.classList.add('flex')
    node.classList.add('rounded-md')
    const textnode = document.createElement("div");
    textnode.innerText = mealInput.value
    const textnode2 = document.createElement("div");
    textnode2.classList.add('bg-green-600')
    textnode2.classList.add('px-4')
    textnode2.classList.add('py-1')
    textnode2.classList.add('rounded-md')
    textnode2.innerText = mealCalInput.value
    const cross = document.createElement("div");
    cross.innerText = '❌'
    cross.id = mealInput.value
    cross.classList.add('cursor-pointer');
    node.classList.add(`justify-between`)
    node.appendChild(textnode);
    node.appendChild(textnode2);
    node.appendChild(cross);
    meals.appendChild(node);
    calConsumed.innerText = Number(calConsumed.innerText) + Number(mealCalInput.value);
    ToalMealCount += Number(mealCalInput.value)
    gain_loss.innerText = ToalMealCount - TotalWorkCount;
    calRemain.innerText = Number(dailyCal.innerText) - Number(gain_loss.innerText)
    mealArray.push(mealInput.value)
    mealCalInput.value = '';
    mealInput.value = '';
    CalculateProgressBar();
    CheckCalRemaingColor();
    cross.addEventListener('click', deleteWorkout)

})

addWork.addEventListener('click', () => {
    const node = document.createElement("div");
    node.classList.add('border');
    node.classList.add('p-4')
    node.classList.add('my-1')
    node.classList.add('flex')
    node.classList.add('items-center')
    node.classList.add('rounded-md')
    const textnode = document.createElement("div");
    textnode.innerText = workInput.value
    const textnode2 = document.createElement("div");
    textnode2.classList.add('bg-green-600')
    textnode2.classList.add('px-4')
    textnode2.classList.add('py-1')
    textnode2.classList.add('rounded-md')
    textnode2.innerText = workCalInput.value
    const cross = document.createElement("div");
    cross.innerText = '❌'
    cross.classList.add('cursor-pointer');
    node.classList.add(`justify-between`)
    node.appendChild(textnode);
    node.appendChild(textnode2);
    node.appendChild(cross);
    workout.appendChild(node)
    calBurned.innerText = Number(calBurned.innerText) + Number(workCalInput.value)
    TotalWorkCount += Number(workCalInput.value)
    gain_loss.innerText = ToalMealCount - TotalWorkCount;
    calRemain.innerText = Number(dailyCal.innerText) - Number(gain_loss.innerText)
    workCalInput.value = '';
    workInput.value = '';
    CalculateProgressBar();
})

openMealForm.addEventListener('click', () => {
    mealForm.classList.toggle('hidden')
})
openWorkForm.addEventListener('click', () => {
    workoutForm.classList.toggle('hidden')
})
cancelbtn.addEventListener('click', () => {
    mealForm.classList.toggle('hidden')
})
cancelbtn2.addEventListener('click', () => {
    workoutForm.classList.toggle('hidden')
})

save.addEventListener('click', () => {
    closeModalFunction();
    dailyCal.innerText = calInput.value
    calInput.value = ''
})


class CalorieTracker {
    constructor() {
        this._calorieLimit = 2000;
        this._totalCal = 0;
        this._meals = [];
        this._workout = [];
        this._displayCaloriesTotal();
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCal += meal.calories
        this._render();
    }
    removeMeal() {
        this._meals.pop();
        this._render();
    }

    addWorkout(workout) {
        this._workout.push(workout);
        this._totalCal -= workout.calories
        this._render();
    }
    removeWorkout() {
        this._workout.pop();
        this._render();
    }

    _displayCaloriesTotal() {
        totalCal.innerText = this._totalCal
    }

    _render() {
        this._displayCaloriesTotal();
    }
}

class MealCl {
    constructor(name, calories) {
        this.name = name;
        this.calories = calories;
        this.id = Math.random().toString(16).slice(2);
    }
}

class workoutCl {
    constructor(name, calories) {
        this.name = name;
        this.calories = calories;
        this.id = Math.random().toString(16).slice(2);
    }
}
