//VARIABLES GENERALES
var w = 900;
var h = 200;
var decalage = 20;	
var unitH = 100;
var maxRange = w - 50;
var legendeUnit = 10;

var color = d3.scaleOrdinal()
	.range(["#FFD700", "#4169E1", "#DC143C" ]);

chrono("data/chrono.csv");
chrono("data/chrono2.csv");
chrono("data/chrono3.csv");

//FONCTION CREATION RENDU VISUEL
function chrono(link) {
  d3.csv(link, function(data) {

    //Mise à l'échelle de la longueur du débat
    var echelle = maxRange/(+data[data.length-1].longueur+(+data[data.length-1].X));

    // LE TITRE
    d3.select("body")
      .append("div")
      .text(function(){
        if(link=="data/chrono.csv") {
          return "DEBAT 1"
        }
        else if(link=="data/chrono2.csv") {
          return "DEBAT 2"
        }
        else {
          return "DEBAT 3"
        }
      })
      .style("text-align","center")

    //SVG LEGENDE
    var legende = d3.select("body")
      .append("svg")
      .attr("width", 100)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(0,"+(h-unitH)+")")
    
    //LEGENDE MODERATOR
    legende.append("rect")
      .classed("rect1",true)
      .attr("width", legendeUnit)
      .attr("height", legendeUnit)
      .attr("y",0)
      .style("fill", "#FFD700")
    legende.append("text")
      .attr("y",legendeUnit)
      .attr("x", legendeUnit*2)
      .classed("pushed", true)
      .text("Moderateur")
      .on("click", function() {
        if(d3.select(this).classed("pushed")==true) {
          d3.selectAll(".TRUMP")
            .attr("height",0)
          d3.selectAll(".CLINTON")
            .attr("height",0)
          d3.selectAll(".MODERATOR")
            .attr("height", unitH)
          d3.select(this).classed("pushed",false)
          d3.selectAll(".rect1")
            .transition(1000)
            .attr("width", legendeUnit*1.5)
            .attr("height", legendeUnit*1.5)
            .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
        }
        else {
          d3.selectAll(".TRUMP")
            .attr("height",unitH)
          d3.selectAll(".CLINTON")
            .attr("height",unitH)
          d3.selectAll(".MODERATOR")
            .attr("height", unitH)
          d3.select(this).classed("pushed",true)
          d3.selectAll(".rect1")
            .transition(1000)
            .attr("width", legendeUnit)
            .attr("height", legendeUnit)
            .attr("transform", "translate(0,0)")
        }
      })

    //LEGENDE CLINTON
    legende.append("rect")
      .classed("rect2",true)
      .attr("y", legendeUnit*2)
      .attr("width", legendeUnit)
      .attr("height", legendeUnit)
      .style("fill", "#4169E1")
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*3)
      .classed("pushed", true)
      .text("Clinton")
      .on("click", function() {
        if(d3.select(this).classed("pushed")==true) {
          d3.selectAll(".MODERATOR")
            .attr("height",0)
          d3.selectAll(".TRUMP")
            .attr("height",0)
          d3.selectAll(".CLINTON")
            .attr("height", unitH)
          d3.select(this).classed("pushed",false)
          d3.selectAll(".rect2")
            .transition(1000)
            .attr("width", legendeUnit*1.5)
            .attr("height", legendeUnit*1.5)
            .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
        }
        else {
          d3.selectAll(".MODERATOR")
            .attr("height",unitH)
          d3.selectAll(".TRUMP")
            .attr("height",unitH)
          d3.selectAll(".CLINTON")
            .attr("height", unitH)
          d3.select(this).classed("pushed",true)
          d3.selectAll(".rect2")
            .transition(1000)
            .attr("width", legendeUnit)
            .attr("height", legendeUnit)
            .attr("transform", "translate(0,0)")
        }
      })

    //LEGENDE TRUMP
    legende.append("rect")
      .classed("rect3",true)
      .attr("width", legendeUnit)
      .attr("height", legendeUnit)
      .attr("y", legendeUnit*4)
      .style("fill", "#DC143C")
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*5)
      .classed("pushed", true)
      .text("Trump")
      .on("click", function() {
        if(d3.select(this).classed("pushed")==true) {
          d3.selectAll(".CLINTON")
            .attr("height",0)
          d3.selectAll(".MODERATOR")
            .attr("height",0)
          d3.selectAll(".TRUMP")
            .attr("height", unitH)
          d3.select(this).classed("pushed",false)
          d3.selectAll(".rect3")
            .transition(1000)
            .attr("width", legendeUnit*1.5)
            .attr("height", legendeUnit*1.5)
            .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
        }
        else {
          d3.selectAll(".CLINTON")
            .attr("height",unitH)
          d3.selectAll(".MODERATOR")
            .attr("height",unitH)
          d3.selectAll(".TRUMP")
            .attr("height", unitH)
          d3.select(this).classed("pushed",true)
          d3.selectAll(".rect3")
            .transition(1000)
            .attr("width", legendeUnit)
            .attr("height", legendeUnit)
            .attr("transform", "translate(0,0)")
        }
      })

    //LEGENDE INTERRUPTION
    legende.append("rect")
      .classed("rect4",true)
      .attr("width", legendeUnit)
      .attr("height", legendeUnit)
      .attr("y", legendeUnit*6)
      .style("fill", "black")
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*7)
      .classed("interruptionPushed",true)
      .text("Interruption")
      .on("click", function() {
        if(d3.select(this).classed("interruptionPushed")) {
          d3.selectAll(".interruption").attr("height", function() {
            return unitH*2
          })
          d3.selectAll(".interruption").attr("y", function() {
            return -(unitH*2);
          })
          d3.select(this).classed("interruptionPushed",false)
          d3.selectAll(".rect4")
            .transition(1000)
            .attr("width", legendeUnit*1.5)
            .attr("height", legendeUnit*1.5)
            .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
        }
        else {
          d3.selectAll(".interruption").attr("height", function() {
            return unitH;
          })
          d3.selectAll(".interruption").attr("y", function() {
            return -(unitH);
          })
          d3.select(this).classed("interruptionPushed",true)
          d3.selectAll(".rect4")
            .transition(1000)
            .attr("width", legendeUnit)
            .attr("height", legendeUnit)
            .attr("transform", "translate(0,0)")
        }
      })

    var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("font-size", "12px")
      .style("background", "#eee")
      .style("border","solid")
      .style("border-width", "2px")
      .style("border-color","grey")

    //SVG PRINCIPALE
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate("+decalage+","+(h-decalage)+")")

    //CREATION AXE X
    var axisScale = d3.scaleBand()
      .domain(["Achieving prosperity", "America's direction","Securing America"])
      .range([0, maxRange])
    var xAxis = d3.axisBottom(axisScale)
    svg.append("g")
        .call(xAxis)

    //CREATION CHRONOLOGIE
    svg.selectAll(".debateUnit")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", function(d) {
        if(d.orateur=="MODERATOR"){
          return d.orateur;
        }
        else if(d.orateur=="CLINTON") {
          if(d.longueur<20 && d.X>500) {
            return d.orateur+" "+"interruption";
          }
          return d.orateur;
        }
        else {
          if(d.longueur<20 && d.X>500) {
            return d.orateur+" "+"interruption";
          }
          return d.orateur;
        }
      })
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
      .duration(800)  
      .attr("height", unitH)
      .attr("y", -unitH)

    //DEBUT DU ZOOM
    /*var axisScale2 = d3.scaleOrdinal()
      .domain([0,90])
      .range([0, maxRange])
    var xAxis2 = d3.axisBottom(axisScale2)
    svg.append("g")
      .attr("transform", "translate(0,"+(h-300)+")")
      .call(xAxis2)
      .append("rect").attr("width", maxRange).attr("height",30)
        .attr("y",-30)
        .style("fill", "red")
        .style("opacity","0.4")
    d3.brushX()*/

    //AFFICHAGE TEXTE DANS UN CADRE A DROITE
    /*//DIV AFFICHAGE TEXTE
    var letexte = d3.select("body")
      .select(".container").append("svg").attr("width",15000).attr("height",300)
      .append("g")
      .attr("transform", "translate(10,20)")
    letexte.append("rect").attr("width",300).attr("height",300)
      .style("opacity",0.1).style("stroke","red").style("stroke-width","3px") 
    letexte.append("text")
      .classed("divText",true)
      //.classed("divText",true)
      //.style("align-self","flex-start")
      /*.style("background", "#eee")
      .style("border","solid")
      .style("border-width", "0.5px")
      .style("border-color","grey")
      .text("Passez votre curseur sur le débat")*/

  })
}

