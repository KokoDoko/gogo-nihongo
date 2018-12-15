let words = []

// ************************************************
//
// check if this word is in the CSV file and replace it with the kanji
// options: https://github.com/padolsey/findAndReplaceDOMText
//
// ************************************************
function handleText(node) {
  // rows in the CSV
  for (let w of words) {
    let english = w[0]
    let japanese = w[1]
    // TODO CHECK CASE INSENSITIVE new RegExp("\\b(" + w[0] + ")\\b", "gi")   // what is b() ? //
    let optionalkana = w[2]
    findAndReplaceDOMText(node, {
      preset: 'prose',
      find: english,
      replace: japanese,
      wrapClass: 'kanji',
      wrap: 'span',
      dataTooltip: w[0]
    }) 
  }
}

// ************************************************
//
// start app
//
// ************************************************
function startApp() {
  // get url for chrome extension asset
  const url = (DEBUGKANJI) ? "./gogo-nihongo/words.csv" : chrome.runtime.getURL("words.csv")
  

  Papa.parse(url, {
    download: true,
    skipEmptyLines: true,
    complete: showResults
  })
}

function showResults(obj) {
  words = obj.data
  words.shift()
  let body = document.getElementsByTagName("body")[0]
  handleText(body)
}

startApp()