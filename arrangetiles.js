var tileW, tileH;

// set number of cols and rows——these should be proportional to number of canvas pixels to avoid spacing and cutoff edges
var tileCols = 45;
var tileRows = 30;

// change color combo
var color1 = "black"; // main color
var color2 = "white"; // background color
var color3 = "#95C623"; // to make certain shapes specific color
var tiles;

function setup() {
  //set canvas to any size
  //createCanvas(600, 400);
  createCanvas(1000, 1000);
  setupBaseTiles();

  background(color2);
  tileCanvasWidth = 600;
  tileCanvasHeight = 400;
  tileW = tileCanvasWidth / tileCols;
  tileH = tileCanvasHeight / tileRows;
  tileXStart = 0;
  tileYStart = 0;

  let mySelect;

  mySelect = createSelect();
  mySelect.position(325, 410);

  //mySelect.option("5 x 5");
  mySelect.option("15 x 10");
  mySelect.option("30 x 20");
  mySelect.option("45 x 30");

  mySelect.selected("45 x 30");

  let myPicker;
  picker1 = createColorPicker(color1);
  picker1.position(125, 410);
  let c1 = picker1.color();
  picker2 = createColorPicker(color2);
  picker2.position(225, 410);
  let c2 = picker2.color();
  color2 = c2;

  let button = createButton("new");
  button.position(425, 410);

  button.mousePressed(() => {
    let e = mySelect.selected();
    if (e == "15 x 10") {
      tileCols = 15;
      tileRows = 10;
    } else if (e == "30 x 20") {
      tileCols = 30;
      tileRows = 20;
    } else if (e == "45 x 30") {
      tileCols = 45;
      tileRows = 30;
    }
    clear();
    tileW = tileCanvasWidth / tileCols;
    tileH = tileCanvasHeight / tileRows;
    tiles = arrangeWithConstraints();

    color1 = picker1.color();
    color2 = picker2.color();
    setupBaseTiles();
    drawTiles();
  });

  tiles = arrangeWithConstraints();
  drawTiles();
}

function arrangeWithConstraints() {
  console.log("Making new grid of size:", tileRows, tileCols);

  var arr = [];
  for (let i = 0; i < tileRows; i++) {
    arr[i] = [];
    for (let j = 0; j < tileCols; j++) {
      arr[i][j] = -1;
    }
  }

  const down = new Set([4, 5, 6, 7, 9, 11, 13, 15]);
  const right = new Set([2, 3, 6, 7, 10, 11, 14, 15]);

  for (var row = 0; row < tileRows; row++) {
    for (var col = 0; col < tileCols; col++) {
      var tileThis = 0;

      if (row == 0 && col == 0) {
        // The top-left tile is totally random.
        tileThis = floor(Math.random() * 16);
        arr[row][col] = tileThis;
      } else {
        var possibleTiles = [0, 2, 4, 6];
        if (col == tileCols - 1) possibleTiles = [0, 4];
        if (row == tileRows - 1) possibleTiles = [0, 2];

        if (row != 0 && down.has(arr[row - 1][col])) {
          //if tile above is in down
          if (col != 0 && right.has(arr[row][col - 1])) {
            //if tile to left is in right
            possibleTiles = [12, 13, 14, 15]; // up and left
            if (col == tileCols - 1) possibleTiles = [12, 13];
            if (row == tileRows - 1) possibleTiles = [12, 14];
          } else {
            possibleTiles = [1, 3, 5, 7];
            if (col == tileCols - 1) possibleTiles = [1, 5];
            if (row == tileRows - 1) possibleTiles = [1, 3];
          }
        } else if (col != 0 && right.has(arr[row][col - 1])) {
          //if tile to left is in right
          possibleTiles = [8, 9, 10, 11];
          if (col == tileCols - 1) possibleTiles = [8, 9];
          if (row == tileRows - 1) possibleTiles = [8, 10];
        }
        var rand = floor(Math.random() * possibleTiles.length);
        tileThis = possibleTiles[rand];
        arr[row][col] = tileThis;
      }
    }
  }
  return arr;
}

const tileFunctions = [
  tile0,
  tile1,
  tile2,
  tile3,
  tile4,
  tile5,
  tile6,
  tile7,
  tile8,
  tile9,
  tile10,
  tile11,
  tile12,
  tile13,
  tile14,
  tile15,
];

function drawTiles() {
  console.log("Redrawing tiles now with size {} {}", tileRows, tileCols);

  for (var row = 0; row < tileRows; row++) {
    for (var col = 0; col < tileCols; col++) {
      var tile = tiles[row][col];
      var x = tileXStart + col * tileW + tileW / 2;
      var y = tileYStart + row * tileH + tileH / 2;
      var sx = tileW;
      var sy = tileH;

      tileFunctions[tile](x, y, sx, sy);
    }
  }
  console.log("Finished drawing");
}
