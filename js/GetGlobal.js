// var var_data = Object.assign(data01);  // data link in html file
// var dataF =  flattenData(var_data);
// var datahandler_divs = document.getElementsByClassName("datahandler-root");

function myFunction(divID) {
    for (i = 0; i<datahandler_divs.length;i++) {
        if (datahandler_divs[i].id == divID) {
            datahandler_divs[i].innerHTML += "Hallo";
            //MOHI
            ReplaceDivContent(i, datahandler_divs[i], var_data);}
    }
}