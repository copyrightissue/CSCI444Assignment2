var projection = d3.geoAlbersUsa();
var path = d3.geoPath().projection(projection);
var svg = d3.select("#svg1")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

// d3.queue()
//     .defer(d3.csv, "data.csv")
//     .await(ready)
d3.csv("plannedparenthood-locations-in-united-states.csv", function(error, data) {
    data.forEach(function(d) {
        d.name = +d.name;
        d.phone = +d.phone;
        d.url = +d.url;
    });
    var div = d3.select("body")
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip")
        .style("opacity", 0);

d3.json("./congress.json", function(error, us) {
    svg.selectAll(".region")
        .data(topojson.feature(us, us.objects.congress).features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", path)
        .style("fill", function(d){
            if(d.properties.PARTY_AFF==="Democrat") {
                return "#004488";
            } else {
                return "#bb5566";
            }
        })
        .style("stroke", "#aaa")
        .style("stroke-width", ".6px");

    d3.csv("plannedparenthood-locations-in-united-states.csv", function(error, data) {
        svg.selectAll(".data")
            .data(data)
            .enter().append("circle")
            .attr("class", "data")
            .attr("r", 3)
            .attr("cx", function(d) {
                var coords = projection([d.lng, d.lat])
                return coords[0]
            })
            .attr("cy", function(d) {
                var coords = projection([d.lng, d.lat])
                return coords[1]
            })
            .style("stroke", "#3A3B3C")
            .style("opacity", .7)
            .style("fill", "#E3E3E3")
            .on("mouseover", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);

                div.html(
                    d.name + "<br/>" + d.phone + "<br/>" +
                    '<a href= "'+d.url+'" target="d.url">' + //with a link
                    d.url +
                    "</a>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })

            })

    });});