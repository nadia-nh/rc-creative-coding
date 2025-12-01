// Pomodoro
// Click the "Plant" button to start
// Click the timer to increase the time
// Max 60 minutes, min 5 minutes
// Colors from:
// https://www.pixilart.com/palettes/the-cool-colors-24029

const canvasWidth = 400;
const canvasHeight = 600;

// Flower constants
const flowerX = canvasWidth / 2;
const flowerY = canvasHeight * 0.4;
const petalSize = 70;

const maxAngle = 0.20;
const noiseTimeScale = 0.25;

// History flower constants
const petalSizeMini = 12;
const historyFlowersMargin = 25;
const historyFlowersSpaceX = 25;
const historyFlowersSpaceY = 40;
const historyFlowersMaxPerRow = 15;
const historyMaxFlowers = 60;

// Timer text constants
const timerTextX = canvasWidth / 2;
const timerTextY = canvasHeight * 0.75;
const timerTextWidth = 180;
const timerTextHeight = 60;
const timerTextSize = 40;

const timerDurationMin = 5;
const timerDurationMax = 60;
const timerDurationStep = 5;

// Button constants
const buttonX = canvasWidth / 2;
const buttonY = canvasHeight * 0.9;
const buttonWidth = 180;
const buttonHeight = 60;
const buttonRadius = 16;
const buttonTextSize = 24;

// Cancel Icon constants
const cancelIconX = canvasWidth * 1 / 7;
const cancelIconY = buttonY;
const cancelIconRadius = 18;
const cancelIconTextSize = 20;

// Clear Icon constants
const clearIconX = canvasWidth * 6 / 7;
const clearIconY = buttonY;
const clearIconRadius = 18;
const clearIconTextSize = 20;

// Button shadows
const shadowOffsetY = 3

const backgroundColor = '#F68187';  // pink

let isRunning = false;
let startMs = 0;
let completedPomodoros = 0;
let timerDurationMinutes = 5;
let timerDurationMs = 0;

let flowerAnimated;
let timer;
let plantButton;
let cancelButton;
let clearButton;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  
  // Load saved value for completed pomodoros
  const saved = localStorage.getItem('completedPomodoros');
  if (saved !== null) {
    completedPomodoros = int(saved);
  }
  
  flowerAnimated = new FlowerWithMovement(
    petalSize,
    maxAngle,
    noiseTimeScale);
  timer = new Timer(
    timerTextX,
    timerTextY,
    timerTextWidth,
    timerTextHeight,
    timerTextSize
  );
  plantButton = new StateButton(
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight,
    buttonRadius,
    "Plant",
    "Growing...",
    buttonTextSize
  );
  cancelButton = new IconButton(
    cancelIconX,
    cancelIconY,
    cancelIconRadius,
    '⏹︎',
    cancelIconTextSize
  );
  clearButton = new IconButton(
    clearIconX,
    clearIconY,
    clearIconRadius,
    '↺',
    clearIconTextSize
  );
}

function draw() {
  background(color(backgroundColor));
  
  let progress = getProgressPercentage();

  flowerAnimated.draw(flowerX, flowerY, frameCount * 0.02, progress, isRunning);
  drawHistoryFlowers();
  timer.draw(progress, startMs, timerDurationMs, isRunning);
  plantButton.draw(isRunning);
  cancelButton.draw();
  clearButton.draw();
}

function getProgressPercentage() {
  timerDurationMs = timerDurationMinutes * timerDurationMultiplier;
  let progress = 0;
  if (isRunning) {
    const elapsed = millis() - startMs;
    progress = constrain(elapsed / timerDurationMs, 0, 1);
    // Stop the timer
    if (elapsed >= timerDurationMs) {
      isRunning = false;
      completedPomodoros++;
      localStorage.setItem('completedPomodoros', completedPomodoros);
    }
  }
  return progress;
}

function drawHistoryFlowers() {
  let flower = new Flower();
  for (let i = 0;
       i < min(completedPomodoros, historyMaxFlowers);
       i++) {
    const col = i % historyFlowersMaxPerRow;
    const row = floor(i / historyFlowersMaxPerRow);

    const x = historyFlowersMargin + col * historyFlowersSpaceX;
    const y = historyFlowersMargin + row * historyFlowersSpaceY;
    flower.draw(x, y, petalSizeMini, 0.0);
  }
}

function mousePressed() {
  const onButton = (
    mouseX > buttonX - buttonWidth / 2 &&
    mouseX < buttonX + buttonWidth / 2 &&
    mouseY > buttonY - buttonHeight / 2 &&
    mouseY < buttonY + buttonHeight / 2
  );
  
  const onTimer = (
    mouseX > timerTextX - timerTextWidth/2 &&
    mouseX < timerTextX + timerTextWidth / 2 &&
    mouseY > timerTextY - timerTextHeight / 2 &&
    mouseY < timerTextY + timerTextHeight / 2
  );
  
  const onCancelIcon = (
      dist(
        mouseX,
        mouseY,
        cancelIconX,
        cancelIconY) < cancelIconRadius
  );
  
  const onClearIcon = (
      dist(
        mouseX,
        mouseY,
        clearIconX,
        clearIconY) < clearIconRadius
  );

  if (onButton) {
    startPomodoro();
  }
  
  if (onTimer) {
    updateTimerDuration();
  }
  
  if (onCancelIcon) {
    cancelPomodoro();
  }
  
  if (onClearIcon) {
    resetPomodoros();
  }
}

function startPomodoro() {
  isRunning = true;
  startMs = millis();
}

function updateTimerDuration() {
  timerDurationMinutes += timerDurationStep;
  if (timerDurationMinutes > timerDurationMax) {
    timerDurationMinutes = timerDurationMin;
  }
}

function cancelPomodoro() {
  isRunning = false;
}

function resetPomodoros() {
  completedPomodoros = 0;
  localStorage.removeItem('completedPomodoros');
}
