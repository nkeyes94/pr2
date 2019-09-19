// * Document ready function
$(document).ready(function(){
    // * Config for the search button
    var $searchBtn = $("#searchButton");
    // * Config for the search bar
    var $searchBar = $("#searchBar");
    // * Grabbing the artist div from HTML
    var $artistDivHTML = $("#artists");
     // * Grabbing the favorites div from HTML
     var $favoritesDivHTML = $("#favorites");
    // * User location
    var userLocation = "Philadelphia";
    // * Coordinates for venue
    var venueLat;
    var venueLong;
    var venueName;
    var playDate;
    // * Create a favorites arr
    var userFavorites = [];
    $searchBtn.on("click", function(e){
        e.preventDefault();
        console.log("Search button clicked");
        console.log($searchBar.val());
        console.log("Inside the public js folder");
        clearAll();
        lastFM($searchBar);
        lastFMTopTracks($searchBar);
        lastFMTopAlbums($searchBar);
        displayArtistGIF($searchBar);
        bandsInTown($searchBar);
        addToFavorites($searchBar);
    });
    // * Testing API call with the search bar
    // * Last FM API
    function lastFM($searchBar){
        var artist = $searchBar.val();
        var fmQueryUrl = "https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=23918b643329567603dcdf46fc1c0e88&format=json";
        $.ajax({
            url: fmQueryUrl,
            method: "GET"
        }).then(function(data){
            console.log(data);
                // * Create a div for the artist
                var artistDiv = $("<div class='artist'>")
                // * Getting the artist name information and appending it to the artist div
                var artistName = data.artist.name;
                console.log(artistName);
                var pOne = $("<p>").text(artistName);
                artistDiv.append(pOne);
                
                // * Artist tags
                var artistTags = JSON.stringify(data.artist.tags.tag[0].name);
                var pTwo = $("<p>").text("LastFM recognizes this artists as " +artistTags);
                artistDiv.append(pTwo);
                // * Artist bio
                var artistBio = data.artist.bio.summary;
                console.log(data.artist.bio.summary);
                var pThree = $("<p>").text("Artist Bio: "+ artistBio);
                artistDiv.append(pThree);
                $artistDivHTML.append(artistDiv);
        })
    };
    function displayArtistGIF($searchBar) {
        var artist = $searchBar.val();
        var queryURLGIF = "https://api.giphy.com/v1/gifs/search?api_key=AT79EHT1D7WSUijGI0hjYxKq9u5ih3QX&q=" + artist + "&limit=5&offset=0&rating=PG-13&lang=en"
        
            $.ajax({
                  url: queryURLGIF,
                  method: "GET"
                }).then(function(data) {
                console.log(data);
        
                // * Artist GIF image
                artistGifURL = data.data[0].url;
                console.log (data.data[0].url);
                var pSix = $('<img>').attr("src", artistGifURL);
                artistDiv.append(pSix);
                
                 });
                }
                function lastFMTopTracks($searchBar){
                    var artist = $searchBar.val();
                    var fmQueryUrlTracks = "https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist + "&api_key=23918b643329567603dcdf46fc1c0e88&format=json";
                    $.ajax({
                        url: fmQueryUrlTracks,
                        method: "GET"
                    }).then(function(data){
                        console.log(data);
                          // * Create a div for the artist
                          var artistDiv = $("<div class='artist'>")
                            // * Getting artist's top 5 tracks
                            var artistTopTracks = [data.toptracks.track[0].name, data.toptracks.track[1].name, data.toptracks.track[2].name, data.toptracks.track[3].name, data.toptracks.track[4].name];
                            console.log([data.toptracks.track[0].name, data.toptracks.track[1].name, data.toptracks.track[2].name, data.toptracks.track[3].name, data.toptracks.track[4].name]);
                            console.log(artistTopTracks);
                            var pFour = $("<p>").text("Top Tracks: " + artistTopTracks);
                            artistDiv.append(pFour);
                            $artistDivHTML.append(artistDiv);
                    })
                };
             
    function lastFMTopAlbums($searchBar){
        var artist = $searchBar.val();
        var fmQueryUrlAlbums = "https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=23918b643329567603dcdf46fc1c0e88&format=json";
        $.ajax({
            url: fmQueryUrlAlbums,
            method: "GET"
        }).then(function(data){
            console.log(data);
                // * Getting artist's top 3 albums
                var artistTopAlbums = [data.topalbums.album[0].name,data.topalbums.album[1].name, data.topalbums.album[2].name];
                console.log([data.topalbums.album[0].name,data.topalbums.album[1].name, data.topalbums.album[2].name]);
                var pFive = $("<p>").text(artistTopAlbums);
                artistDiv.append(pFive);
                $artistDivHTML.append(artistDiv);
        })
    };
    // * Bands in town API
    function bandsInTown($searchBar){
        var artist = $searchBar.val();
        var bitApiKey = "codingbootcamp";
        var queryURLBIT = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id="+ bitApiKey;
        $.ajax({
            url: queryURLBIT,
            method: "GET"
        }).then(function(res){
            console.log(res);
            for(let i = 0; i < res.length; i++){
                console.log("----------------");
                console.log("City playing: "+ res[i].venue.city);
                console.log("Venue name: "+ res[i].venue.name);
                console.log("Date playing: "+ res[i].datetime);
                if(res[i].venue.city == userLocation){
                    var playingCity = res[i].venue.city;
                    console.log("****************************")
                    console.log("FOUND");
                    console.log(playingCity);
                    venueLat = res[i].venue.latitude;
                    venueLong = res[i].venue.longitude;
                    venueName = res[i].venue.name;
                    playDate = res[i].datetime;
                }
            };
            
            if(playingCity){
                console.log("IS PLAYING CITY");
                var mapDiv = document.createElement("div");
                var cont = document.createElement("div");
                cont.id="cont";
                cont.width="250px"
                cont.height="250px"
                $artistDivHTML.append(cont)
                mapDiv.id="map";
                cont.append(mapDiv);
                mapboxgl.accessToken = 'pk.eyJ1IjoibmtleWVzIiwiYSI6ImNqeHJuaW54NDA2MXEzZm1yYnZ5dW85bGIifQ.5bp-rkNWdhNCEwHkYKt5aA';
                var map = new mapboxgl.Map({
                    container: "map",
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: [venueLong, venueLat],
                    zoom: 18
                })
                map.setStyle('mapbox://styles/mapbox/dark-v9');
                map.on("load", function(){
                    map.addLayer({
                        "id": "venue",
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "properties":{
                                        "description": $searchBar.val() + " playing at "+ venueName + "<br> Date: "+ playDate,
                                        "icon": "star"
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [venueLong, venueLat]
                                    }
                                }]
                            }
                        },
                        "layout":{
                            "icon-image": "{icon}-15",
                            "icon-allow-overlap": true
                        }
                    })
                })
                map.on("click", 'venue', function(e){
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                    new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map)
                    // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', 'places', function () {
                    map.getCanvas().style.cursor = 'pointer';
                    });
                 
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'places', function () {
                    map.getCanvas().style.cursor = '';
                    });
                })
            } else if (!playingCity){
                console.log("XXXXXXXXX NOT PLAYING CITY");
            }
        })
    }
    var favorited = false;
    var favBtn = document.createElement("BUTTON");
    favBtn.id = "favBtn";
    $artistDivHTML.append(favBtn);
    btnPress = document.getElementById("favBtn")
    if(favorited === false){
        favBtn.innerHTML = "Add to favorites!";
        favBtn.onclick = function(){
            console.log("Btn clicked");
            favorited = true;
            userFavorites = { userFavorites: $searchBar.val() }
            favBtn.innerHTML = "Favorited!";
            favBtn.disabled = true;
            console.log(userFavorites);
            $favoritesDivHTML.append($searchBar.val());
            $.post("/api/saveFavorites", userFavorites).then(function(response){
                console.log(response);
            })
        }
    } else {
        favBtn.innerHTML = "Favorited";
    }
function clearAll(){
    $artistDivHTML.innerHTML="";
}
});