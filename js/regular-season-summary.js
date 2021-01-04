// define margin and svg size
var regular_season_summary_margin = {
  top: 230,
  bottom: 80,
  left: 200,
  right: 80
}
var regular_season_summary_width = 800
var regular_season_summary_height = 800

// create svg
var regularSeasonSummarySvg = d3
  .select('#regular-season-summary-graph')
  .append('svg')
  .attr(
    'width',
    regular_season_summary_width +
      regular_season_summary_margin.left +
      regular_season_summary_margin.right
  )
  .attr(
    'height',
    regular_season_summary_height +
      regular_season_summary_margin.top +
      regular_season_summary_margin.bottom
  )
  .append('g')
  .attr(
    'transform',
    'translate(' +
      regular_season_summary_margin.left +
      ',' +
      regular_season_summary_margin.top +
      ')'
  )

// read data
d3.csv('./files/lakers_game_logs.csv', data => {
  // console.log(data)

  var stats = []
  var winGames = []
  var count = 0
  data.sort((a, b) => a['GAME_DATE'].localeCompare(b['GAME_DATE']))
  data.forEach((row, i) => {
    row.PTS = +row['PTS']
    row.OPP_PTS = +row['OPP_PTS']
    row['DIFF'] = row.PTS - row.OPP_PTS
    stats.push({ id: i, WL: row['WL'], diff: row.DIFF })

    // map win game to seperate id
    if (row['WL'] === 'W') {
      winGames.push(i)
    }
  })

  console.log(winGames)

  function getCircleClass (d, i) {
    if (i >= 9 && i < 19) {
      return (
        'summary-circle summary-circle-' +
        d.WL +
        ' summary-circle-' +
        i +
        ' summary-circle-W-streak'
      )
    }
    return 'summary-circle summary-circle-' + d.WL + ' summary-circle-' + i
  }

  var node = regularSeasonSummarySvg
    .selectAll('summary-circles')
    .data(stats)
    .enter()
    .append('circle')
    .attr('class', (d, i) => getCircleClass(d, i))
    .attr('cx', regular_season_summary_width / 3)
    .attr('cy', regular_season_summary_height / 2)
    .attr('r', 20)
    .style('fill', d => (d.WL === 'W' ? COLOR.LAKERS_YELLOW : 'none'))
    .attr('stroke', COLOR.LIGHT_GREY)
    .style('stroke-width', 3)

  // simulation and animation
  var regularSeasonSummarySectionEl = document
    .getElementsByClassName('regular-season-summary-section')
    .item(0)
  var regularSeasonSummaryGraphContainerEl = document
    .getElementsByClassName('regular-season-summary-graph-container')
    .item(0)

  var regularSeasonSummaryStep1El = document.getElementById('summary-step-1')

  // Features of the forces applied to the nodes:
  var x = d3
    .scaleOrdinal()
    .domain(['W', 'L'])
    .range([0, 400])

  var x1 = d3
    .scaleOrdinal()
    .domain(['W', 'L'])
    .range([
      regular_season_summary_width / 2 - 60,
      regular_season_summary_width / 2 + 40
    ])

  var simulation = d3
    .forceSimulation()
    .force(
      'center',
      d3
        .forceCenter()
        .x(regular_season_summary_width / 2)
        .y(regular_season_summary_height / 2)
    )
    .force('charge', d3.forceManyBody().strength(0.7))

  simulation.nodes(stats).on('tick', function (d) {
    node
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
  })

  // step 1 simulation

  new Waypoint({
    element: regularSeasonSummaryStep1El,
    handler: function (direction) {
      if (direction == 'down') {
        simulation
          .force(
            'x',
            d3
              .forceX()
              .strength(0.05)
              .x(regular_season_summary_width / 2)
          )
          .force(
            'y',
            d3
              .forceY()
              .strength(0.05)
              .y(regular_season_summary_height / 2)
          )
          .force('charge', d3.forceManyBody().strength(0.2))
          .force(
            'collide',
            d3
              .forceCollide()
              .strength(0.5)
              .radius(30)
              .iterations(1)
          )
          .alphaTarget(0.1)
          .restart()
      } else {
        regularSeasonSummaryGraphContainerEl.classList.remove('is-fixed')
      }
    },
    offset: "50%"
  })

  // // step 2 simulation
  var regularSeasonSummaryStep2El = document.getElementById('summary-step-2')

  new Waypoint({
    element: regularSeasonSummaryStep2El,
    handler: function (direction) {
      if (direction == 'down') {
        simulation
          .force(
            'x',
            d3
              .forceX()
              .strength(0.05)
              .x(d => x(d.WL))
          )
          .force(
            'y',
            d3
              .forceY()
              .strength(0.05)
              .y(regular_season_summary_height / 2)
          )
          .alphaTarget(0.5)
          .restart()
      } else {
        simulation
          .force(
            'x',
            d3
              .forceX()
              .strength(0.05)
              .x(d => x1(d.WL))
          )
          .force(
            'y',
            d3
              .forceY()
              .strength(0.1)
              .y(regular_season_summary_height / 2)
          )
          .force('charge', d3.forceManyBody().strength(0.3))
          .alphaTarget(0.5)
          .restart()
      }
    },
    offset: "50%"
  })

  // step 3 simulation
  var yRange = d3
    .scaleLinear()
    .domain([0, 6])
    .range([100, 400])
  var xRange = d3
    .scaleLinear()
    .domain([0, 11])
    .range([100, regular_season_summary_width - 100])
  var regularSeasonSummaryStep3El = document.getElementById('summary-step-3')

  new Waypoint({
    element: regularSeasonSummaryStep3El,
    handler: function (direction) {
      if (direction == 'down') {
        simulation.stop()

        for (var i = 0; i < stats.length; i++) {
          if (i === 70) {
            d3.selectAll('.summary-circle-' + i)
              .transition()
              .duration(500)
              .attr('cx', xRange(10))
              .attr('cy', yRange(6))
          } else {
            d3.selectAll('.summary-circle-' + i)
              .transition()
              .duration(500)
              .attr('cx', function () {
                if (Math.floor(i / 10) % 2 == 0) {
                  return xRange(i % 10)
                } else {
                  return xRange(i % 10) + 40
                }
              })
              .attr('cy', yRange(Math.floor(i / 10)))
          }
        }
      } else {
        simulation
          .force(
            'x',
            d3
              .forceX()
              .strength(0.05)
              .x(d => x(d.WL))
          )
          .force(
            'y',
            d3
              .forceY()
              .strength(0.05)
              .y(regular_season_summary_height / 2)
          )
          .alphaTarget(0.5)
          .restart()
      }
    },
    offset: "90%"
  })

  new Waypoint({
    element: regularSeasonSummaryStep3El,
    handler: function (direction) {
      if (direction == 'down') {
        d3.selectAll('.summary-circle-W-streak')
          .transition()
          .duration(100)
          .style('fill', 'red')
      } else {
        d3.selectAll('.summary-circle-W-streak')
          .transition()
          .duration(100)
          .style('fill', COLOR.LAKERS_YELLOW)
      }
    },
    offset: "30%"
  })

  // step 4 animation
  var regularSeasonSummaryStep4El = document.getElementById('summary-step-4')

  new Waypoint({
    element: regularSeasonSummaryStep4El,
    handler: function (direction) {
      if (direction == 'down') {
        d3.selectAll('.summary-circle-W-streak').style(
          'fill',
          COLOR.LAKERS_YELLOW
        )
        d3.selectAll('.summary-circle-L')
          .transition()
          .duration(500)
          .style('display', 'none')
      } else {
        d3.selectAll('.summary-circle-L')
          .transition()
          .duration(500)
          .style('display', 'block')
        d3.selectAll('.summary-circle-W-streak')
          .transition()
          .duration(500)
          .style('fill', 'red')
      }
    },
    offset: "90%"
  })

  // hard code "1"
  // bottomScale [0 - 14]
  var xBottomScale = d3
    .scaleLinear()
    .domain([0, 6])
    .range([225 + 25, 575 - 25])

  var yBottomScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([600 + 25, 700 - 25])

  var xVerticleScale = d3
    .scaleLinear()
    .domain([0, 2])
    .range([325 + 25, 475 - 25])

  var yVerticleScale = d3
    .scaleLinear()
    .domain([0, 8])
    .range([600 - 425, 600 - 25])

  var xObliqueScale = d3
    .scaleLinear()
    .domain([0, 4])
    .range([225 + 25, 450])

  var yObliqueSlope = 0.5

  // build position map
  var positionMap = {}
  for (var i = 0; i < winGames.length; i++) {
    // first 14 to the bottom
    if (i < 14) {
      var xPos = xBottomScale(i % 7)
      var yPos = yBottomScale(Math.floor(i / 7))
      positionMap[i] = [xPos, yPos]
    } else if (i >= 14 && i < 41) {
      var xPos = xVerticleScale((i - 14) % 3)
      var yPos = yVerticleScale(Math.floor((i - 14) / 3))
      positionMap[i] = [xPos, yPos]
    } else if (i >= 41 && i < 51) {
      var idx = i - 41
      var xPos = xObliqueScale(idx % 5)
      var yPos = -Math.floor(idx / 5) * 50 - ((idx % 5) - 2) * 25 + 125
      positionMap[i] = [xPos, yPos]
    } else {
      positionMap[i] = [450, 125]
    }
  }

  console.log(positionMap)

  new Waypoint({
    element: regularSeasonSummaryStep4El,
    handler: function (direction) {
      if (direction == 'down') {
        for (var i = 0; i < winGames.length; i++) {
          d3.selectAll('.summary-circle-' + winGames[i])
            .transition()
            .duration(500)
            .attr('cx', positionMap[i][0])
            .attr('cy', positionMap[i][1])
        }
      } else {
        for (var i = 0; i < stats.length; i++) {
          if (i === 70) {
            d3.selectAll('.summary-circle-' + i)
              .transition()
              .duration(500)
              .attr('cx', xRange(10))
              .attr('cy', yRange(6))
          } else {
            d3.selectAll('.summary-circle-' + i)
              .transition()
              .duration(500)
              .attr('cx', function () {
                if (Math.floor(i / 10) % 2 == 0) {
                  return xRange(i % 10)
                } else {
                  return xRange(i % 10) + 40
                }
              })
              .attr('cy', yRange(Math.floor(i / 10)))
          }
        }
      }
    },
    offset: "65%"
  })

  new Waypoint({
    element: regularSeasonSummaryStep4El,
    handler: function (direction) {
      if (direction == 'down') {
        regularSeasonSummaryGraphContainerEl.classList.remove('is-fixed')
        regularSeasonSummaryGraphContainerEl.classList.add('is-bottom')
      } else {
        regularSeasonSummaryGraphContainerEl.classList.add('is-fixed')
        regularSeasonSummaryGraphContainerEl.classList.remove('is-bottom')
      }
    },
    offset: "20%"
  })
  
})
