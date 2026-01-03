// Simple path maker with rounded rectangle tiles
// The background is grass, and you can choose to add soil, water or rock
// Left click to change the current tile, also click and drag changes multiple tiles at once
// Tiles cycle through: grass -> soil -> water -> rock -> grass

const canvasWidth = 30;
const canvasHeight = 20;
const tileSize = 30;

const backgroundColor = '#49c46d';  // bright green

// Rounded tile constants
const filledTileSize = tileSize * 0.82;
const roundedTileRadius = tileSize / 6;
const margin = (tileSize - filledTileSize) / 2;

// Variables used for painting while dragging
let lastPaintedTileX = -1;
let lastPaintedTileY = -1;
let lastButton = null;

// Stores current world state
let world = [];
let roundedTile = new RoundedTile(filledTileSize,
                                filledTileSize,
                                roundedTileRadius,
                                margin,
                                margin);

function setup() {
  cnv = createCanvas(canvasWidth * tileSize, canvasHeight * tileSize);
  // disable the right click menu
  cnv.elt.addEventListener('contextmenu', (e) => e.preventDefault());

  noStroke();

  // Initialize with mostly grass
  for (let y = 0; y < canvasHeight; y++) {
    world[y] = [];
  
    for (let x = 0; x < canvasWidth; x++) {
      let tileType = random() > 0.7? TileType.GRASS : TileType.SOIL;
      world[y][x] = new Tile(tileType);
    }
  }
}

function draw() {
  const t = frameCount * 0.05;
  background(color(backgroundColor));

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      const worldState = world[y][x];
      const px = x * tileSize;
      const py = y * tileSize;
      roundedTile.draw(px, py, worldState);
    }
  }
}

function mousePressed() {
  lastPaintedTileX = -1;
  lastPaintedTileY = -1;
  lastButton = mouseButton;
  paintAt(mouseX, mouseY);
  return false; // prevents right-click context menu
}

function mouseDragged() {
  paintAt(mouseX, mouseY);
  return false;
}

function mouseReleased() {
  lastPaintedTileX = -1;
  lastPaintedTileY = -1;
  lastButton = null;
}

function paintAt(mx, my) {
  const gx = floor(mouseX / tileSize);
  const gy = floor(mouseY / tileSize);
  if (gx < 0 || gx >= canvasWidth) return;
  if (gy < 0 || gy >= canvasHeight) return;

  // Only paint when entering a new cell
  if (gx === lastPaintedTileX && gy === lastPaintedTileY) return;

  if (mouseButton === LEFT) {
    world[gy][gx].cycle();
  }

  lastPaintedTileX = gx;
  lastPaintedTileY = gy;
  lastButton = mouseButton;
}

