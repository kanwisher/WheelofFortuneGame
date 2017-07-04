"use strict";

// puzzleBank structure
// {
//  "subject": "Thing",
//     "rowA": "SELF-PORTRAIT",
//     "rowB": "",
//     "rowC": "",
//     "rowD": ""
// }

document.addEventListener("DOMContentLoaded", function() { // Handler when the DOM is fully loaded

    let dingSound = new Audio("assets/sounds/ding.mp3");
    let puzzleRevealSound = new Audio("assets/sounds/puzzleRevealSound.mp3");
    let playerScore = 0;

    function newRound() {
        puzzleRevealSound.play();
        let letterGuessed = [];
        let currentPuzzle = pickPuzzle();
        let transitionEnded = true;
        console.log(currentPuzzle); //don't cheat!

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


        function centerText(rowNum, rowLength, letterStart) { //fill letters into the rows and attempt to center them
            let wordSplit = currentPuzzle["row" + rowNum].split('');
            let firstLetterIdx = Math.floor((rowLength - wordSplit.length) / 2) + letterStart || letterStart; //yay, I made up some math stuff to center them

            wordSplit.forEach(function(elem, idx) { //loops array for each letter
                let element = document.createElement("p");
                element.innerHTML = elem;

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

        function winCheck(array) { //this works
            if (array.length === 1) { //if last item was just changed to revealed 
                console.log("You win!!!");
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

        function toggleGameChoices(){
            if(document.getElementById("gameChoices").style.display === "none"){
                document.getElementById("gameChoices").style.display = "block";
            }else {
                document.getElementById("gameChoices").style.display = "none";
            }
        }

        function toggleWheel(){
            if(document.getElementsByClassName("wrapper")[0].style.display === "none"){
                document.getElementsByClassName("wrapper")[0].style.display = "block";
            }else {
                document.getElementsByClassName("wrapper")[0].style.display = "none";
            }
        }

        // document.addEventListener("animationend", function(e) { //unreliable for me
        //     transitionEnded = true;
        //     console.log('ended');
        // });
        document.getElementById("spinButton").addEventListener('click', function(){
            toggleGameChoices();
            toggleWheel();
        });

        document.getElementById("buyVowelButton").addEventListener('click', function(){
            alert("Buy");
        });

        document.getElementById("solveButton").addEventListener('click', function(){
            alert("Solve");
        });

        document.addEventListener("keyup", function(e) {
            if (transitionEnded) {
                transitionEnded = false;
                let userGuess = e.key;
                let nodeList = document.querySelectorAll(".blank");
                let delayMulti = 0;


                Array.prototype.forEach.call(nodeList, function(node, idx, array) { //stealing array method for nodeList
                    if (e.key.toLowerCase() === node.innerHTML.toLowerCase()) {
                        setTimeout(function() {
                            node.className = "revealed";

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
                setTimeout(function() {
                    transitionEnded = true;
                }, 1200 * delayMulti); //Please noone look at this, I'm ashamed
            }
        });
    }
    newRound();
});
