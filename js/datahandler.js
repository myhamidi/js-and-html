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
        var var_DataObject = var_data[array_DatahandlerDivsID[j]];
        var var_data_flat = flattenData(var_data);
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
                        var_TagMatchTRUE = IsThereEqualTag(var_DataObject[i]["Tags"],var_DatahandlerDiv_ClassTags);
                    }
                }

                if (var_TagMatchTRUE) {
                    var array_DataObjectKeys = Object.getOwnPropertyNames(var_DataObject[i]);
                    fragment += ReplaceDatahandlerDivWithData(var_DatahandlerDiv_innerHTML,var_DataObject,array_DataObjectKeys);
                }
            }
        }
        var_DatahandlerDiv.innerHTML = fragment;
    }
};

function ReplaceDatahandlerDivWithData (div_innerHTML, data, keys) {
    //For each Data Item Key
    for (k = 0; k < keys.length; k++) {
        //Replace {{}} statement with corresponding data Property
        div_innerHTML= div_innerHTML.replace(new RegExp("{{" + keys[k] + "}}", 'g'), data[i][keys[k]])    
    }
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

function IsThereEqualTag(Taglist1, Taglist2) {
    for (var i = 0;i<Taglist1.length;i++) {
        for (var j = 0;j<Taglist2.length;j++) {
            if (Taglist1[i] == Taglist2[j]) {
                return true;
            }           
        }
    }
    return false;
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


//*******************************************************/
//TEST                                                  *
//*******************************************************

function test_flattenData() {
    var dataA = {
        "Alpha":
            [
                {"stadt": "Munich", "Land": "BY", "Fluss": "Isar",},
                {"stadt": "Frankfurt", "Land": "HE", "Fluss": "Main",},
            ],
        "Beta":
            [
                {"stadt": "New York", "Land": "USA", "Fluss": "Hudson",},
            ],
    };

    var dataB = [
                {"stadt": "Munich", "Land": "BY", "Fluss": "Isar",},
                {"stadt": "Frankfurt", "Land": "HE", "Fluss": "Main",},
                {"stadt": "New York", "Land": "USA", "Fluss": "Hudson",}
        ];
    var dataA_flat = flattenData(dataA);

    if (dataA = dataB) {
        console.log("test_flattenData() passed")
    } else {
        console.log("test_flattenData() failed")
    }             
}

test_flattenData();