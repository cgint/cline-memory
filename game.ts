class MemoryGame {
    private gameBoard: HTMLElement;
    private cards: string[];
    private flippedCards: HTMLElement[];
    private matchedPairs: number;
    private isChecking: boolean;

    constructor() {
        this.gameBoard = document.getElementById('game-board')!;
        this.cards = ['🐶', '🐶', '🐱', '🐱', '🐰', '🐰', '🐼', '🐼', '🦊', '🦊', '🐨', '🐨', '🐯', '🐯', '🦁', '🦁'];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isChecking = false;

        this.shuffleCards();
        this.renderCards();
        this.addEventListeners();
    }

    private shuffleCards(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    private renderCards(): void {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index.toString();
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">${card}</div>
                </div>
            `;
            this.gameBoard.appendChild(cardElement);
        });
    }

    private addEventListeners(): void {
        this.gameBoard.addEventListener('click', (e) => {
            const clickedCard = (e.target as HTMLElement).closest('.card') as HTMLElement;
            if (clickedCard && !this.isChecking) {
                this.flipCard(clickedCard);
            }
        });
    }

    private flipCard(card: HTMLElement): void {
        if (this.flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.isChecking = true;
                setTimeout(() => this.checkMatch(), 1000);
            }
        }
    }

    private checkMatch(): void {
        const [card1, card2] = this.flippedCards;
        const isMatch = card1.querySelector('.card-back')!.textContent === card2.querySelector('.card-back')!.textContent;

        if (isMatch) {
            this.matchedPairs++;
            this.flippedCards = [];
            if (this.matchedPairs === this.cards.length / 2) {
                alert('Congratulations! You won!');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }

        this.isChecking = false;
    }
}

new MemoryGame();
