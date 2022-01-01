
div_elementJ = document.getElementById("test result js");
div_element = document.getElementById("test result html js");

function IsEqual_ListofObjects(a, b) {
    var a_keys = Object.keys(a);
    var b_keys = Object.keys(b);
    // Check outer list
    if (a_keys.length != b_keys.length) {
        return false;}
    for (var i = 0; i < a_keys.length; i++) {
        if (a_keys[i] != b_keys[i]) {
            return false;}
        // inner content
        var aa = a[a_keys[i]];
        var bb = b[b_keys[i]]
        var aa_keys = Object.keys(aa)
        var bb_keys = Object.keys(bb)
        // check inner object
        if (aa_keys.length != bb_keys.length) {
            return false;}
        for (var j = 0; j < aa_keys.length; j++) {
            if (aa_keys[j] != bb_keys[j]) {
                return false;}
            if (aa[aa_keys[j]] != bb[bb_keys[j]]) {
                return false;}
        }
    }
    return true;
}

function IsEqual_List(a, b) {
    if (a === b) return true; // ideal data identity.

    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;  
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


//check also values

//*******************************************************/
//TEST the Test functions                               *
//*******************************************************

function test_IsEqual_LsitofObjects(){
    var A = 
    [
        {"stadt": "Munich", "Land": "BY", "Fluss": "Isar",},
        {"stadt": "Frankfurt", "Land": "HE", "Fluss": "Main",}
    ];
    var B = 
    [
        {"stadt": "Munich", "Land": "BY", "Fluss": "Isar",},
        {"stad": "Frankfurt", "Land": "HE", "Fluss": "Main",}
    ];
    var C = 
    [
        {"stadt": "Munic", "Land": "BY", "Fluss": "Isar",},
        {"stadt": "Frankfurt", "Land": "HE", "Fluss": "Main",}
    ];
    var D = 
    [
        {"stadt": "Munich", "Land": "BY", "Fluss": "Isar",},
        {"stadt": "Frankfurt", "Land": "HE", "Fluss": "Main",}
    ];

    if (IsEqual_ListofObjects(A,B) == false &&
        IsEqual_ListofObjects(A,C) == false && 
        IsEqual_ListofObjects(A,D) == true) {
            console.log("test_IsEqual_ListofObjects() passed")
    } else {
        console.log("test_IsEqual_ListofObjects() failed")
    }    
}

function test_IsEqual_List() {
    a = ["One", "Two", "Three"]
    b = ["One", "Two", "Three"]
    c = ["One", "Two", "Four"]

    if (IsEqual_List(a, b) == true && IsEqual_List(a,c) == false) {
        console.log("test_IsEqual_List passed")
    } else {
        console.log("test_IsEqual_List failed")
    }

}

test_IsEqual_LsitofObjects();
test_IsEqual_List()