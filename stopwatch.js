let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapStart = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

const clearLapsBtn = { disabled: true, addEventListener: () => {} };
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Resume';
  }
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  startTime = 0;
  lapStart = 0;
  isRunning = false;
  updateDisplay();
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
  clearLapsBtn.disabled = true;
  lapCount = 0;
}

function recordLap() {
  if (!isRunning) return;

  lapCount++;
  const currentLapTime = elapsedTime;
  const lapDuration = currentLapTime - lapStart;
  lapStart = currentLapTime;

  const lapElement = document.createElement('div');
  lapElement.classList.add('lap-item');
  lapElement.innerHTML = `
    <span class="lap-number">Lap ${lapCount}</span>
    <span class="lap-time">${formatTime(currentLapTime)}</span>
    <span class="lap-duration">+${formatTime(lapDuration)}</span>
  `;

  lapsContainer.appendChild(lapElement);
  clearLapsBtn.disabled = false;

  lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

function clearLaps() {

  lapCount = 0;
  lapStart = elapsedTime; 
  clearLapsBtn.disabled = true;
}


startBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});
stopBtn.addEventListener('click', pauseTimer);
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  } 

lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);
clearLapsBtn.addEventListener('click', clearLaps);


updateDisplay();