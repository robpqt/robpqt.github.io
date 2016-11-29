var centreX = 45.553;
var centreY = -73.658;

var mymap = L.map('mapid', {
	center: [centreX, centreY],
	zoom: 11
});
//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
L.tileLayer('https://api.mapbox.com/styles/v1/robpqt/civtpq686000n2kkxyujcbnjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9icHF0IiwiYSI6ImNpdnRwb2xmODAwMGkyb28wajFsMnpuN3QifQ.JjqbNi_h4A7KFvH0cRbrTA', {
}).addTo(mymap);

/*var svg = d3.select("#mapid").append("svg")
	.attr("width","100%")
	.attr("height", "100%")

var g = svg.append("g")*/

d3.json("data/geojsonLayer.json",function(dataJSON){
	d3.csv("data/Zscores.csv", function(dataCSV) {
		
		//CALCUL DU MAX ET MIN
		var maxRevenu = dataCSV[0].Zscore_revenu;
		var minRevenu = dataCSV[0].Zscore_revenu;
		for(var i=1; i<dataCSV.length; i++) {
			dataCSV[i].Zscore_revenu = +dataCSV[i].Zscore_revenu;

			if(maxRevenu<dataCSV[i].Zscore_revenu) {
				maxRevenu = dataCSV[i].Zscore_revenu
			}

			if(minRevenu>dataCSV[i].Zscore_revenu) {
				minRevenu = dataCSV[i].Zscore_revenu
			}
		}

		var colorScale = d3.scaleLinear()
			.domain([minRevenu,maxRevenu]).range(['#fff7ec','#7f0000']);

	  L.geoJson(dataJSON, {
	  	style: function(feature) {
	  		for(i=0; i<dataCSV.length; i++) {
					if(dataCSV[i].CTNAME==feature.properties.CTNAME) {
						return {
							fillColor: colorScale(dataCSV[i].Zscore_revenu),
							weight: 1,
			        opacity: 1,
			        color: 'white',
			        dashArray: '3',
			        fillOpacity: 0.9
						};
					}
				}

			//VIDER lES ZONES SANS DONNEES
			var temp = 1;
	  		for(i=0; i<dataCSV.length; i++) {
					if(feature.properties.CTNAME!=dataCSV[i].CTNAME) {
						temp+=1;
					}
	  		}
	  		if(temp==dataCSV.length+1) {
	  			return {fillColor: "none", color: "none"}
	  		}
	  	}
  	}).addTo(mymap)
	})
});


