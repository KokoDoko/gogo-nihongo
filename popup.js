'use strict';

console = chrome.extension.getBackgroundPage().console
const checkboxes = document.getElementsByClassName("jlpt")

// ************************************************
//
// checkboxes were changed
//
// ************************************************
function updateSelection() {
    // let boxes = Array.from(checkboxes)
    // let arr = boxes.map(box => box.checked)
    let arr = [] 
    for (let box of checkboxes) {
        arr.push(box.checked)
    }
    // tell background the new selection - background will store and save - and tell main.js to update
    chrome.runtime.sendMessage({ updateselection: JSON.stringify(arr) }, function (response) {
        console.log('popup sent new selection');
    })
}

// ************************************************
//
// set the checkmarks when opening the popup - by reading the user selection
// not sure if this is needed every time the popup opens, or is the form maintained?
//
// ************************************************
function initCheckmarks() {
    // get user selection from background page
    chrome.runtime.sendMessage({ selection: true }, function (response) {
        let s = response.selection
        for (let i = 0; i < s.length; i++) {
            // extra check because there may be more cookies than checkboxes, 
            // since we are changing the csv lists so often
            if(checkboxes[i]) checkboxes[i].checked = s[i]
        }
    })
}

// ************************************************
//
// setup
//
// ************************************************
for (let box of checkboxes) {
    box.addEventListener('change', updateSelection);
}

initCheckmarks()