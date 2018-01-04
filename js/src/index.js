window.onload = function() {
    d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(stats) {
        let data = stats.data,
            height = 600,
            barWidth = 3;

        let y = d3.scaleLinear()
            .domain([0, Math.max.apply(null, (data.map((num) => num[1])))])
            .range([0, height])

        let chart = d3.select('.chart')
            .attr('width', barWidth * data.length)
            .attr('height', height);

        let bar = chart.selectAll('g')
            .data(data)
        .enter().append('g')
            .attr('transform', (d, i) => 'translate(0' + i * barWidth + ')');

        bar.append('rect')
            .attr('width', barWidth - 1)
            .attr('height', (d) => y(d[1]) + 'px')
            .attr('y', (d) => height - y(d[1]))
    })
}
