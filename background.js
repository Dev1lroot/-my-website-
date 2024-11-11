const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Массив для хранения объектов
const blobs = [];


function getRandomBrightColor() {
    const r = Math.floor(50 + Math.random() * 206);  // Красный от 50 до 255 (увеличивается от синего к фиолетовому/розовому)
    const g = Math.floor(Math.random() * 50);        // Зелёный от 0 до 50 (чтобы убрать зелёные оттенки)
    const b = Math.floor(200 + Math.random() * 55);  // Синий от 200 до 255 (чтобы всегда был сильным)
    const alpha = Math.random().toFixed(2);          // Альфа значение от 0.00 до 1.00

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Функция для создания объекта с произвольной неокруглой формой
function createBlob()
{
    const points = [];
    const pointCount = Math.max(4,3 + Math.floor(Math.random() * 7)); // Количество точек на blob (чем больше, тем сложнее форма)
    const radius = Math.random() * 200 + 200; // Радиус blob
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;
    
    for (let i = 0; i < pointCount; i++) {
        const angle = (Math.PI * 2 * i) / pointCount;
        const x = centerX + Math.cos(angle) * (radius + Math.random() * 50);
        const y = centerY + Math.sin(angle) * (radius + Math.random() * 50);
        points.push({ x, y });
    }
    
    return {
        points,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        gradientColor1: getRandomBrightColor(),
        gradientColor2: getRandomBrightColor(),
    };
}
// Функция для обновления размеров канваса
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// Функция для рисования блоба
function drawBlob(blob) {
    // Создаём градиент для blob
    const gradient = ctx.createLinearGradient(blob.points[0].x, blob.points[0].y, blob.points[3].x, blob.points[3].y);
    gradient.addColorStop(0, blob.gradientColor1);
    gradient.addColorStop(1, blob.gradientColor2);

    ctx.beginPath();
    ctx.moveTo(blob.points[0].x, blob.points[0].y);

    for (let i = 1; i < blob.points.length; i++) {
        ctx.lineTo(blob.points[i].x, blob.points[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}
// Функция для анимации blob'ов
function animateBlobs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст

    blobs.forEach(blob => {
        // Двигаем blob
        blob.points.forEach(point => {
            point.x += blob.dx;
            point.y += blob.dy;
          
            // Отскок от краёв канваса
            if (point.x < 0 || point.x > canvas.width) {
                blob.dx = -blob.dx;
            }
            if (point.y < 0 || point.y > canvas.height) {
                blob.dy = -blob.dy;
            }
        });

        drawBlob(blob);
    });
}
// Основная функция обновления
function updateCanvas() {
    resizeCanvas(); // Подгоняем под размер окна

    // Добавляем блобы, если их меньше 8
    if (blobs.length < 12) {
        blobs.push(createBlob());
    }

    animateBlobs(); // Запуск анимации
}

// Устанавливаем setInterval для постоянной анимации
setInterval(updateCanvas, 1000 / 60); // 60 FPS

// Обновление при изменении размера окна
window.addEventListener('resize', resizeCanvas);
