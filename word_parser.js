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

function handleText(textNode) {
  let v = textNode.nodeValue

  for (let w of words) {
	  var regex = new RegExp("\\b(" + w[0] + ")\\b", "gi")
	  v = v.replace(regex, w[1])
  }

  textNode.nodeValue = v
}


walk(document.body)