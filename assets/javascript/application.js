var city = $("#city").val();
var artist = $("#artist").val().trim();
var country
var eventArtistNoSpace
//var bandsArtistNoSpace = artist.replace(" ", "%20") //changes spaces to bandsInTown's format
var eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format

$(document).ready(function() {
    console.log("Ready!");

    var similarArtists = [];
    var imageSrc = [];

    // The search Lastfm function takes an artist, searches the lastfm api for it, and then passes the data to createRow
    function searchLastfm() {

    

                    var similarResult = $("<tr>");
<<<<<<< HEAD
                    similarResult.attr("class", "similar");
                    similarResult.attr("artist", results[i].name)
                //  var similarResult2 = $("<code><br>");
                //  var similarResult3 = $("<code><br>");
      
                      var similarArtistCell = $("<code>");

                      similarArtistCell.attr("class", "similar");
                        similarArtistCell.attr("artist", results[i].name)

                      var similarArtistImg = $("<img>");       
                      similarArtistImg.attr("src", results[i].image[2]["#text"])
                      console.log(results[i].image[2]["#text"]);

                      var similarArtistResult = $("<td>");

                      similarArtistResult.attr("class", "similar");
                        similarArtistResult.attr("artist", results[i].name)

                      similarArtistResult.text(results[i].name)
          
                      similarArtistCell.append(similarArtistImg)
                      similarResult.append(similarArtistCell, similarArtistResult)
                //      similarResult2.append(similarArtistCell)
                //      similarResult3.append(similarArtistResult)
                      similarResult.appendTo($("#similarArtistRows"));
                //      similarResult2.appendTo($(".artistImage"));
                //      similarResult3.appendTo($(".artistName"));
                  }
  
                   console.log(similarArtists);
                   console.log(imageSrc);
  
          })
      };
=======
        
    $("#search").on("click", function() {
        searchClicked();
        searchLastfm();
    })

    function searchClicked() {
        artist = $("#artist").val().trim();
        city = $("#city").val().trim();
        eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format
        eventCityNoSpace = city.replace(" ", "+")
        eventful();
    }

    function eventful() {
        $("#eventsRows").empty();
        var eventfulURL
        if (city == "") {
            eventfulURL = "https://api.eventful.com/json/events/search?app_key=BMHGt9rHhxJ8frMs&category=music&keywords="+eventArtistNoSpace+"&sort_order=date"
        }
        //
        else if ((city != "") && (eventArtistNoSpace == "")) {
            eventfulURL = "https://api.eventful.com/json/events/search?app_key=BMHGt9rHhxJ8frMs&category=music&location="+eventCityNoSpace+"&within=60&date=today&sort_order=popularity"
        }
        //
        else if (city != "") {
            eventfulURL = "https://api.eventful.com/json/events/search?app_key=BMHGt9rHhxJ8frMs&category=music&keywords="+eventArtistNoSpace+"&location="+eventCityNoSpace+"&within=60&sort_order=relevence"
        }

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
        if  (response.total_items < 1) {
            var event = $("<tr>)");
            event.text("No concerts found")
            event.appendTo($("#eventsRows"));

        }
        else {
            for (e = 0; e < response.events.event.length; e++) {
                var event = $("<tr>");


                var eventPlaying = $("<td>");
                eventPlaying.text()
                eventPlaying.text(response.events.event[e].title)

                var eventCity = $("<td>");
                eventCity.text(response.events.event[e].city_name+", "+response.events.event[e].region_abbr+", "+response.events.event[e].country_abbr)
                country = response.events.event[e].country_name

                //var eventVenue = $("<td>");
                //eventVenue.text(response.events.event[e].venue_name)

                var eventAddress = $("<td>");
                eventAddress.text(response.events.event[e].venue_name)

                var eventDate = $("<td>");

                //Below code for Date without Time
                //var dateWithoutTime = response.events.event[e].start_time
                //dateWithoutTime = dateWithoutTime.substring(0, dateWithoutTime.indexOf(" "));
                //eventDate.text(dateWithoutTime)

                eventDate.text(response.events.event[e].start_time)
                
                event.append(eventPlaying, eventCity, 
                    //eventVenue, 
                    eventAddress, eventDate)
                event.appendTo($("#eventsRows"));
            }
        }
    })
}

$("#similarArtistRows").on("click", ".similar", function() {
    var similarClicked = $(this).attr("artist");
    $("#artist").val(similarClicked);
    searchClicked()
})



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