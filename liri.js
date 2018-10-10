require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js")
var request = require("request");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
console.log(command);
var operand = process.argv[3];
console.log(operand);

executeCommand(command, operand);

function concertThis(operand) {

    var queryURL = "https://rest.bandsintown.com/artists/" + operand + "/events?app_id=codingbootcamp";

    request(queryURL, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Venue name: " + JSON.parse(body)[0].venue.name);
          console.log("Venue location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region + ", " + JSON.parse(body)[0].venue.country);
          var datetime = moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY");
          console.log("Concert date: " + datetime);

        }
      });

}

function spotifyThis(operand) {
    console.log(keys.spotify.id);
    spotify.search({ type: 'track', query: operand }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //console.log(data.tracks.items[0]);
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song name: " + data.tracks.items[0].name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
    console.log("Album name: " + data.tracks.items[0].album.name);
    });
}

function movieThis(operand) {

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + operand;

    request(queryURL, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Movie title: " + JSON.parse(body).Title);
          console.log("Year it came out: " + JSON.parse(body).Year);
          console.log("Rating: " + JSON.parse(body).Rated);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);

        } else {
            console.log("Error occurred: "+error);
            console.log("Status code: " + response.statusCode);
        }
      });

}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        executeCommand(dataArr[0], dataArr[1]);
      
      });
      
    

}


function executeCommand(command, operand) {
    switch(command) {
        case "concert-this":
            concertThis(operand);
            break;
        case "spotify-this-song":
            if (operand == null) {
                operand = "The Sign";
            }
            spotifyThis(operand);
            break;
        case "movie-this":
            if (operand == null) {
                operand = "Mr. Nobody";
            }
            movieThis(operand);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}