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

    // let regexp = /\b(w[0])\b/ig  // word boundary, global, case insensitive
    let regexp = new RegExp("\\b(" + english + ")\\b", "gi")   // word boundary, global, case insensitive
    let optionalkana = w[2]
    findAndReplaceDOMText(node, {
      preset: 'prose',
      find: regexp,
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
  const url = chrome.runtime.getURL("words.csv")
  
  // get url when debugging html
  // const url = "./gogo-nihongo/words.csv"

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