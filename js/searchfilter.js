// ##############################################################################################################
// #                                                                                                            #
// # IDs:                                                                                                       #
// # "myInput": The input-form, where you can type in search items                                              #
// #                                                                                                            #
// # classes:                                                                                                   #
// # "seach-here": Searchfilter is applied to all children of the DOM element with the "search-here" class      #
// #                                                                                                            #
// # Applied to:                                                                                                #                                                                                                            #                                                 #
// # <a href>, <tr>, <p>, class="img-container"                                                                 #
// # makes all items of these types invisible, when they don't contain the search item                          #                                                                              #
// #                                                                                                            #
// ##############################################################################################################




function mySearchfilter() {
    //Var
    var seach_here = document.getElementsByClassName("seach-here");
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();

    //Loop through all main divs:
    for (j = 0; j < seach_here.length; j++) {

        //Loop through all list items
        var a_list = seach_here[j].getElementsByTagName("a");
        for (i = 0; i < a_list.length; i++) {
            a = a_list[i];
            if (a) {
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    a.style.display = "";
                } else {
                    a.style.display = "none";
                }
            }
        }

        //Loop through all table row items
        var tr_list = seach_here[j].getElementsByTagName("tr");
        for (i = 0; i < tr_list.length; i++) {
            tr = tr_list[i];
            if (tr) {
                if (tr.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr.style.display = "";
                } else {
                    tr.style.display = "none";
                }
            }
        }

        //Loop through all paragraphs
        var p_list = seach_here[j].getElementsByTagName("p");
        for (i = 0; i < p_list.length; i++) {
            p = p_list[i];
            if (p) {
                if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    p.style.display = "";
                } else {
                    p.style.display = "none";
                }
            }
        }

        //Loop through all class="img-container"
        var p_list = seach_here[j].getElementsByClassName("img-container");
        for (i = 0; i < p_list.length; i++) {
            p = p_list[i];
            if (p) {
                if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    p.style.display = "";
                } else {
                    p.style.display = "none";
                }
            }
        }
    }

};