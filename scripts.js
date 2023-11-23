const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quotedisplayElement = document.getElementById('quotes');
const quoteinput = document.getElementById('quoteinput');
const timerElement = document.getElementById('timer');
let correct = true;
let startTime;

quoteinput.addEventListener('input', () => {
    const arrayQuote = quotedisplayElement.querySelectorAll('span');
    const arrayValue = quoteinput.value.split('');

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });

    if (correct) renderNewQuote();
});

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quotedisplayElement.innerHTML = ''; // Clear previous content
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quotedisplayElement.appendChild(characterSpan);
    });
    quoteinput.value = ''; // Clear input
    startTimer();
}

function startTimer() {
    startTime = new Date();
    requestAnimationFrame(updateTimer);
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timerElement.innerText = elapsedTime;
    requestAnimationFrame(updateTimer);
}

// Call the function to render a new quote
renderNewQuote();
