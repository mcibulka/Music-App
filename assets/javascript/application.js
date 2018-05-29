var city = $("#city").val();
var artist = $("#artist").val().trim();
//var bandsArtistNoSpace = artist.replace(" ", "%20") //changes spaces to bandsInTown's format
var eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format

$(document).ready(function() {
    console.log("Ready!");

    var similarArtists = [];

    // The search Lastfm function takes an artist, searches the lastfm api for it, and then passes the data to createRow
    var searchLastfm = function(artist) {
        var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=0bb42d7e989ca9d19b690353bc075069&format=json";
        $.ajax({
          url: queryURL,
          method: "GET",

        }).then(function(response) {
         // createRow(response);
            for (e=0; e<response.similarartists.artist.length; e++){
                console.log(response.similarartists.artist[e].name);

                similarArtists.push(response.similarartists.artist[e].name);
            }


        });
    };

    $("#search").on("click", function() {
        artist = $("#artist").val().trim();
        var eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format
        eventful();
    })

function eventful() {
    $("#eventsRows").empty();
    var eventfulURL = "https://api.eventful.com/json/events/search?app_key=BMHGt9rHhxJ8frMs&keywords="+artist
    //&location="+city+" in case we want to add city

    $.ajax ({
        url: eventfulURL,
        dataType: "jsonp",
        method: "GET",
        headers: {
            "Allow-Origin": "true",
            "Allow-Control": "true",
            "Cache-Control": "no-cache"
          }
    }).then(function(response) {
        console.log(response)
        for (e = 0; e < response.events.event.length; e++) {
            var event = $("<tr>");

            var eventCity = $("<td>");
            eventCity.text(response.events.event[e].title)

            var eventVenue = $("<td>");
            eventVenue.text(response.events.event[e].venue_address)

            var eventDate = $("<td>");
            eventDate.text(response.events.event[e].start_time)
            
            event.append(eventCity, eventVenue, eventDate)
            event.appendTo($("#eventsRows"));

            console.log(response.events.event[e].title)
            console.log(response.events.event[e].venue_address)
            console.log(response.events.event[e].start_time)
        }
    })
}



// function bandsintown() {
//     var bandsURL = "rest.bandsintown.com/artists/"+bandsArtistNoSpace+"/events?app_id="

//     $.ajax ({
//         url: bandsURL,
//         method: "GET"
//     }).then(function(response) {
//         for (s=0; s<response.length; s++) {
//             var town = response.venue.city;
//             if (town ==city) {
//                 console.log(response[s].venue.name);
//                 console.log(response[s].datetime);
//             }
//         }
//     })
// }

// ---------------------



    // for (a= 0; a < similarArtists.length; a++) {
    //     //bandsArtistNoSpace = similarAartists[a].replace(" ", "%20");
    //     artist = similarArtists[a].trim();
    //     //var bandsArtistNoSpace = artist.replace(" ", "%20") //changes spaces to bandsInTown's format
    //     var eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format
        
    //     var event = $("<tr>");

    //     var similar = $("<td>");
    //     similar.text(`${similarArtists[a]}`)
    //     similar.attr("class", "similar")
    //     similar.attr("id", similarArtists[a])
            
    //     event.append(similar)
    //     event.appendTo($("#simlar-artists"));
    // }

// $(".similar").on("click", function() {
//     ("#artist").val($(this).attr("id"));
// })

});