// Tile size constants
const tileSize = 30;
const halfTileSize = tileSize / 2;

// Flower constants
const petalSize = 8;
const smallPetalSize = petalSize * 0.8;
const largePetalSize = petalSize * 1.2;
const stemWidth = 2;
const stemHeight = halfTileSize;
const stemColor = '#2e9f44'; // dark green

// Flower sway constants
const swayAmount = 1.3; // how many pixels of side-to-side movement
const swayXOffset = 0.2;
const swayYOffset = 0.1;


const FlowerType = Object.freeze({
  // Regular single round petal pink flower
  REGULAR_SINGLE_ROUND: 'REGULAR_SINGLE_ROUND',
  // Large single round petal violet flower
  BIG_SINGLE_ROUND: 'BIG_SINGLE_ROUND',
  // 4-petal cross yellow flower
  FOUR_PETAL_CROSS: 'FOUR_PETAL_CROSS',
  // No flower
  NONE: 'NONE',
});

const flowerToColor = {
  REGULAR_SINGLE_ROUND: '#ff78c7', // pink
  BIG_SINGLE_ROUND: '#a35bff', // violet
  FOUR_PETAL_CROSS: '#f4b942', // light orange
}

function getRandomFlowerType() {
  const index = Math.floor(random(0, 3));
  
  switch (index) {
    case 0: 
      return FlowerType.REGULAR_SINGLE_ROUND;
    
    case 1:
      return FlowerType.BIG_SINGLE_ROUND;
    
    case 2:
      return FlowerType.FOUR_PETAL_CROSS;
  }
}

class Flower {
  constructor() {
  }
  
  getColor(flowerType) {
    return color(flowerToColor[flowerType]);
  }
  
  // Draw one flower of given type with a slight sway per tile
  // Sway is offset by the grid so that the flowers are not in sync
  draw(x, y, t, flowerType) {
    if (flowerType == FlowerType.NONE) {
      return;
    }

    const px = x * tileSize;
    const py = y * tileSize;

    const sway = Math.sin(t + (x * swayXOffset) + (y * swayYOffset)) * swayAmount;

    // Center of tile
    const cx = px + halfTileSize + sway;
    const cy = py + halfTileSize;

    // Draw stem, shared for all flower types
    // Drawn from the center downward
    fill(stemColor);
    rect(cx - stemWidth / 2, cy, stemWidth, stemHeight);
    this.drawPetals(cx, cy, flowerType);
  }
  
  drawPetals(x, y, flowerType) {
    fill(this.getColor(flowerType));

    switch(flowerType) {
      case FlowerType.REGULAR_SINGLE_ROUND: {
        ellipse(x, y, petalSize, petalSize);
        break;
      }
        
      case FlowerType.BIG_SINGLE_ROUND: {
        ellipse(x, y, largePetalSize, largePetalSize);
        break;
      }
        
      case FlowerType.FOUR_PETAL_CROSS: {
        let offset = smallPetalSize * 0.6;
        ellipse(
          x - offset,
          y,
          smallPetalSize,
          smallPetalSize);
        ellipse(
          x + offset,
          y,
          smallPetalSize,
          smallPetalSize);
        ellipse(
          x,
          y - offset,
          smallPetalSize,
          smallPetalSize);
        ellipse(
          x,
          y + offset,
          smallPetalSize,
          smallPetalSize);
        break;
      }
    }
  }
}