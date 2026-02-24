console.log("Mystic Match - Version Inicial"); //Esta es la configuracion basica

// Elementos del DOM
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

// Estado del juego
let gameState = {
    playerName: '',
    difficulty: 'medium',
    moves: 0
};

// Funcion para iniciar juego (placeholder)
function initializeGame() {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Por favor ingresa tu nombre');
        return false;
    }
    
    gameState.playerName = name;
    gameState.difficulty = difficultySelect.value;
    
    playerNameDisplay.textContent = gameState.playerName;
    
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    return true;
}

// Event Listeners
startBtn.addEventListener('click', initializeGame);

restartBtn.addEventListener('click', () => {
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
});

playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.remove('active');
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
});

// Inicializacion
playerNameInput.value = 'Jugador';
difficultySelect.value = 'medium';