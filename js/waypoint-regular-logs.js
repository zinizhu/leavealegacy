// enable all page class elements
var pageElements = document.getElementsByClassName('step')
var regularSeasonLogsEl = document.getElementById('lakers-season-logs')

var games = [
  { id: '0021900040', fill: '#FDB927' },
  { id: '0021900054', fill: '#FDB927' },
  { id: '0021900074', fill: '#FDB927' },
  { id: '0021900342', fill: '#FDB927' },
  { id: '0021900390', fill: '#FDB927' },
  { id: '0021900684', fill: '#202125' },
  { id: '0021900948', fill: '#FDB927' }
]

new Waypoint({
  element: pageElements.item(pageElements.length - 1),
  handler: function (direction) {
    if (direction === 'down') {
      regularSeasonLogsEl.classList.remove('fixed')
      regularSeasonLogsEl.classList.add('is-bottom')
    } else {
      regularSeasonLogsEl.classList.add('fixed')
      regularSeasonLogsEl.classList.remove('is-bottom')
    }
  },
  offset: '-50%'
})

for (var i = 0, length = pageElements.length; i < length; i++) {
  new Waypoint({
    element: pageElements.item(i),
    handler: function (direction) {
      var order = +this.element.getAttribute('order')
      if (direction == 'down') {
        this.element.classList.add('text-show')

        // highlight rect
        var rectClass = '.season-log-' + games[order].id
        d3.selectAll(rectClass).style('fill', COLOR.LAKERS_PURPLE_OP)

        var annonationClass = '.annotation-' + order
        d3.selectAll(annonationClass).style('display', 'block')

        if (order != 0) {
          // set back prev
          var prevRectClass = '.season-log-' + games[order - 1].id
          d3.selectAll(prevRectClass).style('fill', games[order - 1].fill)
        }
      } else {
        this.element.classList.remove('text-show')
        // highlight rect
        var rectClass = '.season-log-' + games[order].id
        d3.selectAll(rectClass).style('fill', games[order].fill)
        var annonationClass = '.annotation-' + order
        d3.selectAll(annonationClass).style('display', 'none')
        if (order != 0) {
          // set back prev
          var prevRectClass = '.season-log-' + games[order - 1].id
          d3.selectAll(prevRectClass).style('fill', COLOR.LAKERS_PURPLE_OP)
        }
      }
    },
    offset: "70%"
  })

  new Waypoint({
    element: pageElements.item(i),
    handler: function (direction) {
      var order = +this.element.getAttribute('order')
      if (direction == 'down') {
        this.element.classList.remove('text-show')
        var annonationClass = '.annotation-' + (order)
        d3.selectAll(annonationClass).style('display', 'none')

        if (order === pageElements.length - 1) {
          // regularSeasonLogsEl.classList.remove('fixed')
          // regularSeasonLogsEl.classList.add('is-bottom')

          var rectClass = '.season-log-' + games[order].id
          d3.selectAll(rectClass).style('fill', games[order].fill)
          var annonationClass = '.annotation-' + (order)
          d3.selectAll(annonationClass).style('display', 'none')
        }
      } else {
        this.element.classList.add('text-show')
        var annonationClass = '.annotation-' + (order)
        d3.selectAll(annonationClass).style('display', 'block')
        if (order === pageElements.length - 1) {
          // regularSeasonLogsEl.classList.add('fixed')
          // regularSeasonLogsEl.classList.remove('is-bottom')
          var rectClass = '.season-log-' + games[order].id
          d3.selectAll(rectClass).style('fill', COLOR.LAKERS_PURPLE_OP)
          var annonationClass = '.annotation-' + (order)
          d3.selectAll(annonationClass).style('display', 'block')
        }
      }
    },
    offset: function () {
      var order = +this.element.getAttribute('order')
      if (order === pageElements.length - 1) {
        return -this.element.clientHeight * 0.3
      } else {
        return this.element.clientHeight * 0.2
      }
      // return this.element.clientHeight * 0.25

    }
  })
}

new Waypoint({
  element: regularSeasonLogsEl,
  handler: function (direction) {
    if (direction == 'down') {
      regularSeasonLogsEl.classList.add('fixed')
    } else {
      regularSeasonLogsEl.classList.remove('fixed')
    }
  },
  // offset: 500
})
