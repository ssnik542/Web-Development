const button = document.querySelector("#submit")
const showNumberofitems = document.querySelector(".todonr b")
//console.log(showNumberofitems);
const todolist = document.querySelector("#list");
const items = todolist.children;
//console.log(items);
const nameinput = document.querySelector(".nminput");


button.addEventListener("click",function(e){
    //alert("clicked");
    //ye page reload hora tha esilye dala hai preventdefault
    e.preventDefault();
    const mewitem = document.createElement('li');
    mewitem.classList.add("item");
   // let x = items.length +1 ;
    mewitem.innerText = nameinput.value;
    todolist.appendChild(mewitem);
    //delete the value from the input
    nameinput.value="";
    //create a element and attached the listner 
    mewitem.addEventListener("click",deleteitem);
    showNumberofitems.innerText = items.length; 
})
function deleteitem(e)
{
    e.stopPropagation();
    e.target.remove();
    showNumberofitems.innerText = items.length; 
}
todolist.addEventListener('click',function(){
    console.log("ul is hit");
    todolist.classList.toggle("fade");
})