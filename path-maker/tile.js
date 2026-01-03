const TileType = Object.freeze({
  GRASS: 'GRASS',
  SOIL: 'SOIL',
  WATER: 'WATER',
  ROCK: 'ROCK',
});

const tileToColor = {
  GRASS: '#49c46d',  // bright green
  SOIL: '#6b4b3e',  // warm brown
  WATER: '#4da6ff', // blue
  ROCK: '#bfbfbf',  // light gray
}

const nextTileInCycle = {
  GRASS: TileType.SOIL,
  SOIL: TileType.WATER,
  WATER: TileType.ROCK,
  ROCK: TileType.GRASS,
}

class Tile {
  constructor(_tileType) {
    this.tileType = _tileType
  }
  
  getColor() {
    return color(tileToColor[this.tileType]);
  }
  
  cycle() {
    this.tileType = nextTileInCycle[this.tileType];
  }
}
