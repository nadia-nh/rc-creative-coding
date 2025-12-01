const shadowOffset = 3

const shadowColor = '#00000035';
const buttonOnColor = '#FF5000';  // brigther orange
const buttonOffColor = '#F5555D'; // orange
const buttonBackgroundColor = '#F9E6CF'; // lighter pink
const buttonTextColorLight = '#FFFFFF';  // white
const buttonTextColorDark = '#F68187';   // pink

class Button {
  constructor(
    _positionX,
     _positionY,
     _width,
     _height,
     _radius,
    _circular) {
    this.positionX = _positionX;
    this.positionY = _positionY;
    this.buttonWidth = _width;
    this.buttonHeight = _height;
    this.buttonRadius = _radius;
    this.circular = _circular;
  }
  
  draw() {
    push()
    noStroke()
  
    fill(color(shadowColor));
    
    if (this.circular) {
      ellipse(this.positionX,
          this.positionY + shadowOffset,
          this.buttonRadius * 2,
          this.buttonRadius * 2);
    } else {
      rect(this.positionX,
           this.positionY + shadowOffset,
           this.buttonWidth,
           this.buttonHeight,
           this.buttonRadius);
    }
    
    pop()
  }
}

// Button with an on / off state
class StateButton extends Button {
  constructor(
    _positionX,
     _positionY,
     _width,
     _height,
     _radius,
     _textOff,
     _textOn,
     _textSize
  ) {
    super(_positionX, _positionY, _width, _height, _radius, false);
    this.textOff = _textOff;
    this.textOn = _textOn;
    this.buttonTextSize = _textSize;
  }
  
  draw(running) {
    super.draw();
    
    push();
    noStroke();
  
    fill(running ? color(buttonOnColor) : color(buttonOffColor));
    rect(this.positionX,
         this.positionY,
         this.buttonWidth,
         this.buttonHeight,
         this.buttonRadius);

    fill(color(buttonTextColorLight));
    textSize(this.buttonTextSize);
    let buttonText = running ? this.textOn : this.textOff;
    text(buttonText, this.positionX, this.positionY);
    pop();
  }
}

class IconButton extends Button {
  constructor(
    _positionX,
     _positionY,
     _radius,
     _iconText,
     _textSize
  ) {
    super(_positionX, _positionY, _radius, _radius, _radius, true);
    this.iconText = _iconText;
    this.buttonTextSize = _textSize;
  }
  
  draw() {
    super.draw();
    
    push();
    noStroke();
  
    // Button
    fill(color(buttonBackgroundColor));
    ellipse(this.positionX,
            this.positionY,
            this.buttonRadius * 2,
            this.buttonRadius * 2);

    // Icon
    fill(color(buttonTextColorDark));
    textSize(this.buttonTextSize);
    text(this.iconText, this.positionX, this.positionY + 1);
    pop();
  }
}
