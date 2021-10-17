//*******************************************************/
//TEST                                                  *
//*******************************************************

div_elementJ = document.getElementById("test result js");

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
        div_elementJ.innerHTML += "test_flattenData() passed </br>"
    } else {
        div_elementJ.innerHTML += "test_flattenData() failed </br>"
    }             
}

function test_ReplaceTextWithDictionary() {
    text = '{{key1}} and {{key2}}'
    data = {
            "key1": "Hello 1",
            "key2": "World 1"
        }
    var ret = ReplaceTextWithDictionary(text, data, AsTable = false, prefix = '{{', postfix = '}}')
    if (ret == "Hello 1 and World 1") {
        div_elementJ.innerHTML += "test_ReplaceTextWithDictionary() passed </br>"
    } else {
        div_elementJ.innerHTML += "test_ReplaceTextWithDictionary() failed </br>"
    }

}

test_flattenData();
test_ReplaceTextWithDictionary();