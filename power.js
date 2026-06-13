const themeBtn = document.querySelector('.btn-square');

const colors = [
    'bg-blue-50',
    'bg-green-50',
    'bg-yellow-50',
    'bg-pink-50',
    'bg-purple-50',
    'bg-orange-50',
    'bg-teal-50',
    'bg-lime-50',
    'bg-emerald-50',
    'bg-violet-50',
    'bg-fuchsia-50',
    'bg-rose-50',
    'bg-sky-50',
    'bg-amber-50',
    'bg-slate-100',
    'bg-gray-100',
    'bg-zinc-100',
];

function changeTheme(color) {
    // Remove all colors first
    colors.forEach(function (c) {
        document.body.classList.remove(c);
    });

    // Add the given color
    document.body.classList.add(color);
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// default color of page
changeTheme('bg-blue-50');

// pick a random color and apply it
themeBtn.addEventListener('click', function () {
    const randomColor = getRandomColor();
    changeTheme(randomColor);
});



// current day and date
function setTodayDate() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { timeZone: 'Asia/Dhaka', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    document.getElementById('today-date').innerText = date;
}

// Calling the time 
setTodayDate();


// Task Count and Activity Log

const taskCount = document.getElementById('task-count');
const completionCount = document.getElementById('completion-count');
const activityLogContainer = document.getElementById('activity-log-container');

const completedButtons = document.querySelectorAll('.complete-btn');

// This function gets the current Bangladesh time as a readable string
function getBangladeshTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return time;
}

// This function adds a new message to the activity log
function addToActivityLog(taskName) {
    const time = getBangladeshTime();

    const logItem = document.createElement('div');
    logItem.classList.add('px-4', 'py-3', 'border-b', 'border-gray-100');

    logItem.innerHTML = `<p class="text-xs">You have completed the task <strong>${taskName}</strong> at ${time}</p>`;

    activityLogContainer.appendChild(logItem);
}

// Clears history
const clearHistoryBtn = document.getElementById('clear-history-btn');

clearHistoryBtn.addEventListener('click', function () {
    activityLogContainer.innerHTML = '';
});

function handleComplete(button) {
    button.disabled = true;
    button.classList.add('opacity-50', 'cursor-not-allowed');

    let currentTasks = parseInt(taskCount.innerText);
    let currentCompleted = parseInt(completionCount.innerText);

    taskCount.innerText = currentTasks - 1;
    completionCount.innerText = currentCompleted + 1;

    // Takes the task name from the button's data-task attribute
    const taskName = button.getAttribute('data-task');
    addToActivityLog(taskName);
}

completedButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        handleComplete(button);
    });
});