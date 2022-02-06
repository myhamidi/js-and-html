function myFunction(divID) {
    for (i = 0; i<datahandler_divs.length;i++) {
        if (datahandler_divs[i].id == divID) {
            datahandler_divs[i].innerHTML += "Hallo";}
    }
}