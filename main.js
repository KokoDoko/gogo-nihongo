let selection = []

// ************************************************
//
// start app
//
// ************************************************
function startApp() {
    // listen for changes in the user settings
    chrome.runtime.onMessage.addListener(function (request) {
        if(request.selection) {
            selection = JSON.parse(request.selection)
            // now reload the page because we can't change back the DOM to how it was before
            // reloading should re-trigger loadCSVfile !!!
            window.location.reload()
        }
    })
     
    // we have to ask the current selection from the background js script
    chrome.runtime.sendMessage({ selection: true }, function (response) {
        console.log('Starting Kanji Buddy with this selection:')
        console.log(response.selection);
        selection = response.selection
        loadCSVfile()
    });
}

// ************************************************
//
// load CSV file and parse it using the papaparse library
//
// ************************************************
function loadCSVfile(){
    const url = chrome.runtime.getURL("words.csv")

    Papa.parse(url, {
        download: true,
        skipEmptyLines: true,
        complete: buildWordLists
    })
}

// ************************************************
//
// build a word list for each header, all words are in one csv file
//
// ************************************************
function buildWordLists(obj) {
    let data = obj.data
    // remove first header (english, kanji, kana, notes)
    data.shift()
    
    // each row in the csv with one word (ex. jlpt5) is a word list
    // if the current selection for a list is true, add those words to the array
    let words = []
    let list = -1
    for (let row of data) {
        if (row.length == 1) {
            // a header means this is a new list
            list++
        } else {
            // if a list is part of the selection, add the word to the words list
            // example: List variable can be 0,1,2 Selection array can be 0,0,1 This means words of list 2 are used
            if(selection[list] == true){
                words.push(row)
            }
        }
    }
    console.log("Created all words")
    console.log(words)
    parseDomContent(words)
}

// ************************************************
//
// check if this word is in the CSV file and replace it with the kanji
// options: https://github.com/padolsey/findAndReplaceDOMText
//
// ************************************************
function parseDomContent(words) {
    let node = document.getElementsByTagName("body")[0]
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

startApp()


  // not used: the url when debugging javascript without the extension
  // const url = "./gogo-nihongo/words.csv"

  // this can be used to send messages from the dom page to the extension
  //console.log("sending to runtime")
  //chrome.runtime.sendMessage({ greeting: "hello" })