var w= 600, h = 500;

var color = d3.scaleQuantize()
	.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824']);

//CARTE DESAVANTAGES MTL
d3.json("data/geojsonLayer2.json",function(dataJSON){
	d3.json("data/quartier.json",function(dataJSON2){
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
					.attr("class","classQuartier")
					.attr("dy",0)
					.text("Passez votre curseur sur une zone pour avoir ses données")
				legend.append("text")
					.attr("class","classRevenu")
					.attr("dy",20)
					.text("")
				legend.append("text")
					.attr("class","classEducation")
					.attr("dy",40)
					.text("")
				legend.append("text")
					.attr("class","classMino")
					.attr("dy",60)
					.text("")

				var hLeg = 15;
				var legend2 = svg.append("g")
					.attr("transform","translate(5,90)")

				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",0*hLeg)
					.style("fill","#005824")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",1*hLeg)
					.style("fill","#238b45")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",2*hLeg)
					.style("fill","#41ae76")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",3*hLeg)
					.style("fill","#66c2a4")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",4*hLeg)
					.style("fill","#99d8c9")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",5*hLeg)
					.style("fill","#ccece6")
				legend2.append("rect")
					.attr("width",hLeg).attr("height",hLeg)
					.attr("y",6*hLeg)
					.style("fill","#edf8fb")

				legend2.append("text")
					.attr("x",25).attr("y",1*hLeg)
					.text("4")
				legend2.append("text")
					.attr("x",25).attr("y",2*hLeg)
					.text("2")
				legend2.append("text")
					.attr("x",25).attr("y",3*hLeg)
					.text("0")
				legend2.append("text")
					.attr("x",20).attr("y",4*hLeg)
					.text("-2")
				legend2.append("text")
					.attr("x",20).attr("y",5*hLeg)
					.text("-4")
				legend2.append("text")
					.attr("x",20).attr("y",6*hLeg)
					.text("-6")
				legend2.append("text")
					.attr("x",20).attr("y",7*hLeg)
					.text("-8")

				legend2.append("text").attr("y",9*hLeg).text("Indice de défavorisation")


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
	
				svg.append("g").selectAll("path")
					.data(dataJSON.features)
					.enter()
					.append("path")
					.attr("d", path)
					.style("opacity",0.7)
					.style("stroke", "green")
					.style("stroke-width", "0.1")
					.style("fill", function(d) {
						for(var i=0; i<dataCSV.length; i++) {
							if(d.properties.CTUID==dataCSV[i].CTUID) {
								console.log(typeof(dataCSV[i].Disadvantage_index))
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
						d3.select(this).style("fill","green")
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


				
					
			});		
		});
	});
});



