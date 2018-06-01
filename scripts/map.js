var map;
var marker=null;
var bounds = null;
var directionsService = null;
var directionsDisplay = null;


 var mapOptions = {
          center: {lat: -41.2865, lng: 174.7762},
          zoom: 15
        };


function initialize() {

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    bounds = new google.maps.LatLngBounds();



    // Create the DIV to hold the control and call the constructor passing in this DIV
    var geolocationDiv;
    var geolocationControl = new GeolocationControl(geolocationDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(geolocationDiv);
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
}



var x = document.getElementById("startWalking");



function GeolocationControl(controlDiv, map) {

        var controlUI = document.getElementById('mapbutt');

        google.maps.event.addDomListener(controlUI, 'click', geolocate);
}


 var optn = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge:0

        };


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


function geolocate() {

    if (navigator.geolocation) {

       

        const watchId= navigator.geolocation.watchPosition(function (position, showError, optn) {
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
            
           

            map.setCenter(pos);

            document.getElementById("myNav").style.width = "0%";
            document.getElementById("mapbutt").style.display = "none";
            

     

        });
      


        
    } 

     directionsDisplay.setMap(map);

     var request = {
           origin: 'Te Papa Tongarewa, Te Aro, Wellington, New Zealand', 
           destination: 'National Library,Wellington, New Zealand',
           travelMode: google.maps.DirectionsTravelMode.DRIVING
         };
    
         directionsService.route(request, function(response, status) {
           if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
         });
  

}

// var onChangeHandler = function() {
//           calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         // document.getElementById('start').addEventListener('change', onChangeHandler);
//         // document.getElementById('end').addEventListener('change', onChangeHandler);
      

      

initialize();

