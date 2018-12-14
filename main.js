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
    let english = " " + w[0] + " "
    let japanese = " " + w[1] + " "
    // TODO CHECK CASE INSENSITIVE new RegExp("\\b(" + w[0] + ")\\b", "gi")   // what is b() ? //
    findAndReplaceDOMText(node, {
      preset: 'prose',
      find: english,
      replace: japanese,
      wrapClass: 'kanji',
      wrap: 'span'
    }) 
  }
}

// ************************************************
//
// start app
//
// ************************************************
function startApp() {
  // url inside chrome extension
  const url = chrome.runtime.getURL("words.csv")

  // url in local debug window
  // console.log("debug html - do not upload")
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