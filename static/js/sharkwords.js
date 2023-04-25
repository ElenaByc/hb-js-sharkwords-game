const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
    'strawberry',
    'orange',
    'apple',
    'banana',
    'pineapple',
    'kiwi',
    'peach',
    'pecan',
    'eggplant',
    'durian',
    'peanut',
    'chocolate',
];

let numWrong = 0;
let numCorrect = 0;

// Loop over the letters in `word` and create divs.
// The divs should be appended to the section with id="word-container".
// 
// Use the following template string to create each div:
// `<div class="letter-box ${letter}"></div>`
//
const createDivsForChars = (word) => {
    const wordContainer = document.querySelector('#word-container')
    for (const letter of word) {
        wordContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="letter-box ${letter}"></div>`);
    }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons".
const generateLetterButtons = () => {
    const letterButtons = document.querySelector('#letter-buttons')
    for (const letter of ALPHABET) {
        letterButtons.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);

    }
};

// Set the `disabled` property of `buttonEl` to true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
    buttonEl.disabled = true;
    // buttonEl.setAttribute('disabled', true)
};

const disableAllLetterButtons = () => {
    const allButtons = document.querySelectorAll('button');

    for (const btn of allButtons) {
        btn.disabled = true;
    }
}

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter, word) => {
    return word.includes(letter)
};

// Called when `letter` is in word. Update contents of divs with `letter`.
const handleCorrectGuess = (letter, word) => {
    // const wordContainer = document.querySelector('#word-container')
    const divsToChange = document.querySelectorAll(`.${letter}`)
    // # for Id
    // . for class

    for (const div of divsToChange) {
        div.innerHTML = letter;
        numCorrect += 1;
    }
    if (numCorrect === word.length) {
        document.querySelector('#win').style.display = '';
    }

};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.
const handleWrongGuess = () => {
    numWrong += 1;
    // get that span
    // update its innerText
    document.querySelector('#wrong span').innerText = numWrong;

    document.querySelector('#shark-img img')
        .setAttribute('src', `/static/images/guess${numWrong}.png`);
    if (numWrong === 5) {
        disableAllLetterButtons();
        document.querySelector('#play-again').style.display = '';
    }


};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
    window.location = '/sharkwords';
};


// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
    // For now, we'll hardcode the word that the user has to guess
    // You can change this to choose a random word from WORDS once you
    // finish this lab but we hard code it so we know what the word is
    // and can tell if things look correct for this word

    // const word = 'hello';
    // choose from WORDS randomly
    // array[Math.floor(Math.random() * array.length)];
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]


    createDivsForChars(word);

    generateLetterButtons();


    for (const button of document.querySelectorAll('button')) {
        // add an event handler to handle clicking on a letter button
        button.addEventListener('click', (evt) => {
            const btn = evt.target;
            disableLetterButton(btn);
            // <button>A</button>
            // https://www.w3schools.com/jsref/prop_node_innertext.asp
            const letter = btn.innerText;
            if (isLetterInWord(letter, word)) {
                handleCorrectGuess(letter, word);
            } else {
                handleWrongGuess(letter)
            }
        });
    }

    // add an event handler to handle clicking on the Play Again button
    document.querySelector('#play-again').addEventListener('click', resetGame);
    document.querySelector('#win').addEventListener('click', resetGame);
})();
