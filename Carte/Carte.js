var centreX = 45.553;
var centreY = -73.658;

var mymap = L.map('mapid', {
	center: [centreX, centreY],
	zoom: 11
});

L.tileLayer('https://api.mapbox.com/styles/v1/robpqt/civtpq686000n2kkxyujcbnjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9icHF0IiwiYSI6ImNpdnRwb2xmODAwMGkyb28wajFsMnpuN3QifQ.JjqbNi_h4A7KFvH0cRbrTA', {
}).addTo(mymap);

var svg = d3.select(mymap.getPanes().overlayPane).append("svg")
var g = svg.append("g").attr("class", "leaflet-zoom-hide");