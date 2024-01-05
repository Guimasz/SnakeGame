// Definindo elementos html

const board = document.getElementById('game-board');

// Definindo variaveis do jogo 

let snake = [{x:10, y:10}]; // posicao inicial da cobra
let food = generateFood(); // posicao da comida (random)

// funcao para desenhar o mapa, a cobra e a comida.
function draw(){
    board.innerHTML ='';
    drawSnake();
}

//Desenha cobra
function drawSnake() {
    
    snake.forEach((segment) => {

        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });
}

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

function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood(){

}

//Testando 

//draw();