// with valid title and author text
function testDisplayWithProperTitleTextAndAuthorText(titleText, authorText) {
    expect(displayText(titleText, authorText)).toBe(titleText + " " + authorText)
}

function testDisplayWithImproperTitleTextAndAuthorText(titleText, authorText) {

}

// tests the schedule creation function based on hard coded pages and days
// and makes sure that each day has the correct number of pages, and does not overflow
function testCreateSchedule() {
    var numPages = 312
    var numDays = 4
    expect(createSchedule(numPages, numDays)).toBe([[1, 1, 78], [2, 79, 156], [3, 157, 234], [4, 235, 312]])
}