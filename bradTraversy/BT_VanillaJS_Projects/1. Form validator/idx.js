const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const pass1 = document.getElementById("password");
const pass2 = document.getElementById("password2");

function showError(input, message) {
  const fcontrol = input.parentElement;
  fcontrol.className = "form-control error";
  const small = fcontrol.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const fcontrol = input.parentElement;
  fcontrol.className = "form-control success";
}
//check requiredfeild
function checkRequired(inputArr) {
  inputArr.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, ` ${getFieldName(element)} is required`);
    } else {
      showSuccess(element);
    }
  });
}
//checkLegnth
function checkLength(input, min) {
    if (input.value.length < min) {
      showError(input, ` ${getFieldName(input)} must be atleast ${min}`);
    }
  }
//check email
function checkEmail(input)
{
    const r ='@';
    if(r.test(input.value.trim()))
    {
        showSuccess(input);
    }
    else
    {
        showError(input, `email is not valid`);
    }
}
//check password match
function checkPassword(in1,in2)
{
    if(in1.value!==in2.value)
    {
        showError(in2, `password do not match`);
    }
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//event listner
form.addEventListener("submit", function (e) {
  e.preventDefault(); //by doing this it doesnt actually submit the form

  checkRequired([username, email, pass1, pass2]);
  checkLength(username, 5);
  checkLength(pass1, 7);
  checkPassword(pass1,pass2);
});
