"use strict";

// puzzleBank structure
// {
//  "subject": "Thing",
//     "rowA": "SELF-PORTRAIT",
//     "rowB": "",
//     "rowC": "",
//     "rowD": ""
// }

document.addEventListener("DOMContentLoaded", function(){   // Handler when the DOM is fully loaded



function newGame(){
    

    let currentPuzzle = pickPuzzle();
    console.log(currentPuzzle);

    document.getElementById('category').innerHTML = currentPuzzle.subject; //set puzzle category
    if(currentPuzzle.rowA){
        centerText("A", 12, 1);
    }
    if(currentPuzzle.rowB){
        centerText("B", 14, 13);
    }
    if(currentPuzzle.rowC){
        centerText("C", 14, 27);
    }
    if(currentPuzzle.rowD){
        centerText("D", 12, 41);
    }


    function centerText(rowNum, rowLength, letterStart){ //fill letters into the rows and attempt to center them
        let wordSplit = currentPuzzle["row" + rowNum].split('');
        let firstLetter = Math.floor((rowLength - wordSplit.length) / 2) + letterStart|| letterStart; //yay, I made up some math stuff
            
        wordSplit.forEach(function(elem){ //loops array
            let element = document.createElement("p");
            element.innerHTML = elem;
            element.className += " blank"
            document.getElementById(`item${firstLetter}`).appendChild(element);
            if(elem !== " "){
                element.parentElement.className += " unsolved"
            }
            element.style.opacity = 0;
            firstLetter++
        })
    }

    function pickPuzzle(){
        let test = false; //set a boolean flag
        let currentPuzzle;

        while(!test){ //stop loop when boolean flag is changed
            currentPuzzle = puzzleBank[Math.floor(Math.random() * puzzleBank.length - 1)] //generate random puzzle
            if (currentPuzzle.rowA.length > 12 || //throw out puzzles that may not fit the board
                currentPuzzle.rowB.length > 12 ||
                currentPuzzle.rowC.length > 12 ||
                currentPuzzle.rowD.length > 12) {
                    console.log("skipping word, too long");
                    test = false;
            }else if(!currentPuzzle.rowC){ //moving puzzle clues down from row "A" if there is space to do so        
                currentPuzzle.rowC = currentPuzzle.rowB;
                currentPuzzle.rowB = currentPuzzle.rowA;
                currentPuzzle.rowA = "";
                test = true;
            }else {
                test = true;
            }            
        }
        return currentPuzzle;
    }

    document.addEventListener("keyup", function(e){
        let userGuess = e.key;
        let nodeList = document.querySelectorAll(".blank");
        console.log(nodeList);

        // for (let i = 0, len = nodeList.length; i < len; i++) {
        //     
        //         nodeList[i].className = "revealed";
        //     }
        // }
        Array.prototype.forEach.call (nodeList, function (node) { //stealing array method for nodeList
            if(e.key.toLowerCase() === node.innerHTML.toLowerCase()){
                node.className = "revealed";
            }
        })
    })
}
newGame();

});
