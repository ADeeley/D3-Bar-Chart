window.onload = function() {
    d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(stats) {
        let margin = {top: 20, right: 20,
                      bottom: 50, left: 70};

        let data = stats.data,
            height = 600,
            width = data.length * 3, 
            barWidth = 3;

        let y = d3.scaleLinear()
            .domain([0, Math.max.apply(null, (data.map((num) => num[1])))])
            .range([0, height])

        let chart = d3.select('.chart')
            .attr('width', barWidth * data.length)
            .attr('height', height);

        let div = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);


        let bar = chart.selectAll('g')
            .data(data)
        .enter().append('g')
            .attr('transform', (d, i) => 'translate(0' + i * barWidth + ')');

        bar.append('rect')
            .attr('width', barWidth - 1)
            .attr('height', (d) => y(d[1]) + 'px')
            .attr('y', (d) => height - y(d[1]))
            .on('mouseover', function (d) { 
                d3.select(this).style('fill', 'red')
                div.transition()
                    .duration(100)
                    .style('opacity', 1)
                div.html('$' + d[1] + ' billion')
                    .style('top', d3.event.pageY - 40)
                    .style('left', d3.event.pageX)
            })
            .on('mouseout', function () {
                 d3.select(this).style('fill', 'steelblue')
                div.transition()
                    .duration(100)
                    .style('opacity', 0)
                })

       chart.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top)
            .style('text-anchor', 'middle')
            .text('USA Gross Domestic Product');

       chart.append('text')
            .attr('x', width / 2)
            .attr('y', height)
            .style('text-anchor', 'middle')
            .text('Year');

       chart.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (height / 2))
            .attr('y', 0 )
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('GDP')
    })
}
