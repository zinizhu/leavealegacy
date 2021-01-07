var miserySectionEl = document.getElementsByClassName('misery-section').item(0)
var miseryTextSectionEl = document.getElementsByClassName('misery-text').item(0)
var miseryTextBoxEls = document.getElementsByClassName('text-box')
var miseryGraphContainerEl = document
  .getElementsByClassName('misery-graph-container')
  .item(0)
var miseryGraphEl = document.getElementById('kobe-injury-graph-svg')
var draftGraphEl = document.getElementById('draft-graph-svg')
var recordGraphEl = document.getElementById('record-graph-svg')
var timelineCircleEl = document.getElementById('transition-circle-svg')
var miserySectionWholeEl = document.getElementById('time-of-misery')
var miseryBgEl = document.getElementById('misery-bg')

new Waypoint({
  element: miserySectionEl,
  handler: function (direction) {
    if (direction == 'down') {
      miseryGraphContainerEl.classList.add('is-fixed')
      miseryTextBoxEls.item(0).classList.add('seen')

      miseryBgEl.style.visibility = 'visible'
    } else {
      miseryGraphContainerEl.classList.remove('is-fixed')
      miseryTextBoxEls.item(0).classList.remove('seen')

      miseryBgEl.style.visibility = 'hidden'
    }
  }
})

new Waypoint({
  element: miseryTextBoxEls.item(2),
  handler: function (direction) {
    if (direction == 'down') {
      miseryGraphContainerEl.classList.remove('is-fixed')
      miseryGraphContainerEl.classList.add('is-bottom')
    } else {
      miseryGraphContainerEl.classList.add('is-fixed')
      miseryGraphContainerEl.classList.remove('is-bottom')
    }
  },
  offset: 250
})

new Waypoint({
  element: miseryTextBoxEls.item(2),
  handler: function (direction) {
    if (direction == 'down') {
      d3.transition()
        .duration(500)
        .selectAll('.records-rank-rect-eight')
        .attr('stroke', COLOR.LAKERS_YELLOW)
    } else {
      d3.transition()
        .duration(500)
        .selectAll('.records-rank-rect-eight')
        .attr('stroke', COLOR.LIGHT_GREY)
    }
  },
  offset: 500
})

new Waypoint({
  element: miseryTextBoxEls.item(0),
  handler: function (direction) {
    if (direction == 'down') {
      miseryGraphEl.setAttribute('display', 'none')
      draftGraphEl.setAttribute('display', 'block')
      miseryTextBoxEls.item(0).classList.remove('seen')
      miseryTextBoxEls.item(1).classList.add('seen')

      miseryBgEl.style.background = "url('./files/images/lakers-rookie.jpg') no-repeat center center / cover"

    } else {
      miseryGraphEl.setAttribute('display', 'block')
      draftGraphEl.setAttribute('display', 'none')
      miseryTextBoxEls.item(0).classList.add('seen')
      miseryTextBoxEls.item(1).classList.remove('seen')

      miseryBgEl.style.background = "url('./files/images/kobe-injury-cover.jpg') no-repeat center center / cover"
    }
  },
  offset: 0
})

new Waypoint({
  element: miseryTextBoxEls.item(1),
  handler: function (direction) {
    if (direction == 'down') {
      recordGraphEl.setAttribute('display', 'block')
      draftGraphEl.setAttribute('display', 'none')
      miseryTextBoxEls.item(1).classList.remove('seen')
      miseryTextBoxEls.item(2).classList.add('seen')

      miseryBgEl.style.background = "url('./files/images/lakers-2018-misery.jpg') no-repeat center center / cover"

    } else {
      recordGraphEl.setAttribute('display', 'none')
      draftGraphEl.setAttribute('display', 'block')
      miseryTextBoxEls.item(1).classList.add('seen')
      miseryTextBoxEls.item(2).classList.remove('seen')

      miseryBgEl.style.background = "url('./files/images/lakers-rookie.jpg') no-repeat center center / cover"
    }
  },
  offset: 0
})
