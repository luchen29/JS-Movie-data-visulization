window.onload = function () {
    var width, height, svg, path,
        years = [],
        colors, defColor, getColor,
        currentYear = "1874",
        playing = false,
        slider;

    function init() {
        setMap();
    }

    function setMap() {
        width = 1100, height = 500;

        svg = d3.select('#worldmap').append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr("id","worldsvg");
        colors = [
            '#e04e5c',
            '#f47246',
            '#f9923b',
            '#fcb844',
            '#ffc107',
            '#dfe271',
            '#b2ce67',
            '#86ce67',
            '#28a745',
            '#20c997'];
        defColor = "#20c997";
        getColor = d3.scale.quantize().domain([100,0]).range(colors);

        var miller = d3.geo.miller()
          .scale(130)
          .translate([width / 2, height / 2])
          .precision(.1);
        path = d3.geo.path().projection(miller);
        loadData();
    }

    //https://raw.githubusercontent.com/FrontenderMagazine/d3js-map-visualization/master/src/data/topoworld.json
    //https://raw.githubusercontent.com/FrontenderMagazine/d3js-map-visualization/master/src/data/freedom.csv
    function loadData() {
        queue()
            .defer(d3.json, "/data/worldmap_with_iso.json")
            .defer(d3.csv, "/data/country_with_iso.csv")
            .await(processData);
    }

    function addLegend() {
        var lw = 330, lh = 10,  // legend width, height
            lpad = 10,  // legend padding
            lcw = lw / 10;  // legend category width

        var legend = svg.append("g")
            .attr(
                "transform",
                // "translate(" + (width+(lpad-width)) + "," + (height-(lh+lpad)) + ")");
                "translate(180,400)");

        legend.append("rect")
            .attr("width", lw)
            .attr("height", lh)
            .style("fill", "white");

        var lcolors = legend.append("g")
            .style("fill", defColor);

        for (i = 0; i < 10; i++) {
            lcolors.append("rect")
                .attr("height", 10)
                .attr("width", lcw)
                .attr("x", i * lcw)
                .style("fill", colors[i]);
        }
    }

    function addSlider() {
        // Add year indicator
        svg.append("text")
            .attr("id", "year")
            .attr("transform", "translate(700,380)")
            .text(currentYear);
        // Add slider button
        var btn = svg.append("g").attr("class", "button").attr("id", "play")
            .attr("transform", "translate(225,397)")
            .attr("onmouseup", animateMap);
            
        btn.append("rect")
            .attr("x",305).attr("y", 1)
            .attr("rx",10).attr("ry", 5)
            .attr("width", 39)
            .attr("height", 20)
            .style("fill", "#3f6275");
        btn.append("text")
            .attr("x", 310)
            .attr("y", 16)
            .style("fill", "white")
            .text("Play");

        // Initialize slider
        var formatter = d3.format("04d");
        var tickFormatter = function(d) {
            return formatter(d);
        }

        slider = d3.slider().min('1874').max('2020')
            .tickValues(['1874','1900','1920','1940','1960','1980','2000','2020'])
            .stepValues(d3.range(1874,2020))
            .tickFormat(tickFormatter);


        svg.append("g")
            .attr("width", 380)
            .attr("id", "slider")
            .attr("transform", "translate(560,375)");
        // Render the slider in the div
        d3.select('#slider').call(slider);
        var dragBehaviour = d3.behavior.drag();

        dragBehaviour.on("drag", function(d){
            var pos = d3.event.x;
            slider.move(pos+25);
            currentYear = slider.value();
            sequenceMap();
            d3.select("#year").text(currentYear);
        });

        svg.selectAll(".dragger").call(dragBehaviour);
    }

    function processData(error, worldMap, countryData) {
        console.log(countryData)
        var world = topojson.feature(worldMap, worldMap.objects.world);
        var countries = world.features;
        for (var i in countries) {
            for (var j in countryData) {
                if (countries[i].id == countryData[j].ISO3166) {
                    for(var k in countryData[j]) {
                        if (k != 'production_countries' && k != 'ISO3166') {
                            if (years.indexOf(k) == -1) {
                                years.push(k);
                            }
                            countries[i].properties[k] = Number(countryData[j][k])
                        }
                    }
                    break;
                }
            }
        }
        // console.log();
        drawMap(world);
    }

    function drawMap(world) {
        var map = svg.append("g");
        map.selectAll(".country")
          .data(world.features)
              .enter().append("path")
          .attr("class", "country")
          .attr("d", path);

        sequenceMap();

        addLegend();
        addSlider();
    }

    function animateMap() {
        var timer;
        d3.select('#play').on('click', function() {
            if (playing == false) {
                timer = setInterval(function() {
                    // console.log(currentYear);
                    // console.log(years[147]);
                    // years[years.length-1]
                    if (currentYear < 2020) {
                        currentYear = (parseInt(currentYear) + 2).toString()
                    } else {
                        console.log("I'm here!")
                        currentYear = years[0];
                    }
                    sequenceMap();
                    slider.setValue(currentYear);
                    d3.select("#year").text(currentYear);
                }, 1000);

                d3.select(this).select('text').text('Stop');
                playing = true;
            } else {
                clearInterval(timer);
                d3.select(this).select('text').text('Play');
                playing = false;
            }
        });
    }

    function sequenceMap() {
        d3.selectAll('.country')
            .style('fill', function(d) {
                color = getColor(d.properties[currentYear]);
                return color ? color : defColor;
            });
    }
    init();
};