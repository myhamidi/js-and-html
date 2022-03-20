// var var_data = Object.assign(data01);  // data link in html file
// var dataF =  flattenData(var_data);
// var datahandler_divs = document.getElementsByClassName("datahandler-root");

function myFunction(divID) {
    var_divs_Info = GetPageInfo(datahandler_divs); // Update
    for (i = 0; i<datahandler_divs.length;i++) {
        if (datahandler_divs[i].id == divID) {
            ReplaceDivContent(i, datahandler_divs[i], var_data);}
    }
}