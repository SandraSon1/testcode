var map;
var marker=null;
var geomarker=null;
var bounds = null;
// var directionsService = null;
// var directionsDisplay = null;


 var stops = [
      ['<h2 id="firstHeading" class="firstHeading">Te Papa</h2>'+'<p>...</p> ', -41.29038375,174.78110235, 4],
      ['<h2 id="firstHeading" class="firstHeading">Civiv Square</h2>'+'<p>...</p>', -41.2887477,174.7771535, 5],
      ['<h2 id="firstHeading" class="firstHeading">Wellington Museum</h2>'+'<p>...</p>', -41.2851032,174.7780803, 3],
      ['<h2 id="firstHeading" class="firstHeading">Parliament</h2>'+'<p>...</p>', -41.277848,174.7763921, 2],
      ['<h2 id="firstHeading" class="firstHeading">City Council</h2>'+'<p>...</p>', -41.289111,174.776918, 6],
      ['<h2 id="firstHeading" class="firstHeading">Pipitea Law School</h2>'+'<p>...</p>', -41.2788743,174.7785934, 7],
      ['<h2 id="firstHeading" class="firstHeading">National Library</h2>'+'<p>...</p>', -41.2768239,174.7779642, 1]
    ];



 var mapOptions = {
          center: {lat: -41.2865, lng: 174.7762},
          suppressInfoWindows: true,
          zoom: 15

        };

  


function initialize() {

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    bounds = new google.maps.LatLngBounds();

var stopinfowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < stops.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(stops[i][1], stops[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          stopinfowindow.setContent(stops[i][0]);
          ib.setContent(stops[i][0]);
          // ib.open(map, this);
          // stopinfowindow.open(map, marker);
        }
      })(marker, i));
     
        google.maps.event.addListener(marker, 'click', function() {
          map.panTo(this.getPosition());
          map.setZoom(16);
        });

  var ib = new InfoBox(myOptions);

// var boxText = '<div id= "container-infobox"'

    var myOptions = {
    // content: boxText,
    disableAutoPan: false
    ,maxWidth: 10
    ,pixelOffset: new google.maps.Size(-125, -60)
    ,zIndex: null
    ,boxStyle: { 
    // border: "1px solid black"

    WebkitBorderRadius: "10px"
    ,padding: "10px 10px 10px 10px"
    ,WebkitBoxShadow: "3px 3px 5px 800px rgba(0,0,0,0.6)"
    ,background: "white"
    ,opacity: 1
    ,width: "250px"
    }
    ,closeBoxMargin: "2px 2px 2px 1px"
    ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
    };

    google.maps.event.addListener(marker, "click", function (e) {
    ib.open(map, this);
    });

// ib.open(map, marker);
}



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



 // var optn = {
 //            enableHighAccuracy: true,
 //            timeout: Infinity,
 //            maximumAge:0

 //        };



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

       
 var optn = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge:0

        };

   function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}



        const watchId= navigator.geolocation.watchPosition(function (position, showError) {
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
            launch_toast();

            document.getElementById("myNav").style.width = "0%";
            document.getElementById("mapbutt").style.display = "none";
            

     

        });
      


        
    } 



var directionsService = new google.maps.DirectionsService();


  var locations = [
  ['Te Papa', -41.29038375,174.78110235, 1],
  ['Civic Square', -41.2887477,174.7771535, 2],
  ['Wellington Museum', -41.2851032,174.7780803, 3],
  ['Parliament', -41.277848,174.7763921, 4],
  ['National Library ', -41.2768239,174.7779642, 5]
];

var directionsDisplay = new google.maps.DirectionsRenderer({
  suppressMarkers:true,
  infoWindow: myInfoWindow,
  map: map
});

 directionsDisplay.setMap(map);

 var myInfoWindow = new google.maps.InfoWindow();
  
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


}

initialize();


// Get the modal
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("modalbutton");
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




