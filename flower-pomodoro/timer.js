const timerDurationMultiplier = 60 * 1000; // Minutes to ms

const timerTextColor = '#F9E6CF'; // light orange

class Timer {
  constructor(
    _positionX,
    _positionY,
    _width,
    _height,
    _textSize) {
    this.positionX = _positionX;
    this.positionY = _positionY;
    this.timerWidth = _width;
    this.timerHeight = _height;
    this.timerTextSize = _textSize;
  }
  
  draw(progress, startMs, timerDurationMs, isRunning) {
    let remainingMs = timerDurationMs;
    if (isRunning) {
      remainingMs = max(timerDurationMs - (millis() - startMs), 0);
    }

    const totalSec = floor(remainingMs / 1000);
    const minutes = nf(floor(totalSec / 60), 2);
    const seconds = nf(totalSec % 60, 2);

    fill(color(timerTextColor));
    textSize(this.timerTextSize);
    text(`${minutes}:${seconds}`,
       this.positionX,
       this.positionY);
  }
}
