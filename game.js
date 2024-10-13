var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var MemoryGame = /** @class */ (function () {
    function MemoryGame() {
        this.gameBoard = document.getElementById('game-board');
        this.cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        this.cards = __spreadArray(__spreadArray([], this.cards, true), this.cards, true);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.shuffleCards();
        this.renderCards();
    }
    MemoryGame.prototype.shuffleCards = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    MemoryGame.prototype.renderCards = function () {
        var _this = this;
        this.cards.forEach(function (card, index) {
            var cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index.toString();
            cardElement.addEventListener('click', function () { return _this.flipCard(cardElement); });
            _this.gameBoard.appendChild(cardElement);
        });
    };
    MemoryGame.prototype.flipCard = function (card) {
        var _this = this;
        if (this.flippedCards.length < 2 && !this.isCardFlipped(card) && !card.classList.contains('flipped')) {
            card.textContent = this.cards[parseInt(card.dataset.index)];
            card.classList.add('flipped');
            this.flippedCards.push(card);
            if (this.flippedCards.length === 2) {
                setTimeout(function () { return _this.checkMatch(); }, 1000);
            }
        }
    };
    MemoryGame.prototype.isCardFlipped = function (card) {
        return this.flippedCards.some(function (flippedCard) { return flippedCard === card; });
    };
    MemoryGame.prototype.checkMatch = function () {
        var _a = this.flippedCards, card1 = _a[0], card2 = _a[1];
        var index1 = parseInt(card1.dataset.index);
        var index2 = parseInt(card2.dataset.index);
        if (this.cards[index1] === this.cards[index2]) {
            this.matchedPairs++;
            if (this.matchedPairs === this.cards.length / 2) {
                alert('Congratulations! You won the game!');
            }
        }
        else {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        this.flippedCards = [];
    };
    return MemoryGame;
}());
new MemoryGame();
