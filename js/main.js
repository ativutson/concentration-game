class BoardSquare {
    constructor(element, color) {
        this.element = element;
        this.isFaceUp = false;
        this.isMatched = false;
        this.setColor(color);
    }
    
    setColor(color) {
        const faceupElement = this.element.getElementsByClassName('faceup')[0];

        this.color = color;
        faceupElement.classList.add(color);
    }
}
//--------------------------------------------------------------------------
function generateHTMLForBoardSquares() {
    const numberOfSquares = 16;
    let squaresHTML = '';
    
    // generate HTML for board squares
    for(let i = 0; i < numberOfSquares; i++) {
        squaresHTML += `
        <div class="col-3 board-square">
            <div class="face-container">
                <div class="facedown"></div>
                <div class="faceup"></div>
            </div>
        </div>`;
    }
    
    // insert squares HTML in DOM
    const boardElement = document.getElementById('gameboard');
    boardElement.innerHTML = squaresHTML;
    console.log(boardElement)
}

generateHTMLForBoardSquares();
//--------------------------------------------------------------------------
const colorPairs = [];

function generateColorPairs() {
    if (colorPairs.length > 0) {
        return colorPairs;
    } else {
        // generates matching pair for each color
        for (let i = 0; i < 8; i++) {
        colorPairs.push('color-' + i);
        colorPairs.push('color-' + i);
        }
    
    return colorPairs;
    }
}
//--------------------------------------------------------------------------
// Fisher-Yates algorithm to randomly shuffles an array of elements.
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 != currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//--------------------------------------------------------------------------
// function that returns a shuffled array of matching color pairs.
function shuffleColors() {
    const colorPairs = generateColorPairs();
    return shuffle(colorPairs);
}


