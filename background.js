'use strict'

// this will be logged in the background page, not in the html page
const page = chrome.extension.getBackgroundPage()
let selection = []
page.console.log("background script started")

// update check
chrome.runtime.onUpdateAvailable.addListener(function (details) {
    chrome.runtime.reload();
});

function initPage() {
    // read storage to know if the badge should show ON
    // this is needed because popup.js is only loaded when the user opens the popup
    chrome.storage.local.get('selection', function (result) {
        selection = JSON.parse(result.selection)
        updateBadge()
    })

    // content page may ask for storage
    // problem is that selection is not updated when popup changes
    // todo : background should listen to popup and manage selection
    // popup should not manage storage
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.initsettings) {
            sendResponse({ initsettings: selection })
        } else {
            sendResponse({});
        }
    });
}

function updateBadge(){
        if (selection && selection.includes(true)) {
            chrome.browserAction.setBadgeText({ text: 'ON' });
            chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
        } else {
            chrome.browserAction.setBadgeText({ text: '' });
        }
}

// init badge and message listener
initPage()


// content script: added to the html page to replace dom elements - can read storage to know which lists to use
// popup script: opens when user clicks extension icon
// background script : always running when extension is active