var draft_margin = { top: 100, bottom: 50, left: 140, right: 100 }
var draft_width = 900
var draft_height = 500

var draft_svg = d3
  .select('#draft-graph')
  .append('svg')
  .attr('id', 'draft-graph-svg')
  .attr('display', 'none')
  .attr('width', draft_width + draft_margin.left + draft_margin.right)
  .attr('height', draft_height + draft_margin.top + draft_margin.bottom)
  .append('g')
  .attr(
    'transform',
    'translate(' + draft_margin.left + ',' + draft_margin.top + ')'
  )

d3.csv('./files/draft_picks.csv', data => {
  var seasons = []
  data.forEach(row => {
    seasons.push(row.season)
    row.pick = +row.pick
  })

  console.log(data, seasons)

  var x = d3
    .scaleLinear()
    .domain([-0.3, seasons.length - 1 + 0.1])
    .range([0, draft_width])

  var y = d3
    .scaleLinear()
    .domain([1, 60])
    .range([20, draft_height])

  draft_svg
    .append('g')
    .attr('class', 'axisLight')
    .call(
      d3
        .axisLeft(y)
        .tickValues([59, 29, 0])
        .tickFormat(d => 'Rank ' + (d + 1))
    )

  draft_svg
    .append('g')
    .attr('class', 'axisLight')
    .attr('transform', 'translate(0, ' + (draft_height + 20) + ')')
    .call(
      d3
        .axisBottom(x)
        .tickFormat(d => seasons[d])
        .tickSize(0)
    )

  // explanation text
  var draftPlayerTexts = [
    {
      name: 'Darius Morris',
      height: '6 ft 4 in',
      weight: '195 lb',
      position: 'Point Guard',
      gradschool: 'U Mich',
      wiki: 'https://en.wikipedia.org/wiki/Darius_Morris'
    },
    {
      name: 'Robert Sacre',
      height: '7 ft 0 in',
      weight: '270 lb',
      position: 'Center',
      gradschool: 'Gonzaga',
      wiki: 'https://en.wikipedia.org/wiki/Robert_Sacre'
    },
    {
      name: 'Ryan Kelly',
      height: '6 ft 11 in',
      weight: '230 lb',
      position: 'Power Forward',
      gradschool: 'Duke',
      wiki: 'https://en.wikipedia.org/wiki/Ryan_Kelly_(basketball)'
    },
    {
      name: 'Julius Randle',
      height: '6 ft 8 in',
      weight: '250 lb',
      position: 'Power Forward/Center',
      gradschool: 'Kentucky',
      wiki: 'https://en.wikipedia.org/wiki/Julius_Randle'
    },
    {
      name: "D'Angelo Russell",
      height: '6 ft 4 in',
      weight: '193 lb',
      position: 'Point Guard',
      gradschool: 'Ohio State',
      wiki: 'https://en.wikipedia.org/wiki/D%27Angelo_Russell'
    },
    {
      name: 'Brandon Ingram',
      height: '6 ft 7 in',
      weight: '190 lb',
      position: 'Small Forward',
      gradschool: 'Duke',
      wiki: 'https://en.wikipedia.org/wiki/Brandon_Ingram'
    },
    {
      name: 'Lonzo Ball',
      height: '6 ft 6 in',
      weight: '190 lb',
      position: 'Point Guard',
      gradschool: 'UCLA',
      wiki: 'https://en.wikipedia.org/wiki/Lonzo_Ball'
    },
    {
      name: 'Moritz Wagner',
      height: '6 ft 11 in',
      weight: '245 lb',
      position: 'Power Forward/Center',
      gradschool: 'U Mich',
      wiki: 'https://en.wikipedia.org/wiki/Moritz_Wagner_(basketball)'
    }
  ]

  // graph
  var ranges = [...Array(60).keys()]
  for (var i = 0; i < seasons.length; i++) {
    draft_svg
      .selectAll('draft-dots-' + seasons[i])
      .data(ranges)
      .enter()
      .append('circle')
      .attr('class', (d, c) => 'draft-dots-' + i + '-' + c)
      .attr('cx', x(i))
      .attr('cy', d => y(d))
      .attr('r', 2)
      .attr('i', i)
      .attr('fill', COLOR.LIGHT_GREY)

    draft_svg
      .append('rect')
      .attr('x', x(i) - 90)
      .attr('y', function () {
        if (i % 2 === 0 || i === 1) {
          return y(data[i].pick - 1) - 30 - 18
        }
        return y(data[i].pick - 1) + 30 - 18
      })
      .attr('width', 180)
      .attr('height', 25)
      .attr('fill', COLOR.BACKGROUND_DARK)

    d3.select('.draft-dots-' + i + '-' + (data[i].pick - 1))
      .attr('r', 8)
      .attr('fill', COLOR.LAKERS_YELLOW)
      .on('mouseover', function () {
        var idx = d3.select(this).attr('i')
        d3.select('.draftWordGroup-' + idx).style('display', 'block')
      })
      .on('mouseleave', function () {
        var idx = d3.select(this).attr('i')
        d3.select('.draftWordGroup-' + idx).style('display', 'none')
      })

    draft_svg
      .append('text')
      .attr('x', x(i))
      .attr('y', function () {
        if (i % 2 === 0 || i === 1) {
          return y(data[i].pick - 1) - 30
        }
        return y(data[i].pick - 1) + 30
      })
      .text(data[i].info)
      .attr('text-anchor', 'middle')
      .attr('fill', COLOR.LAKERS_YELLOW)
      .attr('font-size', 18)
      .attr('background-color', COLOR.DARK_GREY)
  }

  // append a line
  const draft_curve_scale = d3.line().curve(d3.curveNatural)
  const draft_mid_curve = [
    [20, y(29)],
    [draft_width, y(29)]
  ]
  draft_svg
    .append('path')
    .attr('d', draft_curve_scale(draft_mid_curve))
    .attr('stroke', COLOR.LAKERS_YELLOW)
    .attr('stroke-width', 0.5)
    .attr('fill', 'none')
    .style('stroke-dasharray', '4, 4')

  // title
  draft_svg
    .append('text')
    .attr('x', draft_width / 2)
    .attr('y', -60)
    .text('Lakers Best Draft Picks 2011-2018')
    .attr('font-size', '30px')
    .attr('fill', COLOR.LIGHT_GREY)
    .attr('text-anchor', 'middle')

  for (var i = 0; i < seasons.length; i++) {
    var draftTextBoxY =
      i <= 2 ? y(data[i].pick - 1) - 220 : y(data[i].pick - 1) + 40

    var draftText =
      'Name: ' +
      draftPlayerTexts[i].name +
      '<br />' +
      'Height: ' +
      draftPlayerTexts[i].height +
      '<br />' +
      'Weight: ' +
      draftPlayerTexts[i].weight +
      '<br />' +
      'Position: ' +
      draftPlayerTexts[i].position +
      '<br />' +
      'School: ' +
      draftPlayerTexts[i].gradschool
      // + '<br />' +
      // 'Wiki Page: <a href=' +
      // draftPlayerTexts[i].wiki +
      // '>here</a>'

    var draftTextNode = draft_svg
      .append('g')
      .attr(
        'transform',
        'translate(' + (x(i) - 100) + ', ' + draftTextBoxY + ')'
      )
      .attr('class', 'draftWordGroup draftWordGroup-' + i)
      .append('text')
      .text(draftText)

    var draftTextWrap = d3.textwrap().bounds({ width: 200, height: 180 })
    draftTextNode.call(draftTextWrap)
  }
})
