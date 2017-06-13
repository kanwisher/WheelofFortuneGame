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

    document.getElementById('category').innerHTML = currentPuzzle.subject; //set puzzle category

    if(currentPuzzle.rowA){
        let wordSplit = currentPuzzle.rowA.split('');
        // let firstLetter = 12 - wordSplit || 1;
        let firstLetter = Math.ceil((13 - wordSplit.length) / 2) || 1;
        
        wordSplit.forEach(function(elem){
            let element = document.createElement("p");
            element.innerHTML = elem;
            document.getElementById(`item${firstLetter}`).appendChild(element);
            firstLetter++
        })
    }
    if(currentPuzzle.rowB){
        let wordSplit = currentPuzzle.rowB.split('');
        // let firstLetter = 12 - wordSplit || 1;
        let firstLetter = Math.ceil((13 - wordSplit.length) / 2 + 13) || 13;
        
        wordSplit.forEach(function(elem){
            let element = document.createElement("p");
            element.innerHTML = elem;
            document.getElementById(`item${firstLetter}`).appendChild(element);
            firstLetter++
        })
    }
    if(currentPuzzle.rowC){
        let wordSplit = currentPuzzle.rowC.split('');
        // let firstLetter = 12 - wordSplit || 1;
        let firstLetter = Math.ceil((13 - wordSplit.length) / 2 + 27) || 27;
        
        wordSplit.forEach(function(elem){
            let element = document.createElement("p");
            element.innerHTML = elem;
            document.getElementById(`item${firstLetter}`).appendChild(element);
            firstLetter++
        })
    }
    if(currentPuzzle.rowD){
        let wordSplit = currentPuzzle.rowD.split('');
        // let firstLetter = 12 - wordSplit || 1;
        let firstLetter = Math.ceil((13 - wordSplit.length) / 2 + 41) || 41;
        
        wordSplit.forEach(function(elem){
            let element = document.createElement("p");
            element.innerHTML = elem;
            document.getElementById(`item${firstLetter}`).appendChild(element);
            firstLetter++
        })
    }
}

function pickPuzzle(){
    let test = false;
    let currentPuzzle;

    while(!test){
        currentPuzzle = puzzleBank[Math.floor(Math.random() * puzzleBank.length - 1)] //generate random puzzle
        if (currentPuzzle.rowA.length > 12 || //throw out puzzles that may not fit
            currentPuzzle.rowB.length > 12 ||
            currentPuzzle.rowC.length > 12 ||
            currentPuzzle.rowD.length > 12) {
                console.log("skipping word");
                test = false;
        }else if(!currentPuzzle.rowC){ //moving puzzle clues down if there is space        
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

newGame();

});
