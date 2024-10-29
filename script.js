const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const gameContainer = document.getElementById("gameContainer");
const paddleSpeed = 25; // Увеличенная скорость движения ракетки
let ballSpeedX = 3;
let ballSpeedY = 3;
let playerScore = 0;
let robotScore = 0;
const maxScore = 5;

// Обновление счёта на странице
function updateScore() {
  document.getElementById("score").textContent = `Игрок: ${playerScore} | Робот: ${robotScore}`;
}

// Завершение игры с сообщением
function endGame(winner) {
  alert(`${winner} выиграл!`);
  ballSpeedX = 0;
  ballSpeedY = 0; // Остановка движения мяча
}

// Движение ракетки
document.addEventListener("keydown", (event) => {
  const paddleRect = paddle.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();
  if (event.key === "ArrowLeft" && paddleRect.left > containerRect.left) {
    paddle.style.left = `${paddle.offsetLeft - paddleSpeed}px`;
  }
  if (event.key === "ArrowRight" && paddleRect.right < containerRect.right) {
    paddle.style.left = `${paddle.offsetLeft + paddleSpeed}px`;
  }
});

// Движение мяча
function moveBall() {
  const ballRect = ball.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();
  const paddleRect = paddle.getBoundingClientRect();

  // Проверка столкновения с верхней границей
  if (ballRect.top <= containerRect.top) {
    ballSpeedY *= -1;
  }

  // Проверка столкновения с боковыми границами
  if (ballRect.left <= containerRect.left || ballRect.right >= containerRect.right) {
    ballSpeedX *= -1;
  }

  // Проверка столкновения с ракеткой
  if (
    ballRect.bottom >= paddleRect.top &&
    ballRect.right >= paddleRect.left &&
    ballRect.left <= paddleRect.right
  ) {
    ballSpeedY *= -1;
    playerScore++;
    updateScore();
    // Проверка на достижение максимального счёта игроком
    if (playerScore >= maxScore) {
      endGame("Игрок");
      return;
    }
  }

  // Проверка на касание нижней границы (проигрыш игрока)
  if (ballRect.bottom >= containerRect.bottom) {
    robotScore++;
    updateScore();
    // Проверка на достижение максимального счёта роботом
    if (robotScore >= maxScore) {
      endGame("Робот");
      return;
    }
    resetBallPosition();
  }

  // Перемещение мяча
  ball.style.top = `${ball.offsetTop + ballSpeedY}px`;
  ball.style.left = `${ball.offsetLeft + ballSpeedX}px`;
  requestAnimationFrame(moveBall);
}

// Сброс позиции мяча после касания нижней границы
function resetBallPosition() {
  ball.style.top = '200px';
  ball.style.left = '300px';
  ballSpeedY = -Math.abs(ballSpeedY); // Установка направления вверх
}

moveBall();
updateScore();
