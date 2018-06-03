var city = $("#city").val();
var artist = $("#artist").val().trim();
var country
var eventArtistNoSpace
var eventArtistNoSpace = artist.replace(" ", "+") //changes spaces to eventful's format

$(document).ready(function() {

    var similarArtists = [];
    var imageSrc = [];

    // The search Lastfm function takes an artist, searches the lastfm api for it, and then passes the data to createRow
    function searchLastfm() {

        if (artist == "") {
                $("#similarArtistRows").empty();

                var queryURL = "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=" + country + "&api_key=0bb42d7e989ca9d19b690353bc075069&format=json";
                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {

                    var results = response.topartists.artist;
        
                    for (var i = 0; i < 5; i++)   {

                        similarArtists.push(results[i].name);
                        imageSrc.push(results[i].image[2]["#text"]);

                        var similarResult = $("<tr>");
                        var similarArtistCell = $("<code>");
                        var similarArtistImg = $("<img>");       
                        similarArtistImg.attr("src", results[i].image[2]["#text"])

                        var similarArtistResult = $("<td>");
                        similarArtistResult.text(results[i].name)
        
                        similarArtistCell.append(similarArtistImg)
                        similarResult.append(similarArtistCell, similarArtistResult)
                        similarResult.appendTo($("#similarArtistRows"));
                    }
                })
        }
        else {
            $("#similarArtistRows").empty();
                var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=0bb42d7e989ca9d19b690353bc075069&format=json";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
        
                    var results = response.similarartists.artist;
        
                        for (var i = 0; i < 5; i++)   {
        
                            similarArtists.push(results[i].name);
                            imageSrc.push(results[i].image[2]["#text"]);

                            var similarResult = $("<tr>");          
                            var similarArtistCell = $("<code>");
                            var similarArtistImg = $("<img>");       
                            similarArtistImg.attr("src", results[i].image[2]["#text"])

                            var similarArtistResult = $("<td>");
                            similarArtistResult.text(results[i].name)
                
                            similarArtistCell.append(similarArtistImg)
                            similarResult.append(similarArtistCell, similarArtistResult)
                            similarResult.appendTo($("#similarArtistRows"));
                        }
                });
        };
    };

    function addLastfmResults() {


        
    }    
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
        
        else if ((city != "") && (eventArtistNoSpace == "")) {
            eventfulURL = "https://api.eventful.com/json/events/search?app_key=BMHGt9rHhxJ8frMs&category=music&location="+eventCityNoSpace+"&within=60&date=today&sort_order=popularity"
        }
        
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
});