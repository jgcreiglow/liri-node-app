//Dependencies
require("dotenv").config();
var fs = require("fs");
var inquirer = require("inquirer");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request")
var keys = require("./keys.js");

//Switch to run the different functions

switch (process.argv[2]) {

    // Twitter API Work
    case "my-tweets":
        return fs.readFile("./keys.js", "utf8", function(error, data) {

            var client = new twitter(keys.twitter);
       
            client.get('statuses/show/:jscagrcecrglw', function(error, tweets, response) {
                if (!error) {
                    console.log(tweets.text);
                }
                else {
                    console.log ("no birds are singing today")
                }
            });
        });

        //Spotify API Work
    case "spotify-this-song":
        return fs.readFile("./keys.js", "utf8", function(error, data) {
            var spotify = new Spotify(keys.spotify);
            var tune = process.argv;

            var songName = "";

            for (var i = 3; i < tune.length; i++) {
                if (i > 3 && i < tune.length) {
                    songName = songName + "+" + tune[i];
                } else {
                    songName += tune[i];
                }
            }
            spotify.search({
                type: 'track',
                query: songName
            }, function(err, data) {

                if (!error) {
                    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
                    console.log('Title: ' + data.tracks.items[0].name);
                    console.log('Album: ' + data.tracks.items[0].album.name);
                    console.log('Preview link: ' + data.tracks.items[0].preview_url);
                } else {
                    console.log("I don't recognize that song")
                }
            });
        });

        //OMDb API Work
    case "movie-this":
        var Args = process.argv;
        var movieName = "";
        for (var i = 3; i < Args.length; i++) {
            if (i > 3 && i < Args.length) {
                movieName = movieName + "+" + Args[i];
            } else {
                movieName += Args[i];
            }
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=t&apikey=trilogy";
        console.log(queryUrl);
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country of Production: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
        // case 'do-what-it-says':
        //     return fs.readFile("./random.txt", "utf8", function(error, data) {
        //         var dataArr = data.split(":");
        //         math.floor(math.random(dataArr.length))
        //if (do-what-it-says === spotify-this-song I want it that way){
        //return fs.readFile("./keys.js", "utf8", function(error, data) {
        //     var spotify = new Spotify(keys.spotify);
        //     var tune = process.argv;
        //     var songName = "";
        //     for (var i = 3; i < tune.length; i++) {
        //         if (i > 3 && i < tune.length) {
        //             songName = songName + "+" + tune[i];
        //         } else {
        //             songName += tune[i];
        //         }
        //     }
        //     spotify.search({
        //         type: 'track',
        //         query: songName
        //     }, function(err, data) {
        //         if (!error) {
        //             console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        //             console.log('Title: ' + data.tracks.items[0].name);
        //             console.log('Album: ' + data.tracks.items[0].album.name);
        //             console.log('Preview link: ' + data.tracks.items[0].preview_url);
        //         } else {
        //             console.log("I don't recognize that song")
        //         }
        //     });
        // });
        //}

}