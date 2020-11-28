var sortMap = {
	"High" : 1,
	"Medium" : 0,
	"Low" : -1
}

var priorityColorMap = {
	'High' : 'red',
	'Low' : 'lightgreen',
	'Medium' : 'skyblue'
}

var people = [
        {
            "name" : "Jim",
            "priority" : "Low"
        },
        {
            "name" : "Gary",
            "priority" : "Medium"
        },
        {
            "name" : "Andrew",
            "priority" : "Medium"
        },
        {
            "name" : "Bill",
            "priority" : "High"
        },
        {
            "name" : "Edward",
            "priority" : "Medium"
        }
    ]
var highToLowlist = people.sort((a,b) => sortMap[b.priority] - sortMap[a.priority]);

var onCompleteBtnClick = function(btn){
	var parentDiv = btn.target.parentElement;
	parentDiv.style.opacity = '0.5';
	parentDiv.getElementsByTagName('li')[0].style.textDecoration = 'line-through';
}

var ontrashButtonClick = function(btn){
	var el = btn.target.parentElement;
	el.style.position = 'relative';
	el.classList.add('trash');
	el.addEventListener('webkitAnimationEnd',function(){
			el.style.display = 'none';
			if(isNotesEmpty()){
				document.getElementById('banner-container').style.display='block';
			}
	});
	
}


var addNewToDo = function(evt){
	document.getElementById('banner-container').style.display='none';
	createNewNode();
	reArrangeToDos();
}

var createNewNode = function(){
	var inputBox = document.getElementById('input-do-data');
    var toDoData = inputBox.value;
	var dropDownIndex = document.getElementById('imortance').selectedIndex;
	var droDownValue = document.getElementById('imortance').options[dropDownIndex].text;
	
	removeDummyToDos();
	
	var todoDiv = createElement({
		'type' : 'div',
		'classList' : 'to-do-item'
	});
	
	todoDiv.data = {
		'value' : toDoData,
		'priority' : droDownValue
	}
	
	var iconDiv = createElement({
		'type' : 'div',
		'innerText' : ''
	});
	todoDiv.appendChild(iconDiv);
	
	todoDiv.appendChild(getFlagForPriority(todoDiv));
	
	const listItem = createElement({
		'type':'li',
		'innerText' :toDoData,
		'classList' : 'to-do'
	});
	todoDiv.appendChild(listItem);
	
	const completedButton = createElement({
		'type' : 'button',
		'innerHTML':'<i class="fas fa-check"></i>',
		'classList':'completed-btn',
		'evtListner':{listener:'click',handler:onCompleteBtnClick}
	});
	todoDiv.appendChild(completedButton);
	
	const trashButton = createElement({
		'type':'button',
		'innerHTML':'<i class="fas fa-trash"></i>',
		'classList':'trash-btn',
		'evtListner':{listener:'click',handler:ontrashButtonClick}
	});
	todoDiv.appendChild(trashButton)
	
	notes.appendChild(todoDiv);
	inputBox.value = "";
}

var removeDummyToDos = function(){
	var notes = document.getElementById("notes");
	var dummyToDos = document.querySelectorAll(".dummy-item");
	dummyToDos.forEach(x => notes.removeChild(x));
}

var getFlagForPriority = function(todoDiv){
	var el = document.createElement('i');
	el.classList.add('fa');
	el.classList.add('fa-lg');
	el.classList.add('fa-flag');
	el.style.position = 'relative';
	el.style.top = '10px';
	el.style.right = '20px';
	el.style.color = priorityColorMap[todoDiv.data.priority];
	return el;
}

var reArrangeToDos = function(){
	var todos = document.getElementById('notes').children;
	var totalChildren = todos.length;
	var sortedToDo = Array.prototype.slice.call(todos).sort((a,b)=>{
		return sortMap[b.data.priority] - sortMap[a.data.priority];
	});
	document.getElementById('notes').innerHTML = "";
	for(var i = 0; i < totalChildren; i++) {
		document.getElementById('notes').appendChild(sortedToDo[i]);
	}
	
}

var isNotesEmpty = function(){
	var isChildExist = true;
	var todos = document.getElementById('notes').children;
	Array.prototype.slice.call(todos).forEach(x => {if(x.style.display != 'none') isChildExist = false});
	return isChildExist;
}

var createElement = function(configObject){
	var newElt = document.createElement(configObject.type);
	newElt.classList.add(configObject.classList);
	if(configObject.innerText != null){
		newElt.innerText = configObject.innerText;
	}
	if(configObject.innerHTML != null){
		newElt.innerHTML = configObject.innerHTML;
	}
	if(configObject.evtListner != null){
		newElt.addEventListener(configObject.evtListner.listener,configObject.evtListner.handler);
	}
	return newElt;
}

