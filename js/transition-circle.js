var scrolly = d3.select('#lakers-champ-timeline')
var scrollerIn = scrollama()
var scrollerOut = scrollama()

var widthOffset = window.innerWidth / 2
var heightOffset = window.innerHeight / 2

d3
  .select("#transition-circle-svg")
  .append('g')
  .attr('transform', 'translate(' + widthOffset + ', ' + heightOffset + ')')
  .append('circle')
  .attr('class', 'timeline-bg-circle')
  .attr('id', 'timeline-bg-circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 0)
  .attr('z-index', 1)
  .attr('fill', COLOR.DARK_GREY)
  .attr('position', 'fixed')

function handleStepProgress (response) {
  // console.log(response)
  var radius = window.outerWidth * response.progress
  // console.log(radius)
  d3.select('#timeline-bg-circle').attr('r', radius)
}

function handleStepProgressOut (response) {
  console.log(response)
  var radius = window.outerWidth * (1 - response.progress)
  console.log(radius)
  d3.select('#timeline-bg-circle').attr('r', radius)
  if (response.progress === 1) {
    d3.select('#timeline-bg-circle').attr('display', 'none')
  } else {
    d3.select('#timeline-bg-circle').attr('display', 'block')
  }
}

console.log('size', window.outerWidth)

function init () {
  scrollerIn
    .setup({
      step: '#lakers-champ-timeline',
      progress: true,
      // debug: true,
      offset: 0
    })
    .onStepProgress(handleStepProgress)

    scrollerOut
    .setup({
      step: '#new-team-intro',
      progress: true,
      // debug: true,
      offset: 0.8
    })
    .onStepProgress(handleStepProgressOut)
}

init()

