var city = $("#city").val();
var artist = $("#artist").val();
var artistNoSpace = artist.replace(" ", "%20")

$(document).ready(function() {
    console.log("Ready!");

    var similarArtists = [];
    var imageSrc = [];

    // The search Lastfm function takes an artist, searches the lastfm api for it, and then passes the data to createRow
    var searchLastfm = function(artist) {
        console.log("test");
          var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=0bb42d7e989ca9d19b690353bc075069&format=json";
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
  
              var results = response.similarartists.artist;
  
  
                  for (var i = 0; i < 5; i++)   {
  
                      similarArtists.push(results[i].name);
                      imageSrc.push(results[i].image[2]["#text"]);
                  }
  
                   console.log(similarArtists);
                   console.log(imageSrc);
  
          })
      };




function bandsintown() {
    var bandsURL = "rest.bandsintown.com/artists/"+artistNoSpace+"/events?app_id="

    $.ajax ({
        url: bandsURL,
        method: "GET"
    }).then(function(response) {
        for (s=0; s<response.length; s++) {
            var town = response.venue.city;
            if (town ==city) {
                console.log(response[s].venue.name);
                console.log(response[s].datetime);
            }
        }
    })
}

// ---------------------



for (a= 0; a < similarArtists.length; a++) {
    artistNoSpace = similarAartists[a].replace(" ", "%20");
    bandsintown(); 
}

});