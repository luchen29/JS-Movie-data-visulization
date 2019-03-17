(function() {
  var margin = {top:50, left:20, right:20, bottom:50},
      width= 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var svg = d3.select("#map")
        .append("svg")
        .attr("height",height+margin.top+margin.bottom)
        .attr("width", width+margin.left+margin.right)
        .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")");

// read in the world.topojson file
  d3.queue()
        .defer(d3.json, "readme-world-admin1.json")
        .await(ready) 

//create a projection
  var projection = d3.geoMercator()
        .translate([width/2, height/2])
        // .scale(180)

  var path = d3.geoPath()
        .projection(projection)

//create a path(geoPath) using the projection
  function ready (error,data){
    console.log(data)

    var countries=topojson.feature(data, data.objects.countries1).features
    console.log(countries)
//add a path for each country. "shapes"--> path
  svg.selectAll(".country")
        .data(countries)
        .enter()
        .append('path')
        .attr("class","country")
        .attr("d",path)
        .on("mouseover",function(d){
          d3.select(this).classed("selected",true);
          d3.select("#Country").text(d.properties.name);
          d3.select("#AvgPrice").text(d.properties.price);
          d3.select("#AvgScore").text(d.properties.points);
          d3.select("#ProductionAmount").text(d.properties.num);
          d3.select("#tooltip")
            .style("left",(d3.event.pageX+20)+"px")
            .style("top",(d3.event.pageY-80)+"px")
            .style("display","block")
            .style("opacity", 0.5)
        })
        .on("mouseout",function(d){
          d3.select(this).classed("selected",false)
          d3.select("#tip").style("display","none");
        });
  };

})();