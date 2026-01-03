class RoundedTile {
  constructor(
    _tileWidth,
    _tileHeight,
    _tileRadius,
    _tileMarginX,
    _tileMarginY) {
    this.tileWidth = _tileWidth;
    this.tileHeight = _tileHeight;
    this.tileRadius = _tileRadius;
    this.tileMarginX = _tileMarginX;
    this.tileMarginY = _tileMarginY;

  }
  
  draw(x, y, tile) {
    fill(tile.getColor());
    rect(x + this.tileMarginX,
         y + this.tileMarginY,
         this.tileWidth,
         this.tileHeight,
         this.tileRadius);
  }
}