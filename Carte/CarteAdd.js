var w= 600, h = 500;

var color = d3.scaleQuantize()
	.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824']);

//CARTE METRO
d3.json("data/geojsonLayer2.json",function(dataJSON){
	d3.json("data/quartier.json",function(dataJSON2){
		d3.csv("data/Classeur1.csv", function(dataCSV) {
			d3.csv("data/Zscores2.csv", function(dataCSV2) {

				var titre = d3.select("body").append("div").classed("titre",true)
					.text("Proximité aux transports")

				var svg = d3.select("body").append("svg")
					.attr("width", w)
					.attr("height", h)

				color.domain([
			        d3.min(dataCSV, function(d) { 
			        	var temp1=(+d.Z_MetroAccess)
						var temp2=(+d.Z_BusAccess)
						var temp3=(+d.Z_BixiAccess)
						var tot = (temp1+temp2+temp3)
						var tot2 = tot.toString()
			        	return (tot2); 
			        }),
			        d3.max(dataCSV, function(d) { 
			        	var temp1=(+d.Z_MetroAccess)
						var temp2=(+d.Z_BusAccess)
						var temp3=(+d.Z_BixiAccess)
						var tot = (temp1+temp2+temp3)
						var tot2 = tot.toString()
			        	return (tot2); 
			        })
		    	]);

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
					.text("8")
				legend2.append("text")
					.attr("x",25).attr("y",2*hLeg)
					.text("6")
				legend2.append("text")
					.attr("x",25).attr("y",3*hLeg)
					.text("4")
				legend2.append("text")
					.attr("x",25).attr("y",4*hLeg)
					.text("2")
				legend2.append("text")
					.attr("x",25).attr("y",5*hLeg)
					.text("0")
				legend2.append("text")
					.attr("x",20).attr("y",6*hLeg)
					.text("-2")
				legend2.append("text")
					.attr("x",20).attr("y",7*hLeg)
					.text("-4")

				legend2.append("text").attr("y",9*hLeg).text("Indice de Proximité aux transports")

				var center = d3.geoCentroid(dataJSON)
				var scale  = 60000;
				var offset = [w/2, h/2];
				var projection = d3.geoMercator().scale(scale).center(center)
					.translate(offset);

				var path = d3.geoPath().projection(projection);

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
				

				svg.append("g").selectAll("path")
					.data(dataJSON.features)
					.enter()
					.append("path")
					.attr("d", path)
					.attr("class", function(d,i){
						return "unit"+i;
					})
					.style("opacity",0.7)
					.style("stroke", "green")
					.style("stroke-width", "0.1")
					.style("fill", function(d) {
						for(var i=0; i<dataCSV.length; i++) {
							if(d.properties.CTUID==dataCSV[i].CTUID) {
								var temp1=(+dataCSV[i].Z_MetroAccess)
								var temp2=(+dataCSV[i].Z_BusAccess)
								var temp3=(+dataCSV[i].Z_BixiAccess)
								var tot = (temp1+temp2+temp3)
								var tot2 = tot.toString()
								return color(tot2);
							}
						}
					})
			});
		});		
	});
});