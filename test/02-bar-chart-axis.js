var w = 600;
var h = 500;
var m = 200;

// creating the SVG and defining the scales for our bar chart
var svg = d3.select("#bar-chart")
 .append("svg")
 .attr("width", w) // width of the entire svg graphic
 .attr("height", h), 
 width = w - m,
 height = h - m;

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
 yScale = d3.scaleLinear().range ([height, 0]);
var g = svg.append("g")
 .attr("transform", "translate(" + 100 + "," + 100 + ")");// JavaScript Document

///////////////////
// GET THE DATA //
///////////////// 

d3.json("boldbaner.json", function(data) { // loading the data with the d3.json function 

 console.log(data); 
// ALL CODE GOES HERE!

	data.forEach(function(d) {
	d.type = d.type;
 	d.value = +d.antal;
 });
	
	// mapping the data against the scale
	xScale.domain(data.map(function(d) { return d.type; }));
	yScale.domain([0, d3.max(data, function(d) { return d.antal + 5; })]);
	/////////////////////////////////////////// Tilføjer X aksen////////////////////////////////////////////
 	g.append("g")
 	.attr("transform", "translate(0," + height + ")")
 	.call(d3.axisBottom(xScale));

 	// /////////////////////////////////////////////////Tilføjer Y aksen///////////////////////////////////
 	g.append("g")
 	.call(d3.axisLeft(yScale).tickFormat(function(d){
 	return d;
 	}).ticks(10))
	
	
	
///////////////////////////////////// BAR STYLING OG TILFØJELSE AF SELVE BARS//////////////////////////////
 	g.selectAll("rect")
	
 	.data(data)
	
 	.enter().append("rect")
	
	.attr('cx', function (d) { return d.cx })
	
    .attr('cy', function (d) { return d.cy })
	
    .attr('r', function (d) { return d.r })
	
    .attr('fill', function (d) { return d.fill })
	
    .attr('stroke','black', "opacity", "1.0")
	
    .attr('stroke-width',0)
	
      .on('mouseover',function() {
        d3.select(this)
      	  .transition()
      	  .duration(1000)
      	  .attr('stroke-width',2)
      })
      .on('mouseout',function () {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr('stroke-width',0)
      })
 	.style("fill", "green")
	
	.style("opacity", "0.5")
	
 	.attr("x", function(d) { return xScale(d.type); })
	
 	.attr("y", function(d) { return yScale(d.antal); })
	
 	.attr("width", xScale.bandwidth())
	
 	.attr("height", function(d) { return height - yScale(d.value); })
	});


	
	