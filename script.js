const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
const addTaskBtn = document.getElementById("add-task-btn");
const clearAllBtn = document.getElementById("clear-all-btn");


function addTask(){
    if(inputBox.value === ''){
        alert("Please type something");
    }
    else{
        let li= document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML ="\u00d7";
        li.appendChild(span);

        let editSpan = document.createElement("span");
        editSpan.innerHTML = "✎";
        editSpan.classList.add("edit");
        li.appendChild(editSpan);

        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "×";
        deleteSpan.classList.add("delete");
        li.appendChild(deleteSpan);
        inputBox.value ="";
        saveData();

    }
   

}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    
    
    else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.classList.contains("edit")) {
        let li = e.target.parentElement;
        let newTask = prompt("Edit your task:", li.firstChild.textContent);
        if (newTask) {
            li.firstChild.textContent = newTask;
            saveData();
        }
    }

}, false);
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();
addTaskBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
clearAllBtn.addEventListener("click", function() {
    listContainer.innerHTML = '';
    saveData();
});


