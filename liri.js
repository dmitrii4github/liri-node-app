require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js")
var request = require("request");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
console.log(command);
var operand = process.argv[3];
console.log(operand);

switch(command) {
    case "concert-this":
        concertThis(operand);
        break;
    case "spotify-this-song":
        spotifyThis(operand);
        break;
    case "movie-this":
        movieThis(operand);
        break;
}

function concertThis(operand) {

    var queryURL = "https://rest.bandsintown.com/artists/" + operand + "/events?app_id=codingbootcamp";

    request(queryURL, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("We received: " + JSON.parse(body)[0].venue.name);
        }
      });

}