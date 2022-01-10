//*******************************************************/
//TEST                                                  *
//*******************************************************

div_elementJ = document.getElementById("test result js");

function test_passed(fname) {
    div_elementJ.innerHTML += fname + '<font style="color:green"> passed <br/>'
}

function test_failed(fname) {
    div_elementJ.innerHTML += fname + '<font style="color:red"> failed </font> <br/>'
}

function test_ReturnSubsetWithPrefix() {
    Taglist  = ["Mercury", "Venus", "AND_Earth", "Mars", "AND_Jupiter"];
    Taglist_subset = ReturnSubsetWithPrefix(Taglist, "AND_");
    Taglist_subset_flip = ReturnSubsetWithPrefix(Taglist, "AND_", flip=true);
    Taglist_subset_check = ["Earth", "Jupiter"];
    Taglist_subset_flip_check = ["Mecury", "Venus", "Mars"];
    
    if (IsEqual_List(Taglist_subset, Taglist_subset_check)) {
        test_passed(arguments.callee.name)} 
    else {
        test_failed(arguments.callee.name)}   
}


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

    
    if (IsEqual_ListofObjects(dataA_flat, dataB)) {
        test_passed(arguments.callee.name)} 
    else {
        test_failed(arguments.callee.name)}         
}

function test_ReplaceTextWithDictionary() {
    text = '{{key1}} and {{key2}}'
    data = {
            "key1": "Hello 1",
            "key2": "World 1"
        }
    var ret = ReplaceTextWithDictionary(text, data, AsTable = false, prefix = '{{', postfix = '}}')
    if (ret == "Hello 1 and World 1") {
        test_passed(arguments.callee.name)} 
    else {
        test_failed(arguments.callee.name)}   
}

function test_getTagsfromClass() {

    classList = ['Stadt', 'Land', 'Fluss', '[City]', '[Country]', '[River]'];
    TagList = ['City', 'Country', 'River'];

    testList = getTagsfromClass(classList)
    if (IsEqual_ListofObjects(testList,TagList)) {
        test_passed(arguments.callee.name)} 
    else {
        test_failed(arguments.callee.name)}   
}

test_ReturnSubsetWithPrefix()
test_flattenData();
test_ReplaceTextWithDictionary();
test_getTagsfromClass();