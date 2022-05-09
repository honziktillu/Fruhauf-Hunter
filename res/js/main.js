import { Cursor, Background, Stack, Score, Countdown, HighScore } from "./ui/basic-ui.js";
import { Entity } from "./ui/entities.js";


const cursor = new Cursor();
const background = new Background();
const stack = new Stack();
const score = new Score();
const countdown = new Countdown(5);
const highscore = new HighScore();
const entity = new Entity(100, 100, "red");


const collisionObjects = [];

const times = [];
let fps;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = {};
let mouseX;
let mouseY;

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

canvas.addEventListener("mousemove", (e) => {
  const canvasPos = canvas.getBoundingClientRect();
  mouseX = (canvas.width / 100) * (((e.clientX - canvasPos.left) / (window.innerWidth - canvasPos.left * 2) / 100) * 10000);
  mouseY = (canvas.height / 100) * (((e.clientY - canvasPos.top) / (window.innerHeight - canvasPos.top * 2) / 100) * 10000);
});

canvas.addEventListener("click", (e) => {
  stack.shoot();
});

const gameLoop = () => {
  // Resize canvas
  resizeCanvas();

  // Clear canvas
  clearCanvas();

  // Update
  updateGame();

  // Render
  renderGame();

  calculateFps();

  window.requestAnimationFrame(gameLoop);
};

const resizeCanvas = () => {
  canvas.width = 1280;
  canvas.height = 720;
};

const clearCanvas = () => {
 background.draw(canvas, ctx);
};

const updateGame = () => {
  checkCursorCollision();
  entity.update(canvas);
  if (keys["KeyR"]) {
    keys["KeyR"] = false;
    stack.reload();
  }
};

const renderGame = () => {
  renderActiveEntities();
  entity.draw(ctx);
  countdown.draw(canvas, ctx);
  highscore.draw(canvas, ctx);
  stack.draw(canvas, ctx);
  score.draw(canvas, ctx);

  renderCursor();
};

const rn = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const spawnEntities = (numberOfEntities) => {
  /*for (let i = 0; i < numberOfEntities; i++) {
    collisionObjects.push(
      new Entity(
        rn(0, canvas.width),
        rn(0, canvas.height),
        rn(10, 50),
        rn(10, 50),
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`
      )
    );
  }*/
};

const renderActiveEntities = () => {
  collisionObjects.forEach((object) => {
    object.draw(ctx);
  });
};

const renderCursor = () => {
  cursor.draw(ctx, mouseX, mouseY);
};

const calculateFps = () => {
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  ctx.fillStyle = "black";
  ctx.font = "50px VT323";
  ctx.fillText(fps, 60, 60);
};

const checkCursorCollision = () => {
  collisionObjects.forEach((object) => {
    if (
      object.x < cursor.x + cursor.size.width &&
      object.x + object.size.width > cursor.x &&
      object.y < cursor.y + cursor.size.height &&
      object.y + object.size.height > cursor.y
    ) {
      //collision detected
      object.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
    } else {
      // its fine
    }
  });
};

window.onload = () => {
  resizeCanvas();
  //spawnEntities(1000);
  console.log(entity);
  entity.spawn(canvas);
  console.log(entity);
  window.requestAnimationFrame(gameLoop);
};
