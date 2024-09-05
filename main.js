const letters = "abcdefghijklmnopqrstuvwxyz"
let lettersArray = Array.from(letters)
let lettersContainer = document.querySelector(".letters")
let wrongApp = 0;
let hangdraw = document.querySelector(".hangdraw")
lettersArray.forEach(letter => {
    let span = document.createElement("span")
    let spanLetter = document.createTextNode(letter)
    span.appendChild(spanLetter)
    span.className = "letter-box"
    lettersContainer.appendChild(span)
})
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar","Saudi Arabia","United Arab Emirates","Kuwait","Oman","Iraq","Jordan","Morocco","Tunisia","Algeria"],
    football: ["Ronaldo","Messi","Neymar","Benzema","Kaka","Ramos","Kroos","Maradona","Pele","Zidane","Best","Cruyff"]
}
let allKeys = Object.keys(words)
let randomPropNumber = Math.floor(Math.random() * allKeys.length)
let randomPropName = allKeys[randomPropNumber]
let randomPropValue = words[randomPropName]
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
let randomValueName = randomPropValue[randomValueNumber]
let cateSpan = document.querySelector(".category span")
cateSpan.innerHTML = randomPropName
let letterGuessContainer = document.querySelector(".letter-guess")
let wordArr = Array.from(randomValueName)
wordArr.forEach(letter => {
    let letterSpan = document.createElement("span")
    if(letter === " ") {
        letterSpan.className = "with-space"
    }
    letterGuessContainer.appendChild(letterSpan)
})
let spanGuess = document.querySelectorAll(".letter-guess span")
document.addEventListener("click", e => {
    let theStatus = false
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked")
        let theClickedLetter = e.target.innerHTML.toLowerCase()
        let theChoosenWord = Array.from(randomValueName.toLowerCase())
        theChoosenWord.forEach((wordLetter,wordIndex) => {
            if(theClickedLetter == wordLetter) {
                theStatus = true
                spanGuess.forEach((span,spanIndex) => {
                    if(spanIndex == wordIndex) {
                        span.innerHTML = theClickedLetter
                    }
                })
            }
        })
        if (theStatus!==true) {
            wrongApp++;
            hangdraw.classList.add(`wrong-${wrongApp}`)
            document.getElementById("fail").play()
            if (wrongApp === 8) {
                endGame();
                lettersContainer.classList.add("finished")
            }
        } else {
            document.getElementById("success").play()
            checkWin();
        }
    }
})
function endGame() {
    let div = document.createElement("div")
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`)
    div.appendChild(divText)
    div.className = "popup"
    document.body.appendChild(div)
}
function checkWin() {
    let allGuessed = true;
    spanGuess.forEach((span) => {
        if (span.innerHTML === "") {
            allGuessed = false;
        }
    });

    if (allGuessed) {
        // عرض رسالة الفوز
        let winPopup = document.createElement("div");
        let winText = document.createTextNode(`Congratulations! You guessed the word: ${randomValueName}`);
        winPopup.appendChild(winText);
        winPopup.className = "popupwin";
        document.body.appendChild(winPopup);

        // إيقاف اللعبة
        lettersContainer.classList.add("finished");
    }
}