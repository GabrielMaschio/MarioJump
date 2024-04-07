const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.count');
const start = document.querySelector('.start');
const scoreMax = document.querySelector('.max-score');


const gameBoard = document.querySelector('.game-board');
const gameStart = document.querySelector('.game-start');
const gameOver = document.querySelector('.game-over');
const gameReStart = document.querySelector('.game-re-start');

let playing = 0;
let scoreValue = 0;
let maxScore = 0;

const startGame = () => {
    playing = 1;

    pipe.classList.add('pipe-animation');

    gameBoard.style.cursor = 'none';
    gameStart.style.display = 'none';
    start.style.display = 'none';

    loop();
}


const restartGame = () => {
    playing = 1;
    scoreValue = 0;
    score.innerHTML = `0`;
    gameOver.style.display = 'none'
    gameReStart.style.display = 'none'

    pipe.style.left = ``;
    pipe.style.rigth = `-80px`;
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    
    mario.src = './images/mario.gif'
    mario.style.width = "150px";
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    mario.style.animation = '';
    
    start.style.display = 'none'
    
    loop();
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = () => {
    const scoreCount = setInterval(() => {
        scoreValue++;
        score.innerHTML = `${scoreValue}`;
        
    }, 100);

    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
            pipe.style.animation = 'none'; 
            pipe.style.left = `${pipePosition}px`;
            
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            
            mario.src = './images/game-over.png';
            mario.style.width = "75px";
            mario.style.marginLeft = "46px";
            
            gameOver.style.display = 'flex';
            gameReStart.style.display = 'flex';
            pipe.classList.remove('pipe-animation');

            if(scoreValue > maxScore) {
                maxScore = scoreValue;
                scoreMax.innerHTML = maxScore;
            }


            clearInterval(scoreCount);
            clearInterval(loop);
        }
    
    }, 10);
}

document.addEventListener('keydown', e => {
  const tecla = e.key
  if (tecla === ' ' || tecla === "ArrowUp" || tecla === "w") {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
    const tecla = e.key
    if (tecla === 'Enter') {
        if(!playing) {
            startGame()
        } else {
            restartGame();
        }
    }
});