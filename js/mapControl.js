 $(function() {
     $('#colorPick').colorpicker({
         format: "hex",
         color: "#2863d1"
     }).on('colorpickerChange colorpickerCreate', function(e) {
         $("#colorPick").css("background-color", e.color.toRgbString());
     });
 });
 // $(document).ready(function() {
 //
 //     $('#myModal').modal('show');
 //
 // });
 $("#opSlider").slider();
 $("#opSlider").on("slide", function(slideEvt) {
     $("#opSliderVal").text(slideEvt.value * 100 + "%");
 });
 $("#weightSlider").slider();
 $("#weightSlider").on("slide", function(slideEvt) {
     $("#weightSliderVal").text(slideEvt.value);
 });


 var startDate = new Date();
 startDate.setUTCHours(0, 0, 0, 0);

 var map = L.map('map', {
     zoom: 8,
     fullscreenControl: true,
     center: [39.3210, -111.093]
 });

 // start of TimeDimension manual instantiation
 // var timeDimension = new L.TimeDimension({
 //     period: "PT48H",
 // });
  var timeDimension = new L.TimeDimension({
     period: "PT6H",
 });
 // helper to share the timeDimension object between all layers
 map.timeDimension = timeDimension;
 // otherwise you have to set the 'timeDimension' option on all layers.
 L.easyButton('ion-settings', function(btn, map) {
     $('#myModal').modal('show');
 }).addTo(map);
 L.easyButton('ion-calendar', function(btn, map) {
     $('#dateDisp').toggle();
 }).addTo(map);
 var player = new L.TimeDimension.Player({
     transitionTime: 25,
     loop: false,
     startOver: true
 }, timeDimension);

 var timeDimensionControlOptions = {
     player: player,
     displayDate: false,
     loopButton: true,
     timeDimension: timeDimension,
     position: 'bottomleft',
     autoPlay: true,
     minSpeed: 1,
     speedStep: 1,
     maxSpeed: 200,
     timeSliderDragUpdate: true
 };
 var customControl = L.Control.extend({

     options: {
         position: 'bottomleft'
     },

     onAdd: function(map) {
         var container = L.DomUtil.create('div');
         container.id = 'dateDisp'
         container.style.backgroundColor = 'white';
         container.style.margin = '10 auto';
         return container;
     }
 });

 var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
 map.addControl(timeDimensionControl);
 map.addControl(new customControl());
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var year = a.getFullYear();
  var month =addZero(a.getMonth()+1);
  var date = addZero(a.getDate());
  var hour = addZero(a.getHours());
  var min = addZero(a.getMinutes());
  var sec = addZero(a.getSeconds());
  var time = year+"-"+month+"-"+date+"T"+hour+":"+min+":"+sec+"Z"
  return time;
}

// console.log("MYV",window.myVariable);
 console.log("trackData", window.trackData);
if (window.trackData) {
    var trackData = window.trackData;
    var ctData = '<?xml version="1.0" ?><gpx creator="UDWR Wildlife Tracker" version="1.1" xalan="http://xml.apache.org/xalan" xmlns="http://www.topografix.com/GPX/1/1" xsi="http://www.w3.org/2001/XMLSchema-instance">'


    for (var key in trackData) {
        ctData += "<trk><name>" + key + "</name><desc>" + trackData[key][0].attributes.Species + "</desc><trkseg>"
        for (var i = 0; i < trackData[key].length; i++) {
            var t = trackData[key][i].attributes.DateYearAndJulian;
            var date = timeConverter(t);
            // var sp = trackData[key][i].attributes.Species;
            if (trackData[key].length === 1) {
                ctData += '<trkpt lat="' + trackData[key][i].attributes.Latitude + '" lon="' + trackData[key][i].attributes.Longitude + '"><time>' + date + "</time></trkpt>";
                ctData += '<trkpt lat="' + trackData[key][i].attributes.Latitude + '" lon="' + trackData[key][i].attributes.Longitude + '"><time>' + date + "</time></trkpt>";
            }
            ctData += '<trkpt lat="' + trackData[key][i].attributes.Latitude + '" lon="' + trackData[key][i].attributes.Longitude + '"><time>' + date + "</time></trkpt>";
        }
        ctData += '</trkseg></trk>';
    }
    ctData += '</gpx>';
    console.log(ctData);
}
else{
    console.log("ERROR");
}
 var baseLayers = getCommonBaseLayers(map); // see baselayers.js
 L.control.layers(baseLayers).addTo(map);

function speciesIcon(feature){
    // console.log(feature.properties.desc);
                         switch(feature.properties.desc){
                             case "mule deer":
                                 return L.icon({
                                    iconUrl: 'img/muledeericon.png',
                                    iconSize: [50, 50]
                                });
                             case "elk":
                                 return L.icon({
                                    iconUrl: 'img/elk.png',
                                    iconSize: [28, 28]
                                });
                             case "bison":
                                 return L.icon({
                                    iconUrl: 'img/bison.png',
                                    iconSize: [28, 28]
                                });
                             case "black bear":
                                 return L.icon({
                                    iconUrl: 'img/bear.png',
                                    iconSize: [42, 42]
                                });
                             case "California bighorn":
                                 return L.icon({
                                    iconUrl: 'img/sheep.png',
                                    iconSize: [28, 28]
                                });
                             case "desert bighorn":
                                 return L.icon({
                                    iconUrl: 'img/sheep.png',
                                    iconSize: [28, 28]
                                });
                             case "moose":
                                 return L.icon({
                                    iconUrl: 'img/moose.png',
                                    iconSize: [28, 28]
                                });
                             case "mountain goat":
                                 return L.icon({
                                    iconUrl: 'img/mountaingoat.png',
                                    iconSize: [28, 28]
                                });
                             case "pronghorn":
                                 return L.icon({
                                    iconUrl: 'img/antelope.png',
                                    iconSize: [28, 28]
                                });
                             case "Rocky Mountain bighorn":
                                 return L.icon({
                                    iconUrl: 'img/sheep.png',
                                    iiconSize: [28, 28]
                                });
                             case "Unidentified":
                                 return L.icon({
                                    iconUrl: 'img/def.png',
                                    iconSize: [19, 19]
                                });
                             case 'null':
                                return L.icon({
                                    iconUrl: 'img/def.png',
                                    iconSize: [19, 19]
                                });
                             case 'AWPE':
                                return L.icon({
                                    iconUrl: 'img/pelican.png',
                                    iconSize: [30, 30]
                                });
                             default:
                                 return L.icon({
                                    iconUrl: 'img/def.png',
                                    iconSize: [19, 19]
                                });


                         }
                     }

 var customLayer = L.geoJson(null, {
             pointToLayer: function(feature, latLng) {
                 if (feature.properties.hasOwnProperty('last')) {
                     var sp = speciesIcon(feature);
                     // console.log("SP",sp);
                     var marker;
                     if (sp){
                          marker = new L.Marker(latLng,{icon:sp});
                     }
                     else{
                         marker = new L.Marker(latlng);
                     }

                     // console.log(marker);
                     marker.bindPopup('<b>'+feature.properties.name+'</b>');
                     return marker;
                 }
                 return L.circleMarker(latLng);
                 // return L.circleMarker(latLng, {icon:icon});
             },
             style: {
                 color: '#2863d1',
                 weight: 3,
                 opacity: 1
             }
         });
 var layer = omnivore.gpx.parse(ctData, null, customLayer);
 console.log(layer);

         var gpxTimeLayer = L.timeDimension.layer.geoJson(layer, {
             updateTimeDimension: true,
             addlastPoint: true,
             waitForReady: true,
             duration: null
         });
         gpxTimeLayer.addTo(map);
         map.fitBounds(layer.getBounds());
         console.log(map.timeDimension);
 $("#acceptBtn").click(function() {

         var icon = L.icon({
             iconUrl: 'img/dot.png',
             iconSize: [49, 66],
             iconAnchor: [5, 25]
         });

     if ($('#tailCheck').is(':checked')) {
            var firstTime = gpxTimeLayer._availableTimes[0];
            var lastTime = gpxTimeLayer._availableTimes[gpxTimeLayer._availableTimes.length-1];
            var dur = (lastTime - firstTime)/86400000; //days
            dur = Math.round(dur/4);
         dur = dur.toString();
            var period = "P"+dur+"D";
        console.log("DUR",period);
        gpxTimeLayer._duration = period;
     }
     else{
         gpxTimeLayer._duration = null;
     }
     console.log("GPXTIMELAYER A",gpxTimeLayer);
     console.log("Map A",map);
     gpxTimeLayer._currentLayer.setStyle({weight:$("#weightSlider").val(),color:$("#colorPick").val(),opacity:$("#opSlider").val()});
     // gpxTimeLayer._baseLayer.setStyle({weight:$("#weightSlider").val(),color:$("#colorPick").val(),opacity:$("#opSlider").val()});
     gpxTimeLayer._baseLayer.options.style.color = $("#colorPick").val();
     gpxTimeLayer._baseLayer.options.style.weight = $("#weightSlider").val();
     gpxTimeLayer._baseLayer.options.style.opacity = $("#opSlider").val();
        // console.log("LAYER",layer);
     $('#myModal').modal('hide');
     console.log("GPXTIMELAYER B",gpxTimeLayer);
     console.log("Map B",map);

 });