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

function test_GetPageInfo() {
    pseudoDiv = {};
    pseudoDiv.innerHTML = '{row} {col} <a href="{{url}}">{{name}}</a> {/col} {col} {{value}} {/col} {/row} {Xsum:{value}:03}'
    test_info = {colStr: "03", key: "value"};
    info = GetPageInfo(pseudoDiv);
    if (test_info.colStr == info.SumcolStr && test_info.key == info.SumKey) {
        test_passed(arguments.callee.name)} 
    else {
        test_failed(arguments.callee.name)}
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

function test_ReplaceWithData_table() {
    text = '{row} {col} {{key1}} {/col} {col} {{key2}} {/col} {/row}'
    data = {
            "key1": "Hello 1",
            "key2": "World 1"
        }
    var ret = ReplaceWithData_table(text, data, numbering = 0, prefix = '{{', postfix = '}}')
    if (ret == "<tr> <td> Hello 1 </td> <td> World 1 </td> </tr>") {
        test_passed(arguments.callee.name + " 1")} 
    else {
        test_failed(arguments.callee.name + " 1")}   
    
        
    text = '{num}';
    numbering = 4;
    var ret = ReplaceWithData_table(text, data, numbering, prefix = '{{', postfix = '}}')
    if (ret == "4") {
        test_passed(arguments.callee.name + " 2")} 
    else {
        test_failed(arguments.callee.name + " 2")}  
}

function test_GetTagsfromClass() {

    classList = ['Stadt', 'Land', 'Fluss', '[City]', '[Country]', '[River]'];
    TagList = ['City', 'Country', 'River'];

    testList = getTagsfromClass(classList)
    if (IsEqual_ListofObjects(testList,TagList)) {
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

test_GetPageInfo(); 
test_ReturnSubsetWithPrefix(); 
test_ReplaceTextWithDictionary(); 
test_ReplaceWithData_table(); 
test_GetTagsfromClass(); 
test_flattenData(); 

div_elementJ.innerHTML += 'test run complete'