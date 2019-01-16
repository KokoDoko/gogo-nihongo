let lists = []
let selection = [true, true, true]

// ************************************************
//
// start app
//
// ************************************************
function startApp() {
    console.log("loading word list")

    // listen for changes in the user settings
    chrome.runtime.onMessage.addListener(function (request) {
        if(request.selection) {
            selection = JSON.parse(request.selection)
            console.log("updated selection")
            console.log(selection)
            // now reload the page because we can't change back words
            window.location.reload()
        }
    })

    // we have to ask the current selection from the background js script
    chrome.runtime.sendMessage({ initsettings: true }, function (response) {
        console.log('received start settings => ' + response.initsettings);
        selection = response.initsettings
        loadCSVfile()
    });

}

function loadCSVfile(){
    // get url for chrome extension asset
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
    // remove first header
    data.shift()
    // make separate array for each header row. each set of rows needs one header row with one cell in it (jlpt4)
    for (let row of data) {
        if (row.length == 1) {
            lists.push([])
        } else if(lists.length > 0) {
            lists[lists.length-1].push(row)
        }
    }
    console.log(lists)
    parseDomContent()
}

// ************************************************
//
// check if this word is in the CSV file and replace it with the kanji
// options: https://github.com/padolsey/findAndReplaceDOMText
//
// ************************************************
function parseDomContent() {
    let node = document.getElementsByTagName("body")[0]
    // add the user-selected lists to words
    let words = []
    for(let i = 0; i < selection.length; i++) {
        if(selection[i] && lists[i]) {
            words = words.concat(lists[i])
        }
    }
    console.log("Created all words")
    console.log(words)
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