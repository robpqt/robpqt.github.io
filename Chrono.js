//Definition des variables générales

var w = 1000;
var h = 300;
var decalage = 20;	
var tabX = [];
var unitH = 100;
var maxRange = w - 50;
var legendeUnit = 10;
var legendeDecalage = 150;

var color = d3.scaleOrdinal()
	.range(["#FFD700", "#4169E1", "#DC143C" ]);

//DEBAT 1
d3.csv("data/chrono.csv", function(data) {

	//Fonction pour avoir la taille en mot du débat
	var finX;
	data.forEach(function(d,i) {
		if(i==data.length-1) {
			var temp = +d.longueur
			var temp2 = +d.X 
			finX = temp + temp2
		}
	});
	var echelle = maxRange/finX;

	//On définit le SVG
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.append("g")
		.attr("transform", "translate("+decalage+","+(h-decalage)+")")

	//On crée la légende
	svg.append("text")
    	.text("Premier Débat")
    	.attr("y", -(h-50))	
    	.style("text-align", "center")

	var legende = svg.append("g")
		.attr("transform", "translate("+200+","+(-(h-50))+")")

	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#FFD700")

    legende.append("text")
    	.text("Moderateur")
    	.attr("x", legendeUnit*2)
    	.attr("y", legendeUnit)

    legende.append("rect")
    	.attr("x", legendeDecalage)
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#4169E1")

    legende.append("text")
    	.text("Clinton")
    	.attr("dx", legendeUnit*2+legendeDecalage)
    	.attr("dy", legendeUnit)

   	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.attr("x", legendeDecalage*2)
    	.style("fill", "#DC143C")

    legende.append("text")
    	.text("Trump")
    	.attr("x", legendeUnit*2+2*legendeDecalage)
    	.attr("y", legendeUnit)	

    var tooltip = d3.select("body")
	    .append("div")
	    .attr("class", "tooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("font-size", "12px")
	    .style("background", "#eee")
	    .style("border","solid")
	    .style("border-width", "5px")
	    .style("border-color","black")

    //On crée l'axe des X
	var axisScale = d3.scaleLinear()
		.domain([0, 90])
		.range([0, w-50]);

	var xAxis = d3.axisBottom(axisScale)
		
	svg.append("g")
    	.call(xAxis)

    //On crée la chrono
    svg.selectAll(".debateUnit")
    	.data(data)
    	.enter()
    	.append("rect")
    	.on("mouseover", function(d) {
    		if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH+20))
			}

			tooltip.style("visibility", "visible").text(d.text)
		})
		.on("mouseout", function(d) {
			if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH))
			}

			tooltip.style("visibility", "hidden").text(d.text)
		})
	
    	.style("fill", function(d) { return color(d.orateur) })
    	.attr("width", function(d) {
    		return d.longueur*echelle;
    	})
    	.attr("x", function(d) {
    		return d.X*echelle;
    	})
    	.transition()
    	.duration(2000)	
    	.attr("height", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return unitH*2}
    		else{return unitH}
    	})
    	.attr("y", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return -(unitH*2)}
    		else{return -unitH}
    	})
    	



})

//DEBAT 2
d3.csv("data/chrono2.csv", function(data) {


	var finX;
	data.forEach(function(d,i) {
		if(i==data.length-1) {
			var temp = +d.longueur
			var temp2 = +d.X 
			finX = temp + temp2
		}
	});
	var echelle = maxRange/finX;

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.append("g")
		.attr("transform", "translate("+decalage+","+(h-decalage)+")")

	svg.append("text")
    	.text("Second Débat")
    	.attr("y", -(h-50))

    var legende = svg.append("g")
		.attr("transform", "translate("+200+","+(-(h-50))+")")

	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#FFD700")

    legende.append("text")
    	.text("Moderateur")
    	.attr("x", legendeUnit*2)
    	.attr("y", legendeUnit)

    legende.append("rect")
    	.attr("x", legendeDecalage)
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#4169E1")

    legende.append("text")
    	.text("Clinton")
    	.attr("dx", legendeUnit*2+legendeDecalage)
    	.attr("dy", legendeUnit)

   	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.attr("x", legendeDecalage*2)
    	.style("fill", "#DC143C")

    legende.append("text")
    	.text("Trump")
    	.attr("x", legendeUnit*2+2*legendeDecalage)
    	.attr("y", legendeUnit)

	var axisScale = d3.scaleLinear()
		.domain([0, 90])
		.range([0, w-50]);

	var xAxis = d3.axisBottom(axisScale)
		
	svg.append("g")
    	.call(xAxis)

    svg.selectAll(".debateUnit")
    	.data(data)
    	.enter()
    	.append("rect")
    	.on("mouseover", function(d) {
    		if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH+20))
			}
		})
		.on("mouseout", function(d) {
			if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH))
			}
		})
    	.style("fill", function(d) { return color(d.orateur) })
    	.attr("width", function(d) {
    		return d.longueur*echelle;
    	})
    	.attr("x", function(d) {
    		return d.X*echelle;
    	})
    	.transition()
    	.duration(2000)	
    	.attr("height", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return unitH*2}
    		else{return unitH}
    	})
    	.attr("y", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return -(unitH*2)}
    		else{return -unitH}
    	})


    

})
// DEBAT 3
d3.csv("data/chrono3.csv", function(data) {

	var finX;
	data.forEach(function(d,i) {
		if(i==data.length-1) {
			var temp = +d.longueur
			var temp2 = +d.X 
			finX = temp + temp2
		}
	});
	var echelle = maxRange/finX;

	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.append("g")
		.attr("transform", "translate("+decalage+","+(h-decalage)+")")

	svg.append("text")
    	.text("Troisième Débat")
    	.attr("y", -(h-50))	
    	.style("text-align", "center")

	var legende = svg.append("g")
		.attr("transform", "translate("+200+","+(-(h-50))+")")

	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#FFD700")

    legende.append("text")
    	.text("Moderateur")
    	.attr("x", legendeUnit*2)
    	.attr("y", legendeUnit)

    legende.append("rect")
    	.attr("x", legendeDecalage)
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.style("fill", "#4169E1")

    legende.append("text")
    	.text("Clinton")
    	.attr("dx", legendeUnit*2+legendeDecalage)
    	.attr("dy", legendeUnit)

   	legende.append("rect")
    	.attr("width", legendeUnit)
    	.attr("height", legendeUnit)
    	.attr("x", legendeDecalage*2)
    	.style("fill", "#DC143C")

    legende.append("text")
    	.text("Trump")
    	.attr("x", legendeUnit*2+2*legendeDecalage)
    	.attr("y", legendeUnit)

	var axisScale = d3.scaleLinear()
		.domain([0, 90])
		.range([0, w-50]);

	var xAxis = d3.axisBottom(axisScale)
		
	svg.append("g")
    	.call(xAxis)

    svg.selectAll(".debateUnit")
    	.data(data)
    	.enter()
    	.append("rect")
    	.on("mouseover", function(d) {
    		if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH+20))
			}
		})
		.on("mouseout", function(d) {
			if(d.longueur>20) {
				d3.select(this)
				.transition(1000)
				.attr("y", -(unitH))
			}
		})
    	.style("fill", function(d) { return color(d.orateur) })
    	.attr("width", function(d) {
    		return d.longueur*echelle;
    	})
    	.attr("x", function(d) {
    		return d.X*echelle;
    	})
    	.transition()
    	.duration(2000)	
    	.attr("height", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return unitH*2}
    		else{return unitH}
    	})
    	.attr("y", function(d) {
    		if(d.longueur<20 && ( d.orateur == "TRUMP" || d.orateur == "CLINTON" ) && d.X>500){return -(unitH*2)}
    		else{return -unitH}
    	})
    		   

})