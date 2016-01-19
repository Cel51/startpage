var favorites = [
  [ "Work",
    [
      ["cpnv" , "http://intranet.cpnv.ch/", "cpnv"],
      ["github" , "https://github.com/", "gh"],
      ["gmail" , "https://mail.google.com/mail/u/0/#inbox", "gm"],
      ["bitbucket" , "http://bitbucket.org", "bb"]
    ]
  ],
  [ "Social",
    [
      ["whatsapp" , "https://web.whatsapp.com/", "wa"],
      ["hangouts" , "http://hangouts.google.com", "hang"],
      ["facebook" , "https://www.facebook.com/" , "fb"],
      ["twitter" , "https://twitter.com/", "twi"]
    ]
  ],
  [ "Download",
    [
      ["thepiratebay", "http://thepiratebay.se", "tpb"],
      ["T411", "http://www.t411.in/", "t411"]
    ]
  ],
  [ "Reddit",
    [
      ["LoL", "https://www.reddit.com/r/leagueoflegends/", "lol"],
      ["4chan", "https://www.reddit.com/r/4chan/", "4ch"],
      ["Monster Hunter", "https://www.reddit.com/r/MonsterHunter/", "mh"],
      ["Programmer Humor", "https://www.reddit.com/r/ProgrammerHumor/", "ph"]
    ]
  ],
  [ "4chan",
    [
      ["/b/", "http://4chan.org/b/", "b"],
      ["/wg/", "http://4chan.org/wg/", "wg"],
      ["/g/", "http://4chan.org/g/", "g"]
    ]
  ],
  [ "Others",
    [
      ["hugelol", "http://hugelol.com", "hgl"],
      ["hiddenlol", "http://hiddenlol.com", "hdl"]
    ]
  ]
]

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
