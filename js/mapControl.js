$(document).ready(function () {

    $('#myModal').modal('show');

});


var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var map = L.map('map', {
    zoom: 8,
    fullscreenControl: true,
    center: [39.3210,-111.093]
});

// start of TimeDimension manual instantiation
var timeDimension = new L.TimeDimension({
        period: "PT48H",
    });
// helper to share the timeDimension object between all layers
map.timeDimension = timeDimension;
// otherwise you have to set the 'timeDimension' option on all layers.
L.easyButton('ion-settings', function(btn, map){
    $('#myModal').modal('show');
}).addTo( map );
L.easyButton('ion-calendar', function(btn, map){
    $('#dateDisp').toggle();
}).addTo( map );
var player        = new L.TimeDimension.Player({
    transitionTime: 25,
    loop: false,
    startOver:true
}, timeDimension);

var timeDimensionControlOptions = {
    player:        player,
	displayDate: false,
	loopButton: true,
    timeDimension: timeDimension,
    position:      'bottomleft',
    autoPlay:      true,
    minSpeed:      1,
    speedStep:     1,
    maxSpeed:      60,
    timeSliderDragUpdate: true
};

var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
map.addControl(timeDimensionControl);

var icon = L.icon({
    iconUrl: 'img/dot.png',
    iconSize: [49, 66],
    iconAnchor: [5, 25]
});

var customLayer = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng);
        }
        return L.circleMarker(latLng);
    }
});





// var overlayMaps = {
//     "Deer 1": gpxTimeLayer
// };
var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers).addTo(map);

var fileInput = document.getElementById("fileInput");

// fileInput.addEventListener('change', function(event) {
$( "#acceptBtn" ).click(function() {
    var period = $("#timeStep").val();
    console.log(period);
    map.timeDimension.options.period = "PT" + period.toString()+"H";
  var file = fileInput.files[0];
  var fileExtention = file.name.substr(file.name.length -3);
  console.log(fileExtention);
    fr = new FileReader();

  // fileInput.value = ''; // Clear the input.
  fr.onload = function() {
    console.log(fr.result);
    // Because we do not need to retrieve a CSV file through AJAX, we can directly use the omnivore.csv.parse synchronous function:
    // https://github.com/mapbox/leaflet-omnivore#api
    if (fileExtention === "gpx"){
        var layer = omnivore.gpx.parse(fr.result); // Executed synchronously, so no need to use the .on('ready') listener.
    }
    else if (fileExtention === "csv"){
        var layer = omnivore.csv.parse(fr.result); // Executed synchronously, so no need to use the .on('ready') listener.
    }
    else{
        alert("Please use GPX files only");
    }


    var gpxTimeLayer = L.timeDimension.layer.geoJson(layer, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
gpxTimeLayer.addTo(map);
map.fitBounds(layer.getBounds());
  };
  fr.readAsText(file);
  $('#myModal').modal('hide');

});