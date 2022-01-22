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


//parameters
var var_data = Object.assign(data01);  // data link in html file
var dataSubset =  flattenData(var_data);
var datahandler_divs = document.getElementsByClassName("datahandler-root");

//on window load:
function main_datahandler(Identification = "Global") {
    for (j = 0; j < datahandler_divs.length; j++) {
        
        ReplaceDivContent(datahandler_divs[j], dataSubset);

        // if (datahandler_divs[j].classList.contains("dh-table")) {
        //     main_datahandler_table(datahandler_divs[j], dataSubset);} 
        // else {
        //     // ReplaceDivContent(j, dataSubset);}
        //     ReplaceDivContent(datahandler_divs[j], dataSubset)}
    }
}

// function RetDataSubSet(Identification = "ID") {
//     /**
//      * Returns data subset that is allocated to the id. If Identification ="" then all data is returned
//      * If Identification  does not match to key in data then [] is returned.
//      */
//     var dataSubset = [];
//     if (Identification == "Global") {
//         dataSubset = flattenData(var_data)}
//     if (Identification == "ID") {
//         keys = Object.keys(var_data);
//         for (k = 0; k<keys.length; k++) {
//             if (datahandler_divs[j].id == keys[k]) {
//                 dataSubset = var_data[keys[k]]}
//         }
//     }
//      return dataSubset;
// }

function ReplaceDivContent(_div, dataSubset) {
    /**
     * Replaces div element with data Array. When no Tags are defined in html then all data is placed in html
     * 
     * _div: div element where Replacement will happen
     * dataSubset: Array of data that is used for replacement
     */
    var div_tags = getTagsfromClass(_div.classList);
    var fragment = ''; var i;
    
    // if (_div.classList.contains("dh-table")) {
        var suminfo = GetSumInfo(_div.innerHTML);
        var numbering = false;
        if (_div.innerHTML.includes("{num}")) {
            numbering = true;}
        // delete
        _div.innerHTML = _div.innerHTML.replace(new RegExp("{sum:{"+suminfo.key+"}"+":"+suminfo.colStr+"}", 'g'), "")
    // } 

    var datasubset_valid = [];
    if (div_tags.length == 0){
        for (i = 0; i < dataSubset.length; i++){
            datasubset_valid.push(dataSubset[i]);}
            // fragment += RetTextReplacedWithData(_div,dataSubset[i]);}
    }
    if (div_tags.length > 0){
        for (i = 0; i < dataSubset.length; i++) {
            if (dataSubset[i]["Tags"] == undefined) {continue}
            if (IsCorrectTagLogic(dataSubset[i]["Tags"],div_tags)) {
                datasubset_valid.push(dataSubset[i]);}
        }
    }

    var sum = 0;
    var nthCall = 0; 
    for (i = 0; i < datasubset_valid.length; i++) {
        if (numbering) {nthCall = i+1}
        if (suminfo.key != "") {sum += datasubset_valid[i][suminfo.key]}

        fragment += RetTextReplacedWithData(_div,datasubset_valid[i],nthCall)}

    if (suminfo.key != "") {
        num_cols = _div.innerHTML.split("{col}").length - 1;
        insert_col = parseInt(suminfo.colStr)-1; // repeat n-1 times
        fragment += "<tr>" + "<td></td>".repeat(insert_col) + "<td><b>" + sum + "</b></td>" + "<td></td>".repeat(num_cols - insert_col - 1) + "</tr>" 
    }

    if (_div.classList.contains("dh-table")) {
        _div.innerHTML  = "<table>" + fragment + "</table>";}
        else {_div.innerHTML = fragment;}
    
};

function GetSumInfo(_divInnerHTML) {
    suminfo = {"key": "", "colStr": ""}; text = _divInnerHTML;
    var idx1 = text.indexOf("{sum:{");
    var idx2 = text.indexOf("}:", fromIndex = idx1);
    suminfo.key = text.substring(idx1+6, idx2);
    suminfo.colStr = text.substring(idx2+2, idx2+4);
    return suminfo;
};

function main_datahandler_table(_div, dataSubset) {
    //j = nth_div;
    var div_tags = getTagsfromClass(_div.classList);
    var fragment = ''; var i;
    
    if (_div.classList.contains("dh-table")) {
        var suminfo = GetSumInfo(_div.innerHTML);
        var numbering = false;
        if (_div.innerHTML.includes("{num}")) {
            numbering = true;}
        // delete
        _div.innerHTML = _div.innerHTML.replace(new RegExp("{sum:{"+suminfo.key+"}"+":"+suminfo.colStr+"}", 'g'), "")
    } 
    
    //identify relevant data subset
    var datasubset_valid = []
    for (i = 0; i < dataSubset.length; i++) {
        if (dataSubset[i]["Tags"] == undefined) {continue}
        if (IsCorrectTagLogic(dataSubset[i]["Tags"],div_tags)) {
            datasubset_valid.push(dataSubset[i])}
    }

    // build inner html fragment (and calculate sum if applicable)
    var sum = 0;
    var nth_row = 0;
    for (i = 0; i < datasubset_valid.length; i++) {
            if (numbering) {nth_row = i+1}
            fragment += ReplaceWithData_table(_div.innerHTML,datasubset_valid[i], nth_row);
            // fragment += ReplaceWithData_table(_div,datasubset_valid[i], nth_row);
            if (suminfo.key != "") {
                // get sum from data
                sum += datasubset_valid[i][suminfo.key]}
        }

    // if applicable, create sum row
    if (suminfo.key != "") {
        num_cols = _div.innerHTML.split("{col}").length - 1;
        insert_col = parseInt(suminfo.colStr)-1; // repeat n-1 times
        fragment += "<tr>" + "<td></td>".repeat(insert_col) + "<td><b>" + sum + "</b></td>" + "<td></td>".repeat(num_cols - insert_col - 1) + "</tr>" 
    }

    _div.innerHTML  = "<table>" + fragment + "</table>"

};

function RetTextReplacedWithData (div, dataElement, numbering) {
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
        ret = ReplaceWithData_table(div.innerHTML, dataElement, numbering)}
    else {
        ret = ReplaceTextWithDictionary(div.innerHTML, dataElement)}
    return ret;
};

// Unit Test
function ReplaceTextWithDictionary(text, dataElement, AsTable = false, prefix = "{{", postfix = "}}") {
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
            ret = ret.replace(new RegExp(prefix + keys[i] + postfix, 'g'), dataElement[keys[i]]);}
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

//Unit Test
function getTagsfromClass(classlist) {
    var Tag_list = [];
    for (var i = 0;i< classlist.length;i++) {
        if (classlist[i].includes("[")) {
            Tag_list.push(classlist[i].replace("[","").replace("]",""));
        }
    }
    return Tag_list;
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

//Unit Test
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
