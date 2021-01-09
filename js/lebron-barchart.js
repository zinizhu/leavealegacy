// define margin and svg size
var lb_margin = { top: 40, bottom: 30, left: 60, right: 40 }
var lb_width = 350
var lb_height = 180
var lb_colorName = ['#276bfd', '#fd2727', '#fdb927', '#2fa62b']

// create stat
d3.csv('./files/lebron.csv', function (data) {
  //console.log(data) // check the input data format in the browser console
  var lb_perf_dimensions = ['PTS', 'REB', 'AST', 'BLK']
  var lb_perf_PTS = []
  var lb_perf_REB = []
  var lb_perf_AST = []
  var lb_perf_BLK = []
  var seasons = []
  data.forEach(row => {
    lb_perf_PTS.push({ PTS: +row['PTS'], Seasons: row['Season'] })
    lb_perf_REB.push({ REB: +row['TRB'], Seasons: row['Season'] })
    lb_perf_AST.push({ AST: +row['AST'], Seasons: row['Season'] })
    lb_perf_BLK.push({ BLK: +row['BLK'], Seasons: row['Season'] })
    seasons.push(row['Season'])
  })

  var lb_perf_Stats = [lb_perf_PTS, lb_perf_REB, lb_perf_AST, lb_perf_BLK]

  console.log(lb_perf_Stats)

  var lb_perf_x = d3
    .scaleBand()
    .range([0, lb_width])
    .domain(seasons)
    .padding(0.2)

  //  create y Scales
  var lb_perf_y = []
  for (var i = 0; i < lb_perf_dimensions.length; i++) {
    var categ = lb_perf_Stats[i]
    lb_perf_y.push(
      d3
        .scaleLinear()
        .range([lb_height, 0])
        .domain([0, d3.max(categ, d => d[lb_perf_dimensions[i]]) * 1.2])
    )
  }

  // console.log(lb_perf_y)
  // console.log(lb_perf_Stats)

  // create small multiples
  for (var j = 0; j < 4; j++) {
    d3.select('#lb-box-' + (j + 3))
      // .selectAll('ad-perf-svg')
      .append('svg')
      .attr('class', 'lb-perf-' + lb_perf_dimensions[j])
      .attr('width', lb_width + lb_margin.left + lb_margin.right)
      .attr('height', lb_height + lb_margin.top + lb_margin.bottom)
      .append('g')
      .attr('class', 'lb-perf-' + lb_perf_dimensions[j] + '-g')
      .attr(
        'transform',
        'translate(' + lb_margin.left + ', ' + lb_margin.top + ')'
      )
      .append('text')
      .attr('y', -25)
      .attr('x', -lb_height / 2)
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .text(lb_perf_dimensions[j])
  }

  var lb_perf_titles = [
    'Lebron James Points Per Game 2003-2019',
    'Lebron James Rebounds Per Game 2003-2019',
    'Lebron James Assits Per Game 2003-2019',
    'Lebron James Blocks Per Game 2003-2019'
  ]

  for (var i = 0; i < 4; i++) {
    var dimension = lb_perf_dimensions[i]
    d3.selectAll('.lb-perf-' + dimension + '-g')
      .append('g')
      .attr('transform', 'translate(' + 0 + ', ' + lb_height + ')')
      .call(d3.axisBottom(lb_perf_x).tickFormat(d => d.substring(2, 7)))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')

    d3.selectAll('.lb-perf-' + dimension + '-g')
      .append('g')
      .attr('class', 'new-team-axis')
      .call(
        d3
          .axisLeft(lb_perf_y[i])
          .tickSize(-lb_width)
          .ticks(3)
      )

    d3.selectAll('.lb-perf-' + dimension + '-g')
      .append('text')
      .attr('x', 0)
      .attr('y', -15)
      .text(lb_perf_titles[i])

    d3.selectAll('.lb-perf-' + dimension + '-g')
      .append('text')
      .attr('x', lb_width / 2)
      .attr('y', lb_height + 48)
      .text('Season')
      .attr('text-anchor', 'middle')

    d3.selectAll('.lb-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension)
      .data(lb_perf_Stats[i])
      .enter()
      .append('rect')
      .attr('class', 'lb-perf-' + dimension + '-rect')
      .attr('x', function (d) {
        return lb_perf_x(d.Seasons)
      })
      .attr('y', function (d) {
        return lb_perf_y[i](0)
      })
      .attr('fill', lb_colorName[i])
      .attr('width', function () {
        return lb_perf_x.bandwidth() * 0.8
      })
      .attr('height', function (d) {
        return lb_height - lb_perf_y[i](0)
      })
      .attr('dimension', dimension)
      .attr('color', lb_colorName[i])
      .on('mouseover', function (d, c) {
        var di = d3.select(this).attr('dimension')
        d3.selectAll('.lb-perf-' + di + '-' + c)
        .attr('display', 'block')
        d3.select(this).attr('fill', COLOR.LAKERS_PURPLE)
      })
      .on('mouseleave', function (d, c) {
        var di = d3.select(this).attr('dimension')
        var color = d3.select(this).attr('color')
        d3.selectAll('.lb-perf-' + di + '-' + c)
        .attr('display', 'none')
        d3.select(this).attr('fill', color)
      })

      d3.selectAll('.lb-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension + '-text')
      .data(lb_perf_Stats[i])
      .enter()
      .append('text')
      .attr('class', (d, c) => 'lb-perf-' + dimension + '-' + c)
      .attr('x', function (d) {
        return lb_perf_x(d.Seasons) + lb_perf_x.bandwidth() / 2
      })
      .attr('y', function (d) {
        return lb_perf_y[i](d[dimension]) - 10
      })
      .text(d => d[dimension])
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('display', 'none')

    d3.selectAll('.lb-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension)
      .data(lb_perf_Stats[i])
      .enter()
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', function (d) {
        return lb_perf_y[i](d[dimension])
      })
      .attr('height', function (d) {
        return lb_height - lb_perf_y[i](d[dimension])
      })
      .delay(function (d, j) {
        return j * 100
      })
      
  }
})
