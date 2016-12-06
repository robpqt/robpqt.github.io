var w= 600, h = 500;

var color = d3.scaleQuantize()
	.range(['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']);

//CARTE DESAVANTAGES MTL
d3.json("data/geojsonLayer2.json",function(dataJSON){
	d3.csv("data/Classeur1.csv", function(dataCSV) {
		d3.csv("data/Zscores2.csv", function(dataCSV2) {

			var titre = d3.select("body").append("div")
				.text("Quartiers défavorisés de l'île de Montréal")

			var svg = d3.select("body").append("svg")
				.attr("width", w)
				.attr("height", h)

			var legend = svg.append("g")
				.attr("transform","translate(5,20)")

			legend.append("text")
				.attr("class","classRevenu")
				.text("Passez votre curseur sur une zone pour avoir ses données")
			legend.append("text")
				.attr("class","classEducation")
				.attr("dy",20)
				.text("")
			legend.append("text")
				.attr("class","classMino")
				.attr("dy",40)
				.text("")

			color.domain([
		        d3.min(dataCSV, function(d) { return d.Disadvantage_index; }),
		        d3.max(dataCSV, function(d) { return d.Disadvantage_index; })
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
				.style("stroke", "red")
				.style("stroke-width", "0.3")
				.style("fill", function(d) {
					for(var i=0; i<dataCSV.length; i++) {
						if(d.properties.CTUID==dataCSV[i].CTUID) {
							return color(dataCSV[i].Disadvantage_index);
						}
					}
				})
				.on("mouseover", function(d) {
					color.domain([
				        d3.min(dataCSV, function(d) { return d.Disadvantage_index; }),
				        d3.max(dataCSV, function(d) { return d.Disadvantage_index; })
				    ]);
					for(var i=0; i<dataCSV.length; i++) {
						if(d.properties.CTUID==dataCSV[i].CTUID){
							d3.select(".classRevenu")
								.text("Revenu : "+dataCSV2[i].MedianHsldIncome+" $")
							d3.select(".classEducation")
								.text("Etudes Post Sec : "+Math.floor((100*dataCSV2[i].PostSecPct))+" %")
							d3.select(".classMino")
								.text("Minorités visibles : "+Math.floor((100*dataCSV2[i].MinVisiblePct))+" %")
						}
					}
					d3.select(this).style("fill","red")
				})
				.on("mouseout", function(d){
					d3.select(this).style("fill", function(d) {
						for(var i=0; i<dataCSV.length; i++) {
							if(d.properties.CTUID==dataCSV[i].CTUID) {
								return color(dataCSV[i].Disadvantage_index);
							}
						}
					})
				})
				.on("mousemove", function(d) {
				})	
		});		
	});
});



