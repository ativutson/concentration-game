class BoardSquare {
    constructor(element, color) {
        this.element = element;
        this.element.addEventListener("click", this, false);
        this.isFaceUp = false;
        this.isMatched = false;
        this.setColor(color);
    }

    handleEvent(event) {
        switch (event.type) {
            case "click":
                if (this.isFaceUp || this.isMatched) {
                    return;
                }

                this.isFaceUp = true;
                this.element.classList.add('flipped');

                squareFlipped(this);
        }
    }

    reset() {
        this.isFaceUp = false;
        this.isMatched = false;
        this.element.classList.remove('flipped');
    }
    
    matchFound() {
        this.isFaceUp = true;
        this.isMatched = true;
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
    
    // insert squaresHTML in DOM
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
// Fisher-Yates algorithm to randomly shuffle an array of elements.
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
//--------------------------------------------------------------------------
const boardSquares = [];

function setupGame() {
    generateHTMLForBoardSquares();

    const randomColorPairs = shuffleColors();
    // retrieve an array of all the .board-square elements in our DOM.
    const squareElements = document.getElementsByClassName("board-square");

    for(let i = 0; i < squareElements.length; i++) {
        const element = squareElements[i];
        const color = randomColorPairs[i];

        const square = new BoardSquare(element, color);

        boardSquares.push(square);
    }
}

setupGame(); 
//--------------------------------------------------------------------------
let firstFaceupSquare = null;

function squareFlipped(square) {
    // check if the square is the first square to be flipped faceup.
    if (firstFaceupSquare === null) {
        firstFaceupSquare = square;
        return;
    }

    if (firstFaceupSquare.color === square.color) {
        firstFaceupSquare.matchFound();
        square.matchFound();

        firstFaceupSquare = null;
    } else {
        const a = firstFaceupSquare;
        const b = square;

        firstFaceupSquare = null;

        setTimeout(function() {
            a.reset();
            b.reset();
        }, 400);
    }
}


