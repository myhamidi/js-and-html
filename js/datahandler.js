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
var jsPath_ = RetStringBetween(src_,"file:///", "datahandler.js");
console.log(jsPath_ + "datahandler.js" + " loaded")
loadJS(jsPath_ + "GetGlobal.js", true);
loadJS(jsPath_ + "Basis.js", true);   

//parameters 
var dataRaw_ = Object.assign(data01);  var var_data =  flattenData(dataRaw_);
var datahandler_divs = document.getElementsByClassName("datahandler-root");
var var_divs_inner = RetInnerHTML(datahandler_divs);
var var_divs_Info = []; // to be updated after every reload

function RetStringBetween(text, fromStr, toStr ) {
    /**
     * Returns the String between two  strings.
     * 
     */
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         var idx2 = text.indexOf(toStr, fromIndex = idx1);
         return text.substring(idx1+fromStr.length, idx2);
     }
}

function loadJS(FILE_URL, async = true) {
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

function RetInnerHTML(divs) {
    /**
    * Returns the InnerHTML of the divs. divs must be an HTML Colletion
    * 
    */  

   ret = [];
   for (i = 0; i < divs.length; i++) {
       ret[i] = divs[i].innerHTML;
   }
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


function ReplaceDivContent(nth_div, _div, dataF) {
    /**
     * Replaces div element with data array based on the tags defined in the html div. 
     * When no Tags are defined in html then all data is placed in html
     * 
     */
    var div_tags = getTagsfromClass(_div.classList);
    var dataF_valid = RetValidData(dataF, div_tags);
    var LoadSize = getLoadSize(_div.classList,dataF_valid.length);
    var DivInfo = var_divs_Info[nth_div];
    var fragment = ''; var i;
    
    var sum = 0; // optional, if sum shall be counted
    var nthCall = 0;  // optional, if items shall be numbered
    var ubound = Math.min(DivInfo.LoadedItems + LoadSize, dataF_valid.length) ; 

    for (i = 0; i < ubound; i++) {
        if (DivInfo.Numbering) {
            nthCall = i+1}
        if (DivInfo.SumKey != "") {
            sum += dataF_valid[i][DivInfo.SumKey]}
        fragment += RetTextReplacedWithData(var_divs_inner[nth_div], _div,dataF_valid[i],nthCall)}
    
    // Add Sum Row (optional)   
    if (DivInfo.SumKey != "") {
        num_cols = var_divs_inner[nth_div].split("{col}").length - 1;
        insert_col = parseInt(DivInfo.SumcolStr)-1; // repeat n-1 times
        fragment += "<tr>" + "<td></td>".repeat(insert_col) + "<td><b>" + sum + "</b></td>" + "<td></td>".repeat(num_cols - insert_col - 1) + "</tr>" 
    }
    
    // Add Button (optional)
    if (dataF_valid.length>ubound) {
        fragment += "<br>" + RetStringHTMLButton("Next (Showing " + String(ubound) + " of " + String(dataF_valid.length) + ")", "myFunction", _div.id); 
    }

    // Make table Klammer (optional)
    if (_div.classList.contains("dh-table")) {
        fragment  = "<table>" + fragment + "</table>";}
    
    // Add comment with number loaded itmes
    fragment += ReturnAsComment("Loaded Items:" + String(ubound) + "!")

    // Apply to div
    _div.innerHTML = fragment;
};


function RetAnzahlLoadedItems(div) {
    comments = GetComments(div.innerHTML);
    for (var i = 0; i<comments.length; i++)
        {
            if (comments[i].startsWith("Loaded Items:")) {
                var retStr = RetStringBetween(comments[i], "Loaded Items:","!");
                return parseInt(retStr);
            }
        }
    return 0;
}

function RetValidData(_data, div_tags) {
    /**
    * Returns the subset of data elements based on the tags defined in the html div
    * 
    */
    var dataF_valid = [];
    if (div_tags.length == 0){
        for (i = 0; i < _data.length; i++){
            dataF_valid.push(_data[i]);}
    }
    if (div_tags.length > 0){
        for (i = 0; i < _data.length; i++) {
            if (_data[i]["Tags"] == undefined) {continue}
            if (IsCorrectTagLogic(_data[i]["Tags"],div_tags)) {
                dataF_valid.push(_data[i]);}
        }
    }
    return dataF_valid;
};

function GetPageInfo(divs) {
    /**
    * Returns infos to each div of page as list of infos
    * 
    */
    ret = [];

    for (i=0;i<divs.length;i++) {
        info = {
            "Type": "List",
            "LoadedItems": 0, // Number of data items currently loaded in the div
            "SumKey": "", // If table with sum was used, sumkey is the key that shall be summed up at the end of table
            "SumcolStr": "", //
            "PageInfo.Numbering": false}; 
        // Type
        if (divs[i].classList.contains("dh-table")) {
            info.Type = "Table";
        }
        // Number Loaded Items
        info.LoadedItems = RetAnzahlLoadedItems(divs[i]);
        
        // Numbering of items
        if (var_divs_inner[i].includes("{num}")) {
            info.Numbering = true;}

        // Table Specific
        if (info.Type == "Table") {
            var idx1 = var_divs_inner[i].indexOf("{Xsum:{");
            if (idx1 > 0) {
                var idx2 = var_divs_inner[i].indexOf("}:", fromIndex = idx1);
                info.SumKey = var_divs_inner[i].substring(idx1+7, idx2);
                info.SumcolStr = var_divs_inner[i].substring(idx2+2, idx2+4);}
        }
        ret.push(info); 
    }
    return ret;
};

function DelInfoContent(divs) { // divs is global and technically not needed. parameter for better readability where sth is deleted
    // Delete Info specificcontent
    for (i=0;i<divs.length;i++) {
        if (var_divs_Info[i].Type == "Table") {
            divs[i] = divs[i].replace(new RegExp("{Xsum:{"+var_divs_Info[i].SumKey+"}"+":"+var_divs_Info[i].SumcolStr+"}", 'g'), "");}
        }
    a=1;
}

function RetTextReplacedWithData (divInner, div, dataElement, numbering) {
    /**
    * Returns text with dataElement replacement, dependent on div classes
    * 
    * text: text that contains replacement pre- and postfix with keys that will be replaced by dataElement
    * dataElement: data in form of a dictionary
    * AsTable: if true, return the data in form of table colums (to be inserted in one table row)
    */
    var ret = "";
    if (div.classList.contains("dh-table")){
        // ret = ReplaceTextWithDictionary(div.innerHTML, dataElement, AsTable=True)}
        ret = ReplaceWithData_table(divInner, dataElement, numbering)}
    else {
        ret = ReplaceTextWithDictionary(divInner, dataElement, numbering)}
    return ret;
};

// Unit Test
function ReplaceTextWithDictionary(text, dataElement, numbering, AsTable = false, prefix = "{{", postfix = "}}") {
    /**
     * Returns text with data replacement
     * 
     * text: text that contains replacement pre- and postfix with keys that will be replaced by dataElement
     * dataElement: data in form of a dictionary
     * AsTable: if true, return the data in form of table colums (to be inserted in one table row)
     */
    keys = Object.getOwnPropertyNames(dataElement);
    var ret = text;
    for (i = 0; i <keys.length; i++) {
        if (AsTable) {            
            ret = ret.replace(new RegExp(prefix + keys[i] + postfix, 'g'), "<td>"+dataElement[keys[i]]+"</td>");}
        else {
            ret = ret.replace(new RegExp(prefix + keys[i] + postfix, 'g'), dataElement[keys[i]]);
            ret = ret.replace(new RegExp("{num}", 'g'), numbering);}
    }
    return ret;
}


function ReplaceWithData_table (text, data, numbering, prefix = "{{", postfix = "}}") {
    keys = Object.getOwnPropertyNames(data)
    // var div_innerHTML = div.innerHTML

    //For each Data Item Key,
    for (k = 0; k < keys.length; k++) {
        //Replace {{}} statement with corresponding data Property
        text = text.replace(new RegExp(prefix + keys[k] + postfix, 'g'), data[keys[k]]);
        if (numbering>0){
            text = text.replace(new RegExp("{num}", 'g'),numbering);}
    }
    text = text.replace(new RegExp("{/col}", 'g'), "</td>")
    text = text.replace(new RegExp("{col}", 'g'), "<td>")
    text = text.replace(new RegExp("{/row}", 'g'), "</tr>")
    text = text.replace(new RegExp("{row}", 'g'), "<tr>")
    
    return text;
}

function getDOM_Prpperties(DOM_objects, DOM_Property) {
    var array = []
    for (var i = 0; i < DOM_objects.length; i++) {
        array.push(DOM_objects[i][DOM_Property])
    }
    return array;
};

function getTagsfromClass(classlist) {
    /**
     * Returns the tags as list defiend in the divs class property.
     * 
     */
    var Tag_list = [];
    for (var i = 0;i< classlist.length;i++) {
        if (classlist[i].includes("[")) {
            Tag_list.push(classlist[i].replace("[","").replace("]",""));
        }
    }
    return Tag_list;
};

function getLoadSize(classlist, substituteValue) {
    /**
     * Returns LoadSize based onclass definition(dh-20). If no definition was done, returns substituteValue
     * 
     */
    for (var i = 0;i< classlist.length;i++) {
        if (classlist[i].startsWith("dh-Load")) {
            var ret = classlist[i].replace("dh-Load","");
            return parseInt(ret)
        }
    }
    return substituteValue;
};

function IsCorrectTagLogic(Tags_Dataelement, Tags_div) {
    if (Tags_div.length == 0) {return true}
    Taglist_OR = ReturnSubsetWithPrefix(Tags_div, "AND_", true, true)
    Taglist_AND = ReturnSubsetWithPrefix(Tags_div, "AND_")
    
    for (var i = 0;i<Taglist_AND.length;i++) {
        Taglist_AND[i] = Taglist_AND[i].replace(new RegExp("AND_", 'g'), "")
        if (!Tags_Dataelement.includes(Taglist_AND[i])) {
            return false;}
    }
    for (var i = 0;i<Tags_Dataelement.length;i++) {
        for (var j = 0;j<Taglist_OR.length;j++) {
            if (Tags_Dataelement[i] == Taglist_OR[j]) {
                return true;}           
        }
    }
    return false;
}

// Unit Tests
function ReturnSubsetWithPrefix(array, prefix = "", removePrefix = true, flip = false){
    var tmp = []; var tmp_flip = []
    for (var i = 0; i<array.length;i++){
        if (array[i].startsWith(prefix)){
            if (removePrefix) {
                tmp.push(array[i].replace(new RegExp(prefix, 'g'), ""))}
            else {
                tmp.push(array[i])}
            } 
        else {
            tmp_flip.push(array[i])}
        }
    if (flip) {
        return tmp_flip}
    else {
        return tmp}
}

function flattenData(dataA = []) {
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

function ReturnAsComment(text) {
    return "<!--" + text + "-->"
}

function GetComments(text) {
    var CommentList = []; var comment = ""; var idx1 = 0; var idx2 = 0;
    
    for (var i= 0;i<100;i++) {
        idx1 = text.indexOf("<!--");
        if (idx1 > 0) {
            idx2 = text.indexOf("-->", fromIndex = idx1);
            comment = text.substring(idx1+4, idx2)
            CommentList.push(comment);
            text = text.replace(new RegExp("<!--" + comment + "-->", 'g'), "")}
    }
    return CommentList;

}


  
 

  // var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));