const stemWidthModifier = 0.05;
const stemHeightModifier = 3.5;
const stemRadius = 2;
const petalOffsetModifier = 0.45;
const centerModifier = 0.7;

const stemColor = '#5AC54F'; // green
const petalsColor = '#FFEB57'; // yellow
const centerColor = '#FFA214'; // orange

class Flower {
  constructor() {
    
  }
  
  draw(x, y, size, angle) {
    push();
    noStroke();

    // Stem
    fill(color(stemColor));
    rect(x,
         y + size * 0.8,
         size * stemWidthModifier,
         size * stemHeightModifier,
         stemRadius);

    // Petals
    translate(x, y);
    rotate(angle);
    fill(color(petalsColor));
    const offset = size * petalOffsetModifier;
    ellipse(- offset, 0, size, size);
    ellipse(offset, 0, size, size);
    ellipse(0, - offset, size, size);
    ellipse(0, offset, size, size);

    // Center
    fill(color(centerColor));
    ellipse(0, 0, size * centerModifier, size * centerModifier);

    pop();
  }
}

class FlowerWithMovement extends Flower {
  constructor(_petalSize, _maxAngle, _noiseTimeScale) {
    super();
    this.petalSize = _petalSize;
    this.maxAngle = _maxAngle;
    this.noiseTimeScale = _noiseTimeScale;
  }
  
  draw(x, y, t, progress, move) {
    const sizeScale = 0.4 + 0.6 * progress;
    const noiseInput = t * this.noiseTimeScale;
    const n = noise(noiseInput);
    const swayAngle = move ? (n - 0.5) * 2 * this.maxAngle : 0;
  
    super.draw(x, y, this.petalSize * sizeScale, swayAngle);
  }
}
