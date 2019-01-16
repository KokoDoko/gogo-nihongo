'use strict';

//
// popup and background logs appear in the generated background page, view logs via extensions > background page
//
// const page = chrome.extension.getBackgroundPage()
const selections = document.getElementsByClassName("jlpt")

//
// save preferences
//
function saveSelections(){
  let arr = [] // todo use .map() to create the array of selected items
  for (let s of selections) {
    arr.push(s.checked)
  }
  // save preferences
  chrome.storage.local.set({ 'selection': JSON.stringify(arr) }, function(){
    //page.console.log("saved")
  })

  // show an icon badge if one or more checks is set
  if (arr.includes(true)){
    chrome.browserAction.setBadgeText({ text: 'ON' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#006600' });
  } else {
    chrome.browserAction.setBadgeText({ text: '' });
  }

  // send updated list to main.js
  chrome.tabs.query({active: true}, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      //page.console.log("sending to " + tabs[i].id)
      chrome.tabs.sendMessage(tabs[i].id, { selection: JSON.stringify(arr)}); // kan je arr sturen???
    }
  })
  
  // closes the popup window.close();
}

//
// read preferences
//
function readSelections() {
  //page.console.log('reading localstorage');
  chrome.storage.local.get('selection', function (result) {
    let arr = JSON.parse(result.selection)
    for (let i = 0; i<arr.length; i++) {
      selections[i].checked = arr[i]
    }
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
// setup
//
for (let s of selections) {
  s.addEventListener('change', saveSelections);
}


readSelections()