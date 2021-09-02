//*******************************************************/
//TEST                                                  *
//*******************************************************

div_element = document.getElementById("test result");

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
        div_element.innerHTML += "test_flattenData() passed </br>"
    } else {
        div_element.innerHTML += "test_flattenData() failed </br>"
    }             
}

test_flattenData();