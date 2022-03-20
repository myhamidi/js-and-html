function RetStringBetween(text, fromStr, toStr ) {
    /**
     * Returns the String between two  strings.
     * 
     */
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         var idx2 = text.indexOf(toStr, fromIndex = idx1);
         if (idx2 > idx1) {
            return text.substring(idx1+fromStr.length, idx2);}
         }
     return "";
}

function RetStringOutside(text, fromStr, toStr) {
    /**
     * Returns the String except the text between two  strings.
     * 
     */
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         var idx2 = text.indexOf(toStr, fromIndex = idx1);
         if (idx2 > idx1) {
            return text.substring(0, idx1) + text.substring(idx2 + toStr.length);}
         }
     return "";
}

function RetStringHTMLButton(Text, onclickFunction, parameterString) {
    strL1 = '<button onclick="';
    strL2 = onclickFunction+"(";
    strM = '&quot;' + parameterString + '&quot;';  // strM = '"' + parameterString + '"''; does lead to error
    strR = ')">' + Text + '</button>';
    //'<button onclick="myFunction("id")">Click me</button>'; return an error "Unexpectedenfof file due to the double usage of " marks
    //'<button onclick="myFunction(&quot;id&quot;)">Click me</button>' is correct
    return strL1 + strL2 + strM + strR;
}

function RetHTMLremovedBotton(innerHTML) {
    var idx1 = innerHTML.indexOf("<button");
    if (idx1 > -1) {
        var idx2 = innerHTML.indexOf("</button>", fromIndex = idx1);
        var slice = innerHTML.slice(idx1, idx2);
        var ret = innerHTML.replace(new RegExp(slice + "</button>", 'g'), "");
        return ret;
        // 
    }
}

// function RetInnerHTML(divs) {
//      /**
//      * Returns the InnerHTML of the divs. divs must be an HTML Colletion
//      * 
//      */  

//     ret = [];
//     for (i = 0; i < divs.length; i++) {
//         ret[i] = divs[i].innerHTML;
//     }
//     return ret;
// }

function DelInnerHTML(divs) {
    /**
     * Deletes the InnerHTML of the divs. divs must be an HTML Colletion
     * 
     */ 

    for (i = 0; i < divs.length; i++) {
        divs[i].innerHTML = "";
    }
}