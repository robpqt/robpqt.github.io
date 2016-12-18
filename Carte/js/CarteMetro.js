var w= 600, h = 500;
var margin = {top: 10, right: 10, bottom: 10, left: 0},
    centered;

var color = d3.scaleQuantize()
	.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824']);
//CARTE METRO
d3.json("data/zoneRes.json",function(dataJSON){
	d3.json("data/quartier.json",function(dataJSON2){
		d3.csv("data/Zscore.csv", function(dataCSV) {
			d3.csv("data/Realscore.csv", function(dataCSV2) {

				// var titre = d3.select("body").append("div").classed("titre",true)
				// 	.text("Proximité du métro")

				var svg = d3.select("#carte")
					.attr("width", w)
					.attr("height", h)
				    .attr("viewBox", [
				        margin.left,
				        margin.top,
				        (w+margin.left),
				        (h+margin.bottom)
					].join(" "))

				var legend = svg.append("g")
					.attr("transform","translate(5,20)")

				var legend = svg.append("g")
					.attr("transform","translate(5,20)")

				// legend.append("text")
				// 	.attr("class","classQuartier")
				// 	.attr("dy",5)
				// 	.text("Passez votre curseur un quartier pour afficher son nom")

				color.domain([
			        d3.min(dataCSV, function(d) { return d.Z_MetroAccess; }),
			        d3.max(dataCSV, function(d) { return d.Z_MetroAccess; })
		    	]);

				var center = d3.geoCentroid(dataJSON)
				var scale  = 50000;
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

				svg.append("g").selectAll("path")
					.data(dataJSON2.features)
					.enter()
					.append("path")
					.attr("d",path)
					.attr("class",function(d,i){
						return "quartier"+i;
					})
					.style("fill-opacity",0)
					.style("stroke", "green")
					.style("stroke-width", "1")
					.on("mouseover", function(d){
						d3.select(".classQuartier").text(d.properties.Q_socio)
						d3.select(this).style("fill","green").style("fill-opacity",0.3)
					})
					.on("mouseout",function(d) {
						d3.select(this).style("fill-opacity",0)
					})

			});
		});
	});
});
