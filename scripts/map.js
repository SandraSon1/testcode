var map;
var marker=null;
var geomarker=null;
var bounds = null;
// var directionsService = null;
// var directionsDisplay = null;


 var mapOptions = {
          center: {lat: -41.2865, lng: 174.7762},
          suppressInfoWindows: true,
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
            if (geomarker==null){
            geomarker = new google.maps.Marker({
                position: pos,
                draggable: false,
                animation: google.maps.Animation.DROP,
                map: map

            });

            geomarker.setMap(map);
           
        }
         else{
                geomarker.setPosition(pos);

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



// var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
// var locations = [
//   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//   ['Bondi Beach', -33.890542, 151.274856, 4],
//   ['Coogee Beach', -33.923036, 151.259052, 5],
//   ['Maroubra Beach', -33.950198, 151.259302, 1],
//   ['Cronulla Beach', -34.028249, 151.157507, 3]
// ];

  var locations = [
  ['Te Papa', -41.29038375,174.78110235, 1],
  ['Civic Square', -41.2887477,174.7771535, 2],
  ['City Council', -41.289111,174.776918, 3],
  ['Frank kits park', -41.2863277,174.778877, 4],
  ['Wellington Museum', -41.2851032,174.7780803, 5]
  // ['supreme court ', -41.798551,174.7768211, 6],
  // ['Pipitea Law School ', -41.2788743,174.7785934, 7],
  // ['Parliament', -41.277848,174.7763921, 8],
  // ['National Library ', -41.2768239,174.7779642, 9]
];


  // directionsDisplay = new google.maps.DirectionsRenderer();
var directionsDisplay = new google.maps.DirectionsRenderer({
  suppressInfoWindows: true,
  map: map
});
 directionsDisplay.setMap(map);
  
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  var request = {
    travelMode: google.maps.TravelMode.DRIVING
  };
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {

        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));

    if (i == 0) request.origin = marker.getPosition();
    else if (i == locations.length - 1) request.destination = marker.getPosition();
    else {
      if (!request.waypoints) request.waypoints = [];
      request.waypoints.push({
        location: marker.getPosition(),
        stopover: true,
       
      });
    }

  }
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });



     // var request = {
     //       origin: 'Te Papa Tongarewa, Te Aro, Wellington, New Zealand', 
     //       destination: 'National Library,Wellington, New Zealand',
     //       travelMode: google.maps.DirectionsTravelMode.DRIVING
     //     };
    
     //     directionsService.route(request, function(response, status) {
     //       if (status == google.maps.DirectionsStatus.OK) {
     //         directionsDisplay.setDirections(response);
     //       }
     //     });
  

}

// var onChangeHandler = function() {
//           calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         // document.getElementById('start').addEventListener('change', onChangeHandler);
//         // document.getElementById('end').addEventListener('change', onChangeHandler);
      

      

initialize();

       // Get the modal
          var modal = document.getElementById('myModal');

          // Get the button that opens the modal
          var btn = document.getElementById("modalbutton");

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("closemodal")[0];

          // When the user clicks the button, open the modal 
          btn.onclick = function() {
              modal.style.display = "block";
          }

          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
              modal.style.display = "none";
          }

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          }

