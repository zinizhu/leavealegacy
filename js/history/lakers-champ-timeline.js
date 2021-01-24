// define margin and svg size
var margin = { top: 100, bottom: 100, left: 150, right: 220 }
var width = 1350
var height = 450

// create svg
var svg = d3
  .select('#lakers-champ-timeline')
  .append('svg')
  // .attr('width', width + margin.left + margin.right)
  // .attr('height', height + margin.top + margin.bottom)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "-250 0 2250 820") 
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


// read data
d3.csv('./files/lakers_champ.csv', data => {
  var years = []
  data.forEach(row => {
    years.push(+row['YEARAWARDED'])
  })
  years.sort()

  allYears = []
  for (var i = 1949; i <= 2019; i++) {
    allYears.push(i)
  }

  var x = d3
    .scaleLinear()
    .domain([
      1948,
      2011
    ])
    .range([0, width])

  var axis = svg
    .append('g')
    .attr('class', 'lakers-champ-axis')
    .attr('transform', 'translate(0,' + height * 0.3 + ')')
    .call(
      d3
        .axisBottom(x)
        .tickSize(0)
        .tickValues(years)
        .tickFormat(d3.format('d'))
    )

  // scrolling effects
  new Waypoint({
    element: document.getElementById('lakers-champ-timeline'),
    handler: function (direction) {
      if (this.element.getAttribute('done') != 1 && direction == 'down') {
        this.element.setAttribute('done', 1)
        d3.selectAll('.lakers-champ-axis .tick line')
          .transition()
          .duration(1000)
          .attr('y2', (d, i) => {
            if (i % 2 === 0) {
              return -60
            }
            return 60
          })
          .attr('stroke', COLOR.LIGHT_GREY)

        d3.selectAll('.lakers-champ-axis .tick text')
          .transition()
          .duration(1000)
          .attr('y', (d, i) => {
            if (i % 2 === 0) {
              return -90
            }
            return 80
          })
          .attr('font-size', 15)
          .attr('fill', COLOR.DARK_GREY)

        var ticks = d3.selectAll('.lakers-champ-axis .tick')
        ticks.each(function (tick, i) {
          d3.select(this)
            .append('circle')
            .transition()
            .duration(1000)
            .attr('cy', function (d) {
              if (i % 2 === 0) {
                return -60
              }
              return 60
            })
            .attr('r', 12)
            .attr('fill', function (d) {
              if (d === 2020) return COLOR.LAKERS_YELLOW
              return COLOR.LAKERS_PURPLE
            })
        })
      }


    },
    offset: 700
  })

  d3.selectAll('.lakers-champ-axis path').attr('stroke', COLOR.LIGHT_GREY)

  // add image
  var champRecordsStories = [
    {
      cx: x(1947),
      cy: -50,
      x: x(1947) - 50,
      y: -100,
      link: './files/images/champ-timeline/lakers-champ-gm.jpg',
      width: 100,
      text1: '1947–1958 : George Mikan ',
      text2: 'dominated the league and  ',
      text3: 'founded the Minneapolis dynasty.'
    },
    {
      cx: x(1964),
      cy: 280,
      x: x(1964) - 50,
      y: 230,
      link: './files/images/champ-timeline/lakers-champ-wc.jpg',
      width: 120,
      text1: '1968–1973 : Wilt Chamberlain',
      text2: 'joined the Lakers and won ',
      text3: 'one championship.'
    },
    {
      cx: x(1976),
      cy: -50,
      x: x(1976) - 50,
      y: -100,
      link: './files/images/champ-timeline/lakers-champ-showtime.jpg',
      width: 140,
      text1: '1979–1991 : Magic Johnson, Kareem',
      text2: 'Abdul-Jabbar led the "Showtime',
      text3: 'Lakers" to 5 titles.'
    },
    {
      cx: x(1994),
      cy: 280,
      x: x(1994) - 55,
      y: 240,
      link: './files/images/champ-timeline/lakers-champ-ok.jpg',
      width: 120,
      text1: '1996–2004: The Best Duo - ',
      text2: "O'Neal and Bryant Dynasty",
      text3: 'with three rings.'
    },
    {
      cx: x(2003),
      cy: -50,
      x: x(2003) - 80,
      y: -100,
      link: './files/images/champ-timeline/lakers-champ-kobe.jpg',
      width: 150,
      text1: '2007-2011: Bryant and Gasol built',
      text2: 'another dynasty after Shaq left',
      text3: 'and won 2 more titles for Kobe.'
    }
  ]

  svg
    .selectAll('lakers-champ-clipPath')
    .data(champRecordsStories)
    .enter()
    .append('clipPath')
    .attr('id', (d, i) => 'clipObj-' + i)
    .append('circle')
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', 40)

  var lakers_champ_text = svg
    .selectAll('lakers-champ-clipPath-caption')
    .data(champRecordsStories)
    .enter()
    .append('text')

  lakers_champ_text
    .append('tspan')
    .attr('x', d => d.cx + 60)
    .attr('y', d => d.cy - 15)
    .attr('font-size', '16px')
    .attr('fill', COLOR.DARK_GREY)
    .text(d => d.text1)
    .append('tspan')
    .attr('x', d => d.cx + 60)
    .attr('y', d => d.cy + 7)
    .attr('font-size', '16px')
    .attr('fill', COLOR.DARK_GREY)
    .text(d => d.text2)
    .append('tspan')
    .attr('x', d => d.cx + 60)
    .attr('y', d => d.cy + 29)
    .attr('font-size', '16px')
    .attr('fill', COLOR.DARK_GREY)
    .text(d => d.text3)

  svg
    .selectAll('lakers-champ-clipPath-image')
    .data(champRecordsStories)
    .enter()
    .append('image')
    .attr('xlink:href', d => d.link)
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', d => d.width)
    .attr('clip-path', (d, i) => 'url(#clipObj-' + i + ')')
})
