const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


function newTodo() {
	let text = prompt("New TODO:");
	addTodoItemToList( text );
  increaseItemCountSpan();
  increaseUncheckedCountSpan();
}

function createDoneCheckBox(){
	let checkbox = document.createElement("input");
	checkbox.classList.add(classNames.TODO_CHECKBOX);
	checkbox.type = "checkbox"; 
	checkbox.onclick = function(){
		if(this.checked) 
			decreaseUncheckedCountSpan();
		else
			increaseUncheckedCountSpan();
	};
	return checkbox;
}

function createRemoveButton(li,todoText,checkbox){
	let removeButton = document.createElement("input");
  removeButton.type = "button";
  removeButton.value = "Delete";
  removeButton.classList.add(classNames.TODO_DELETE);
  removeButton.onclick = function(){
  		list.removeChild(li);
  		decreaseItemCountSpan();
  		if( !checkbox.checked ){
  			decreaseUncheckedCountSpan();
  		}
  };
  return removeButton;
}

function createTodoTextField( myNewTodo ){
  let span = document.createElement("span");
	let todoText = document.createTextNode(myNewTodo);
  span.appendChild(todoText);
  span.classList.add(classNames.TODO_TEXT);
  return span;
}

function addTodoItemToList( myNewTodo ){

	let li = document.createElement("li");
  li.classList.add(classNames.TODO_ITEM);

	let checkbox = createDoneCheckBox();
	li.appendChild(checkbox);
    
	let todoText = createTodoTextField(myNewTodo);
  li.appendChild(todoText);
  	
  let removeButton = createRemoveButton(li,todoText,checkbox);
  li.appendChild(removeButton);
    
  list.appendChild(li);
}

function increaseItemCountSpan(){
	increaseCounter(itemCountSpan);
}
  	
function increaseUncheckedCountSpan(){
	increaseCounter(uncheckedCountSpan);
}

function decreaseItemCountSpan(){
	decreaseCounter(itemCountSpan);
}

function decreaseUncheckedCountSpan(){
	decreaseCounter(uncheckedCountSpan);
}

function decreaseCounter( counterSpan ){
	counterSpan.innerText--;
}

function increaseCounter( counterSpan ){
	counterSpan.innerText++;
}

