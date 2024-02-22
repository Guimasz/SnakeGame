// Definindo elementos html

const board = document.getElementById('game-board');
const instructionText = document.getElementById('instructions');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const maxScoretext = document.getElementById('maxscore');

// Definindo variaveis do jogo 
const gridSize = 20;
let snake = [{x:10, y:10}]; // posicao inicial da cobra
let food = generateFood(); // posicao da comida (random)
let maxScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;



// Cria algum elemento do joogo (uma cobra ou cubo de comida)

function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Posicionar algum elemento do joogo (uma cobra ou cubo de comida)

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}


// funcao para desenhar o mapa, a cobra e a comida.
function draw(){
    board.innerHTML ='';
    drawSnake();
    drawFood();
    updateScore();
}

//Desenha cobra
function drawSnake() {
    
    snake.forEach((segment) => {

        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });
}

//Movendo a cobra
function move(){
    const head = {...snake[0]};
    switch (direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);//recoloca a cabeça no topo do array da cobra
   

    if(head.x === food.x && head.y === food.y){//se acertar a comida
        food = generateFood();//nova comida é gerada
        speedControl   ();
        clearInterval(gameInterval);// "limpa" o ultimo intervalo
        gameInterval = setInterval(() =>{
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();//remove o ultimo pedaço da cobra do array pra dar a ilusão de movimento e a cobra não cresce
    }
}

function speedControl() {
    console.log(gameSpeedDelay);
    if(gameSpeedDelay >150) {
        gameSpeedDelay -=5;
    }else if (gameSpeedDelay >100){
        gameSpeedDelay -=3;
    }else if (gameSpeedDelay > 50) {
        gameSpeedDelay -=2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -=1;
    }
}

function checkCollision() {
    console.log('Checking collision...');
    
    const head = snake[0];

    // Verifica colisão com as bordas do tabuleiro
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize ){
        console.log('Collision with border detected!');
        resetGame();
    }

    // Verifica colisão com o próprio corpo (começando do segundo segmento)
    for (let i = 1; i < snake.length; i++){
        if (head.x === snake[i].x && head.y === snake[i].y ){
            console.log('Collision with own body detected!');
            resetGame();
        }
    }
}


function updateScore(){
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3,'0');

}


function drawFood() {
    if(gameStarted){
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}


//gerar posicao da comida
function generateFood(){
    const x = Math.floor(Math.random() * gridSize)+1; //gera numero aleatório de 1 até 20(gridSize)
    const y = Math.floor(Math.random() * gridSize)+1; //gera numero aleatório de 1 até 20(gridSize)
    return {x, y};
}

// Gerenciador de comandos do teclado
function handleKeyPress(event){
    if(( !gameStarted && event.code === 'Space')||( !gameStarted && event.key === ' ') ){
        startGame();
    } else {
    switch (event.key){
        case 'ArrowUp':
            direction ='up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        }
    }
}
document.addEventListener('keydown', handleKeyPress);

//--------------------------------------------------------------------------------------------------------

function startGame() {
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display ='none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}
function resetGame(){
    console.log('Resetting game...');
    
    updateMaxScore();
    stopGame();
    snake = [{x:10, y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function stopGame(){
    console.log('Stopping game...');
    
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateMaxScore() {
    const currentScore = snake.length - 1;
    if (maxScoretext) {
        if (currentScore > maxScore) {
            maxScore = currentScore;
            maxScoretext.textContent = maxScore.toString().padStart(3, '0');
        }

        maxScoretext.style.display = 'block';
    }
}
