var w= 600, h = 500;

var color = d3.scaleQuantize()
	.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824']);
//CARTE METRO
d3.json("data/geojsonLayer2.json",function(dataJSON){
	d3.csv("data/Classeur1.csv", function(dataCSV) {
		d3.csv("data/Zscores2.csv", function(dataCSV2) {

			var titre = d3.select("body").append("div").classed("titre",true)
				.text("Proximité au métro")

			var svg = d3.select("body").append("svg")
				.attr("width", w)
				.attr("height", h)

			var legend = svg.append("g")
				.attr("transform","translate(5,20)")

			color.domain([
		        d3.min(dataCSV, function(d) { return d.Z_MetroAccess; }),
		        d3.max(dataCSV, function(d) { return d.Z_MetroAccess; })
	    	]);

			var center = d3.geoCentroid(dataJSON)
			var scale  = 60000;
			var offset = [w/2, h/2];
			var projection = d3.geoMercator().scale(scale).center(center)
				.translate(offset);

			var path = d3.geoPath().projection(projection);

			svg.selectAll("path")
				.data(dataJSON.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class", function(d,i){
					return "unit"+i;
				})
				.style("stroke", "green")
				.style("stroke-width", "0.3")
				.style("fill", function(d) {
					for(var i=0; i<dataCSV.length; i++) {
						if(d.properties.CTUID==dataCSV[i].CTUID) {
							return color(dataCSV[i].Z_MetroAccess);
						}
					}
				})



		});		
	});
});