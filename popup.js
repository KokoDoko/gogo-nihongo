'use strict';

//
// popup and background logs appear in the generated background page, view logs via extensions > background page
//
// const page = chrome.extension.getBackgroundPage()
const selections = document.getElementsByClassName("jlpt")

//
// save preferences
//
function saveSelections() {
    // create the array of checked boxes
    let arr = [] 
    for (let s of selections) {
        arr.push(s.checked)
    }
    // save preferences
    chrome.storage.local.set({ 'selection': JSON.stringify(arr) }, function () {
        // send updated list to main.js after storage is saved
        chrome.tabs.query({ active: true }, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                //page.console.log("sending to " + tabs[i].id)
                chrome.tabs.sendMessage(tabs[i].id, { selection: JSON.stringify(arr) });
            }
        })
    })

    // show an icon badge if one or more checks is set
    if (arr.includes(true)) {
        chrome.browserAction.setBadgeText({ text: 'ON' });
        chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
    } else {
        chrome.browserAction.setBadgeText({ text: '' });
    }
}

//
// read preferences
// todo background should manage storage and badge text
// background should have selection variable that is updated and also stored
// popup window should only send messages to background js
//
function readSelections() {
    //page.console.log('reading localstorage');
    chrome.storage.local.get('selection', function (result) {
        let arr = JSON.parse(result.selection)
 
        for (let i = 0; i < arr.length; i++) {
            selections[i].checked = arr[i]
        }

        // show an icon badge if one or more checks is set
        if (arr.includes(true)) {
            chrome.browserAction.setBadgeText({ text: 'ON' });
            chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
        } else {
            chrome.browserAction.setBadgeText({ text: '' });
        }
    })
}

//
// setup
//
for (let s of selections) {
    s.addEventListener('change', saveSelections);
}


readSelections()