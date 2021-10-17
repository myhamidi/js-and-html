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
var var_data = Object.assign(data01);  // data link
var datahandler_divs = document.getElementsByClassName("datahandler-root");

// var var_data = Object.assign(data01); 

//on window load:
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
            main_datahandler_table(j, dataSubset);} 
        else {
            // ReplaceDivContent(j, dataSubset);}
            ReplaceDivContent(datahandler_divs[j], dataSubset)}
        }
}


function ReplaceDivContent(_div, dataSubset) {
    /**
     * Replaces div element with data Array. When no Tags are defined in html, then Tags are ignored
     * 
     * _div: div element where Replacement will happen
     * dataSubset: Array of data that is used for replacement
     */
    var div_tags = getTagsfromClass(_div.classList);
    var fragment = ''; var i;
    
    if (div_tags = []){
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

function main_datahandler_table(nth_div, dataSubset) {
    j = nth_div;
    var div_tags = getTagsfromClass(datahandler_divs[j].classList);
    var fragment = '';
    var sumkey = "";
    var numbering = false;

    // look for sum, remember and remove
    if (datahandler_divs[j].innerHTML.includes("{sum:")) {
        var idx1 = datahandler_divs[j].innerHTML.indexOf("{sum:{");
        var idx2 = datahandler_divs[j].innerHTML.indexOf("}:", fromIndex = idx1);
        sumkey = datahandler_divs[j].innerHTML.substring(idx1+6, idx2);
        num_cols = datahandler_divs[j].innerHTML.split("{col}").length - 1;
        sumkey_colStr = datahandler_divs[j].innerHTML.substring(idx2+2, idx2+4);
        sumkey_col = parseInt(sumkey_colStr)-1;
        datahandler_divs[j].innerHTML = datahandler_divs[j].innerHTML.replace(new RegExp("{sum:{"+sumkey+"}"+":"+sumkey_colStr+"}", 'g'), "")}

    //look for num, remember and remove
    if (datahandler_divs[j].innerHTML.includes("{num}")) {
        numbering = true;}
        //datahandler_divs[j].innerHTML = datahandler_divs[j].innerHTML.replace(new RegExp("{num}", 'g'), "")}

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
            fragment += ReplaceWithData_table(datahandler_divs[j],datasubset_valid[i], nth_row);
            if (sumkey != "") {
                // get sum from data
                sum += datasubset_valid[i][sumkey]}
        }

    // if applicable, create sum row
    if (sumkey != "") {
        fragment += "<tr>" + "<td></td>".repeat(sumkey_col) + "<td><b>" + sum + "</b></td>" + "<td></td>".repeat(num_cols - sumkey_col - 1) + "</tr>" 
    }

    datahandler_divs[j].innerHTML  = "<table>" + fragment + "</table>"

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

function getTagsfromClass(classlist) {
    var Tag_list = [];
    for (var i = 0;i< classlist.length;i++) {
        if (classlist[i].includes("[")) {
            Tag_list.push(classlist[i].replace("[","").replace("]",""));
        }
    }
    return Tag_list;
};

function IsCorrectTagLogic(Taglist_Element, Taglist_Condition) {
    if (Taglist_Condition.length == 0) {return true}
    Taglist_OR = ReturnSubset_prefix(Taglist_Condition, "AND_", flip = true)
    Taglist_AND = ReturnSubset_prefix(Taglist_Condition, "AND_")
    
    for (var i = 0;i<Taglist_AND.length;i++) {
        Taglist_AND[i] = Taglist_AND[i].replace(new RegExp("AND_", 'g'), "")
        if (!Taglist_Element.includes(Taglist_AND[i])) {
            return false;}
    }
    for (var i = 0;i<Taglist_Element.length;i++) {
        for (var j = 0;j<Taglist_OR.length;j++) {
            if (Taglist_Element[i] == Taglist_OR[j]) {
                return true;}           
        }
    }
    return false;
}

function ReturnSubset_prefix(array, prefix = "", flip = false){
    var tmp = []; var tmp_flip = []
    for (var i = 0; i<array.length;i++){
        if (array[i].startsWith(prefix)){
            tmp.push(array[i])} 
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
