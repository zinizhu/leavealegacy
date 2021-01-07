// define margin and svg size
var season_logs_margin = { top: 200, bottom: 10, left: 30, right: 30 }
var season_logs_width = 1500
var season_logs_height = 340

// create svg
var seasonLogs = d3
  .select('#lakers-season-logs')
  .append('svg')
  .attr(
    'width',
    season_logs_width + season_logs_margin.left + season_logs_margin.right
  )
  .attr(
    'height',
    season_logs_height + season_logs_margin.top + season_logs_margin.bottom
  )
  .append('g')
  .attr(
    'transform',
    'translate(' + season_logs_margin.left + ',' + season_logs_margin.top + ')'
  )



// read data
d3.csv('./files/lakers_game_logs.csv', data => {
  data.forEach(row => {
    row.PTS = +row['PTS']
    row.OPP_PTS = +row['OPP_PTS']
    row['DIFF'] = row.PTS - row.OPP_PTS
  })

  data.sort((a, b) => a['GAME_DATE'].localeCompare(b['GAME_DATE']))

  // define linear scales
  var len = data.length
  var x = d3
    .scaleBand()
    .domain(d3.range(len))
    .range([0, season_logs_width])
    .padding(0.1)

  var y = d3
    .scaleLinear()
    .domain([d3.min(data, d => d.DIFF) * 1.4, d3.max(data, d => d.DIFF) * 1.4])
    .range([season_logs_height - 50, 0])

  // on hover
  var regularPrevColor;
  const highlight = function (d) {
    var rectClass = '.season-log-' + d.GAME_ID
    var textClass = '.season-log-text-' + d.GAME_ID
    var color = d.DIFF < 0 ? COLOR.LAKERS_BLACK : COLOR.ORANGE

    var originalColor = d3.select(rectClass).style('fill')
    regularPrevColor = originalColor
    d3.selectAll(rectClass).style('fill', color)
    d3.selectAll(textClass).style('display', 'block')
  }

  const doNotHighlight = function (d) {
    var rectClass = '.season-log-' + d.GAME_ID
    var textClass = '.season-log-text-' + d.GAME_ID
    d3.selectAll(rectClass).style('fill', regularPrevColor)
    d3.selectAll(textClass).style('display', 'none')
  }

  var logs = seasonLogs
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', d => 'season-log-' + d.GAME_ID)
    .attr('x', (d, i) => x(i))
    .attr('y', d => {
      if (d.DIFF < 0) {
        return y(0)
      }
      return y(d.DIFF)
    })

  logs
    .transition()
    .duration(1000)
    .attr('width', x.bandwidth())
    .attr('height', d => Math.abs(y(d.DIFF) - y(0)))
    .attr('fill', d => {
      if (d.DIFF < 0) {
        return COLOR.DARK_GREY
      }
      return COLOR.LAKERS_YELLOW
    })

  logs.on('mouseover', highlight).on('mouseleave', doNotHighlight)

  // draw text
  var texts = seasonLogs
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', d => 'season-log-text-' + d.GAME_ID)
    .attr('x', (d, i) => x(i))
    .attr('y', d => {
      if (d.DIFF < 0) {
        return y(d.DIFF) + 25
      }
      return y(d.DIFF) - 20
    })
    .attr('text-anchor', 'middle')

  texts
    .append('tspan')
    .attr('class', d => 'season-log-text-' + d.GAME_ID)
    .attr('dx', 0)
    .attr('dy', d => {
      if (d.DIFF < 0) return -5
      return -15
    })
    .text(d => d.MATCHUP)
    .style('font-size', '14')
    .style('text-color', COLOR.DARK_GREY)
    .style('display', 'none')

  texts
    .append('tspan')
    .attr('class', d => 'season-log-text-' + d.GAME_ID)
    .attr('dx', -60)
    .attr('dy', 15)
    .text(d => d.PTS + ':' + d.OPP_PTS)
    .style('font-size', '14')
    .style('text-color', COLOR.DARK_GREY)
    .style('display', 'none')

  // add an annotation
  const annotations = [
    {
      note: {
        title: 'LAL vs. CHA',
        label: '120:101',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(2) + x.bandwidth() / 2,
      y: y(10),
      dy: 70,
      dx: 40,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL vs. MEM',
        label: '120:91',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(3) + x.bandwidth() / 2,
      y: y(15),
      dy: -30,
      dx: 30,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL @ DAL',
        label: '119:110',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(4) + x.bandwidth() / 2,
      y: y(5),
      dy: 70,
      dx: 25,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL vs. MIN',
        label: '142:125',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(23) + x.bandwidth() / 2,
      y: y(9),
      dy: -40,
      dx: 20,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL @ ATL',
        label: '101:96',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(26) + x.bandwidth() / 2,
      y: y(2),
      dy: -50,
      dx: 10,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL @ PHL',
        label: '91:108',
        align: 'left'
      },
      connector: {
        end: "dot"
      },
      x: x(45) + x.bandwidth() / 2,
      y: y(-9),
      dy: 50,
      dx:20,
      color: COLOR.DARK_GREY
    },
    {
      note: {
        title: 'LAL vs. MIL, LAL @ LAC',
        label: '113:103 ,91:108',
        align: 'right'
      },
      connector: {
        end: "dot"
      },
      x: x(61) + x.bandwidth() / 2,
      y: y(5),
      dy: 80,
      dx: -30,
      color: COLOR.DARK_GREY
    }
  ]

  for (var i = 0; i < annotations.length; i++) {
    const makeAnnotations = d3
      .annotation()
      .type(d3.annotationLabel)
      .annotations([annotations[i]])

    seasonLogs
      .append('g')
      .attr('class', 'annotation-' + i)
      .call(makeAnnotations)
      .attr('display', 'none')
  }
})
