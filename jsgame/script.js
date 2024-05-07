const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

score = 0;
frogImage = new Image();
frogImage.src = "imgs/frog.png";

mashroomImage = new Image();
mashroomImage.src = "imgs/mashroom.png";

mashroomImage2 = new Image();
mashroomImage2.src = "imgs/mashroom2.png";
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
  y: canvas.width / 2,
  x: Math.random() * canvas.width,
  width: 50,
  height: 50,
  color: "brown",
  image: mashroomImage,
};

const mushroom2 = {
  y: canvas.width / 2,
  x: Math.random() * canvas.width,
  width: 50,
  height: 50,
  color: "brown",
  image: mashroomImage2,
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

function drawMushroomBad() {
  ctx.drawImage(
    mushroom.image,
    mushroom.x - frog.width / 2,
    mushroom.y - frog.height / 2,
    mushroom.width,
    mushroom.height,
  );
}

function drawMushroomGood() {
  ctx.drawImage(
    mushroom2.image,
    mushroom2.x - frog.width / 2,
    mushroom2.y - frog.height / 2,
    mushroom2.width,
    mushroom2.height,
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
    while (Math.abs(mushroom2.x - mushroom.x) < frog.width * 2.5) {
      mushroom.x = Math.random() * canvas.width;
      mushroom.y = 20;
    }
  }
  if (checkCollision(frog, mushroom2)) {
    mushroom2.x = Math.random() * canvas.width;
    mushroom2.y = 20;
    console.log(Math.abs(mushroom2.x - mushroom.x));
    while (Math.abs(mushroom2.x - mushroom.x) < frog.width * 2.5) {
      mushroom2.x = Math.random() * canvas.width;
      mushroom2.y = 20;
      console.log(Math.abs(mushroom2.x - mushroom.x));
    }
    score += 1;
  }
}

function updateMushroom(mushroom) {
  let gravity = 1 + 0.03 * score;
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

function drawScore() {
  ctx.font = "24px Arial"; // Set font size and style
  ctx.fillStyle = "black"; // Set text color
  ctx.fillText("Score: " + score, 20, 40); // Draw score text
}

function update() {
  clearCanvas();
  drawFrog();
  drawMushroomGood();
  drawMushroomBad();
  handleCollisions();
  updateMushroom(mushroom);
  updateMushroom(mushroom2);
  updateFrog();
  drawScore();
}

setInterval(update, 10);
