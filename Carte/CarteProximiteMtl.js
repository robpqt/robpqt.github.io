var w= 600, h = 500;

var color = d3.scaleQuantize()
	.range(['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']);

//CARTE ACCES MTL
d3.json("data/geojsonLayer2.json",function(dataJSON){
	d3.csv("data/Classeur1.csv", function(dataCSV) {
		d3.csv("data/Zscores2.csv", function(dataCSV2) {

			var titre = d3.select("body").append("div").classed("titre",true)
				.text("Carte affichée : Métro")

			var svg = d3.select("body").append("svg")
				.attr("width", w)
				.attr("height", h)

			var legend = svg.append("g")
				.attr("transform","translate(5,20)")

			legend.append("text")
				.classed("classMetro",true)
				.text("Afficher Métro")
				.on("click", function() {
					color.domain([
			        d3.min(dataCSV, function(d) { return d.Z_MetroAccess; }),
			        d3.max(dataCSV, function(d) { return d.Z_MetroAccess; })
			 	   ]);
					for(var i=0; i<498; i++) {
						d3.select(".unit"+i)
							.style("fill", function() {
								return color(dataCSV[i].Z_MetroAccess);
						})
					}
					d3.select(".titre").text("Carte affichée : Métro")
				})
			legend.append("text")
				.classed("classBus",true)
				.attr("dy",20)
				.text("Afficher Bus")
				.on("click", function() {
					color.domain([
			        d3.min(dataCSV, function(d) { return d.Z_BusAccess; }),
			        d3.max(dataCSV, function(d) { return d.Z_BusAccess; })
			    ]);
					for(var i=0; i<dataCSV.length; i++) {
						d3.select(".unit"+i).style("fill", function() {
							return color(dataCSV[i].Z_BusAccess);
						})
					}
					d3.select(".titre").text("Carte affichée : Bus")

				})
			legend.append("text")
				.classed("classBixi",true)
				.attr("dy",40)
				.text("Afficher Bixi")
				.on("click", function() {
					color.domain([
			        d3.min(dataCSV, function(d) { return d.Z_BixiAccess; }),
			        d3.max(dataCSV, function(d) { return d.Z_BixiAccess; })
			        ]);
					for(var i=0; i<dataCSV.length; i++) {
						d3.select(".unit"+i).style("fill", function() {
							return color(dataCSV[i].Z_BixiAccess);
						})
					}
					d3.select(".titre").text("Carte affichée : Bixi")

				})

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
				.style("stroke", "red")
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