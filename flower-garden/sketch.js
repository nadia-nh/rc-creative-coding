// Tiny flower garden, with left to right flower movement
// Left-click: plant a random flower on that tile
// Right-click: clear back to grass

// Grid setup
const canvasWidth = 30;
const canvasHeight = 20;

const grassColor = '#49c46d'; // bright green

// World: flower types
let world = [];

let flower;
let cnv;

function setup() {
  cnv = createCanvas(canvasWidth * tileSize, canvasHeight * tileSize);
  // prevent right-click menu on the canvas
  cnv.elt.addEventListener('contextmenu', (e) => e.preventDefault());
  
  flower = new Flower();

  noStroke();

  // Initialize with all grass
  for (let y = 0; y < canvasHeight; y++) {
    world[y] = [];
    for (let x = 0; x < canvasWidth; x++) {
      world[y][x] = FlowerType.NONE;
    }
  }
}

function draw() {
  background(grassColor);

  const t = frameCount * 0.05;

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      flower.draw(x, y, t, world[y][x]);
    }
  }
}

// Click to plant or clear
function mousePressed() {
  const gx = Math.floor(mouseX / tileSize);
  const gy = Math.floor(mouseY / tileSize);
  if (gx < 0 || gx >= canvasWidth) return;
  if (gy < 0 || gy >= canvasHeight) return;

  if (mouseButton === LEFT) {
    // Plant a random flower type
    world[gy][gx] = getRandomFlowerType();
  }

  if (mouseButton === RIGHT) {
    // Clear back to grass
    world[gy][gx] = FlowerType.NONE;
  }
}
