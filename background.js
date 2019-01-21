'use strict'

let selection = [false, false]
console.log("starting background page")
// ************************************************
//
// init page by setting listeners and reading local storage to know the user selection
//
// ************************************************
function initPage() {
    chrome.runtime.onUpdateAvailable.addListener(function (details) {
        chrome.runtime.reload();
    });

    // popup or mainjs want to know what the current selection is
    // this returns an array so popup or main don't have to parse json
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.selection) {
            sendResponse({ selection: selection })
        } else if (request.updateselection) {
            let s = JSON.parse(request.updateselection)
            saveSelections(s)
        }
    })

    chrome.storage.local.get('selection', function (result) {
        if(result.selection && result.selection != "false") {
            let s = JSON.parse(result.selection)
            console.log("cookie contains")
            console.log(s)
            if(s.length && s.length > 0 && s.length < 3) { // exact amount of checkmarks, otherwise reset all to false
                selection = s
            } else {
                selection = [false,false]
            }
        } else {
            selection = [false,false]
        }
        updateBadge()
    })
}

// ************************************************
//
// popup can update selections
// update temp var, save to storage, and tell main.js to reload the DOM
//
// ************************************************
function saveSelections(s) {
    // update temporary variable
    selection = s
    // save preferences to local storage. saved when the browser is closed
    chrome.storage.local.set({ 'selection': JSON.stringify(s) }, function () {
        // send updated list to all tabs - so main.js can run again
        chrome.tabs.query({ active: true }, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, { selection: JSON.stringify(s) });
            }
        })
    })
    updateBadge()
}

// ************************************************
//
// update the chrome extension badge - todo disable extension when no selection!
//
// ************************************************
function updateBadge() {
    if (selection && selection.includes(true)) {
        chrome.browserAction.setBadgeText({ text: 'ON' });
        chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
    } else {
        chrome.browserAction.setBadgeText({ text: '' });
    }
}

function clearStorage() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        console.log("Cookies cleared!!")
    });
}
// ************************************************
//
// init badge and listeners
//
// ************************************************
initPage()


// content script: added to the html page to replace dom elements - has no access to extension storage - use messaging
// popup script: opens when user clicks extension icon - user can set word list selection
// background script : always running when extension is active - stores data and remembers selection