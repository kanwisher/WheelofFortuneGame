//PSEUDOCODE!!!!

//How long do I think I will take for a finished version?
    20 hours

//Why do I think I will take this long?
    I will probably spend too many hours stuck in HTML5 canvas/dealing with animations
    I will probably spend several hours trying to do it "by myself"
    I will eventually get to a point where I will realize it will take me 40 hours

//What do I THINK will cause me challenges

    Making a wheel that spins and selects the right item
    Initially appending puzzle answers to the board


//What do I THINK will be easy:
    Managing score
    Managing letter guesses
    Adding sounds/music


//Now that I'm finished how accurate were my assumptions?
    Surprise:  I had to build a scraper to create my own puzzle answers file because I could not find an API. Ended up scraping 3604 puzzle answers...in seconds!
    Surprise: There are typos in the data
    Surprise: Need math formula to center letters in puzzle area


//What were you happy with?



//What do you feel you left unfinished?




Features?
    If player gets into a certain digit -negative, then show an easter egg and end the game
    have an easter egg for konami code
    On the end of the game ask for 3 initials (like an arcade), then post highscore




//MENU!!

    //Start Game
    //View Highscores


//PUZZLE START!

    //computer picks random word/phrase
    //blanks are appended to screen
    //puzzle category is listed at bottom
    //RSTLNE are revealed if found


//LOADING PUZZLE

    1st row A: 12 blanks (1-12)
    2nd row B: 14 blanks (13 - 26)
    3rd row C: 14 blanks (27 - 40)
    4th row D: 12 blanks (41 - 52)

    A      01 02 03 04 05 06 07 08 09 10 11 12
    B   13 14 15 16 17 18 19 20 21 22 23 24 25 26
    C   27 28 29 30 31 32 33 34 35 36 37 38 39 40
    D      41 42 43 44 45 46 47 48 49 50 51 52

    //(f*ck, am I going to have to use math here?!?)
    
    if 1 word: center on 2nd row
    if 2 words: center 1st word on 2nd row and 2nd word on 3rd row
    if 3 or more words: if words + spaces are less than or equal to 14 characters,  center on 2nd row, place 3rd word on third row
                if first words + space(1) are greater than 14 characters then center 1st word on 1st row, 2nd word on 2nd row, 3rd word on 3rd row.





//Game Menu
//1. user spins the wheel
//2. or buys a vowel
//3. or solves the puzzle


//1. user spins the wheel

//if lands on money
    //guess a consonant

    //if correct win said money then go back to game menu -->

    //if incorrect lose said money (money can go negative) then go back to game menu -->


//if lands on bankrupt
    //lose all money then go back to game menu -->


//2. buys a vowel
    //guess a vowel

    //spend $250 no matter what

    //if correct then go back to game menu -->

    //if incorrect then lose an additional $250 then go back to game menu -->

//3. Solves the puzzle

    //if correct: win a thousand dollars
        if puzzle 3 -- go to highscore entry
