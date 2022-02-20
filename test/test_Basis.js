//*******************************************************/
//TEST                                                  *
//*******************************************************

div_elementJ = document.getElementById("test result Basis js");

function test_passed(fname) {
    div_elementJ.innerHTML += fname + '<font style="color:green"> passed <br/>'
}

function test_failed(fname) {
    div_elementJ.innerHTML += fname + '<font style="color:red"> failed </font> <br/>'
}

function test_RetStringBetween() {
    testStr = "lorem ipsum dorum";
    // Test 1
    var test_result = [];
    if (RetStringBetween(testStr, "lorem ", "rum") == "ipsum do") {
        test_result.push(true)} 
    else {
        test_result.push(false)}
    
    // Test 2
    testStr = "lorem ipsum";
    if (RetStringBetween(testStr, "lorem ", "rum") == "") {
        test_result.push(true)} 
    else {
        test_result.push(false)}

    // Result
    var i = 0;
    for (i= 0; i<test_result.length;i++) {
        if (test_result[i] == false) {
            test_failed(arguments.callee.name)}
    }    
    test_passed(arguments.callee.name);
}

function test_RetStringOutside() {
    testStr = "lorem ipsum dorum";
    // Test 1
    var test_result = [];
    if (RetStringOutside(testStr, "ip", "dor") == "lorem um") {
        test_result.push(true)} 
    else {
        test_result.push(false)}
    
    // Test 2
    testStr = "lorem ipsum";
    if (RetStringOutside(testStr, "lorem ", "rum") == "") {
        test_result.push(true)} 
    else {
        test_result.push(false)}

    // Result
    var i = 0;
    for (i= 0; i<test_result.length;i++) {
        if (test_result[i] == false) {
            test_failed(arguments.callee.name)}
    }    
    test_passed(arguments.callee.name);
}

function test_RetStringHTMLButton() {
    // strL = 'button onclick=';
    // strM =  '"myFunction("id")"';
    // strR = '>Click me</button>';
    // testStr = strL + strM + strR;
    testStr = '<button onclick="myFunction(&quot;id&quot;)">Click me</button>';
    outStr = RetStringHTMLButton("Click me", "myFunction", "id")
    if (testStr == outStr) {
            test_passed(arguments.callee.name)}
    else {
        test_failed(arguments.callee.name);
    }   
    
}

test_RetStringBetween(); 
test_RetStringOutside(); 
test_RetStringHTMLButton(); 


div_elementJ.innerHTML += 'test run complete'