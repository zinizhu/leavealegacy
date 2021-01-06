var record_margin = { top: 80, bottom: 50, left: 80, right: 83 }
var record_width = 900
var record_height = 400

var record_svg = d3
  .select('#record-graph')
  .append('svg')
  .attr('id', 'record-graph-svg')
  .attr('display', 'none')
  .attr(
    'width',
    record_width + record_margin.left + record_margin.right
  )
  .attr(
    'height',
    record_height + record_margin.top + record_margin.bottom
  )
  .append('g')
  .attr(
    'transform',
    'translate(' + record_margin.left + ',' + record_margin.top + ')'
  )

d3.csv("./files/prev_records.csv", (data) => {
  var seasons = []
  data.forEach((row) => {
    seasons.push(row.season)
    row.rank = +row.rank
  })

  // scale
  var x = d3.scaleLinear()
    .domain([-0.5, seasons.length - 1 + 0.1])
    .range([20, record_width])

  var y = d3.scaleLinear()
    .domain([1, 15.3])
    .range([30, record_height])

    record_svg.append('g')
  .attr('class', 'axisLight axisRecord')
  .call(
    d3.axisLeft(y).tickValues([1, 8, 15]).tickSize(0).tickFormat((d) => 'Rank ' + d)
  )

  record_svg
  .append('g')
  .attr('class', 'axisLight axisRecord')
  .attr('transform', 'translate(0, ' + (record_height + 10) + ')')
  .call(
    d3
      .axisBottom(x).tickFormat(d => seasons[d]).tickSize(0)
  )

  // graph
  var ranges = [...Array(15).keys()]
  for (var i = 0; i < seasons.length; i++) {
    record_svg.selectAll("records-rank-rects")
      .data(ranges)
      .enter()
      .append('rect')
      .attr('class', (d, c) => 'records-rank-rect-' + i + '-' + c) 
      .attr('x', x(i) - 40)
      .attr('y', d => y(d + 1) - 8)
      .attr('width', 80)
      .attr('height', 16)
      // .attr('stroke', (d, r) => r === 7 ? COLOR.RED : COLOR.LIGHT_GREY)
      .attr('stroke', COLOR.LIGHT_GREY)
      .attr('fill', (d, r) => r === 7 ? 'rgba(255,255,255,0.2)' : 'none')
      // .attr('fill', 'none')

      d3.select('.records-rank-rect-' + i + '-' + (data[i].rank - 1))
      .attr('fill', COLOR.LAKERS_YELLOW)
      .attr('stroke', 'none')
  }

  // title
  record_svg
  .append('text')
  .attr('x', record_width / 2)
  .attr('y', -20)
  .text("Lakers Regular Season Ranking in West Conference 2011-2018")
  .attr('font-size', '30px')
  .attr('fill', COLOR.LIGHT_GREY)
  .attr('text-anchor', 'middle')

})