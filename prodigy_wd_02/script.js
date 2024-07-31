let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 1000);
    startStopBtn.textContent = 'Pause';
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    difference = 0;
    lapCounter = 0;
    laps.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function recordLap() {
    lapCounter++;
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
        running = true;
    } else {
        pauseStopwatch();
        running = false;
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
