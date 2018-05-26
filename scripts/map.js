var map;

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

function GeolocationControl(controlDiv, map) {

        var controlUI = document.getElementById('mapbutt');

        google.maps.event.addDomListener(controlUI, 'click', geolocate);
}



function geolocate() {

    if (navigator.geolocation) {

       const watchId= navigator.geolocation.watchPosition(function (position) {
 window.localStorage.setItem('lastWatch', watchId);
  console.log('Set watchId', watchId);
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            // Create a marker and center map on user location
            marker = new google.maps.Marker({
                position: pos,
                draggable: true,
                animation: google.maps.Animation.DROP,
                map: map

            });

            map.setCenter(pos);

            document.getElementById("myNav").style.width = "0%";
            document.getElementById("mapbutt").style.display = "none";
            document.getElementById("startWalking").style.display = "none";

     

        });
       
        function onLocationChange(coordinates) {
        const { latitude, longitude } = coordinates.coords;
        console.log('Changed coordinates: ', latitude, longitude);
        }


        
    } 

    else {
         document.getElementById("startWalking").innerHTML = "Geolocation is not supported by this browser.";
    }
}

initialize();