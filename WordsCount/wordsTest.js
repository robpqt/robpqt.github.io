data = [5000, 4000, 2000];

var w = 500;
var h = 500;
var radius = Math.min(w, h) / 2;

var color = d3.scaleOrdinal()
	.range(["green", "orange", "yellow"]);

var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h)
	.append("g")	
	.attr("transform", "translate(" + (w / 2) +  "," + (h / 2) + ")")	
	
var pie = d3.pie()
	.value(function(d) {
		console.log(d)
		return d;
	})

var arc = d3.arc()
	.innerRadius(radius-80)
	.outerRadius(radius-50)
	.cornerRadius(5)
	.padAngle(0.01)

var labelArc = d3.arc()
	.innerRadius(radius)
	.outerRadius(radius)

var labelArc2 = d3.arc()
	.innerRadius(radius-60)
	.outerRadius(radius-60)

var g = svg.selectAll(".arc")
	.data(pie(data))
	.enter()
	.append("g")
    .attr("class", "arc")

var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) {
    	return color(d.data);
	})

var label = g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.text(function(d) {
		return d.data;
	})

var label2 = g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc2.centroid(d) + ")"; })
	.text(function(d) {
		return d.data;
	})

var lines = g.append("path")
	.attr("d", function(d) {
		this._current = this._current || d;
		var interpolate = d3.interpolate(this._current, d);
		this._current = interpolate(0);
		return function(t) {
			return arc(interpolate(t));
		};
	})





////


d3.csv("data/wordsCount.csv", function(data) {
	
	/*d3.select("body")
		.append("p")
		.text("Repartition du temps de parole 1")
		.style("font-size", "20px")
		.style("text-align", "center")*/

	var dataset = [];

	var w = 360;
	var h = 360;
	var radius = Math.min(w, h) / 2;

	var color = d3.scaleOrdinal()
		.range(["#4169E1", "#DC143C", "yellow"]);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.append("g")
		.attr("transform", "translate(" + (w / 2) +  "," + (h / 2) + ")");



	var arc = d3.arc()
		.innerRadius(100)
		.outerRadius(radius)
		.cornerRadius(10)
		.padAngle(0.05)

	var labelArc = d3.arc()
	    .outerRadius(radius -40)
	    .innerRadius(radius - 40);

	var pie = d3.pie()
		.value(function(d) { return d.wordsCount; })
		.sort(null);

	var tooltip = d3.select("body")
	    .append("div")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .text("a simple tooltip");

	var totalWords=0;
	data.forEach(function(d) {
		d.wordsCount = +d.wordsCount;
		totalWords+=d.wordsCount
	return totalWords;
	});
	var g = svg.selectAll(".arc")
    	.data(pie(data))
    	.enter()
    	.append("g")
    	.attr("class", "arc")
    	.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(Math.floor(d.data.wordsCount*90/totalWords)+" minutes");})
		.on("mousemove", function(){return tooltip.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
		    	;
	
	g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d) { return color(d.data.wordsCount); });

	g.append("text")
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.attr("dx", function(d) {
			if(d.data.person=="Clinton") {
				return "-35px";
			}	
			else if(d.data.person=="Moderator") {
				return "-40px";
			}
			else {
				return "-20px";
			}
		})
		.text(function(d) { 
			var temp = d.data.wordsCount*90/totalWords;
			temp=Math.floor(temp)
			var str = d.data.person
		return str.toUpperCase();
		})
		.style("font-size", "15px")

});



/*function pieChart(valuesBrut) {

	var valuesGeo=[];
	var totalBrut=0;
	var l = valuesBrut.length;
	
	for(i=0;i<l;i++) {
		totalBrut+=valuesBrut[i];
	}

	for(i=0;i<l;i++) {
		var numb = valuesBrut[i]*100/totalBrut;
		valuesGeo.push(numb);
	}
	return valuesGeo;
}
*/








