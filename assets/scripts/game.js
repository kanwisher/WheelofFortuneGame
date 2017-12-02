"use strict";

// puzzleBank structure
// {
//  "subject": "Thing",
//     "rowA": "SELF-PORTRAIT",
//     "rowB": "",
//     "rowC": "",
//     "rowD": ""
// }

// document.addEventListener("DOMContentLoaded", function() { // Handler when the DOM is fully loaded

    let dingSound = new Audio("assets/sounds/ding.mp3");
    let puzzleRevealSound = new Audio("assets/sounds/puzzleRevealSound.mp3");
    let buzzerSound = new Audio("assets/sounds/buzzer.mp3");
    let playerScore = 0;
    let wheelEnded;
    let currentPuzzle;
    let lettersGuessed;
    let stringSolution;

    function newRound() {
        puzzleRevealSound.play();
        lettersGuessed = [];
        currentPuzzle = pickPuzzle();
        stringSolution = puzzleToString(currentPuzzle);
        console.log(stringSolution);

        document.getElementById('category').innerHTML = currentPuzzle.subject; //set puzzle category
        if (currentPuzzle.rowA) { //build out letters for each row by using function
            centerText("A", 12, 1);
        }
        if (currentPuzzle.rowB) {
            centerText("B", 14, 13);
        }
        if (currentPuzzle.rowC) {
            centerText("C", 14, 27);
        }
        if (currentPuzzle.rowD) {
            centerText("D", 12, 41);
        }
    }

    newRound();

    function centerText(rowNum, rowLength, letterStart) { //fill letters into the rows and attempt to center them
        let wordSplit = currentPuzzle["row" + rowNum].split('');
        let firstLetterIdx = Math.floor((rowLength - wordSplit.length) / 2) + letterStart || letterStart; //yay, I made up some math stuff to center them

        wordSplit.forEach(function(elem, idx) { //loops array for each letter
            let element = document.createElement("p");
            element.innerHTML = elem;
            
            document.getElementById(`item${firstLetterIdx}`).innerHTML = '';
            document.getElementById(`item${firstLetterIdx}`).appendChild(element); //give it an id of what square it is in
            if (/[A-Z]/.test(elem)) {
                element.style.opacity = 0;
                setTimeout(function() {
                    element.parentElement.className += " puzzlePiece";
                }, idx * 80);

                element.className += " blank";
            } else if (elem !== " ") {
                element.parentElement.className += " puzzlePiece"; //if it's a symbol SHOW
            }

            firstLetterIdx++;
        });
    }

    function puzzleToString(puzzleObject){
        let stringArray = [];
        if(puzzleObject.rowA){
            stringArray.push(puzzleObject.rowA);
        }
        if(puzzleObject.rowB){
            stringArray.push(puzzleObject.rowB);
        }
        if(puzzleObject.rowC){
            stringArray.push(puzzleObject.rowC);
        }
        if(puzzleObject.rowD){
            stringArray.push(puzzleObject.rowD);
        }
        return stringArray.join(" ");
    }

                            

    function winCheck(array) { //this works
        if (array.length <= 1) { //if last item was just changed to revealed 
            alert("You win!!!");
            newRound();
        }
    }

    function pickPuzzle() {
        let test = false; //set a boolean flag
        let currentPuzzle;

        while (!test) { //stop loop when boolean flag is changed
            currentPuzzle = puzzleBank[Math.floor(Math.random() * puzzleBank.length - 1)]; //generate random puzzle
            if (currentPuzzle.rowA.length > 12 || //throw out puzzles that may not fit the board, being lazy here
                currentPuzzle.rowB.length > 12 ||
                currentPuzzle.rowC.length > 12 ||
                currentPuzzle.rowD.length > 12) {
                console.log("skipping word, too long");
                test = false;
            } else if (!currentPuzzle.rowC) { //moving puzzle clues down from row "A" if there is space to do so        
                currentPuzzle.rowC = currentPuzzle.rowB;
                currentPuzzle.rowB = currentPuzzle.rowA;
                currentPuzzle.rowA = "";
                test = true;
            } else {
                test = true;
            }
        }
        return currentPuzzle;
    }

    function toggleVisibilityID(name){
        if(document.getElementById(name).style.display === "none"){
            document.getElementById(name).style.display = "block";
        }else {
            document.getElementById(name).style.display = "none";
        }
    }

    function toggleVisibilityClass(name){
        if(document.getElementsByClassName(name)[0].style.display === "none"){
            document.getElementsByClassName(name)[0].style.display = "block";
        }else {
            document.getElementsByClassName(name)[0].style.display = "none";
        }
    }

    function guessEnded(){
        document.getElementById("vowels").classList.remove("disabled");
        document.getElementById("gameChoices").classList.remove("disabled");
        document.getElementById("messageArea").innerHTML = "<p>Select your choice below</p>";
    }

    function checkGuess(userGuess){
        wheelEnded = false;
        
        let nodeList = document.querySelectorAll(".blank");
        let delayMulti = 0;
        let letterFound = false;

        Array.prototype.forEach.call(nodeList, function(node, idx, array) { //stealing array method for nodeList
            if (userGuess.toLowerCase() === node.innerHTML.toLowerCase()) {
                letterFound = true;
                setTimeout(function() {
                    node.className = "revealed";
                    playerScore += prize;
                    document.getElementById("moneyScore").innerHTML = `<p>$${playerScore}</p>`;
                    
                    function playSound() {
                        var click = dingSound.cloneNode(); //so sounds will play over each other if needed
                        click.play();
                    }
                    playSound();
                    winCheck(array);
                }, 1200 * delayMulti); //throw an incrementing delay as it iterates, so multiple letters are not revealed at the same time (effect)            
                delayMulti++;
            }                   
        });
        if (!letterFound){
            buzzerSound.play();
            playerScore -= prize;
            if(playerScore < 0){
                playerScore = 0;
            }
                document.getElementById("moneyScore").innerHTML = `<p>$${playerScore}</p>`;
        }
        setTimeout(function() {
            guessEnded();
        }, 1200 * delayMulti);
    }


    document.getElementById("spinButton").addEventListener('click', function(){
        wheelEnabled = true;
        document.getElementById("messageArea").innerHTML = "<p>Spin the wheel</p>";
        toggleVisibilityID("gameChoices");
        toggleVisibilityClass("wrapper");
    });

    document.getElementById("buyVowelButton").addEventListener('click', function(){
        toggleVisibilityID("gameChoices");
        toggleVisibilityID("vowels");
    });

    document.getElementById("solveButton").addEventListener('click', function(){
        const solution = prompt("For the solve...");
        if(solution){
            if (solution.trim().toUpperCase() === stringSolution.trim().toUpperCase()){
                alert("You win!");
            } else {
                alert("You lose!");
            }
        }
    
    });

    document.getElementById("goBackButton").addEventListener('click', function(){
        document.getElementById("messageArea").innerHTML = "<p>Select your choice below</p>";
        toggleVisibilityID("vowels");
        toggleVisibilityID("gameChoices");
    })

    var vowelList = document.getElementsByClassName('vowelButton');
    for(let i = 0; i < vowelList.length; i++){
        vowelList[i].addEventListener("click", function(e){ //vowell buttons
                if(playerScore >= 100){
                    let vowelClicked = e.target.innerHTML;
                    prize = 0;
                    playerScore -= 100
                    document.getElementById("vowels").className += " disabled";
                    checkGuess(vowelClicked);
                } else {
                    document.getElementById("messageArea").innerHTML = "<p>Sorry, you're broke</p>"
                }
        });    
    }

    document.addEventListener("keyup", function(e) {
        if (wheelEnded) {
            let userGuess = e.key;
            if(userGuess === "a" || userGuess === "e" || userGuess === "i" || userGuess === "o" || userGuess === "u"){
                buzzerSound.play();
                document.getElementById("messageArea").innerHTML = "<p style='color: yellow'>Vowels must be purchased</p>";
                setTimeout(function(){
                     document.getElementById("messageArea").innerHTML = "<p>$" + prize + ", choose a consonant</p>";
                },1500);

            }else{
                checkGuess(userGuess);
            }
        }
    });

// });
