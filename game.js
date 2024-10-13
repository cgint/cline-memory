var MemoryGame = /** @class */ (function () {
    function MemoryGame() {
        this.gameBoard = document.getElementById('game-board');
        this.cards = ['🐶', '🐶', '🐱', '🐱', '🐰', '🐰', '🐼', '🐼', '🦊', '🦊', '🐨', '🐨', '🐯', '🐯', '🦁', '🦁'];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isChecking = false;
        this.shuffleCards();
        this.renderCards();
        this.addEventListeners();
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
        this.gameBoard.innerHTML = '';
        this.cards.forEach(function (card, index) {
            var cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index.toString();
            cardElement.innerHTML = "\n                <div class=\"card-inner\">\n                    <div class=\"card-front\"></div>\n                    <div class=\"card-back\">".concat(card, "</div>\n                </div>\n            ");
            _this.gameBoard.appendChild(cardElement);
        });
    };
    MemoryGame.prototype.addEventListeners = function () {
        var _this = this;
        this.gameBoard.addEventListener('click', function (e) {
            var clickedCard = e.target.closest('.card');
            if (clickedCard && !_this.isChecking) {
                _this.flipCard(clickedCard);
            }
        });
    };
    MemoryGame.prototype.flipCard = function (card) {
        var _this = this;
        if (this.flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            this.flippedCards.push(card);
            if (this.flippedCards.length === 2) {
                this.isChecking = true;
                setTimeout(function () { return _this.checkMatch(); }, 1000);
            }
        }
    };
    MemoryGame.prototype.checkMatch = function () {
        var _this = this;
        var _a = this.flippedCards, card1 = _a[0], card2 = _a[1];
        var isMatch = card1.querySelector('.card-back').textContent === card2.querySelector('.card-back').textContent;
        if (isMatch) {
            this.matchedPairs++;
            this.flippedCards = [];
            if (this.matchedPairs === this.cards.length / 2) {
                alert('Congratulations! You won!');
            }
        }
        else {
            setTimeout(function () {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                _this.flippedCards = [];
            }, 1000);
        }
        this.isChecking = false;
    };
    return MemoryGame;
}());
new MemoryGame();
