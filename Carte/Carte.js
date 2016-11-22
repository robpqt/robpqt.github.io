var centreX = 45.553;
var centreY = -73.658;

var mymap = L.map('mapid', {
	center: [centreX, centreY],
	zoom: 11
});

// CARTE OSM
//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

L.tileLayer('https://api.mapbox.com/styles/v1/robpqt/civtpq686000n2kkxyujcbnjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9icHF0IiwiYSI6ImNpdnRwb2xmODAwMGkyb28wajFsMnpuN3QifQ.JjqbNi_h4A7KFvH0cRbrTA', {
}).addTo(mymap);

$.getJSON("data/geojsonLayer.json",function(data){
  L.geoJson(data).addTo(mymap);
});