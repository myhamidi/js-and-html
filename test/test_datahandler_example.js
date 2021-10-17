//*******************************************************/
//TEST JS in HTML - Datahandler example                 *
//*******************************************************
//
//Test are callled from text html

div_element = document.getElementById("test result html js");


function test_ReplaceDivContent(div_id = div_id) {
    var strr = document.getElementById(div_id).innerHTML.replace(/ /g, "");
    if (strr == '\n1234<br>\nHelloWorld<br>\n...<br><br>\n\n1256<br>\nByeBye<br>\nThisistheend<br><br>\n') {
        div_element.innerHTML += "test_ReplaceDivContent() passed </br>"
    } else {
        div_element.innerHTML += "test_ReplaceDivContent() failed </br>"
    }
}