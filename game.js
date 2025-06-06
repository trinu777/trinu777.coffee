class CoffeeHangman {
    constructor() {
        this.words = [
            'CAFE', 'LECHE', 'AZUCAR',
            'TAZA', 'VASO', 'DULCE',
            'MOCHA', 'CREMA', 'FRIO',
            'TE', 'MIEL', 'CALIENTE'
        ];
        
        this.coffeeMessages = [
            '¡Genial! ☕',
            '¡Bravo! 🎉',
            '¡Lo lograste! 🌟',
            '¡Perfecto! ✨'
        ];
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.wordContainer = document.getElementById('word-container');
        this.message = document.getElementById('message');
        this.letterButtons = document.querySelectorAll('.letter');
        this.newGameButton = document.getElementById('new-game');
        
        this.maxTries = 6;
        this.init();
    }
    
    init() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = new Set();
        this.remainingTries = this.maxTries;
        this.gameOver = false;
        
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGallows();
        
        // Resetear botones
        this.letterButtons.forEach(button => {
            button.classList.remove('used', 'correct', 'wrong');
            button.disabled = false;
        });
        
        // Configurar eventos
        this.letterButtons.forEach(button => {
            button.onclick = () => this.handleGuess(button.textContent);
        });
        this.newGameButton.onclick = () => this.init();
        
        this.message.textContent = '';
        this.message.classList.remove('winner-message');
        this.updateWordDisplay();
    }
    
    handleGuess(letter) {
        if (this.gameOver || this.guessedLetters.has(letter)) return;
        
        this.guessedLetters.add(letter);
        const button = Array.from(this.letterButtons).find(btn => btn.textContent === letter);
        
        if (this.word.includes(letter)) {
            button.classList.add('correct');
            if (this.hasWon()) {
                const randomMessage = this.coffeeMessages[Math.floor(Math.random() * this.coffeeMessages.length)];
                this.message.textContent = randomMessage;
                this.message.classList.add('winner-message');
                this.gameOver = true;
                this.celebrateWin();
            }
        } else {
            button.classList.add('wrong');
            this.remainingTries--;
            this.drawHangman(this.maxTries - this.remainingTries);
            
            if (this.remainingTries === 0) {
                this.message.textContent = `¡Game Over! La palabra era: ${this.word} ☕`;
                this.gameOver = true;
            }
        }
        
        button.classList.add('used');
        this.updateWordDisplay();
    }
    
    updateWordDisplay() {
        this.wordContainer.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
    }
    
    hasWon() {
        return this.word.split('').every(letter => this.guessedLetters.has(letter));
    }
    
    drawGallows() {
        this.ctx.strokeStyle = '#3C2A21';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Base
        this.ctx.beginPath();
        this.ctx.moveTo(20, 230);
        this.ctx.lineTo(180, 230);
        this.ctx.stroke();
        
        // Poste vertical
        this.ctx.beginPath();
        this.ctx.moveTo(40, 230);
        this.ctx.lineTo(40, 20);
        this.ctx.stroke();
        
        // Poste horizontal
        this.ctx.beginPath();
        this.ctx.moveTo(40, 20);
        this.ctx.lineTo(120, 20);
        this.ctx.stroke();
        
        // Cuerda
        this.ctx.beginPath();
        this.ctx.moveTo(120, 20);
        this.ctx.lineTo(120, 40);
        this.ctx.stroke();
    }
    
    drawHangman(step) {
        this.ctx.strokeStyle = '#3C2A21';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        switch(step) {
            case 1: // Cabeza
                this.ctx.beginPath();
                this.ctx.arc(120, 60, 20, 0, Math.PI * 2);
                this.ctx.stroke();
                break;
            case 2: // Cuerpo
                this.ctx.beginPath();
                this.ctx.moveTo(120, 80);
                this.ctx.lineTo(120, 150);
                this.ctx.stroke();
                break;
            case 3: // Brazo izquierdo
                this.ctx.beginPath();
                this.ctx.moveTo(120, 100);
                this.ctx.lineTo(80, 120);
                this.ctx.stroke();
                break;
            case 4: // Brazo derecho
                this.ctx.beginPath();
                this.ctx.moveTo(120, 100);
                this.ctx.lineTo(160, 120);
                this.ctx.stroke();
                break;
            case 5: // Pierna izquierda
                this.ctx.beginPath();
                this.ctx.moveTo(120, 150);
                this.ctx.lineTo(90, 190);
                this.ctx.stroke();
                break;
            case 6: // Pierna derecha y cara triste
                this.ctx.beginPath();
                this.ctx.moveTo(120, 150);
                this.ctx.lineTo(150, 190);
                this.ctx.stroke();
                
                // Cara triste
                this.ctx.beginPath();
                this.ctx.arc(120, 70, 15, 0, Math.PI, true);
                this.ctx.stroke();
                
                // Ojos X
                this.ctx.beginPath();
                this.ctx.moveTo(110, 50);
                this.ctx.lineTo(115, 55);
                this.ctx.moveTo(115, 50);
                this.ctx.lineTo(110, 55);
                this.ctx.moveTo(125, 50);
                this.ctx.lineTo(130, 55);
                this.ctx.moveTo(130, 50);
                this.ctx.lineTo(125, 55);
                this.ctx.stroke();
                break;
        }
    }
    
    celebrateWin() {
        // Dibujar cara feliz
        this.ctx.clearRect(100, 40, 40, 40);
        this.ctx.beginPath();
        this.ctx.arc(120, 60, 20, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Sonrisa
        this.ctx.beginPath();
        this.ctx.arc(120, 60, 15, 0, Math.PI, false);
        this.ctx.stroke();
        
        // Ojos felices
        this.ctx.beginPath();
        this.ctx.arc(110, 50, 3, 0, Math.PI * 2);
        this.ctx.arc(130, 50, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// Iniciar el juego cuando se carga la página
window.addEventListener('load', () => {
    new CoffeeHangman();
});
