var kobe_injury_margin = { top: 100, bottom: 50, left: 50, right: 50 }
var kobe_injury_width = 900
var kobe_injury_height = 500

var kobe_injury_svg = d3
  .select('#misery-graph')
  .append('svg')
  .attr('id', 'kobe-injury-graph-svg')
  .attr(
    'width',
    kobe_injury_width + kobe_injury_margin.left + kobe_injury_margin.right
  )
  .attr(
    'height',
    kobe_injury_height + kobe_injury_margin.top + kobe_injury_margin.bottom
  )
  .append('g')
  .attr(
    'transform',
    'translate(' + kobe_injury_margin.left + ',' + kobe_injury_margin.top + ')'
  )

d3.csv('./files/kobe_stats.csv', data => {
  // clean data
  stats = []
  seasons = []
  data.forEach(row => {
    seasons.push(row['Season'])
    stats.push({
      season: row['Season'],
      PTS: +row['PTS'],
      'FG%': +row['FG%']
    })
  })

  // create scale
  var x = d3
    .scaleLinear()
    .domain([-0.1, seasons.length - 1 + 0.1])
    .range([0, kobe_injury_width])

  var yPTS = d3
    .scaleLinear()
    .range([kobe_injury_height, 0])
    .domain([0, 30])

  var yFG = d3
    .scaleLinear()
    .range([kobe_injury_height, 0])
    .domain([0, 1])

  // draw axis
  kobe_injury_svg
    .append('g')
    .attr('class', 'axisLight')
    .attr('transform', 'translate(0, ' + kobe_injury_height + ')')
    .call(
      d3
        .axisBottom(x)
        .tickFormat(d => seasons[d])
        .ticks(8)
    )

  kobe_injury_svg
    .append('g')
    .attr('class', 'axisLight')
    .attr('transform', 'translate(' + kobe_injury_width + ', ' + 0 + ')')
    .call(
      d3
        .axisRight(yFG)
        .ticks(4)
        .tickSize(1)
        .tickFormat(d => d * 100 + '%')
    )

  kobe_injury_svg
    .append('g')
    .attr('class', 'axisLight')
    .call(
      d3
        .axisLeft(yPTS)
        .ticks(4)
        .tickSize(-kobe_injury_width)
    )

  // append PTS lines and circles
  kobe_injury_svg
    .append('path')
    .datum(stats)
    .attr('fill', 'none')
    .attr('stroke', COLOR.BLUE)
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line()
        .x((d, i) => x(i))
        .y(d => yPTS(d.PTS))
    )

  kobe_injury_svg
    .selectAll('kobe-injury-PTS-circle')
    .data(stats)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => x(i))
    .attr('cy', d => yPTS(d.PTS))
    .attr('r', 4)
    .attr('fill', COLOR.BLUE)

  // append FG% lines and circles
  kobe_injury_svg
    .append('path')
    .datum(stats)
    .attr('fill', 'none')
    .attr('stroke', COLOR.RED)
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line()
        .x((d, i) => x(i))
        .y(d => yFG(d['FG%']))
    )

  kobe_injury_svg
    .selectAll('kobe-injury-PTS-circle')
    .data(stats)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => x(i))
    .attr('cy', d => yFG(d['FG%']))
    .attr('r', 4)
    .attr('fill', COLOR.RED)

  // legends and axis labels
  kobe_injury_svg
    .append('text')
    .attr('x', kobe_injury_width / 2 - 20)
    .attr('y', kobe_injury_height + 40)
    .text('Season')
    .attr('font-size', '20px')
    .attr('fill', COLOR.LIGHT_GREY)

  kobe_injury_svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -kobe_injury_height / 2 - 20)
    .attr('y', -20)
    .text('PTS')
    .attr('font-size', '20px')
    .attr('fill', COLOR.LIGHT_GREY)

  kobe_injury_svg
    .append('text')
    .attr('transform', 'rotate(90)')
    .attr('x', kobe_injury_height / 2 - 10)
    .attr('y', -kobe_injury_width - 30)
    .text('FG%')
    .attr('font-size', '20px')
    .attr('fill', COLOR.LIGHT_GREY)

  kobe_injury_svg
    .append('circle')
    .attr('cx', kobe_injury_width / 2 - 150)
    .attr('cy', -25)
    .attr('r', 6)
    .attr('fill', COLOR.BLUE)

  kobe_injury_svg
    .append('text')
    .attr('x', kobe_injury_width / 2 - 130)
    .attr('y', -17)
    .text('PTS')
    .attr('font-size', '20px')
    .attr('fill', COLOR.LIGHT_GREY)

  kobe_injury_svg
    .append('circle')
    .attr('cx', kobe_injury_width / 2 + 100)
    .attr('cy', -25)
    .attr('r', 6)
    .attr('fill', COLOR.RED)

  kobe_injury_svg
    .append('text')
    .attr('x', kobe_injury_width / 2 + 120)
    .attr('y', -17)
    .text('FG%')
    .attr('font-size', '20px')
    .attr('fill', COLOR.LIGHT_GREY)

  // title
  kobe_injury_svg
    .append('text')
    .attr('x', kobe_injury_width / 2)
    .attr('y', -60)
    .text("Kobe Bryant's Shooting Performance 2008-2016")
    .attr('font-size', '30px')
    .attr('fill', COLOR.LIGHT_GREY)
    .attr('text-anchor', 'middle')

  // injury labels
  kobe_injury_svg
    .append('text')
    .attr('x', x(5) - 15)
    .attr('y', yPTS(stats[5].PTS) + 45)
    .text('torn Achilles tendon')
    .attr('font-size', '18px')
    .attr('fill', COLOR.LAKERS_YELLOW)
    .attr('text-anchor', 'middle')

  kobe_injury_svg
    .append('text')
    .attr('x', x(6))
    .attr('y', yPTS(stats[6].PTS) - 15)
    .text('tibial plateau fracture')
    .attr('font-size', '18px')
    .attr('fill', COLOR.LAKERS_YELLOW)
    .attr('text-anchor', 'middle')

  kobe_injury_svg
    .append('text')
    .attr('x', x(7) - 40)
    .attr('y', yPTS(stats[7].PTS) + 20)
    .text('torn shoulder rotator cuff')
    .attr('font-size', '18px')
    .attr('fill', COLOR.LAKERS_YELLOW)
    .attr('text-anchor', 'middle')
})
