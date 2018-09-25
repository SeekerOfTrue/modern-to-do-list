  
const list = document.querySelector('#to-do-list');
const toDos = list.getElementsByTagName('li');
const addForm = document.getElementById('form-to-do');

// add to do
addForm.addEventListener('submit', function(e){
  e.preventDefault();
 
  const name = addForm.querySelector('input[type="text"]').value;
  const level = addForm.querySelector('select').value;

if(!name) {
  alert('Please fill the field first!');
  return false;
}

if(level=='lightgrey') {
  alert('Please select level of importance!');
  return false;
}

var expression = /[^a-zA-Z0-9 ]/;
let regex = new RegExp(expression);

if(name.match(regex)) {
  alert('Please use letters and numbers only, no punctuation or special characters');
  return false;
}

let toDo = {
  name: name,
  level: level,
  display: 'block',
  done: 'none'
}


if (localStorage.getItem('toDoList') === null) {
  let toDoList = [];
  toDoList.push(toDo);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
} else {
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
  toDoList.push(toDo);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

document.getElementById('form-to-do').reset();

fetchToDoList();

});


// display to do list
function fetchToDoList(){

  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
 
  list.innerHTML = '';
  for(let i = 0; i < toDoList.length; i++){
    let name = toDoList[i].name;
    let level = toDoList[i].level;
    let done = toDoList[i].done;
    let display = toDoList[i].display;
    
    list.innerHTML += `<li style="background-color:${level}; display: ${display} ">
                        <span class="name-to-do" style="text-decoration:${done};">${name}</span>
                        <span onclick="doneToDo('${name}')" class="doneBtn">Done</span>
                        <span onclick="deleteToDo('${name}')" class="deleteBtn">Delete</span>
                      </li>`     
    }
    hideBox.checked = false;
    searchBar.value = '';
}



// delete to do
function deleteToDo(name){

  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
 
  for(let i = 0;i < toDoList.length; i++){
    if(toDoList[i].name == name){
      toDoList.splice(i, 1);
    }
  }

  localStorage.setItem('toDoList', JSON.stringify(toDoList));

  fetchToDoList();
}

// done to do
function doneToDo(name){
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
 
  for(let i = 0;i < toDoList.length; i++){
    if(toDoList[i].name == name && toDoList[i].done == "none"){
      toDoList[i].done = "line-through";
    }
   else if(toDoList[i].name == name && toDoList[i].done == "line-through"){
    toDoList[i].done = "none";
    }
  }
  localStorage.setItem('toDoList', JSON.stringify(toDoList));

  fetchToDoList();
}


// hide some to dos
const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', (e) => {
    Array.from(toDos).forEach(toDo => {
      const levelColor = toDo.style.backgroundColor;
      const done = toDo.firstElementChild.style.textDecoration;
      
      if(hideBox.checked){
        toDo.style.display = 'none';
        if(done =='none' && levelColor == 'rgb(252, 211, 211)'){
          toDo.style.display = 'block';
        } 
        else {
          toDo.style.display = 'none';
        }
      }
      else {
        toDo.style.display = 'block';
      }
    });
  });
  
    
// filter to do list
const searchBar = document.querySelector('#search-books input');
searchBar.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  
  Array.from(toDos).forEach((toDo) => {
    const title = toDo.firstElementChild.textContent;
    if(title.toLowerCase().indexOf(e.target.value) != -1){
      toDo.style.display = 'block';
    } else {
      toDo.style.display = 'none';
    }
  });
});

// tabbed content
const tabs = document.querySelector('.tabs');
const panels = document.querySelectorAll('.panel');
tabs.addEventListener('click', (e) => {
  if(e.target.tagName == 'LI'){
    const targetPanel = document.querySelector(e.target.dataset.target);
    Array.from(panels).forEach((panel) => {
      if(panel == targetPanel){
        panel.classList.add('active');
      }else{
        panel.classList.remove('active');
      }
    });
  }
});

fetchToDoList();