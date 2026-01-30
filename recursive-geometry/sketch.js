const MINIMUM_BRANCH_HEIGHT = 10;
const BRANCH_HEIGHT_MODIFIER = 0.7;
const BRANCH_WIDTH_MODIFIER = 0.65;
const STARTING_BRANCH_WIDTH = 10;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
}

function draw() {
  background(150, 120, 110, 200);
  noStroke();
  
  // Map the x mouse position to the angle of the branches
  let angle = map(mouseX, 0, width, 10, 30);
  // Map the y mouse position to the tree height
  let branchHeight = map(mouseY, 0, height, 130, 70);
  
  // Set the middle of the screen at the bottom
  // as the starting point
  translate(width / 2, height);
  
  // Recursive branching
  branch(branchHeight, STARTING_BRANCH_WIDTH, angle);
}

function branch(branchHeight, branchWidth, angle) {
  // Change color from green to brown
  let treeColor = color('rgb(255,160,80)')
  treeColor.setRed(red(treeColor) - branchHeight);
  treeColor.setGreen(green(treeColor) + branchWidth * 2);
  fill(treeColor);
  
  let radius = branchHeight / 10;
  // Draw a rounded rectangle representing a branch
  rect(-branchWidth / 2,
       0,
       branchWidth,
       -branchHeight,
       radius); 
  
  // Move to the top of the branch
  // Account for rounded edges to make the connection smooth
  translate(0, -branchHeight + radius / 2);
  
  if (branchHeight > MINIMUM_BRANCH_HEIGHT) {
    let newHeight = branchHeight * BRANCH_HEIGHT_MODIFIER;
    let newWidth = branchWidth * BRANCH_WIDTH_MODIFIER;

    // Right Branch
    push();
    rotate(angle);
    branch(newHeight, newWidth, angle);
    pop();
    
    // Left Branch
    push();
    rotate(-angle);
    branch(newHeight, newWidth, angle);
    pop();
  } else {
    // Stop growing and draw a circle
    // representing a leaf
    push();
    circle(0, 0, branchWidth * 10);
    pop();
  }
}
