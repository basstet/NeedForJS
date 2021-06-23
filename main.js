const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.game-area'),car = document.createElement('div'); // создаем машинку

car.classList.add('car');

start.addEventListener('click', startGame); // клик по элементу
document.addEventListener('keydown', startRun); // нажатие любой клавиши на клавиатуре
document.addEventListener('keyup', stopRun); // отпускание кнопки

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 3
};

function startGame() {
  start.classList.add('hide'); // прячем кнопку старт
  setting.start = true;
  gameArea.appendChild(car); // добавляем дочерний элемент (машинку)
  requestAnimationFrame(playGame); // говорит браузеру, что мы хотим выполнить анимацию, и просит его запланировать перерисовку на следующем кадре анимации
}

function playGame() {
  console.log('Play!');
  if (setting.start) { // если setting.start === true
    requestAnimationFrame(playGame); // рекурсия, чтобы анимация не останавливалась
  }
}

function startRun(event) {
  event.preventDefault(); // запретить стандартное поведение браузера
  // console.log(event); // event покажет объект, в котором можно увидеть какие события произошли
  // console.log(event.key); // показывает какая клавиша была нажата
  keys[event.key] = true;
}

function stopRun(event) {
  console.log('stop');
  keys[event.key] = false;
}