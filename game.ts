class MemoryGame {
    private gameBoard: HTMLElement;
    private cards: string[];
    private flippedCards: HTMLElement[];
    private matchedPairs: number;

    constructor() {
        this.gameBoard = document.getElementById('game-board')!;
        this.cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        this.cards = [...this.cards, ...this.cards];
        this.flippedCards = [];
        this.matchedPairs = 0;

        this.shuffleCards();
        this.renderCards();
    }

    private shuffleCards(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    private renderCards(): void {
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index.toString();
            cardElement.addEventListener('click', () => this.flipCard(cardElement));
            this.gameBoard.appendChild(cardElement);
        });
    }

    private flipCard(card: HTMLElement): void {
        if (this.flippedCards.length < 2 && !this.flippedCards.some(c => c === card) && !card.classList.contains('flipped')) {
            card.textContent = this.cards[parseInt(card.dataset.index!)];
            card.classList.add('flipped');
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                setTimeout(() => this.checkMatch(), 1000);
            }
        }
    }

    private checkMatch(): void {
        const [card1, card2] = this.flippedCards;
        const isMatch = this.cards[parseInt(card1.dataset.index!)] === this.cards[parseInt(card2.dataset.index!)];

        if (isMatch) {
            this.matchedPairs++;
            if (this.matchedPairs === this.cards.length / 2) {
                alert('Congratulations! You won the game!');
            }
        } else {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        this.flippedCards = [];
    }
}

new MemoryGame();
