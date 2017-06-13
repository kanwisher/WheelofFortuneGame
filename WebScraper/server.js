const express = require('express'); //server routing
const fs = require('fs'); //file writing
const request = require('request'); //HTTP request
const cheerio = require('cheerio'); //scraping using syntax similar to jQuery (but not jQuery!);
const app     = express(); //express instance

app.get('/scrape', function(req, res){

    const url = "http://www.datagrabber.org/wheel-of-fortune-facebook-game/wheel-of-fortune-cheat-answer/";

    var request = require('request');
        request(url, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            const $ = cheerio.load(body); //give cheerio that delicious HTML
            let $selected = $('#wp-table-reloaded-id-14-no-1').find('tbody, tr');

            $($selected).each(function(i, elem) {
                let subject = $(this).children('.column-2').text();
                let rowA = $(this).children('.column-3').text();
                let rowB = $(this).children('.column-4').text();
                let rowC = $(this).children('.column-5').text();
                let rowD = $(this).children('.column-6').text();

                let puzzle = {
                    "subject" : subject,
                    "rowA" : rowA,
                    "rowB" : rowB,
                    "rowC" : rowC,
                    "rowD" : rowD
                }
                appendPuzzleDataToFile(puzzle)
                });            

            
            res.send("scrape complete");
    })
})

function appendPuzzleDataToFile(myData){
    fs.appendFile('puzzleBank.js', JSON.stringify(myData, null, 2) + ",\n", (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
}

app.listen('8000');
console.log('Server running on port 8000');