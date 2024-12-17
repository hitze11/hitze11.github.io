// CSS im JavaScript definieren und anwenden

const style = document.createElement("style");
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }

    .app-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #333;
    }

    form {
        display: flex;
        margin-bottom: 20px;
    }

    #task-input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: 2px solid #ddd;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        background-color: #5cb85c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    li.completed span {
        text-decoration: line-through;
        color: #888;
    }

    li button {
        margin-left: 10px;
        background-color: #d9534f;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    li button:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }

    .done-button {
        background-color: #5cb85c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .done-button:hover {
        background-color: #4cae4c;
    }

    .info {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #777;
    }
`;

document.head.appendChild(style); // Füge das CSS zu head hinzu

// Array, das die Aufgaben speichert
let todos = [];

// Selektiere das Formular und das Eingabefeld
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// EventListener für das Formular hinzufügen
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";  // Eingabefeld nach dem Hinzufügen leeren
    }
});

// Funktion, um eine neue Aufgabe hinzuzufügen
function addTask(taskText) {
    // Erzeuge eine neue Aufgabe als Objekt
    const newTask = {
        id: Date.now(), // Verwende die aktuelle Zeit als einzigartige ID
        text: taskText,
        completed: false
    };

    // Füge die Aufgabe zum Todos-Array hinzu
    todos.push(newTask);

    // Render die Aufgabenliste neu
    renderTasks();
}

// Funktion, um die Aufgaben zu rendern
function renderTasks() {
    // Leere die Liste, bevor neue Aufgaben angezeigt werden
    taskList.innerHTML = "";

    // Iteriere über alle Aufgaben und erstelle die HTML-Elemente
    todos.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id; // ID der Aufgabe als data-Attribut setzen

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Aufgabe erledigen");
        checkbox.addEventListener("change", () => toggleCompletion(task.id));

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#888";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.setAttribute("aria-label", "Aufgabe löschen");
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        deleteButton.disabled = !task.completed; // Löschen-Button nur aktiv, wenn die Aufgabe erledigt ist

        // Der "Erledigt"-Button, der den Status der Aufgabe umschaltet
        const doneButton = document.createElement("button");
        doneButton.textContent = task.completed ? "ernuet hinzufügen" : "Erledigt";
        doneButton.setAttribute("aria-label", "Aufgabe als erledigt markieren");
        doneButton.classList.add("done-button");
        doneButton.addEventListener("click", () => toggleCompletion(task.id));

        // Füge alle Elemente zum Listeneintrag hinzu
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(doneButton);
        li.appendChild(deleteButton);

        // Füge den Listeneintrag zur Aufgabenliste hinzu
        taskList.appendChild(li);
    });
}

// Funktion, um den Status eines Auftrages zu ändern
function toggleCompletion(id) {
    const task = todos.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks(); // Liste neu rendern
}

// Funktion, um einen Eintrag zu löschen
function deleteTask(id) {
    // Filtere die Aufgabe aus dem Array
    todos = todos.filter(task => task.id !== id);
    renderTasks(); // Liste nach der Löschung neu rendern
}
