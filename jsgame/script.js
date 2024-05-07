const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

frogImage = new Image();
frogImage.src = "imgs/frog.png";

mashroomImage = new Image();
mashroomImage.src = "imgs/mashroom.png";

const frog = {
  x: canvas.width / 2,
  y: canvas.height - canvas.height * 0.05,
  width: canvas.height * 0.1,
  height: canvas.height * 0.1,
  color: "green",
  image: frogImage,
  direction: 0,
};

const mushroom = {
  x: canvas.width / 2,
  y: 20,
  width: 50,
  height: 50,
  color: "brown",
  image: mashroomImage,
};

function drawFrog() {
  ctx.drawImage(
    frog.image,
    frog.x - frog.width / 2,
    frog.y - frog.height / 2,
    frog.width,
    frog.height,
  );
}

function drawMushroom() {
  ctx.drawImage(
    mushroom.image,
    mushroom.x - frog.width / 2,
    mushroom.y - frog.height / 2,
    mushroom.width,
    mushroom.height,
  );
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function handleCollisions() {
  if (checkCollision(frog, mushroom)) {
    mushroom.x = Math.random() * canvas.width;
    mushroom.y = 20;
  }
}

function updateMushroom() {
  const gravity = 1;
  mushroom.y += gravity;

  if (mushroom.y > canvas.height) {
    mushroom.x = Math.random() * canvas.width;
    mushroom.y = 20;
  }
}

function updateFrog() {
  const speed = 1;
  frog.x += 1 * frog.direction;
  if (frog.x > canvas.width || frog.x < 1) {
    frog.direction = 0;
  }
}

function left() {
  frog.direction = -1;
}

function right() {
  frog.direction = 1;
}

function update() {
  clearCanvas();
  drawFrog();
  drawMushroom();
  handleCollisions();
  updateMushroom();
  updateFrog();
}

setInterval(update, 10);
