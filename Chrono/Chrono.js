//VARIABLES GENERALES
var w = 900;
var h = 150;
var decalage = 20;	
var unitH = 100;
var maxRange = w - 50;
var legendeUnit = 10;
var incrementation = 0;

var color = d3.scaleOrdinal()
	.range(["#FFD700", "#4169E1", "#DC143C" ]);

chrono("data/chrono.csv");
//chrono("data/chrono2.csv");
//chrono("data/chrono3.csv");

//FONCTION CREATION RENDU VISUEL
function chrono(link) {
  d3.csv(link, function(data) {

    incrementation+=1;

    //Mise à l'échelle de la longueur du débat
    var echelle = maxRange/(+data[data.length-1].longueur+(+data[data.length-1].X));

    // LE TITRE
    var titre = d3.select("body")
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
    
    //LA BARRE DE RECHERCHE
    var recherche = d3.select("body")
      .append("form")
      .attr("class", function () {
        switch(link) {
          case "data/chrono.csv":
            return "bloc1";
            break;

          case "data/chrono2.csv":
            return "bloc2";
            break;

          case "data/chrono3.csv":
            return "bloc3";
            break;
        }
      })
      .classed("formulaire",true)

    recherche.append("input")
      .attr("id","recherche")
      .attr("type","text")
      .attr("placeholder","Rechercher un mot")
    recherche.append("input")
      .attr("class","inputRecherche")
      .attr("type","button")
      .attr("value","Rechercher")

    //METTRE LES MOTS DANS UN TABLEAU SANS PONCTUATION
    var tab=[];
    for(var i=0; i<data.length; i++){
      var temp = data[i].text;
      temp = temp.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      temp = temp.toLowerCase();
      tab[i] = temp.split(" ");
    } 
    
    //FONCTION DE RECHERCHE
    var inputElem = d3.selectAll("input")
    inputElem.on("change", inputChange)
    
    function inputChange() {

      var temp = this.value;
      var tabRecherche = temp.split(" ");
      var longeurTabRecherche = tabRecherche.length;
      var tot = 0;
      var incr1=0;
      var tabIndice = [];

      d3.selectAll(".debateUnit").attr("y", -unitH)

      for(var j=0; j<data.length; j++){
       // alert("TEST UNO, j: "+j)
        for(var k=0; k<tab[j].length-longeurTabRecherche; k++) {
          //alert("TEST DUO, k "+k)
          if(tabRecherche[0]==tab[j][k]){
            var incr = 0;
            tot=0;
            for(var l=k; l<(k+longeurTabRecherche); l++) {
              if(tab[j][l]==tabRecherche[incr]) {
                tot+=1;              }
              incr+=1;
            }         
            if(tot==longeurTabRecherche){
              tabIndice.push(j);
              break;
            }  
          }
        }
      }

      for(j=0; j<data.length; j++){
        if(j==tabIndice[incr1]) {
            d3.select(".unit"+j)
              .transition(1000)
              .attr("y", -(unitH+20))
            incr1+=1;
        }
      }
    }

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
      .classed("pushable", true)
      .attr("width", legendeUnit*1.5)
      .attr("height", legendeUnit*1.5)
      .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
      .style("fill", "#FFD700")
      .on("click", function() {
        if(d3.selectAll(".rect4").classed("interruptionpushable")==true){
          if(d3.select(this).classed("pushable")==true) {
            d3.selectAll(".MODERATOR")
              .attr("height", 0)
            d3.select(this).classed("pushable",false)
            d3.selectAll(".rect1")
              .transition(1000)
              .attr("width", legendeUnit)
              .attr("height", legendeUnit)
              .attr("transform", "translate(0,0)")
          }
          else {
            d3.selectAll(".MODERATOR")
              .attr("height", unitH)
            d3.select(this).classed("pushable",true)
            d3.selectAll(".rect1")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
        }
          
      })
    legende.append("text")
      .attr("y",legendeUnit)
      .attr("x", legendeUnit*2)
      .text("Moderateur")
      
    //LEGENDE CLINTON
    legende.append("rect")
      .classed("rect2",true)
      .classed("pushable", true)
      .attr("y", legendeUnit*2)
      .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
      .attr("width", legendeUnit*1.5)
      .attr("height", legendeUnit*1.5)
      .style("fill", "#4169E1")
      .on("click", function() {
        if(d3.selectAll(".rect4").classed("interruptionpushable")==true){
          if(d3.select(this).classed("pushable")==true) {
            d3.selectAll(".CLINTON")
              .attr("height", 0)
            d3.select(this).classed("pushable",false)
            d3.selectAll(".rect2")
              .transition(1000)
              .attr("width", legendeUnit)
              .attr("height", legendeUnit)
              .attr("transform", "translate(0,0)")
          }
          else {
            d3.selectAll(".CLINTON")
              .attr("height", unitH)
            d3.select(this).classed("pushable",true)
            d3.selectAll(".rect2")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
        }
        else {
          if(d3.select(this).classed("pushable")==true) {
            d3.selectAll(".CLINTON")
              .attr("height", 0)
            d3.select(this).classed("pushable",false)
            d3.selectAll(".rect2")
              .transition(1000)
              .attr("width", legendeUnit)
              .attr("height", legendeUnit)
              .attr("transform", "translate(0,0)")
          }
          else {
            d3.selectAll(".interruption").attr("height", unitH)
            d3.select(this).classed("pushable",true)
            d3.selectAll(".rect2")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")

          }
        }
      })
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*3)
      .text("Clinton")
      
    //LEGENDE TRUMP
    legende.append("rect")
      .classed("rect3",true)
      .classed("pushable", true)
      .attr("width", legendeUnit*1.5)
      .attr("height", legendeUnit*1.5)
      .attr("y", legendeUnit*4)
      .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
      .style("fill", "#DC143C")
      .on("click", function() {
        if(d3.selectAll(".rect4").classed("interruptionpushable")==true){
          if(d3.select(this).classed("pushable")==true) {
            d3.selectAll(".TRUMP")
              .attr("height", 0)
            d3.select(this).classed("pushable",false)
            d3.selectAll(".rect3")
              .transition(1000)
              .attr("width", legendeUnit)
              .attr("height", legendeUnit)
              .attr("transform", "translate(0,0)")
          }
          else {
            d3.selectAll(".TRUMP")
              .attr("height", unitH)
            d3.select(this).classed("pushable",true)
            d3.selectAll(".rect3")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
        }
        else {
          if(d3.select(this).classed("pushable")==true) {
            d3.selectAll(".TRUMP")
              .attr("height", 0)
            d3.select(this).classed("pushable",false)
            d3.selectAll(".rect3")
              .transition(1000)
              .attr("width", legendeUnit)
              .attr("height", legendeUnit)
              .attr("transform", "translate(0,0)")
          }
          else {
            d3.selectAll(".interruption").attr("height", unitH)
            d3.select(this).classed("pushable",true)
            d3.selectAll(".rect3")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")

          }
        }
      })
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*5)
      .text("Trump")
      
    //LEGENDE INTERRUPTION
    legende.append("rect")
      .classed("rect4",true)
      .classed("interruptionpushable",true)
      .attr("width", legendeUnit)
      .attr("height", legendeUnit)
      .attr("y", legendeUnit*6)
      .style("fill", "black")
      .on("click", function() {
        if(d3.select(this).classed("interruptionpushable")) {
          if(d3.selectAll(".rect1").classed("pushable")==false){
            d3.selectAll(".MODERATOR")
              .attr("height", unitH)
            d3.selectAll(".rect1")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
          if(d3.selectAll(".rect2").classed("pushable")==false){
            d3.selectAll(".CLINTON")
              .attr("height", unitH)
            d3.selectAll(".rect2")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
          if(d3.selectAll(".rect3").classed("pushable")==false){
            d3.selectAll(".TRUMP")
              .attr("height", unitH)
            d3.selectAll(".rect3")
              .transition(1000)
              .attr("width", legendeUnit*1.5)
              .attr("height", legendeUnit*1.5)
              .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
          }
          d3.selectAll(".MODERATOR").attr("height",0)
          d3.selectAll(".CLINTON").attr("height",0)
          d3.selectAll(".TRUMP").attr("height",0)
          d3.selectAll(".interruption").attr("height",unitH)
          d3.select(this).classed("interruptionpushable",false)
          d3.selectAll(".rect4")
            .transition(1000)
            .attr("width", legendeUnit*1.5)
            .attr("height", legendeUnit*1.5)
            .attr("transform", "translate(0,"+(-legendeUnit/4)+")")
        }
        else {
          d3.select(this).classed("interruptionpushable",true)
          d3.selectAll(".MODERATOR").attr("height",unitH)
          d3.selectAll(".CLINTON").attr("height",unitH)
          d3.selectAll(".TRUMP").attr("height",unitH)
          d3.selectAll(".rect4")
            .transition(1000)
            .attr("width", legendeUnit)
            .attr("height", legendeUnit)
            .attr("transform", "translate(0,0)")
        }
      })
    legende.append("text")
      .attr("x", legendeUnit*2)
      .attr("y", legendeUnit*7)
      .text("Interruption")
      
    //SVG PRINCIPALE
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate("+decalage+","+(h-decalage)+")")

    //LE TOOLTIP POUR AFFICHER LE TEXTE
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

    //CREATION AXE X
    if(link=="data/chrono.csv") {
      var axisScale = d3.scaleBand()
        .domain(["Achieving prosperity", "America's direction","Securing America"])
        .range([0, maxRange])
      var xAxis = d3.axisBottom(axisScale)
      svg.append("g")
        .call(xAxis)
    }
    else if(link=="data/chrono2.csv") {
      var axisScale = d3.scaleBand()
        .domain(["The Affordable Care Act", "Islamophobia and Syrian refugees","Wikileaks and taxes","The war in Syria","Leadership"])
        .range([0, maxRange])
      var xAxis = d3.axisBottom(axisScale)
      svg.append("g")
        .call(xAxis)        
    }
    else {
      var axisScale = d3.scaleBand()
        .domain(["debt and entitlements", "immigration, the economy","the Supreme Court","foreign hot spots","fitness to be president"])
        .range([0, maxRange])
      var xAxis = d3.axisBottom(axisScale)
      svg.append("g")
        .call(xAxis)   
    }

    //CREATION CHRONOLOGIE
    svg.selectAll(".debateUnit")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", function(d,i) {
        switch(link) {
          case "data/chrono.csv":
            if(d.orateur=="MODERATOR"){
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc1";
            }
            else if(d.orateur=="CLINTON") {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc1";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc1";
            }
            else {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc1";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc1";
            }
          break;
          case "data/chrono2.csv":
            if(d.orateur=="MODERATOR"){
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc2";
            }
            else if(d.orateur=="CLINTON") {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc2";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc2";
            }
            else {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc2";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc2";
            }
          break;
          case "data/chrono3.csv":
            if(d.orateur=="MODERATOR"){
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc3";
            }
            else if(d.orateur=="CLINTON") {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc3";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc3";
            }
            else {
              if(d.longueur<20 && d.X>500) {
                return d.orateur+" "+"interruption"+" "+"unit"+i+" debateUnit"+" bloc3";
              }
              return d.orateur+" "+"unit"+i+" debateUnit"+" bloc3";
            }
          break;
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

