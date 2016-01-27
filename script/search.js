function remplaceChar(str, character, replacement){
    var str = str;
    var a;
    var b;
    for(var i=0; i < str.length; i++){
        if(str.charAt(i) == character){
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }
    return str;
}
function searchInternet(arg) {
  if(arg.substr(0,1) == "!") {
    for(var i = 0; i < searchs.length; i++) {
      if(searchs[i][0] == arg.substr(0, 2)) {
        arg = arg.substr(3);
        arg = remplaceChar(arg,' ','+');
        var win = window.open(searchs[i][1]+arg, '_blank');
        win.focus();
      }
    }
  } else {
    var win = window.open(searchs[0][1]+arg, '_blank');
    win.focus();
  }
}
function initSearch() {
  $("#search-board input").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      searchInternet($("#search-board input").val());
      $("#search-board input").val("");
    }
  })

  var string = "Options : ";
  for(var i = 0; i < searchs.length; i++) {
    if(i == searchs.length-1) {
        string += searchs[i][0];
    } else {
        string += searchs[i][0]+" | ";
    }
  }
  $("#search-board input").attr("placeholder", string);
}
