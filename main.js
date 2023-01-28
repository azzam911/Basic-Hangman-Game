//Create Array Letters
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

//Genrate Letters

let lettersContainers = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  //create letter text Node
  let theLetter = document.createTextNode(letter);

  //append the letter to the span
  span.appendChild(theLetter);

  //add class to span
  span.className = "letter-box";

  //Append Span to the letters Containers
  lettersContainers.appendChild(span);
});

//Make Words
const words = {
  programming: ["Php", "Python", "Java Script", "Ruby", "Mysql"],
  peaple: ["Muhhammed", "Azzam", "Ahmed", "Saleh", "Sami"],
  countries: ["Ksa", "Qatar", "Egypt", "Bahrain", "UAE"],
  movies: [
    "Fight Club",
    "Inception",
    "Good Fellas",
    "Interstellar",
    "Star Wars",
  ],
};

//Get Random Key From Obj
let allKeys = Object.keys(words);

// Random number from Allkeys in Obj
let randomNumber = Math.floor(Math.random() * allKeys.length);

// random Key word Name
let randomkeyName = allKeys[randomNumber];

//Get Random Number from Random key
let randomNumbervalue = Math.floor(Math.random() * words[randomkeyName].length);

//Get Random Value Name
let randomValueValue = words[randomkeyName][randomNumbervalue];

//Put The Name Of Category in Span
document.querySelector(".category span").innerHTML = randomkeyName;

// Select Letters guess Element
let lettersGuessCountainer = document.querySelector(".letter-guess");

let lettersAndSpaces = Array.from(randomValueValue.toLowerCase());

lettersAndSpaces.forEach((ele) => {
  let emptySpan = document.createElement("span");
  if (ele === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessCountainer.appendChild(emptySpan);
});

// Get all letter guess spans
let guessSpans = document.querySelectorAll(".letter-guess span");

let theWrongAttemp = 0;

let theDrow = document.querySelector(".hangman-drow");
let arr = [];
//Handel Clicking letter
document.addEventListener("click", (e) => {
  //status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    //add class clicked to element
    e.target.classList.add("clicked");

    //get the clicked letter
    let theclickedLetter = e.target.innerHTML.toLowerCase();

    // loop in chosen word
    lettersAndSpaces.forEach((wordletter, wordindex) => {
      //condition chick if click letter in array letters
      if (theclickedLetter == wordletter) {
        theStatus = true;
        //loop in spans guess to add the letter in the right place
        guessSpans.forEach((span, spanindex) => {
          if (wordindex === spanindex) {
            span.innerHTML = wordletter;
            arr[spanindex] = span.innerHTML;
          }
        });
      }
    });

    if (theStatus !== true) {
      theWrongAttemp++;

      theDrow.classList.add(`wrong-${theWrongAttemp}`);
      if (theWrongAttemp == 8) {
        lettersContainers.classList.add("finished");
        endGame();
      }
    }
    if (lettersAndSpaces == arr) {
      console.log("equal");
    }

    function arrayEquals(a, b) {
      if (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      ) {
        let div = document.createElement("div");
        lettersContainers.classList.add("finished");
        let divText = document.createTextNode("You Win");
        div.classList.add("gameover");
        div.appendChild(divText);
        document.body.appendChild(div);
      }
    }
    arrayEquals(lettersAndSpaces, arr);
  }
});

function endGame() {
  let div = document.createElement("div");

  let divText = document.createTextNode(
    `Game is over The Word is ${randomValueValue}`
  );

  div.appendChild(divText);
  div.classList.add("gameover");
  document.body.appendChild(div);
}
