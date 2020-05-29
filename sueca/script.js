var cardGraphics = [
    [[1, 0, 0], [0, 0, 0], [0, 0, 1]],
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
    [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
    [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
    [[1, 0, 1], [1, 1, 1], [1, 0, 1]]
]

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
    getValue() {
        return this.value
    }
    getSuit() {
        return this.suit
    }
    getColour() {
        if (this.suit % 2 == 0)
            return 'black'
        else
            return 'red'
    }
    getValueShape() {
        let valueShape = ''
        switch (this.value) {
            case 5:
                valueShape = 'Q'
                break
            case 6:
                valueShape = 'J'
                break
            case 7:
                valueShape = 'K'
                break
            case 8:
                valueShape = '7'
                break
            case 9:
                valueShape = 'A'
                break
            default:
                valueShape = (this.value + 2).toString()
                break
        }
        return valueShape
    }
    getSuitShape() {
        let suitShape = ''
        switch (this.suit) {
            case 0:
                suitShape = '♠'
                break
            case 1:
                suitShape = '♥'
                break
            case 2:
                suitShape = '♣'
                break
            case 3:
                suitShape = '♦'
                break
        }
        return suitShape
    }
    toString() {
        return this.getValueShape() + this.getSuitShape()
    }
    apply(id) {
        let value = document.querySelector('#' + id + '>.value')
        let suit = document.querySelector('#' + id + '>.suit')
        value.innerHTML = this.getValueShape()
        value.style.color = this.getColour()
        suit.innerHTML = this.getSuitShape()
        suit.style.color = this.getColour()
        
        if (document.querySelector('#' + id).className == 'card') {
            let use = this.value
            if (this.value == 8) {
                use = 5
            }
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    document.querySelector('#' + id + '>.graphic').children[y].children[x].innerHTML = this.getSuitShape()
                    if (this.value < 5 || this.value == 8) {
                        if (cardGraphics[use][y][x] == 1) {
                            document.querySelector('#' + id + '>.graphic').children[y].children[x].style.color = this.getColour()
                        }
                    }
                }
            }
            value = document.querySelector('#' + id + '>.rotated.value')
            suit = document.querySelector('#' + id + '>.rotated.suit')
            value.innerHTML = this.getValueShape()
            value.style.color = this.getColour()
            suit.innerHTML = this.getSuitShape()
            suit.style.color = this.getColour()
        }

    }
}


var cards = []
for (let i = 0; i < 10; i++) {
    cards.push(new Card(Math.floor(Math.random() * 4), Math.floor(Math.random() * 10)))
}
console.log(cards)
cards.sort(function (c1, c2) { return (100 * (c1.getSuit() - c2.getSuit()) + c1.getValue() - c2.getValue()) })
console.log(cards)
for (let i = 0; i < 10; i++) {
    cards[i].apply('c' + (i + 1).toString())
}