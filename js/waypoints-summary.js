var regularSeasonSummarySectionEl = document.getElementsByClassName("regular-season-summary-section").item(0)
var regularSeasonSummaryGraphContainerEl = document.getElementsByClassName("regular-season-summary-graph-container").item(0)


new Waypoint({
  element: regularSeasonSummarySectionEl,
  handler: function (direction) {
    if (direction == 'down') {
      regularSeasonSummaryGraphContainerEl.classList.add('is-fixed')

    } else {
      regularSeasonSummaryGraphContainerEl.classList.remove('is-fixed')
    }
  }
})