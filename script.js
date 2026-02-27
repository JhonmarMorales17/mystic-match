//Configuracion del Juego
const CONFIG = {
    easy: { rows: 4, cols: 4, total: 16 },
    medium: { rows: 6, cols: 6, total: 36 },
    hard: { rows: 8, cols: 8, total: 64 }
};

//elementos para las cartas

// Seleccioné estos emojis por las siguientes razones:
//1.Representan elementos de la naturaleza y el cosmos (🌙⭐☀️🌍) (para colocar los emojis es Tecla Windows + ;)
//2.Son fácilmente reconocibles visualmente
//3.Funcionan en todos los navegadores sin necesidad de imágenes externas
//4.Dan personalidad al juego con temática mágica/mística
//5.Son gratuitos y no requieren licencia 
//6.Escalables: se ven bien en cualquier tamaño de pantalla
const ELEMENTOS = [
    '🌟', '🌙', '⭐', '☀️', '🌍', '🌊', '🔥', '🌪️', 
    '⚡', '❄️', '🌱', '🍃', '💧', '🌋', '🌈', '🪐',
    '🌌', '🌠', '💫', '✨', '🌿', '🍂', '🌺', '🌸'
];

//estado del Juego
let gameState = {
    playerName: '',
    difficulty: 'medium',
    moves: 0,
    board: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    canFlip: true,
    timeoutId: null
};

//elementos del DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const victoryModal = document.getElementById('victory-modal');
const playerNameInput = document.getElementById('player-name');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const playerNameDisplay = document.getElementById('player-name-display');
const movesCounter = document.getElementById('moves-counter');
const board = document.getElementById('board');
const victoryMessage = document.getElementById('victory-message');
const victoryStats = document.getElementById('victory-stats');

//funciones utilitarias
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 1500);
}

function updateMovesCounter() {
    movesCounter.textContent = gameState.moves;
}

function getDifficultyName() {
    const names = {
        easy: 'Fácil (4x4)',
        medium: 'Intermedio (6x6)',
        hard: 'Difícil (8x8)'
    };
    return names[gameState.difficulty];
}

//creacion del tablero
function createBoard(rows, cols) {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    gameState.board.forEach((element, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.element = element;
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.textContent = element;
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = '?';
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card);
    });
}

//comparacion de cartas
function compareCards() {
    const [card1, card2] = gameState.flippedCards;
    const element1 = card1.dataset.element;
    const element2 = card2.dataset.element;
    
    //incrementar movimientos
    gameState.moves++;
    updateMovesCounter();
    
    if (element1 === element2) {
        //coincidencia
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.matchedPairs++;
        
        //quitar evento de click
        card1.style.pointerEvents = 'none';
        card2.style.pointerEvents = 'none';
        
        gameState.flippedCards = [];
        
        //verificar victoria
        if (gameState.matchedPairs === gameState.totalPairs) {
            showVictory();
        }
    } else {
        //no coinciden - Bloquear tablero
        gameState.canFlip = false;
        board.classList.add('blocked');
        
        //efecto visual de error
        card1.style.animation = 'shake 0.3s ease';
        card2.style.animation = 'shake 0.3s ease';
        
        setTimeout(() => {
            card1.style.animation = '';
            card2.style.animation = '';
        }, 300);
        
        //esperar y voltear de vuelta
        gameState.timeoutId = setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            gameState.flippedCards = [];
            gameState.canFlip = true;
            board.classList.remove('blocked');
        }, 1000);
    }
}

//manejo de clicks en cartas
function handleCardClick(card) {
    //validaciones
    if (!gameState.canFlip) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (gameState.flippedCards.length >= 2) return;
    
    //voltear carta
    card.classList.add('flipped');
    gameState.flippedCards.push(card);
    
    //si tenemos 2 cartas volteadas, comparar
    if (gameState.flippedCards.length === 2) {
        compareCards();
    }
}

//mostrar mensaje de victoria
function showVictory() {
    victoryMessage.textContent = `¡Felicidades ${gameState.playerName}! Has completado el desafío.`;
    victoryStats.textContent = `Movimientos: ${gameState.moves} | Dificultad: ${getDifficultyName()}`;
    victoryModal.classList.add('active');
}

//Inicializar juego
function initializeGame() {
    //validar nombre
    const name = playerNameInput.value.trim();
    if (!name) {
        showError('¡Por favor ingresa tu nombre!');
        return false;
    }
    
    gameState.playerName = name;
    gameState.difficulty = difficultySelect.value;
    gameState.moves = 0;
    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.canFlip = true;
    
    if (gameState.timeoutId) {
        clearTimeout(gameState.timeoutId);
    }
    
    //configurar dimensiones
    const config = CONFIG[gameState.difficulty];
    gameState.totalPairs = config.total / 2;
    
    //crear y mezclar cartas
    const elements = ELEMENTOS.slice(0, gameState.totalPairs);
    const cards = [...elements, ...elements];
    gameState.board = shuffleArray(cards);
    
    //actualizar UI
    playerNameDisplay.textContent = gameState.playerName;
    updateMovesCounter();
    
    //crear tablero
    createBoard(config.rows, config.cols);
    
    //cambiar pantallas
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    victoryModal.classList.remove('active');
    
    return true;
}

//reiniciar juego
function restartGame() {
    if (gameState.timeoutId) {
        clearTimeout(gameState.timeoutId);
    }
    
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
    victoryModal.classList.remove('active');
    
    gameState.flippedCards = [];
    gameState.canFlip = true;
    board.classList.remove('blocked');
}

//Event Listeners
startBtn.addEventListener('click', initializeGame);

restartBtn.addEventListener('click', restartGame);

playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.remove('active');
    restartGame();
});

playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        initializeGame();
    }
});

//Inicializacion 
playerNameInput.value = 'Jugador';
difficultySelect.value = 'medium';