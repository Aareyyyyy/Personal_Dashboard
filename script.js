
// Navbar

let navButtons = document.querySelectorAll(".nav-btn");
let sections = document.querySelectorAll("main section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sections.forEach(sec => sec.classList.remove("active")); 
    let target = btn.getAttribute("data-section");
    document.getElementById(target).classList.add("active"); 
  });
});

// Theme Toggle 

let themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}


// To-Do List

let todoInput = document.getElementById("todoInput");
let addTodo = document.getElementById("addTodo");
let todoList = document.getElementById("todoList");

function renderTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.textContent = todo;

    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    };

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

addTodo.addEventListener("click", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (todoInput.value.trim() !== "") {
    todos.push(todoInput.value.trim());
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    renderTodos();
  }
});

renderTodos();

// Quiz

let questions = [
  { q: "What is 2+2?", options: ["3", "4", "5"], answer: "4" },
  { q: "Which language runs in the browser?", options: ["Python", "JavaScript", "C++"], answer: "JavaScript" },
  { q: "What is HTML used for?", options: ["Styling", "Structure", "Logic"], answer: "Structure" }
];

let current = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore") || 0);

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let nextBtn = document.getElementById("nextBtn");
let scoreEl = document.getElementById("score");
let highScoreEl = document.getElementById("highScore");

highScoreEl.textContent = "HighScore : " + highScore;

function loadQuestion() {
  let q = questions[current];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(option) {
  if (option === questions[current].answer) {
    score++;
  }
  scoreEl.textContent = "Score : " + score;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    questionEl.textContent = `Quiz Over! You scored ${score} out of ${questions.length}`;
    optionsEl.innerHTML = "";
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScoreEl.textContent = "HighScore : " + score;
    }
  }
});

loadQuestion();
nextBtn.disabled = true;

// Stopwatch

let timeDisplay = document.getElementById("timeDisplay");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

let seconds = 0, minutes = 0, hours = 0;
let timerInterval = null;

function updateTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  let display = 
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
  timeDisplay.textContent = display;
}

startBtn.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTime, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = minutes = hours = 0;
  timeDisplay.textContent = "00:00:00";
});


// Notes

let addNote = document.getElementById("addNote");
let notesContainer = document.getElementById("notesContainer");

function renderNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.classList.add("note");
    div.textContent = note;

    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    };

    div.appendChild(delBtn);
    notesContainer.appendChild(div);
  });
}

addNote.addEventListener("click", () => {
  let newNote = prompt("Enter your note:");
  if (newNote) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
});

renderNotes();
