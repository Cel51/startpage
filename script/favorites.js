// Display the favorites
function initFavorites() {
  var element = "";
  $(favorites).each(function(index, group) {
    element += ''+
    '<div class="favorite">'+
      '<p class="title">'+group[0]+'</p>'
      '<ul>'+
      $(group[1]).each(function(index, favorite) {
        element += "<li>"+
                      "<span class='short'><a target='_blank' href='"+favorite[1]+"'>"+favorite[2]+"</a></span>"+
                      "<span class='link'><a target='_blank' href='"+favorite[1]+"'>"+favorite[0]+"</a></span>"+
                    "</li>";
      })
    element += '' +
      '</ul>'+
    '</div>';
  })
  $("#favorites-board .favorites").append(element);
}
