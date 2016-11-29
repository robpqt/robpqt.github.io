/*var centreX = 45.553;
var centreY = -73.658;

var mymap = L.map('mapid', {
	center: [centreX, centreY],
	zoom: 11
});

L.tileLayer('https://api.mapbox.com/styles/v1/robpqt/civtpq686000n2kkxyujcbnjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9icHF0IiwiYSI6ImNpdnRwb2xmODAwMGkyb28wajFsMnpuN3QifQ.JjqbNi_h4A7KFvH0cRbrTA', {
}).addTo(mymap);*/

var w= 960, h = 500;

/*var svg = d3.select(mymap.getPanes().overlayPane).append("svg")
	.attr("width", w)
	.attr("height", h)
	.append("g").attr("class", "leaflet-zoom-hide");*/

var svg = d3.select("body").append("svg")
	.attr("width", w)
	.attr("height", h)

var color = d3.scaleQuantize()
	.range(["rgb(237,248,233)", "rgb(186,228,179)",
	"rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"]);


d3.json("data/geojsonLayer.json",function(dataJSON){
	d3.csv("data/Zscores.csv", function(dataCSV) {

		color.domain([
	        d3.min(dataCSV, function(d) { return d.Zscore_revenu; }),
	        d3.max(dataCSV, function(d) { return d.Zscore_revenu; })
	    ]);

		var center = d3.geoCentroid(dataJSON)
		var scale  = 60000;
		var offset = [w/2, h/2];
		var projection = d3.geoMercator().scale(scale).center(center)
			.translate(offset);

		var path = d3.geoPath().projection(projection);

		var tooltip = d3.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")
			.style("font-size", "12px")
			.style("color", "black")
			

		svg.selectAll("path")
			.data(dataJSON.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("stroke", "white").style("stroke-width", "0.2")
			.style("fill", function(d) {
				for(var i=0; i<dataCSV.length; i++) {
					if(d.properties.CTNAME==dataCSV[i].CTNAME) {
						return color(dataCSV[i].Zscore_revenu);
					}
				}

				//SUPPRIMER LES ZONES SANS DONNEES
				var temp = 1;
		  		for(i=0; i<dataCSV.length; i++) {
						if(d.properties.CTNAME!=dataCSV[i].CTNAME) {
							temp+=1;
						}
		  		}
		  		if(temp==dataCSV.length+1) {
		  			return "none"
		  		}
			})
			.on("mouseover", function(d) {
				tooltip
					.style("visibility", "visible")
					.text(function() {
						for(var i=0; i<dataCSV.length; i++) {
							if(d.properties.CTNAME==dataCSV[i].CTNAME){
								return dataCSV[i].Revenu_median+" $";
							}
						}

					})
				d3.select(this).style("stroke", "black")
			})
			.on("mouseout", function(){
				d3.select(this).style("stroke", "white")

			})
			.on("mousemove", function(d) {
				tooltip
					.style("left", (d3.event.pageX - 34) + "px")
      				.style("top", (d3.event.pageY - 40) + "px")
			})
			
	});
});

/*d3.csv("data/Zscores.csv", function(dataCSV) {
		
		
})*/
/*var centreX = 45.553;
var centreY = -73.658;
*/
/*var mymap = L.map('mapid', {
	center: [centreX, centreY],
	zoom: 11
});

L.tileLayer('https://api.mapbox.com/styles/v1/robpqt/civtpq686000n2kkxyujcbnjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9icHF0IiwiYSI6ImNpdnRwb2xmODAwMGkyb28wajFsMnpuN3QifQ.JjqbNi_h4A7KFvH0cRbrTA', {
}).addTo(mymap);*/