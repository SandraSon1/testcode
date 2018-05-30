var map;
var marker=null;

function initialize() {

    var mapOptions = {
          center: {lat: -41.2865, lng: 174.7762},
          zoom: 15
        };

        
      

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create the DIV to hold the control and call the constructor passing in this DIV
    var geolocationDiv = document.createElement('div');
    var geolocationControl = new GeolocationControl(geolocationDiv, map);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(geolocationDiv);
}

var x = document.getElementById("startWalking");

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function GeolocationControl(controlDiv, map) {

        var controlUI = document.getElementById('mapbutt');

        google.maps.event.addDomListener(controlUI, 'click', geolocate);
}



function geolocate() {

    if (navigator.geolocation) {

        var optn = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge:0

        };

        const watchId= navigator.geolocation.watchPosition(function (position, showError) {
        window.localStorage.setItem('lastWatch', watchId);
        console.log('Set watchId', watchId);

            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            // Create a marker and center map on user location
            if (marker==null){
            marker = new google.maps.Marker({
                position: pos,
                draggable: false,
                animation: google.maps.Animation.DROP,
                map: map

            });

            marker.setMap(map);
        }
         else{
                marker.setPosition(pos);

            }

            function onLocationChange(pos) {
            const { latitude, longitude } = coordinates.coords;
            console.log('Changed coordinates: ', latitude, longitude);
            }
            
            // else{
            //     marker.setPosition(pos);

            // }

            map.setCenter(pos);

            document.getElementById("myNav").style.width = "0%";
            document.getElementById("mapbutt").style.display = "none";
            document.getElementById("startWalking").style.display = "none";

     

        });
      


        
    } 
  

}


initialize();

