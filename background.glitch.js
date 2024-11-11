const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Функция для масштабирования канваса под размер экрана
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Функция для рисования артефактов
function drawArtifacts() {
  const width = canvas.width;
  const height = canvas.height;

  // Количество артефактов
  const artifactCount = 100 + Math.random() * 200;

  for (let i = 0; i < artifactCount; i++) {
    // Случайные размеры и позиция для артефактов
    const x = Math.random() * width;
    const y = Math.random() * height;
    const artifactWidth = 10 + Math.random() * 30;
    const artifactHeight = 5 + Math.random() * 15;

    // Случайный цвет
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();

    // Устанавливаем цвет и рисуем прямоугольник
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.fillRect(x, y, artifactWidth, artifactHeight);
  }

  // Иногда можно рисовать случайные линии для большей хаотичности
  if (Math.random() > 0.7) {
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
}

// Анимация и обновление экрана
function animate() {
  // Очищаем экран перед следующим кадром
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем артефакты
  drawArtifacts();

  // Запрашиваем следующий кадр
  requestAnimationFrame(animate);
}

// Масштабируем канвас при изменении размера окна
window.addEventListener('resize', resizeCanvas);

// Первоначальное масштабирование
resizeCanvas();

// Запуск анимации
animate();