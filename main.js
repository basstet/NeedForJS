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
  speed: 3,
  traffic: 3
};

function getElementsQty(elementHeight) { // определяем сколько нужно линий на дороге
  return document.documentElement.clientHeight / elementHeight + 1; // делим высоту страницы на высоту полоски
}

function startGame() {
  start.classList.add('hide'); // прячем кнопку старт

  for (let i = 0; i < getElementsQty(90); i++) { // добавляем полосы разметки на дорогу
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 90) + 'px';
    line.y = i * 90;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getElementsQty(100 * setting.traffic); i++) { // добавляем машинки-враги
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'; // рандомное положение врагов по оси x
    enemy.style.top = enemy.y + 'px';
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car); // добавляем дочерний элемент (машинку)
  setting.x = car.offsetLeft; // получаем координаты машинки по оси x
  setting.y = car.offsetTop; // получаем координаты машинки по оси y
  requestAnimationFrame(playGame); // говорит браузеру, что мы хотим выполнить анимацию, и просит его запланировать перерисовку на следующем кадре анимации
}

function playGame() {
  if (setting.start) { // если setting.start === true
    moveRoad(); // чтобы дорога "продвигалась"
    moveEnemy(); // запускаем вражеские машинки
    if (keys.ArrowLeft && setting.x > 0) { // второе условие, чтобы машинка не выезжала за пределы игрового поля
      setting.x -= setting.speed; // машинка при нажатии клавиши едет влево с заданной скоростью
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed; // машинка при нажатии клавиши едет вправо с заданной скоростью
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed; // машинка при нажатии клавиши едет вперед с заданной скоростью
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed; // машинка при нажатии клавиши едет назад с заданной скоростью
    }
    car.style.left = setting.x + 'px'; // меняем стили, чтобы машинка двигалась влево-вправо
    car.style.top = setting.y + 'px'; // меняем стили, чтобы машинка двигалась вперед-назад
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

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(line) { // перебор всех элементов .line, line - dom-элемент
    line.y += setting.speed;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight) { // чтобы полоски не кончались
      line.y = -90;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item) {
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) { // чтобы вражеские машинки не кончались
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'; // рандомное положение врагов по оси x
    }
  });
}