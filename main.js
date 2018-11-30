let words = []

// ************************************************
//
// go through the DOM to find text nodes
//
// ************************************************
function walk(node) 
{
	let child, next
	
	if (node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
		|| node.tagName.toLowerCase() == 'script' || node.tagName.toLowerCase() == 'style')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild
			
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child)
				child = next
			}
			break;

		case 3: // Text node
			handleText(node)
			break
	}
}

// ************************************************
//
// check if this word is in the CSV file and replace it with the kanji
//
// ************************************************
function handleText(textNode) {
	let v = textNode.nodeValue

	for (let w of words) {
		var regex = new RegExp("\\b(" + w[0] + ")\\b", "gi");

		v = v.replace(regex, w[1]);
	}

	// TODO hover mouse to see original word / kana

	textNode.nodeValue = v
}

// ************************************************
//
// start app
//
// ************************************************
function startApp(){
	// url inside chrome extension
	const url = chrome.runtime.getURL("words.csv")
	//console.log(url)

	Papa.parse(url, {
		download: true,
		skipEmptyLines: true,
		complete: showResults
	})
}

function showResults(obj) {
	words = obj.data
	words.shift()

	walk(document.body)
}

startApp()