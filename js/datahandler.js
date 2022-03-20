// ##############################################################################################################
// Datahandler:
// <div id="Start" class="datahandler-root">
//  {{url}}
// </div>
//
// will output:
// <div id="Start" class="datahandler-root">
// www.google.de
// www.facebook.de
// </div>
// ##############################################################################################################


// load js files (scripts of js files are loaded with nextfunction call, i. e. main )
var scripts_ = document.getElementsByTagName("script");
var src_ = scripts_[scripts_.length-1].src;
var jsPath_ = X1_RetStringBetween(src_,"file:///", "datahandler.js");
console.log(jsPath_ + "datahandler.js" + " loaded")
X2_loadJS(jsPath_ + "dh-main.js", true);
X2_loadJS(jsPath_ + "dh-basis.js", true);   

//parameters 
var dataRaw_ = Object.assign(data01);  var var_data =  X3_flattenData(dataRaw_);
var datahandler_divs = document.getElementsByClassName("datahandler-root");
var var_divs_inner = X4_RetInnerHTML(datahandler_divs);
var var_divs_Info = []; // to be updated after every reload

function X1_RetStringBetween(text, fromStr, toStr ) {
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         var idx2 = text.indexOf(toStr, fromIndex = idx1);
         return text.substring(idx1+fromStr.length, idx2);}
}

function X2_loadJS(FILE_URL, async = true) {
    let scriptEle = document.createElement("script");
  
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);
  
    document.body.appendChild(scriptEle);
  
    // success event 
    scriptEle.addEventListener("load", () => {
      console.log(FILE_URL + " loaded")
    });
     // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file " + FILE_URL, ev);
    });
  }

function X3_flattenData(dataA = []) {
    var keys = Object.keys(dataA);
    var tmp = [];
    for (let key of keys) {
        var llist = dataA[key]
        for (e of llist) {
            tmp.push(e)
        }
     }
    return tmp;
}

function X4_RetInnerHTML(divs) {
   ret = [];
   for (i = 0; i < divs.length; i++) {
       ret[i] = divs[i].innerHTML;}
   return ret;
}

//on window load:
function main_datahandler() {
    /**
     * main function that needs to be loader on windows load
     */
     var_divs_Info = GetPageInfo(datahandler_divs);
     DelInnerHTML(datahandler_divs);
     DelInfoContent(var_divs_inner);

    for (j = 0; j < datahandler_divs.length; j++) {
        ReplaceDivContent(j, datahandler_divs[j], var_data);}
}