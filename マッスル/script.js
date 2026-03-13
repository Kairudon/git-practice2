const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// 障害物用の画像を読み込み
const obstacleImage = new Image();
obstacleImage.src = 'muscle.jpg'

// リセットボタンの参照
const restartButton = document.getElementById('restart-button');

const huhuImage = new Image();
huhuImage.src = 'huhu.png';

canvas.width = 1600;
canvas.height = 800;

let score = 0;
let gameOver = false;

const muscleMan = {
    x: 50,
    y: canvas.height / 2 - 150,
    width: 100,
    height: 100,
    color: 'red',
    speed: 10,
};

const obstacles = [];

function createObstacle() {
    const size = Math.random() * 50 + 100;
    const obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - size),
        width: size,
        height: size,
        color: 'black',
        speed: 3 + Math.random() * 2,
    };
    obstacles.push(obstacle);
}

function drawMuscleMan() {
    ctx.drawImage(huhuImage,muscleMan.x, muscleMan.y, muscleMan.width, muscleMan.height);
    ctx.strokeStyle = 'black'; // 線の色（青色）
    ctx.lineWidth = 2;       // 線の太さ
    ctx.strokeRect(muscleMan.x, muscleMan.y, muscleMan.width, muscleMan.height);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        // 画像で描画
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= obstacle.speed;
    });
    
    // Remove off-screen obstacles
    while (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
        score += 10;
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

// ゲームオーバー時の処理を修正
function checkCollision() {
    for (let obstacle of obstacles) {
        if (
            muscleMan.x < obstacle.x + obstacle.width &&
            muscleMan.x + muscleMan.width > obstacle.x &&
            muscleMan.y < obstacle.y + obstacle.height &&
            muscleMan.y + muscleMan.height > obstacle.y
        ) {
            gameOver = true;
            document.getElementById('game-over').style.display = 'block'; // Game Over 表示
            restartButton.style.display = 'block'; // ボタンを表示
        }
    }
}

// リセットボタンのクリックイベント
restartButton.addEventListener('click', () => {
    // 遷移先を指定
    window.location.href = 'index2.html'; // 別のページに移動
});

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMuscleMan();
    drawObstacles();

    moveObstacles();
    checkCollision();
}

function gameLoop() {
    update();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && muscleMan.y > 0) {
        muscleMan.y -= muscleMan.speed;
    } else if (e.key === 'ArrowDown' && muscleMan.y + muscleMan.height < canvas.height) {
        muscleMan.y += muscleMan.speed;
    }
});

setInterval(createObstacle, 1000);
gameLoop();
