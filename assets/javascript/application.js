$(document).ready(function() {
    console.log("Ready!");

    var similarArtists = [];

    // The search Lastfm function takes an artist, searches the lastfm api for it, and then passes the data to createRow
    var searchLastfm = function(artist) {
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=0bb42d7e989ca9d19b690353bc075069&format=json";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
         // createRow(response);
            for (e=0; e<response.similarartists.artist.length; e++){
                console.log(response.similarartists.artist[e].name);

                similarArtists.push(response.similarartists.artist[e].name);
            }


        });
      };




});