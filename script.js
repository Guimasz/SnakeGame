// Definindo elementos html

const board = document.getElementById('game-board');
const instructionText = document.getElementById('instructions');
const logo = document.getElementById('logo');

// Definindo variaveis do jogo 
const gridSize = 20;
let snake = [{x:10, y:10}]; // posicao inicial da cobra
let food = generateFood(); // posicao da comida (random)
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
        clearInterval();// "limpa" o ultimo intervalo
        gameInterval = setInterval(() =>{
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();//remove o ultimo pedaço da cobra do array pra dar a ilusão de movimento e a cobra não cresce
    }
}


function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
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

function startGame() {
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display ='none';
    gameInterval = setInterval(() => {
        move();
        //checkCollision();
        draw();
    }, gameSpeedDelay);
}

