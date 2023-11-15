const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const grid = 16;
let count = 0;

const snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};

const apple = {
  x: 320,
  y: 320,
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const loop = () => {
  requestAnimationFrame(loop);

  if (++count < 3) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = "green";
  snake.cells.forEach((cell, index) => {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandom(0, 25) * grid;
      apple.y = getRandom(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandom(0, 25) * grid;
        apple.y = getRandom(0, 25) * grid;
      }
    }
  });
};

const leftBtn = document.getElementById("left");
const upBtn = document.getElementById("up");
const rightBtn = document.getElementById("right");
const downBtn = document.getElementById("down");

leftBtn.addEventListener("click", () => {
  if (snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
});

upBtn.addEventListener("click", () => {
  if (snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -grid;
  }
});

rightBtn.addEventListener("click", () => {
  if (snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
});

downBtn.addEventListener("click", () => {
  if (snake.dy === 0) {
    snake.dx = 0;
    snake.dy = grid;
  }
});

document.addEventListener("keydown", function (e) {
  // left
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up
  else if (e.which === 38 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -grid;
  }
  // right
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down
  else if (e.which === 40 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = grid;
  }
});

requestAnimationFrame(loop);
