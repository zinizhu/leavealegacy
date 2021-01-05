var playoffs_width = 1000
var playoffs_height = 600

// create svg
var playoffsSvg = d3
  .select('#playoffs-rounds')
  .append('svg')
  .attr('x', '100%')
  .attr('y', playoffs_height)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .attr('viewBox', '0 0 1000 3000')
  .classed('svg-content', true)
  .append('g')

var playoffs_circle_colors = [COLOR.RED, COLOR.RED, COLOR.BLUE, COLOR.RED]
var playoffs_matchup = ['POR', 'HOU', 'DEN', 'MIA']
var playoffs_score = ['4:1', '4:1', '4:2', '4:2']

for (var i = 0; i < 4; i++) {
  //  append intro circle

  var x = i % 2 === 0 ? playoffs_width / 5 : (playoffs_width / 5) * 4

  playoffsSvg
    .append('circle')
    .attr('cx', x)
    .attr('cy', playoffs_height / 2 + playoffs_height * i)
    .attr('r', playoffs_width / 10)
    .attr('fill', 'none')
    .attr('stroke', playoffs_circle_colors[i])
    .attr('stroke-width', 1.5)

  playoffsSvg
    .append('circle')
    .attr('cx', x)
    .attr('cy', playoffs_height / 2 + playoffs_height * i)
    .attr('r', playoffs_width / 10 - 8)
    .attr('fill', 'none')
    .attr('stroke', COLOR.LAKERS_YELLOW)
    .attr('stroke-width', 1.5)

  playoffsSvg
    .append('text')
    .attr('x', x)
    .attr('y', playoffs_height / 2 - 10 + playoffs_height * i)
    .text('LAL vs. ' + playoffs_matchup[i])
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', 20)

  playoffsSvg
    .append('text')
    .attr('x', x)
    .attr('y', playoffs_height / 2 + 15 + playoffs_height * i)
    .text(playoffs_score[i])
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('font-size', 20)
}

// draw curves

const playoffs_curve_scale = d3.line().curve(d3.curveNatural)

/* Lakers vs. Portland */

const portland_curve_up_points = [
  [playoffs_width / 5, 0],
  [playoffs_width / 5, playoffs_height / 2 - playoffs_width / 10 - 1]
]

const portland_curve_down_points = [
  [200, 401],
  [220, 500],
  [260, 530],
  [290, 535],
  [320, 535],
  [350, 535],
  [380, 538],
  [410, 546],
  [440, 560],
  [500, 600]
]

/* Lakers vs. Houston */

const houston_curve_up_points = [
  [500, 600],
  [560, 640],
  [590, 654],
  [620, 662],
  [650, 665],
  [680, 665],
  [710, 667],
  [720, 669],
  [730, 669],
  [740, 672],
  [780, 700],
  [800, 800]
]

const houston_curve_down_points = [
  [500, 1200],
  [560, 1160],
  [590, 1146],
  [620, 1138],
  [650, 1135],
  [680, 1135],
  [710, 1133],
  [720, 1131],
  [730, 1131],
  [740, 1128],
  [780, 1100],
  [800, 1000]
]

/* Lakers vs. Denver */
const denver_curve_up_points = [
  [200, 1400],
  [220, 1300],
  [260, 1270],
  [290, 1265],
  [320, 1265],
  [350, 1265],
  [380, 1262],
  [410, 1254],
  [440, 1240],
  [500, 1200]
]

const denver_curve_down_points = [
  [200, 1601],
  [220, 1700],
  [260, 1730],
  [290, 1735],
  [320, 1735],
  [350, 1735],
  [380, 1738],
  [410, 1746],
  [440, 1760],
  [500, 1800]
]

/* Lakers vs. Miami */

const miami_curve_up_points = [
  [500, 1800],
  [560, 1840],
  [590, 1854],
  [620, 1862],
  [650, 1865],
  [680, 1865],
  [710, 1867],
  [720, 1869],
  [730, 1869],
  [740, 1872],
  [780, 1900],
  [800, 2000]
]

const miami_curve_down_points = [
  [500, 2400],
  [505, 2370],
  [510, 2360],
  [520, 2350],
  [550, 2343],
  [570, 2340],
  [590, 2337],
  [620, 2336],
  [650, 2335],
  [680, 2335],
  [710, 2333],
  [720, 2331],
  [730, 2331],
  [740, 2328],
  [780, 2300],
  [800, 2200]
]

const ending_points_up = [
  [500, 2405],
  [500, 2450],
  [500, 2520]
]

const ending_points_down = [
  [500, 2680],
  [500, 2720]
]

const all_curves_points = [
  portland_curve_up_points,
  portland_curve_down_points,
  houston_curve_up_points,
  houston_curve_down_points,
  denver_curve_up_points,
  denver_curve_down_points,
  miami_curve_up_points,
  miami_curve_down_points,
  ending_points_up,
  ending_points_down
]

all_curves_points.forEach(curve => {
  playoffsSvg
    .append('path')
    .attr('d', playoffs_curve_scale(curve))
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .style('stroke-dasharray', '12, 5')
})

playoffsSvg
  .append('circle')
  .attr('cx', 500)
  .attr('cy', 2600)
  .attr('r', 80)
  .attr('fill', 'none')
  .attr('stroke', COLOR.LAKERS_PURPLE)
  .attr('stroke-width', 2)

playoffsSvg
  .append('circle')
  .attr('cx', 500)
  .attr('cy', 2600)
  .attr('r', 80 - 8)
  .attr('fill', 'none')
  .attr('stroke', COLOR.LAKERS_YELLOW)
  .attr('stroke-width', 1.5)

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2600 + 5)
  .text('CHAMPION')
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .attr('font-size', 20)

// text and text wrap
var endingWordsTextLine1 =
  'LeBron James got his fourth Finals MVP. AD won his first ring. The Lakers became'
var endingWordsTextLine2 =
  'the first team in league history to go undefeated when taking a lead into the fourth'
var endingWordsTextLine3 =
  'quarter, going 57-0 between the regular season and the playoffs. They were also'
var endingWordsTextLine4 =
  'the first franchise to earn the No. 1 seed following a five-year postseason absence.'

var endingWordTextLine5 =
  'The franchise did it. And they will do it again next year.'

playoffsSvg
  .append('line')
  .attr('x1', 200)
  .attr('y1', 2720)
  .attr('x2', 800)
  .attr('y2', 2720)
  .attr('stroke', 'white')
  .attr('stroke-width', 1)

playoffsSvg
  .append('line')
  .attr('x1', 200)
  .attr('y1', 2910)
  .attr('x2', 800)
  .attr('y2', 2910)
  .attr('stroke', 'white')
  .attr('stroke-width', 1)

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2750)
  .text(endingWordsTextLine1)
  .attr('text-anchor', 'middle')
  .attr('font-size', 14)
  .attr('fill', 'white')

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2780)
  .text(endingWordsTextLine2)
  .attr('text-anchor', 'middle')
  .attr('font-size', 14)
  .attr('fill', 'white')

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2810)
  .text(endingWordsTextLine3)
  .attr('text-anchor', 'middle')
  .attr('font-size', 14)
  .attr('fill', 'white')

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2840)
  .text(endingWordsTextLine4)
  .attr('text-anchor', 'middle')
  .attr('font-size', 14)
  .attr('fill', 'white')

playoffsSvg
  .append('text')
  .attr('x', 500)
  .attr('y', 2890)
  .text(endingWordTextLine5)
  .attr('text-anchor', 'middle')
  .attr('font-size', 14)
  .attr('fill', 'white')

/* portland */
const portland_parallelograms = []

for (var i = 0; i < 5; i++) {
  var x = 400 + 110 * i
  var y = 80
  var path = [
    [x, y],
    [x + 100, y],
    [x + 108, y - 8],
    [x + 8, y - 8],
    [x, y]
  ]
  portland_parallelograms.push(path)
}

playoffsSvg
  .selectAll('portland-parallelograms')
  .data(portland_parallelograms)
  .enter()
  .append('path')
  .attr(
    'd',
    d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
  )
  .attr('fill', (d, i) => {
    if (i === 0) return COLOR.RED
    return COLOR.LAKERS_YELLOW
  })

var portland_games_idx = [0, 3, 4]
var portland_line_end = [130, 180, 350] 

portland_games_idx.forEach((idx, i) => {
  var x = 400 + 110 * idx + 50
  var portland_game_line = [
    [x, 80],
    [x, portland_line_end[i]]
  ]
  playoffsSvg
  .append('path')
  .attr('d', playoffs_curve_scale(portland_game_line))
  .attr('stroke', 'white')
  .attr('stroke-width', 1.5)
  .attr('fill', 'none')
  .style('stroke-dasharray', '8, 4')

  playoffsSvg
  .append('circle')
  .attr('cx', x)
  .attr('cy', 20 + portland_line_end[i])
  .attr('r', 20)
  .attr('stroke', 'white')
  .attr('stroke-width', 1)
  .attr('fill', 'none')

  const portland_game_tri = [
    [x - 7, 20 + portland_line_end[i] + 10],
    [x - 7, 20 + portland_line_end[i] - 10],
    [x + 10, 20 + portland_line_end[i]],
    [x - 7, 20 + portland_line_end[i] + 10],
  ]

  playoffsSvg
  .datum(portland_game_tri)
  .append('path')
  .attr(
    'd',
    d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
  )
  .attr('fill', 'none')
  .attr('stroke', 'white')
})



/* houston */
const houston_parallelograms = []

for (var i = 0; i < 5; i++) {
  var x = 60 + 110 * i
  var y = 80 + 600
  var path = [
    [x, y],
    [x + 100, y],
    [x + 108, y - 8],
    [x + 8, y - 8],
    [x, y]
  ]
  houston_parallelograms.push(path)
}

playoffsSvg
  .selectAll('houston-parallelograms')
  .data(houston_parallelograms)
  .enter()
  .append('path')
  .attr(
    'd',
    d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
  )
  .attr('fill', (d, i) => {
    if (i === 0) return COLOR.RED
    return COLOR.LAKERS_YELLOW
  })

var houston_games_idx = [1, 4]
var houston_line_end = [300 + 600, 200 + 600] 

houston_games_idx.forEach((idx, i) => {
  var x = 60 + 110 * idx + 50
  var houston_game_line = [
    [x, 80 + 600],
    [x, houston_line_end[i]]
  ]
  playoffsSvg
  .append('path')
  .attr('d', playoffs_curve_scale(houston_game_line))
  .attr('stroke', 'white')
  .attr('stroke-width', 1.5)
  .attr('fill', 'none')
  .style('stroke-dasharray', '8, 4')

  playoffsSvg
  .append('circle')
  .attr('cx', x)
  .attr('cy', 20 + houston_line_end[i])
  .attr('r', 20)
  .attr('stroke', 'white')
  .attr('stroke-width', 1)
  .attr('fill', 'none')

  const houston_game_tri = [
    [x - 7, 20 + houston_line_end[i] + 10],
    [x - 7, 20 + houston_line_end[i] - 10],
    [x + 10, 20 + houston_line_end[i]],
    [x - 7, 20 + houston_line_end[i] + 10],
  ]

  playoffsSvg
  .datum(houston_game_tri)
  .append('path')
  .attr(
    'd',
    d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
  )
  .attr('fill', 'none')
  .attr('stroke', 'white')
})

