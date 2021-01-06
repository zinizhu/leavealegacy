var scrolly = d3.select('#lakers-champ-timeline')
var scrollerIn = scrollama()
var scrollerOut = scrollama()

var widthOffset = window.innerWidth / 2
var heightOffset = window.innerHeight / 2

d3
  .select("#transition-circle-svg")
  .append('g')
  .attr('x', window.innerWidth)
  .attr('y', window.innerHeight)
  .append('circle')
  .attr('class', 'timeline-bg-circle')
  .attr('id', 'timeline-bg-circle')
  .attr('cx', window.outerWidth / 2)
  .attr('cy', window.innerHeight / 2)
  .attr('r', 0)
  .attr('z-index', 100)
  .attr('fill', COLOR.BACKGROUND_DARK)

function handleStepProgress (response) {
  var radius = window.innerWidth * response.progress
  d3.select('#timeline-bg-circle').attr('r', radius)
}

function handleStepProgressOut (response) {

  var radius = window.innerWidth * (1 - response.progress)
  d3.select('#timeline-bg-circle').attr('r', radius)
  if (response.progress === 1) {
    d3.select('#timeline-bg-circle').attr('display', 'none')
  } else {
    d3.select('#timeline-bg-circle').attr('display', 'block')
  }
}

function init () {
  scrollerIn
    .setup({
      step: '#lakers-champ-timeline',
      progress: true,
      offset: 0
    })
    .onStepProgress(handleStepProgress)

    scrollerOut
    .setup({
      step: '#new-team-intro',
      progress: true,
      offset: 0.8
    })
    .onStepProgress(handleStepProgressOut)
}

new Waypoint({
  element: document.getElementById("regular-season"),
  handler: function (direction) {
    if (direction === 'down') {
      console.log('lalal')
      document.getElementById("transition-circle-svg").style.position = 'relative';
    } else {
      document.getElementById("transition-circle-svg").style.position = 'fixed';
    }
  },
  offset: 0
})

init()

