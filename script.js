//const us = require("./congress.json");
const width = 900;
const height = 600;
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

const path = d3.geoPath().projection(projection);

d3.json("https://gist.githubusercontent.com/Bradleykingz/3aa5206b6819a3c38b5d73cb814ed470/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json", function(error, uState) {
    if (error) throw error;
    svg.selectAll('path')
        .data(uState.features)
        .enter()
        .append('path')
        .attr("d", path)
d3.json("./congress.json", function(error, uDistrict)   {
    if (error) throw error;
    svg.selectAll('region')
        .data(topojson.feature(us, us.objects.congress).features)
        .enter()
        .append('path')
        .attr('class', function(d){
            if(d.properties.PARTY_AFF=='Democrat') {
                return 'democrat';
            } else {
                return 'republican';
            }
        })
        .attr('d', path)
        .style('stroke', '#aaa')
        .style('stroke-width', '.6px')
});}