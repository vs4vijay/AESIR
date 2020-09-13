'use strict';

// CONFIGURATION
const config = {
  SERVER_ADDRESS: 'http://localhost:9000',
  FRAME_RATE: 30,
  CUBE_EVENTS: {
    ROTATION_UPDATED: 'cube.rotation_updated',
    COLOR_UPDATED: 'cube.color_updated'
  }
}

// APPLICATION CODEBASE
let socket;
let font;
let button;
let backgroundColor = 220;
const cube = {
  position: {
    X: 100,
    Y: 100,
    Z: 100,
  },
  rotation: {
    X: 100,
    Y: 100,
    Z: 100,
  },
  color: {
    R: 250,
    G: 10,
    B: 10,
  }
};
const sliders = {};

function preload() {
  font = loadFont('fonts/Inconsolata.ttf');
}

function setup() {
  console.log('Setup');

  createCanvas(600, 600, WEBGL);

  textFont(font);
  textSize(32);

  frameRate(config.FRAME_RATE);

  initUI();
  initSocket();
}

function draw() {
  background(backgroundColor);

  fill(100);
  text('FPS: ' + Math.ceil(frameRate()), 180, 290);

  // Paint Color
  // normalMaterial();
  fill(cube.color.R, cube.color.G, cube.color.B);

  // Apply Rotation
  cube.rotation.X = sliders.X.value();
  cube.rotation.Y = sliders.Y.value();
  cube.rotation.Z = sliders.Z.value();

  rotateX(cube.rotation.X);
  rotateY(cube.rotation.Y);
  rotateZ(cube.rotation.Z);
  // translate(cube.position.X, cube.position.Y, cube.position.Z);

  // Draw Box
  stroke(30);
  box(200, 200, 200);
}

function initUI() {
  // Create Sliders
  ['X', 'Y', 'Z'].forEach((axis, index) => {
    sliders[axis] = createSlider(0, 255, 100);
    const posX = 10 * (index * 20 + 1);
    const posY = 10;
    sliders[axis].position(posX, posY);
    text(axis, posX, posY + 200);
    sliders[axis].style('width', '100px');

    sliders[axis].mouseMoved(() => {
      socket.emit(config.CUBE_EVENTS.ROTATION_UPDATED, cube.rotation);
    });
    sliders[axis].mouseClicked(() => {
      socket.emit(config.CUBE_EVENTS.ROTATION_UPDATED, cube.rotation);
    });
  });

  // Create Button
  button = createButton('Randomize Color');
  button.position(10, 40);
  button.mousePressed(randomizeColor);
}

function initSocket() {
  socket = io.connect(config.SERVER_ADDRESS);

  socket.on(config.CUBE_EVENTS.COLOR_UPDATED, data => {
    cube.color.R = data.R;
    cube.color.G = data.G;
    cube.color.B = data.B;
  });

  socket.on(config.CUBE_EVENTS.ROTATION_UPDATED, data => {
    sliders.X.value(data.X);
    sliders.Y.value(data.Y);
    sliders.Z.value(data.Z);
  });
}

function randomizeColor() {
  cube.color.R = random(255);
  cube.color.G = random(255);
  cube.color.B = random(255);

  socket.emit(config.CUBE_EVENTS.COLOR_UPDATED, cube.color);
}

function mouseClicked(event) {
  if(event.target.tagName === 'CANVAS') {
    randomizeColor();
  }
}


