const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const text = document.getElementById("text")

const clearButton = document.getElementById("clearButton");

function createTask(inputValue) {
    // Создаем новый элемент для отображения введенного текста
    const taskItem = document.createElement("div");
    taskItem.className = "task-item"; // Добавляем класс для стилизации
    // Создаем элемент checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";

    // Создаем элемент для текста задачи
    const taskText = document.createElement("span");
    taskText.className = "text";
    taskText.textContent = inputValue;

    // Создаем кнопку "Close"
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.id = "closeButton"
    closeButton.className = "btn-close";
    closeButton.setAttribute("aria-label", "Close");

    addButton.textContent = "+"
    addButton.style.fontWeight = "bold"

  

    clearButton.style.display = "inline";


    // Добавляем созданные элементы внутрь элемента с id "text"
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(closeButton);
    text.appendChild(taskItem);
// Сохраняем данные в localStorage
saveDataToLocalStorage();

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
            // Переносим задачу вниз
            text.appendChild(taskItem);
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.color = "black";
        }
          // Сохраняем данные в localStorage при изменении состояния checkbox
          saveDataToLocalStorage();
    });

    closeButton.addEventListener("click", function() {
        // Получаем родительский элемент задачи
        const taskItem = this.parentElement;
        // Удаляем задачу из родительского элемента
        taskItem.remove();
          // Сохраняем данные в localStorage при изменении состояния checkbox
          saveDataToLocalStorage();
    });
}

    // Удаление всех задач и скрытие кнопки clearButton
clearButton.addEventListener("click", function() {

    text.innerHTML = "";
addButton.textContent = "Добавить"
clearButton.style.display = "none";
addButton.style.fontWeight = "100"
});

addButton.addEventListener("click", function() {
    // Получаем значение, введенное в input
    const inputValue = taskInput.value;
    if (inputValue === "") {
        alert("Введите задачу")
    } else {
        // Вызываем функцию для создания задачи
        createTask(inputValue);
        clearButton.addEventListener("click", function(){
            taskItem.remove()
              // Очистка localStorage
              document.querySelectorAll('.task-item').forEach(item => item.remove())
    localStorage.removeItem("tasks");
        })
        // Очищаем поле ввода после добавления текста
        taskInput.value = "";
    }
});

// Функция для сохранения данных в localStorage
function saveDataToLocalStorage() {
    const tasks = Array.from(document.getElementsByClassName("task-item"))
        .map(taskItem => ({
            text: taskItem.querySelector(".text").textContent,
            checked: taskItem.querySelector(".form-check-input").checked
        }));

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Проверяем, есть ли данные в localStorage при загрузке страницы
window.addEventListener("load", function() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            createTask(task.text); // Создаем задачи с текстом
            const taskItem = document.querySelector(".task-item:last-child");
            const checkbox = taskItem.querySelector(".form-check-input");
            if (task.checked) {
                checkbox.checked = true;
                taskItem.querySelector(".text").style.textDecoration = "line-through";
                taskItem.querySelector(".text").style.color = "gray";
            }
        });
    }
});

taskInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        // Получаем значение, введенное в input
        const inputValue = taskInput.value;
        if (inputValue === "") {
            alert("Введите задачу");
        } else {
            // Вызываем функцию для создания задачи
            createTask(inputValue);
            // Очищаем поле ввода после добавления текста
            taskInput.value = "";
        }
    }
});