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

var array_DatahandlerDivsID = getDOM_Prpperties(document.getElementsByClassName("datahandler-root"), "id");

//on window load:
function main_datahandler(Identification = "ID") {
    for (j = 0; j < array_DatahandlerDivsID.length; j++) {
        if (Identification == "ID") {
            var var_DataObject = var_data[array_DatahandlerDivsID[j]]}
        if (Identification == "Global") {
            var var_DataObject = flattenData(var_data)}
        var var_DatahandlerDiv_innerHTML = document.getElementById(array_DatahandlerDivsID[j]).innerHTML;
        var var_DatahandlerDiv = document.getElementById(array_DatahandlerDivsID[j]);
        var var_DatahandlerDiv_ClassTags = getTagsfromClass(var_DatahandlerDiv.classList);
        
        var var_TagMatchTRUE = true;
        var fragment = '';
        
        // when Div ID is found in data.js
        if (var_DataObject!= undefined) {
            //For each Data Item
            for (i = 0; i < var_DataObject.length; i++) {
                //Check for Tags
                if (!(var_DatahandlerDiv_ClassTags == undefined || var_DatahandlerDiv_ClassTags.length == 0) ) {
                    var_TagMatchTRUE = false;   
                    if (var_DataObject[i]["Tags"] != undefined) {
                        var_TagMatchTRUE = IsCorrectTagLogic(var_DataObject[i]["Tags"],var_DatahandlerDiv_ClassTags);
                    }
                }

                if (var_TagMatchTRUE) {
                    var array_DataObjectKeys = Object.getOwnPropertyNames(var_DataObject[i]);
                    fragment += ReplaceDatahandlerDivWithData(var_DatahandlerDiv,var_DataObject[i],array_DataObjectKeys);
                }
            }
        }
        if (var_DatahandlerDiv.classList.contains("datahandler-table")) { //not array. DOM token list
            var_DatahandlerDiv.innerHTML  = "<table>" + fragment + "</table>"}
        else {
            var_DatahandlerDiv.innerHTML = fragment;}
    }
};

function ReplaceDatahandlerDivWithData (div, data, keys) {
    var div_innerHTML = div.innerHTML
    //For each Data Item Key,
    for (k = 0; k < keys.length; k++) {
        //Replace {{}} statement with corresponding data Property
        if (div.classList.contains("datahandler-table")){
            div_innerHTML= div_innerHTML.replace(new RegExp("{{" + keys[k] + "}}", 'g'), "<td>"+data[keys[k]]+"</td>")}
        else { 
        div_innerHTML= div_innerHTML.replace(new RegExp("{{" + keys[k] + "}}", 'g'), data[keys[k]])}
    }
    if (div.classList.contains("datahandler-table")){
        return "<tr>" + div_innerHTML + "</tr>"}
    else {return div_innerHTML}
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


