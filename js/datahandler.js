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
var datahandler_divs = document.getElementsByClassName("datahandler-root");

// var var_data = Object.assign(data01); 

//on window load:vvv
function main_datahandler(Identification = "ID") {
    for (j = 0; j < datahandler_divs.length; j++) {
        var dataSubset = [];
        if (Identification == "ID") {
            if (Object.keys(var_data).includes(datahandler_divs[j].id)){
                dataSubset = var_data[datahandler_divs[j].id]}
            else {continue} // when div id (of class datahandler) was not found in data
            }
        if (Identification == "Global") {
            dataSubset = flattenData(var_data)}
        
        if (datahandler_divs[j].classList.contains("dh-table")) {
            main_datahandler_table(datahandler_divs[j], dataSubset);} 
        else {
            // ReplaceDivContent(j, dataSubset);}
            ReplaceDivContent(datahandler_divs[j], dataSubset)}
        }
}

function RetDataSubSet(id = "") {
    /**
     * Returns data subset that is allocated to the id. If id="" then all data is returned
     * If id does not match to key in data then [] is returned.
     */
     var dataSubset = [];
     if (id == ""){
        dataSubset = flattenData(var_data)} 
     else {
        if (Object.keys(var_data).includes(id)){
            dataSubset = var_data[id]}
     }
     return dataSubset;
    }

function ReplaceDivContent(_div, dataSubset) {
    /**
     * Replaces div element with data Array. When no Tags are defined in html then all data is placed in html
     * 
     * _div: div element where Replacement will happen
     * dataSubset: Array of data that is used for replacement
     */
    var div_tags = getTagsfromClass(_div.classList);
    var fragment = ''; var i;
    
    if (div_tags.length == 0){
        for (i = 0; i < dataSubset.length; i++){
            fragment += RetTextReplacedWithData(_div,dataSubset[i]);}
    }
    else{
        for (i = 0; i < dataSubset.length; i++) {
            if (dataSubset[i]["Tags"] == undefined) {continue}
            if (IsCorrectTagLogic(dataSubset[i]["Tags"],div_tags)) {
                fragment += RetTextReplacedWithData(_div,dataSubset[i]);}
        }
    }   
    _div.innerHTML = fragment;
};

function GetSumInfo(_divInnerHTML) {
    suminfo = {}; text = _divInnerHTML;
    var idx1 = text.indexOf("{sum:{");
    var idx2 = text.indexOf("}:", fromIndex = idx1);
    suminfo.key = text.substring(idx1+6, idx2);
    suminfo.colStr = text.substring(idx2+2, idx2+4);
    return suminfo;
};

function main_datahandler_table(_div, dataSubset) {
    //j = nth_div;
    var div_tags = getTagsfromClass(_div.classList);
    var fragment = '';
    var numbering = false;

    // look for sum, remember and remove
    if (_div.innerHTML.includes("{sum:")) {
        suminfo = GetSumInfo(_div.innerHTML);
        _div.innerHTML = _div.innerHTML.replace(new RegExp("{sum:{"+suminfo.key+"}"+":"+suminfo.colStr+"}", 'g'), "")}

    //look for num, remember and remove
    if (_div.innerHTML.includes("{num}")) {
        numbering = true;}
        //_div.innerHTML = _div.innerHTML.replace(new RegExp("{num}", 'g'), "")}

    //identify relevant data subset
    var datasubset_valid = []
    for (i = 0; i < dataSubset.length; i++) {
        if (dataSubset[i]["Tags"] == undefined) {continue}
        if (IsCorrectTagLogic(dataSubset[i]["Tags"],div_tags)) {
            datasubset_valid.push(dataSubset[i])}
    }

    // build inner html fragment (and calculate sum if applicable)
    var sum = 0
    var nth_row = 0
    for (i = 0; i < datasubset_valid.length; i++) {
            if (numbering) {nth_row = i+1}
            fragment += ReplaceWithData_table(_div,datasubset_valid[i], nth_row);
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

function RetTextReplacedWithData (div, data) {
    /**
    * Returns text with data replacement, dependent on div classes
    * 
    * text: text that contains replacement pre- and postfix with keys that will be replaced by data
    * data data in form of a dictionary
    * AsTable: if true, return the data in form of table colums (to be inserted in one table row)
    */
    var ret = "";
    if (div.classList.contains("datahandler-table")){
        ret = ReplaceTextWithDictionary(div.innerHTML, data, AsTable=True)}
    else {
        ret = ReplaceTextWithDictionary(div.innerHTML, data)}
    return ret;
};

// Unit Test
function ReplaceTextWithDictionary(text, data, AsTable = false, prefix = "{{", postfix = "}}") {
    /**
     * Returns text with data replacement
     * 
     * text: text that contains replacement pre- and postfix with keys that will be replaced by data
     * data data in form of a dictionary
     * AsTable: if true, return the data in form of table colums (to be inserted in one table row)
     */
    keys = Object.getOwnPropertyNames(data);
    var ret = text;
    for (i = 0; i <keys.length; i++) {
        if (AsTable) {            
            ret = ret.replace(new RegExp(prefix + keys[i] + postfix, 'g'), "<td>"+data[keys[i]]+"</td>");}
        else {
            ret = ret.replace(new RegExp(prefix + keys[i] + postfix, 'g'), data[keys[i]]);}
    }
    return ret;
}

function ReplaceWithData_table (div, data, numbering) {
    keys = Object.getOwnPropertyNames(data)
    var div_innerHTML = div.innerHTML

    //For each Data Item Key,
    for (k = 0; k < keys.length; k++) {
        //Replace {{}} statement with corresponding data Property
        div_innerHTML = div_innerHTML.replace(new RegExp("{{" + keys[k] + "}}", 'g'), data[keys[k]]);
        if (numbering>0){
            div_innerHTML = div_innerHTML.replace(new RegExp("{num}", 'g'),numbering);}
    }
    div_innerHTML = div_innerHTML.replace(new RegExp("{/col}", 'g'), "</td>")
    div_innerHTML = div_innerHTML.replace(new RegExp("{col}", 'g'), "<td>")
    div_innerHTML = div_innerHTML.replace(new RegExp("{/row}", 'g'), "</tr>")
    div_innerHTML = div_innerHTML.replace(new RegExp("{row}", 'g'), "<tr>")
    
    return div_innerHTML;
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
