var miserySectionEl = document.getElementsByClassName('misery-section').item(0)
var miseryTextSectionEl = document.getElementsByClassName('misery-text').item(0)
var miseryTextBoxEls = document.getElementsByClassName('text-box')
var miseryGraphContainerEl = document
  .getElementsByClassName('misery-graph-container')
  .item(0)
var miseryGraphEl = document.getElementById('kobe-injury-graph-svg')
var draftGraphEl = document.getElementById('draft-graph-svg')
var recordGraphEl = document.getElementById('record-graph-svg')

new Waypoint({
  element: miserySectionEl,
  handler: function (direction) {
    if (direction == 'down') {
      miseryGraphContainerEl.classList.add('is-fixed')
      miseryTextBoxEls.item(0).classList.add('seen')

    } else {
      miseryGraphContainerEl.classList.remove('is-fixed')
      miseryTextBoxEls.item(0).classList.remove('seen')
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
  element: miseryTextBoxEls.item(0),
  handler: function (direction) {
    if (direction == 'down') {
      miseryGraphEl.setAttribute('display', 'none')
      draftGraphEl.setAttribute('display', 'block')
      miseryTextBoxEls.item(0).classList.remove('seen')
      miseryTextBoxEls.item(1).classList.add('seen')
    } else {
      miseryGraphEl.setAttribute('display', 'block')
      draftGraphEl.setAttribute('display', 'none')
      miseryTextBoxEls.item(0).classList.add('seen')
      miseryTextBoxEls.item(1).classList.remove('seen')
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
    } else {
      recordGraphEl.setAttribute('display', 'none')
      draftGraphEl.setAttribute('display', 'block')
      miseryTextBoxEls.item(1).classList.add('seen')
      miseryTextBoxEls.item(2).classList.remove('seen')
    }
  },
  offset: 0
})
