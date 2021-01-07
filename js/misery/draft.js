var draft_margin = { top: 100, bottom: 50, left: 140, right: 100 }
var draft_width = 900
var draft_height = 500

var draft_svg = d3
  .select('#draft-graph')
  .append('svg')
  .attr('id', 'draft-graph-svg')
  .attr('display', 'none')
  .attr(
    'width',
    draft_width + draft_margin.left + draft_margin.right
  )
  .attr(
    'height',
    draft_height + draft_margin.top + draft_margin.bottom
  )
  .append('g')
  .attr(
    'transform',
    'translate(' + draft_margin.left + ',' + draft_margin.top + ')'
  )

d3.csv("./files/draft_picks.csv", (data) => {
  var seasons = []
  data.forEach((row) => {
    seasons.push(row.season)
    row.pick = +row.pick
  })

  console.log(data, seasons)

  var x = d3.scaleLinear()
    .domain([-0.3, seasons.length - 1 + 0.1])
    .range([0, draft_width])

  var y = d3.scaleLinear()
    .domain([1, 60])
    .range([20, draft_height])

  draft_svg.append('g')
  .attr('class', 'axisLight')
  .call(
    d3.axisLeft(y)
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
    .tickFormat((d) => seasons[d]).tickSize(0)
  )

  // graph
  var ranges = [...Array(60).keys()]
  for (var i = 0; i < seasons.length; i++) {
    draft_svg.selectAll("draft-dots-" + seasons[i])
      .data(ranges)
      .enter()
      .append('circle')
      .attr('class', (d, c) => 'draft-dots-' + i + '-' + c)
      .attr('cx', x(i))
      .attr('cy', d => y(d))
      .attr('r', 2)
      .attr('fill', COLOR.LIGHT_GREY)

      draft_svg.append("rect")
      .attr("x",x(i) - 90)
      .attr("y", function () {
        if (i % 2 === 0 || i === 1) {
          return y(data[i].pick - 1) - 30 - 18
        }
        return y(data[i].pick - 1) + 30 - 18
      })
      .attr("width", 180)
      .attr("height", 25)
      .attr("fill", COLOR.BACKGROUND_DARK)
    
    d3.select('.draft-dots-' + i + '-' + (data[i].pick - 1))
      .attr('r', 8)
      .attr('fill', COLOR.LAKERS_YELLOW)

    draft_svg.append("text")
      .attr("x",x(i))
      .attr("y", function () {
        if (i % 2 === 0 || i === 1) {
          return y(data[i].pick - 1) - 30
        }
        return y(data[i].pick - 1) + 30
      })
      .text(data[i].info)
      .attr("text-anchor", "middle")
      .attr("fill", COLOR.LAKERS_YELLOW)
      .attr("font-size", 18)
      .attr("background-color", COLOR.DARK_GREY)
  }

  // scale
  // var y = d3.scaleLinear()
  //   .domain([-0.1, seasons.length - 1 + 0.1])
  //   .range([0, draft_height])

  // var x = d3.scaleLinear()
  //   .domain([60, 1])
  //   .range([20, draft_width])

  // draft_svg.append('g')
  // .attr('class', 'axisLight')
  // .call(
  //   d3.axisLeft(y).tickFormat((d) => seasons[d]).tickSize(0)
  // )

  // draft_svg
  // .append('g')
  // .attr('class', 'axisLight')
  // .attr('transform', 'translate(0, ' + (draft_height + 20) + ')')
  // .call(
  //   d3
  //     .axisBottom(x)
  //     .tickValues([60, 30, 1])
  //     .tickFormat(d => 'Rank ' + d)
  // )

  // // graph
  // var ranges = [...Array(60).keys()]
  // for (var i = 0; i < seasons.length; i++) {
  //   draft_svg.selectAll("draft-dots-" + seasons[i])
  //     .data(ranges)
  //     .enter()
  //     .append('circle')
  //     .attr('class', (d, c) => 'draft-dots-' + i + '-' + c)
  //     .attr('cx', d => x(d + 1))
  //     .attr('cy', y(i))
  //     .attr('r', 2)
  //     .attr('fill', COLOR.LIGHT_GREY)
    
  //   d3.select('.draft-dots-' + i + '-' + (data[i].pick - 1))
  //     .attr('r', 8)
  //     .attr('fill', COLOR.LAKERS_YELLOW)

  //   var textXPos = data[i].pick === 2 ? 5 : data[i].pick
  //   textXPos = textXPos === 60 ? 58 : textXPos
  //   draft_svg.append("text")
  //     .attr("x", x(textXPos-1))
  //     .attr("y", y(i) - 20)
  //     .text(data[i].info)
  //     .attr("text-anchor", "middle")
  //     .attr("fill", COLOR.LAKERS_YELLOW)
  //     .attr("font-size", 18)
  // }
  
  // title
  draft_svg
    .append('text')
    .attr('x', draft_width / 2)
    .attr('y', -60)
    .text("Lakers Best Draft Picks 2011-2018")
    .attr('font-size', '30px')
    .attr('fill', COLOR.LIGHT_GREY)
    .attr('text-anchor', 'middle')

})