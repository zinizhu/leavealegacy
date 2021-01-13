var ad_margin = { top: 45, right: 40, bottom: 60, left: 40 }
var ad_width = 300
var ad_height = 180
var ad_colorName = ['#276bfd', '#fd2727', '#fdb927', '#2fa62b']

d3.csv('./files/ad.csv', function (data) {
  //console.log(data) // check the input data format in the browser console
  var ad_perf_dimensions = ['PTS', 'REB', 'AST', 'BLK']
  var ad_perf_PTS = []
  var ad_perf_REB = []
  var ad_perf_AST = []
  var ad_perf_BLK = []
  var seasons = []
  data.forEach(row => {
    ad_perf_PTS.push({ PTS: +row['PTS'], Seasons: row['Season'] })
    ad_perf_REB.push({ REB: +row['TRB'], Seasons: row['Season'] })
    ad_perf_AST.push({ AST: +row['AST'], Seasons: row['Season'] })
    ad_perf_BLK.push({ BLK: +row['BLK'], Seasons: row['Season'] })
    seasons.push(row['Season'])
  })

  var ad_perf_Stats = [ad_perf_PTS, ad_perf_REB, ad_perf_AST, ad_perf_BLK]

  var ad_perf_x = d3
    .scaleBand()
    .range([0, ad_width])
    .domain(seasons)
    .padding(0.1)

  //  create y Scales
  var ad_perf_y = []
  for (var i = 0; i < ad_perf_dimensions.length; i++) {
    var categ = ad_perf_Stats[i]
    ad_perf_y.push(
      d3
        .scaleLinear()
        .range([ad_height, 0])
        .domain([0, d3.max(categ, d => d[ad_perf_dimensions[i]]) * 1.1])
    )
  }

  // create small multiples
  for (var j = 0; j < 4; j++) {
    d3.select('#ad-box-' + (j + 3))
      // .selectAll('ad-perf-svg')
      .append('svg')
      .attr('class', 'ad-perf-' + ad_perf_dimensions[j])
      .attr('width', ad_width + ad_margin.left + ad_margin.right)
      .attr('height', ad_height + ad_margin.top + ad_margin.bottom)
      .append('g')
      .attr('class', 'ad-perf-' + ad_perf_dimensions[j] + '-g')
      .attr(
        'transform',
        'translate(' + ad_margin.top + ', ' + ad_margin.left + ')'
      )
      .append('text')
      .attr('y', -25)
      .attr('x', -ad_height / 2)
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .text(ad_perf_dimensions[j])
  }

  var ad_perf_titles = [
    'Anthony Davis Points Per Game 2013-2019',
    'Anthony Davis Rebounds Per Game 2013-2019',
    'Anthony Davis Assists Per Game 2013-2019',
    'Anthony Davis Blocks Per Game 2013-2019'
  ]

  for (var i = 0; i < 4; i++) {
    var dimension = ad_perf_dimensions[i]
    d3.selectAll('.ad-perf-' + dimension + '-g')
      .append('g')
      .attr('transform', 'translate(' + 0 + ', ' + ad_height + ')')
      .call(d3.axisBottom(ad_perf_x).tickFormat(d => d.substring(2, 7)))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .append('g')
      .attr('class', 'new-team-axis')
      .call(
        d3
          .axisLeft(ad_perf_y[i])
          .tickSize(-ad_width)
          .ticks(4)
      )

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .append('text')
      .attr('x', 0)
      .attr('y', -15)
      .text(ad_perf_titles[i])

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .append('text')
      .attr('x', ad_width / 2)
      .attr('y', ad_height + 48)
      .text('Season')
      .attr('text-anchor', 'middle')

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension)
      .data(ad_perf_Stats[i])
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return ad_perf_x(d.Seasons)
      })
      .attr('y', function (d) {
        return ad_perf_y[i](0)
      })
      .attr('fill', ad_colorName[i])
      .attr('width', function () {
        return ad_perf_x.bandwidth() * 0.8
      })
      .attr('height', function (d) {
        return ad_height - ad_perf_y[i](0)
      })
      .attr('dimension', dimension)
      .attr('color', ad_colorName[i])
      .on('mouseover', function (d, c) {
        var di = d3.select(this).attr('dimension')
        d3.selectAll('.ad-perf-' + di + '-' + c)
        .attr('display', 'block')
        d3.select(this).attr('fill', COLOR.LAKERS_PURPLE)
      })
      .on('mouseleave', function (d, c) {
        var di = d3.select(this).attr('dimension')
        var color = d3.select(this).attr('color')
        d3.selectAll('.ad-perf-' + di + '-' + c)
        .attr('display', 'none')
        d3.select(this).attr('fill', color)
      })

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension + '-text')
      .data(ad_perf_Stats[i])
      .enter()
      .append('text')
      .attr('class', (d, c) => 'ad-perf-' + dimension + '-' + c)
      .attr('x', function (d) {
        return ad_perf_x(d.Seasons) + ad_perf_x.bandwidth() / 2 - 5
      })
      .attr('y', function (d) {
        return ad_perf_y[i](d[dimension]) - 10
      })
      .text(d => d[dimension])
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('display', 'none')

    d3.selectAll('.ad-perf-' + dimension + '-g')
      .selectAll('rect-' + dimension)
      .data(ad_perf_Stats[i])
      .enter()
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', function (d) {
        return ad_perf_y[i](d[dimension])
      })
      .attr('height', function (d) {
        return ad_height - ad_perf_y[i](d[dimension])
      })
      .delay(function (d, j) {
        return j * 200
      })
  }
})
