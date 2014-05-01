/* Twitterbio-Generator
 * (c) 2014 nilsding
 * Auf einer Idee von @TheRealKingS86 aufbauend
 *
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <nilsding@nilsding.org> wrote this file. As long as you retain this notice
 * you can do whatever you want with this stuff. If we meet some day, and you
 * think this stuff is worth it, you can buy me a beer in return
 * ----------------------------------------------------------------------------
 */

var seperator = " | ";

var shuffleArray = function(arr) {
    for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
};

var concatArray = function(arr) {
    var length = arr.length;
    if (length == 0) {
        return "";
    } else if (length == 1) {
        return arr[0];
    } else if (length > 1) {
        var text = "";
        for (var i = 0; i < length - 1; i++) {
            text = text + arr[i];
            if (i < length - 2) {
                text = text + ", ";
            }
        }
        text = text + " und " + arr[length - 1];
        return text;
    }
}

var genBio = function() {
    var bioText = "";
    var contents = [];
    
    // age:
    contents.push({type: 'age', content: $("#age").val()});
    
    // gender:
    var val = $("#gender").val();
    var text = $("#gender option[value=" + val + "]").text()
    contents.push({type: 'gender', content: text});
    
    // orientation:
    val = $("#orientation").val();
    if (val !== "het") {
        text = $("#orientation option[value=" + val + "]").text()
        contents.push({type: 'orientation', content: text});
    }
    
    // vegan!!!!
    val = $("#foodproblems").val();
    if (val !== "meatisgoodforyouDOTpng") { // ;-)
        text = $("#foodproblems option[value=" + val + "]").text()
        contents.push({type: 'veg', content: text});
    }
    
    // OS:
    val = $("#operatingsystem").val();
    var os = [];
    for (var i = 0; i < val.length; i++) {
        os.push($("#operatingsystem option[value=" + val[i] + "]").text())
    }
    shuffleArray(os);
    text = concatArray(os) + "-Nutzer";
    contents.push({type: 'os', content: text});
    
    // generating text
    contents = shuffleArray(contents);
    for (var i = 0; i < contents.length - 1; i++) {
        bioText = bioText + contents[i].content + seperator;
    }
    bioText = bioText + contents[contents.length - 1].content;
    
    if (bioText.length > 160) {
        $("#biotext").attr("class", "text-center text-danger");
    } else {
        $("#biotext").attr("class", "text-center text-info");
    }
    
    $("#biotext").html(bioText);
}

$(document).ready(function() {
    $("#age").change(function() {
        genBio();
    });
    $("#gender").change(function() {
        var sel = $(this);
        if (sel.val() === 'other') {
            var str = "Baum";
            var numbrrerr = Math.floor(Math.random() * 10E10);
            str = prompt("Nicht binäres Geschlecht angeben:", str);
            $("#gender option").each(function() {
                $(this).removeAttr("selected");
            });
            $("#gender option[value=seperator]").after("<option value=\"nonbin" + numbrrerr + "\" selected=\"selected\">" + str + "</option>");
        }
        genBio();
    });
    $("#orientation").change(function() {
        var sel = $(this);
        if (sel.val() === 'other') {
            var str = "Käsekuchensexuell";
            var numbrrerr = Math.floor(Math.random() * 10E10);
            str = prompt("Andere Sexualität angeben:", str);
            $("#orientation option").each(function() {
                $(this).removeAttr("selected");
            });
            $("#orientation option[value=seperator]").after("<option value=\"sex" + numbrrerr + "\" selected=\"selected\">" + str + "</option>");
        }
        genBio();
    });
    $("#foodproblems").change(function() {
        var sel = $(this);
        if (sel.val() === 'other') {
            var str = "Arier™";
            var numbrrerr = Math.floor(Math.random() * 10E10);
            str = prompt("Anderes angeben:", str);
            $("#foodproblems option").each(function() {
                $(this).removeAttr("selected");
            });
            $("#foodproblems option[value=seperator]").after("<option value=\"food" + numbrrerr + "\" selected=\"selected\">" + str + "</option>");
        }
        genBio();
    });
    $("#operatingsystem").change(function() {
        genBio();
    });
    $("#otheros").click(function() {
        var str = "REACTOS LOL";
        var numbrrerr = Math.floor(Math.random() * 10E10);
        str = prompt("Anderes angeben:", str);
        $("#operatingsystem option").last().after("<option value=\"os" + numbrrerr + "\" selected=\"selected\">" + str + "</option>");
        genBio();
    });
    genBio();
});