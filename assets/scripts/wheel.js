    let click = document.getElementById("spin");
    let wheel = document.getElementsByClassName("wheel")[0];
    let rotations = 0;
    let prize;
    let prizeCheck;
    let spinSound = new Audio('assets/sounds/spinSound.mp3');
    let bankruptSound =  new Audio('assets/sounds/bankrupt.mp3');


    wheel.addEventListener("transitionend", function(){
        if ((prizeCheck >= 0 && prizeCheck <= 18) || prizeCheck >= 342 && prizeCheck <= 360 ) {
            prize = 500;
            // updateScore(prize);
        }
        else if (prizeCheck >= 19 && prizeCheck <= 55){
            prize = 900;
            // updateScore(prize);
        }
        else if (prizeCheck >= 56 && prizeCheck <= 91) {
            prize = 800;
            // updateScore(prize);
        }
        else if (prizeCheck >= 92 && prizeCheck <= 126) {
            prize = 700;
            // updateScore(prize);
        }
        else if (prizeCheck >= 127 && prizeCheck <= 162) {
            prize = 600;
            // updateScore(prize);
        }
        else if (prizeCheck >= 163 && prizeCheck <= 197) {
            prize = 0;
            bankruptSound.play();
        }
        else if (prizeCheck >= 198 && prizeCheck <= 233) {
            prize = 400;
            // updateScore(prize);
        }
        else if (prizeCheck >= 234 && prizeCheck <= 268) {
            prize = 300;
            // updateScore(prize);
        }
        else if (prizeCheck >= 269 && prizeCheck <= 304) {
            prize = 200;
            // updateScore(prize);
        }
        else if (prizeCheck >= 305 && prizeCheck <= 341) {
            prize = 100;
            // updateScore(prize);
        }
        else {
            alert("I seem to have trouble determining where the wheel landed, here is $5000");
            prize = 5000;
            // updateScore(prize);
        }

        wheelEnded = true;
        document.getElementById("messageArea").innerHTML = "<p>$" + prize + ", choose a consonant";

        toggleVisibilityID("gameChoices");
        toggleVisibilityClass("wrapper");
        document.getElementById("gameChoices").className += " disabled";
    });

    // function updateScore(addScore){
    //     playerScore += addScore;
    //     document.getElementById("moneyScore").innerHTML = "<p>$" + playerScore + "</p>";
    // }

    click.addEventListener("click", function(){
        rotations++; //increment multiplier so that wheel will always spin around 3 times on randomSpin, this number could be about anything as long as it higher than the last number ( but a larger jump would increase the amount of spins);
        let randomChoice = Math.floor((Math.random() * 100));
        let randomSpin = rotations * 720; //keeps increasing the rotate degrees so that the wheel spins same direction and always 3 times for looks
        let number = 360/40 * randomChoice + randomSpin; //without adding randomSpin it will just sorta slowly spin on the shortest route, basically it's incrementing the rotate value
        console.log(number);        
        prizeCheck = number % 360; //gives me a number where I can compare it against the rotate degrees
        setTimeout(function(){
            spinSound.play();
        },1100);        
        
        wheel.style.transform = `rotate(${number}deg)`;
    });