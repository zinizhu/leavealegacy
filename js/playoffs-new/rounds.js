var playoffs_width = 1000
var playoffs_height = 600

/* close video button */
function close_video_event () {
  document.getElementById('video-iframe').src = ''

  document
    .getElementsByClassName('video-section')
    .item(0)
    .classList.toggle('active')
}

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
  [380, 535],
  [410, 535],
  [440, 536],
  [500, 539]
]

/* Lakers vs. Houston */
const houston_curve_up_points = [
  [500, 539],
  [530, 543],
  [560, 547],
  [590, 552],
  [620, 558],
  [650, 568],
  [680, 580],
  [710, 593],
  [740, 616],
  [780, 670],
  [795, 740],
  [800, 800]
]

const houston_curve_down_points = [
  [500, 1138],
  [560, 1136],
  [590, 1135],
  [620, 1135],
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
  [230, 1250],
  [260, 1200],
  [290, 1183],
  [320, 1170],
  [350, 1160],
  [380, 1152],
  [410, 1146],
  [440, 1143],
  [470, 1140],
  [500, 1138]
]

const denver_curve_down_points = [
  [200, 1601],
  [220, 1700],
  [260, 1730],
  [290, 1735],
  [320, 1735],
  [350, 1735],
  [380, 1735],
  [410, 1735],
  [440, 1736],
  [500, 1739]
]

/* Lakers vs. Miami */

const miami_curve_up_points = [
  [500, 1739],
  [530, 1743],
  [560, 1747],
  [590, 1752],
  [620, 1758],
  [650, 1768],
  [680, 1780],
  [710, 1793],
  [740, 1816],
  [780, 1870],
  [795, 1940],
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
var endingTextGroup = playoffsSvg
  .append('g')
  .attr('class', 'endingWordGroup')
  .attr('transform', 'translate(195,2735)')

var endingWordsText =
  'LeBron James got his fourth Finals MVP. AD won his first ring. The Lakers became the first team in league history to go undefeated when taking a lead into the fourth quarter, going 57-0 between the regular season and the playoffs. They were also the first franchise to earn the No. 1 seed following a five-year postseason absence.<br /><br />' +
  'The franchise did it. And they will do it again next year.'

var endingTextGroupNode = endingTextGroup.append('text').text(endingWordsText)

var endingTextWrap = d3
  .textwrap()
  .bounds({ width: 620, height: 400 })
  .padding(10)
endingTextGroupNode.call(endingTextWrap)

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

/* portland */
const portland_parallelograms = []

for (var i = 0; i < 5; i++) {
  var x = 350 + 110 * i
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

var portland_videos_links = [
  'https://www.youtube.com/embed/gHPubcpGkrk',
  'https://www.youtube.com/embed/n50qwytMPlQ',
  'https://www.youtube.com/embed/KZV3TuxFXpk'
]

portland_games_idx.forEach((idx, i) => {
  var x = 350 + 110 * idx + 50
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
    .attr('cy', 16 + portland_line_end[i])
    .attr('r', 16)
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('game', idx)
    .attr('fill', COLOR.BACKGROUND_DARK)
    .on('mouseover', function () {
      var gameId = d3.select(this).attr('game')
      d3.select('.portland-button-' + gameId).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      var gameId = +d3.select(this).attr('game')
      d3.select('.portland-button-' + gameId).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = portland_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })

  const portland_game_tri = [
    [x - 6, 16 + portland_line_end[i] + 8],
    [x - 6, 16 + portland_line_end[i] - 8],
    [x + 8, 16 + portland_line_end[i]],
    [x - 6, 16 + portland_line_end[i] + 8]
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
    .attr('class', 'portland-button-' + idx)
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .on('mouseover', function () {
      d3.select(this).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = portland_videos_links[i]
      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })
})

// add annotation to play the video

playoffsSvg
  .append('text')
  .attr('x', 300)
  .attr('y', 120)
  .text('click to watch game highlights')
  .attr('font-family', 'Caveat')
  .attr('font-size', 12)
  .attr('fill', COLOR.LIGHT_GREY)
  .attr('text-anchor', 'middle')

const video_annotation_curve = [
  [320, 126],
  [325, 130],
  [330, 134],
  [350, 145],
  [370, 147],
  [376, 147]
]

playoffsSvg
  .append('path')
  .attr('d', playoffs_curve_scale(video_annotation_curve))
  .attr('stroke', 'white')
  .attr('stroke-width', 0.5)
  .attr('fill', 'none')
  .style('stroke-dasharray', '2, 1')

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

var houston_videos_links = [
  "https://www.youtube.com/embed/l0D95AzZZC4",
  "https://www.youtube.com/embed/cINpXjiZiTk"
]

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
    .attr('cy', 16 + houston_line_end[i])
    .attr('r', 16)
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('fill', COLOR.BACKGROUND_DARK)
    .attr('game', idx)
    .on('mouseover', function () {
      var gameId = d3.select(this).attr('game')
      d3.select('.houston-button-' + gameId).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      var gameId = +d3.select(this).attr('game')
      d3.select('.houston-button-' + gameId).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = houston_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })


  const houston_game_tri = [
    [x - 5, 16 + houston_line_end[i] + 8],
    [x - 5, 16 + houston_line_end[i] - 8],
    [x + 8, 16 + houston_line_end[i]],
    [x - 5, 16 + houston_line_end[i] + 8]
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
    .attr('class', 'houston-button-' + idx)
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .on('mouseover', function () {
      d3.select(this).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = houston_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })
})

/* denver */
const denver_parallelograms = []

for (var i = 0; i < 5; i++) {
  var x = 400 + 110 * i
  var y = 80 + 1200
  var path = [
    [x, y],
    [x + 100, y],
    [x + 108, y - 8],
    [x + 8, y - 8],
    [x, y]
  ]
  denver_parallelograms.push(path)
}

playoffsSvg
  .selectAll('denver-parallelograms')
  .data(denver_parallelograms)
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
    if (i === 1) return COLOR.BLUE
    return COLOR.LAKERS_YELLOW
  })

var denver_games_idx = [1, 4]
var denver_line_end = [180 + 1200, 200 + 1200]

var denver_videos_links = [
  "https://www.youtube.com/embed/sFrrbM4Q3T4",
  "https://www.youtube.com/embed/DSIDOgR5O5g"
]

denver_games_idx.forEach((idx, i) => {
  var x = 400 + 110 * idx + 50
  var denver_game_line = [
    [x, 80 + 1200],
    [x, denver_line_end[i]]
  ]
  playoffsSvg
    .append('path')
    .attr('d', playoffs_curve_scale(denver_game_line))
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .style('stroke-dasharray', '8, 4')

  playoffsSvg
    .append('circle')
    .attr('cx', x)
    .attr('cy', 16 + denver_line_end[i])
    .attr('r', 16)
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('fill', COLOR.BACKGROUND_DARK)
    .attr('game', idx)
    .on('mouseover', function () {
      var gameId = d3.select(this).attr('game')
      d3.select('.denver-button-' + gameId).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      var gameId = +d3.select(this).attr('game')
      d3.select('.denver-button-' + gameId).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = denver_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })

  const denver_game_tri = [
    [x - 5, 16 + denver_line_end[i] + 8],
    [x - 5, 16 + denver_line_end[i] - 8],
    [x + 8, 16 + denver_line_end[i]],
    [x - 5, 16 + denver_line_end[i] + 8]
  ]

  playoffsSvg
    .datum(denver_game_tri)
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
    .attr('class', 'denver-button-' + idx)
    .on('mouseover', function () {
      d3.select(this).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = denver_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })
})

/* miami */
const miami_parallelograms = []

for (var i = 0; i < 6; i++) {
  var x = 60 + 100 * i
  var y = 80 + 1800
  var path = [
    [x, y],
    [x + 90, y],
    [x + 98, y - 8],
    [x + 8, y - 8],
    [x, y]
  ]
  miami_parallelograms.push(path)
}

playoffsSvg
  .selectAll('miami-parallelograms')
  .data(miami_parallelograms)
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
    if (i === 1 || i === 4) return COLOR.RED
    return COLOR.LAKERS_YELLOW
  })

var miami_games_idx = [3, 4, 5]
var miami_line_end = [140 + 1800, 330 + 1800, 160 + 1800]

var miami_videos_links = [
  "https://www.youtube.com/embed/Bh90U367Ivc",
  "https://www.youtube.com/embed/1S1cXaqkIRQ",
  "https://www.youtube.com/embed/czq7usfGiZY"
]

miami_games_idx.forEach((idx, i) => {
  var x = 60 + 100 * idx + 45
  var miami_game_line = [
    [x, 80 + 1800],
    [x, miami_line_end[i]]
  ]
  playoffsSvg
    .append('path')
    .attr('d', playoffs_curve_scale(miami_game_line))
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .style('stroke-dasharray', '8, 4')

  playoffsSvg
    .append('circle')
    .attr('cx', x)
    .attr('cy', 16 + miami_line_end[i])
    .attr('r', 16)
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('fill', COLOR.BACKGROUND_DARK)
    .attr('game', idx)
    .on('mouseover', function () {
      var gameId = d3.select(this).attr('game')
      d3.select('.miami-button-' + gameId).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      var gameId = +d3.select(this).attr('game')
      d3.select('.miami-button-' + gameId).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = miami_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })

  const miami_game_tri = [
    [x - 5, 16 + miami_line_end[i] + 8],
    [x - 5, 16 + miami_line_end[i] - 8],
    [x + 8, 16 + miami_line_end[i]],
    [x - 5, 16 + miami_line_end[i] + 8]
  ]

  playoffsSvg
    .datum(miami_game_tri)
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
    .attr('class', 'miami-button-' + idx)
    .on('mouseover', function () {
      d3.select(this).attr('fill', 'white')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('fill', 'none')
    })
    .on('click', function () {
      document.getElementById('video-iframe').src = miami_videos_links[i]

      document
        .getElementsByClassName('video-section')
        .item(0)
        .classList.toggle('active')
    })
})

// append text description
var line_text_interval = 65
var blob_width = 180
var blob_height = 400

/* portland */

var portland_text_start = portland_line_end.map(end => end + line_text_interval)
var portland_text_line_one = [
  'LAL 93 : 100 POR',
  'LAL 135 : 115 POR',
  'LAL 131 : 122 POR'
]
var portland_text_line_two = ['Game 1', 'Game 4', 'Game 5']
var portland_text_blob = [
  'James became the first person to shoot 23 points, 17 rebounds and 16 assists in the playoffs. It was his 24th postseason triple-double and his assists were a career playoff high.',
  'It was Kobe Bryant Day. James scored 30 points and 10 assists in 28 minutes and Lakers led by as many as 38 points for their third straight win in the opening-round series.',
  'Anthony Davis had a playoff-best 43 points. He had a personal 11-0 run in the last quarter to put Los Angeles up 123-112 and all but seal the win.'
]

for (var i = 0; i < portland_text_start.length; i++) {
  var midX = 400 + portland_games_idx[i] * 110

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', portland_text_start[i])
    .text(portland_text_line_one[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', COLOR.LAKERS_YELLOW)

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', portland_text_start[i] + 18)
    .text(portland_text_line_two[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')

  var textwrap = d3
    .textwrap()
    .bounds({ width: blob_width, height: blob_height })
  var textNode = playoffsSvg
    .append('g')
    .attr('class', 'playoffs-game-text')
    .attr(
      'transform',
      'translate(' +
        (midX - blob_width / 2 + 10) +
        ', ' +
        (portland_text_start[i] + 36) +
        ')'
    )
    .append('text')
    .text(portland_text_blob[i])

  textNode.call(textwrap)
}

/* houston */

var houston_text_start = houston_line_end.map(end => end + line_text_interval)
var houston_text_line_one = ['LAL 117 : 109 HOU', 'LAL 119 : 96 HOU']
var houston_text_line_two = ['Game 2', 'Game 5']
var houston_text_blob = [
  "James scored 36 points, and the win gave James his NBA-record 162nd postseason victory, surpassing former Lakers guard Derek Fisher's records of 161 wins.",
  'James scored 29 points and the Lakers wrapped up their first trip to the Western Conference finals since 2010. It was also AD’s first time to play in the West Conference Finals.'
]

for (var i = 0; i < houston_text_start.length; i++) {
  var midX = 110 + houston_games_idx[i] * 110

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', houston_text_start[i])
    .text(houston_text_line_one[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', COLOR.LAKERS_YELLOW)

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', houston_text_start[i] + 18)
    .text(houston_text_line_two[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')

  var textwrap = d3
    .textwrap()
    .bounds({ width: blob_width, height: blob_height })
  var textNode = playoffsSvg
    .append('g')
    .attr('class', 'playoffs-game-text')
    .attr(
      'transform',
      'translate(' +
        (midX - blob_width / 2 + 10) +
        ', ' +
        (houston_text_start[i] + 36) +
        ')'
    )
    .append('text')
    .text(houston_text_blob[i])

  textNode.call(textwrap)
}

/* denver */
var denver_text_start = denver_line_end.map(end => end + line_text_interval)
var denver_text_line_one = ['LAL 105 : 103 DEN', 'LAL 117 : 107 DEN']
var denver_text_line_two = ['Game 2', 'Game 5']
var denver_text_blob = [
  'AD made “The Mamba Shot” and gave the Lakers a 105-103 victory over the Denver Nuggets on Sunday night and a 2-0 lead in the Western Conference finals.',
  'James finished with 38 points, 16 rebounds and 10 assists, which was his 27th postseason triple-double, to become the fourth player to reach 10 NBA finals. He wore out the path to the NBA finals in Eastern Conference, and now he’s the best in the West.'
]

for (var i = 0; i < denver_text_start.length; i++) {
  var midX = 450 + denver_games_idx[i] * 110

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', denver_text_start[i])
    .text(denver_text_line_one[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', COLOR.LAKERS_YELLOW)

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', denver_text_start[i] + 18)
    .text(denver_text_line_two[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')

  var textwrap = d3
    .textwrap()
    .bounds({ width: blob_width, height: blob_height })
  var textNode = playoffsSvg
    .append('g')
    .attr('class', 'playoffs-game-text')
    .attr(
      'transform',
      'translate(' +
        (midX - blob_width / 2 + 10) +
        ', ' +
        (denver_text_start[i] + 36) +
        ')'
    )
    .append('text')
    .text(denver_text_blob[i])

  textNode.call(textwrap)
}

/* miami */
var miami_text_start = miami_line_end.map(end => end + line_text_interval)
var miami_text_line_one = [
  'LAL 102 : 96 MIA',
  'LAL 108 : 111 MIA',
  'LAL 117 : 107 MIA'
]
var miami_text_line_two = ['Game 4', 'Game 5', 'Game 6']
var miami_text_blob = [
  "Anthony Davis' 3-pointer with 39.5s left finally settled matters and the Lakers beat Heat 102-96 in Game 4. 1 win away from the trophy.",
  'James had 40 points, 13 rebounds and 7 assists for the Lakers.  They were 1 basket away from the title, but Green’s shot was a bit short.',
  'No more drama. With a dominant final flourish, the Los Angeles Lakers won it all for the first time in a decade.'
]

for (var i = 0; i < miami_text_start.length; i++) {
  var midX = 105 + miami_games_idx[i] * 100

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', miami_text_start[i])
    .text(miami_text_line_one[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', COLOR.LAKERS_YELLOW)

  playoffsSvg
    .append('text')
    .attr('x', midX)
    .attr('y', miami_text_start[i] + 18)
    .text(miami_text_line_two[i])
    .attr('font-size', 14)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')

  var textwrap = d3
    .textwrap()
    .bounds({ width: blob_width - 20, height: blob_height })
  var textNode = playoffsSvg
    .append('g')
    .attr('class', 'playoffs-game-text')
    .attr(
      'transform',
      'translate(' +
        (midX - blob_width / 2 + 10) +
        ', ' +
        (miami_text_start[i] + 30) +
        ')'
    )
    .append('text')
    .text(miami_text_blob[i])

  textNode.call(textwrap)
}
