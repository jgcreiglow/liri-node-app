require("dotenv").config();
//Dependencies
var fs = require("fs");
var inquirer = require("inquirer");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

//read keys from Twitter and Spotify 
fs.readFile("./keys.js", "utf8", function(error, data) {
    // var spotify = new (keys.spotify);
    var spotify = new Spotify(keys.spotify);
    var client = new twitter(keys.twitter);
//Twitter API Work
if(process.argv[2] === "my-tweets"){
    client.get('search/tweets', {q: '@jscagrcecrglw', count: 20}, function(error, data) {
        if(!error) {
            console.log(data)
        }
        else {
            console.log ("sorry, there's an error")
        }

      });

    }

if (process.argv[2] === "spotify-this-song"){
//Spotify API Work
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
   
    if(!error) {
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Title: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Preview link: ' + data.tracks.items[0].preview_url);
    }

    else{
        console.log("I don't recognize that song")
    }
    });
};
});