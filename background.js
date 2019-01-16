'use strict'

// TODO SET BADGE UPON LOADING

const page = chrome.extension.getBackgroundPage()
page.console.log("background script started")

function initBadge() {
    //page.console.log('reading localstorage');
    chrome.storage.local.get('selection', function (result) {
        let arr = JSON.parse(result.selection)
        if (arr.includes(true)) {
            chrome.browserAction.setBadgeText({ text: 'ON' });
            chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
        } else {
            chrome.browserAction.setBadgeText({ text: '' });
        }
    })

}

initBadge()


// content script: added to the html page to replace dom elements - can read storage to know which lists to use
// popup script: opens when user clicks extension icon
// background script : always running when extension is active