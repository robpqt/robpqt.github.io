d3.csv("data/wordsCount.csv", function(data) {
	
	/*d3.select("body")
		.append("p")
		.text("Repartition du temps de parole 2")
		.style("font-size", "20px")
		.style("text-align", "center")*/

	function animateFirstStep(){
    d3.select(this)
      .transition()                            
      .attr("d",arc1)

    };

	function animateSecondStep(){
    d3.select(this)
      .transition()
      .attr("d", arc)
	};

	var w = 360;
	var h = 360;
	var radius = Math.min(w, h) / 2;

	var color = d3.scaleOrdinal()
		.range(["#4169E1", "#DC143C", "#FFD700"]);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.append("g")
		.attr("transform", "translate(" + (w / 2) +  "," + (h / 2) + ")");

	var arc = d3.arc()
		.innerRadius(radius*0.7)
		.outerRadius(radius*0.8)
		.cornerRadius(2)
		.padAngle(0.02)

	var arc1 = d3.arc()
		.innerRadius(radius*0.75)
		.outerRadius(radius*0.85)
		.cornerRadius(2)
		.padAngle(0.02)

	var labelArc = d3.arc()
	    .outerRadius(radius)
	    .innerRadius(radius);

	var timeArc = d3.arc()
	    .outerRadius(radius*0.62)
	    .innerRadius(radius*0.61)
	    .padAngle(0.1)

	var timeArc1 = d3.arc()
	    .outerRadius(radius*0.70)
	    .innerRadius(radius*0.71)
	    .padAngle(0.1)

	var labelTimeArc = d3.arc()
	    .outerRadius(radius*0.5)
	    .innerRadius(radius*0.5)

	var pie = d3.pie()
		.value(function(d) { return d.wordsCount; })
		.sort(null);

	var tooltip = d3.select("body")
	    .append("div")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("font-size", "30px")

	var totalWords=0;
	data.forEach(function(d) {
		d.wordsCount = +d.wordsCount;
		totalWords+=d.wordsCount;
	return totalWords;
	});

	
// ON COMMENCE A TOUT CONSTRUIRE
	var g = svg.selectAll(".arc")
    	.data(pie(data))
    	.enter()
    	.append("g")
    	.attr("class", "arc")	

	g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d) { return color(d.data.wordsCount); })
	    .on("mouseover", animateFirstStep)
      	.on("mouseout", animateSecondStep);

	g.append("text")
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.attr("dx", function(d) {
			if(d.data.person=="Clinton") {
				return "-60px";
			}	
			else if(d.data.person=="Moderator") {
				return "-40px";
			}
			else {
				return "-20px";
			}
		})
		.text(function(d) { 
			var str = d.data.person;
		return str.toUpperCase();
		})
		.style("font-size", "15px")

	g.append("path")
		.attr("d", timeArc)
		.style("fill", "black")

	g.append("text")
		.attr("transform", function(d) { return "translate("+labelTimeArc.centroid(d)+")"})
		.text(function(d) { return Math.floor(d.data.wordsCount*90/totalWords) })
		.attr("dx", "-10px")

	g.append("text")
		.attr("transform", "translate(-30)" )
		.text("1er DEBAT")

});


