const ball = document.querySelector('.ball');
const goalkeeper = document.querySelector('.goalkeeper');
const shootLeftButton = document.getElementById('shoot-left');
const shootCenterButton = document.getElementById('shoot-center');
const shootRightButton = document.getElementById('shoot-right');
const resultText = document.getElementById('result');

shootLeftButton.addEventListener('click', () => {
    moveElements('left');
    showResult('left');
    showNextButton();
});

shootCenterButton.addEventListener('click', () => {
    moveElements('center');
    showResult('center');
    showNextButton();
});

shootRightButton.addEventListener('click', () => {
    moveElements('right');
    showResult('right');
    showNextButton();
});

function moveElements(position) {
    // ゴールキーパーとボールの位置を更新
    if (position === 'left') {
        goalkeeper.style.left = '75%';
        ball.style.left = '25%';
        ball.style.top = '20%';
    } else if (position === 'center') {
        goalkeeper.style.left = '25%';
        ball.style.left = '50%';
        ball.style.top = '20%';
    } else {
        goalkeeper.style.left = '75%';
        ball.style.left = '75%';
        ball.style.top = '20%';
    }
}

function showResult(position) {
    if (position === 'right') {
        resultText.textContent = 'Miss!！';
    } else {
        resultText.textContent = 'Goal!！';
    }
}

function showNextButton() {
    document.getElementById('next-button').style.display = 'block';
}



