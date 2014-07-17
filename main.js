(function () {

    function constant () {
        var nums = [];
        for (var i=0; i < 101; i++){
            nums.push(1);
        }
        return nums;
    }

    function linear () {
        var nums = [];
        for (var i=0; i < 101; i++) {
            nums.push(i);
        }
        return nums;
    }

    function logn () {
        var nums = [];
        for (var i=0; i < 101; i++) {
            if (i === 0){
                nums.push(0);
            } else {
                nums.push(Math.log(i));
            }
        }
        return nums;
    }

    function nlogn() {
        var nums = [];
        for (var i=0; i < 101; i++) {
            if (i === 0){
                nums.push(0);
            } else {
                nums.push(Math.log(i) * i);
            }
        }
        return nums;

    }

    function nexp2 () {
        var nums = [];
        for (var i=0; i < 101; i++) {
            nums.push(Math.pow(i, 2));
        }
        return nums;
    }

    function twoexpn () {
        var nums = [];
        for (var i=0; i < 20; i++) {
            nums.push(Math.pow(2,i));
        }
        return nums;
    }

    function factorial () {
        var nums = [],
            rval = 1;
        for (var i=1; i < 8; i++) {
            rval = rval * i;
            nums.push(rval)
        }
        nums.unshift(0)
        return nums;
    }

    function graph () {
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 101]);

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, 1000]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d,i) { return x(i); })
            .y(function(d) { return y(d); });

        var svg = d3.select("#plot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data =  {};
        data["O(1)"] = constant();
        data["O(n)"] = linear();
        data["O(logn)"] = logn();
        data["O(nlogn)"] = nlogn();
        data["O(n^2)"] = nexp2();
        data["O(2^n)"] = twoexpn();
        data["O(n!)"] = factorial();
        
        var keys = Object.keys(data)

        var legend = svg.selectAll(".legend")
            .data(keys)
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .attr("class", function (d) { 
                if (d === 'O(n!)') d = "factorial";
                return d.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")} );

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
           .attr("class", "label")
           .attr("x", width)
           .attr("y", -6)
           .style("text-anchor", "end")
           .text("Number of Elements");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Operations");

        for (var i=0; i < keys.length; i++) {
            svg.append("path")
                .datum(data[keys[i]])
                .attr("class", function () { 
                    var key = keys[i];
                    if (key === 'O(n!)') key = "factorial";
                    key = key.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    return "line " + key 
                })
                .attr("d", line);
        }
     }

    graph ();

})();
