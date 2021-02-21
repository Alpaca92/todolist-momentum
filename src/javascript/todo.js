const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoPending = document.querySelector(".js-pending"),
      toDoFinished = document.querySelector(".js-finished");

const PENDING_KEY = "PENDING",
      FINISHED_KEY = "FINISHED";

let PENDING = [],
    FINISHED = [];

function returnToDo(event) {
  const btn = event.target,
        li = btn.parentNode,
        nodes = li.childNodes,
        redecoratedNode = nodes[0].textContent;

  toDoFinished.removeChild(li);

  const cleanFinished = FINISHED.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  FINISHED = cleanFinished;
  
  paintPending(redecoratedNode);
  saveFinished();
  savePending();
}

function didToDo(event) {
  const btn = event.target,
        li = btn.parentNode,
        nodes = li.childNodes,
        redecoratedNode = nodes[0].textContent;

  toDoPending.removeChild(li);

  const cleanPending = PENDING.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  PENDING = cleanPending;

  paintFinished(redecoratedNode);
  savePending();
  saveFinished();
}

function deleteFinished(event) {
  const btn = event.target,
        li = btn.parentNode;

  toDoFinished.removeChild(li);

  const cleanFinished = FINISHED.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  FINISHED = cleanFinished;
  saveFinished();
}

function deletePending(event) {
  const btn = event.target,
        li = btn.parentNode;

  toDoPending.removeChild(li);

  const cleanPending = PENDING.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  PENDING = cleanPending;
  savePending();
}

function saveFinished() {
  localStorage.setItem(FINISHED_KEY, JSON.stringify(FINISHED) );
}

function savePending() {
  localStorage.setItem(PENDING_KEY, JSON.stringify(PENDING) );
}

function paintFinished(text) {
  const li = document.createElement("li"),
        returnBtn = document.createElement("button"),
        delBtn = document.createElement("button"),
        span = document.createElement("span"),
        
        RANDOM_NUM = Math.floor(Math.random() * 1000),
        newId = RANDOM_NUM * RANDOM_NUM,

        toDoObj = {
          text: text,
          id: newId,
        };

  returnBtn.innerText = "➰";
  returnBtn.addEventListener("click", returnToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(returnBtn);
  li.appendChild(delBtn);
  li.id = newId;

  toDoFinished.appendChild(li);

  FINISHED.push(toDoObj);
  saveFinished();
}

function paintPending(text) {
  const li = document.createElement("li"),
        didBtn = document.createElement("button"),
        delBtn = document.createElement("button"),
        span = document.createElement("span"),
        
        RANDOM_NUM = Math.floor(Math.random() * 1000),
        newId = RANDOM_NUM * RANDOM_NUM,

        toDoObj = {
          text: text,
          id: newId,
        };

  didBtn.innerText = "✔";
  didBtn.addEventListener("click", didToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletePending);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(didBtn);
  li.appendChild(delBtn);
  li.id = newId;

  toDoPending.appendChild(li);

  PENDING.push(toDoObj);
  savePending();
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = toDoInput.value;

  paintPending(currentValue);
  toDoInput.value = "";
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISHED_KEY);

  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);

    parsedFinished.forEach(function(todo) {
      paintFinished(todo.text);
    })
  }
}

function loadPending() {
  const loadedPending = localStorage.getItem(PENDING_KEY);

  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);

    parsedPending.forEach(function(todo) {
      paintPending(todo.text);
    })
  }
}

function init() {
  loadPending();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();