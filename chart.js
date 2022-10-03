var margin = {top: 40, right: 20, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.csv("rates.csv", function(error, data) {
    data.forEach(function(d) {
        d.rate = +d.rate;
    });

 data = data.sort(function(a, b) { return a.rate - b.rate; });



// set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d){ return d.rate; })])
    y.domain(data.map(function(d) { return d.state; }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {return x(d.rate); } )
        .attr("y", function(d) { return y(d.state); })
        .attr("height", y.bandwidth());

    svg.append("text")
        .attr("class", "title")
        .attr("y", -10)
        .text("Abortion Rate by State");


    // add the x Axis
   const xAxisG = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        xAxisG.selectAll(".domain, .tick line").remove();

        xAxisG.append("text")
        .attr("class", "axis-label")
        .attr("y", 0)
        .attr("x", width / 2)
        .attr("fill", "black")
        .text("*Abortions per 1,000 women aged 15–44");

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll(".domain, .tick line").remove();
    ;});


