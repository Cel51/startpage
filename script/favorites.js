var favorites = [
  [ "Work",
    [
      ["CPNV" , "http://intranet.cpnv.ch/", "cpnv"],
      ["Github" , "https://github.com/", "gh"],
      ["Gmail" , "https://mail.google.com/mail/u/0/#inbox", "gm"],
      ["Bitbucket" , "http://bitbucket.org", "bb"]
    ]
  ],
  [ "Social",
    [
      ["Whatsapp" , "https://web.whatsapp.com/", "wa"],
      ["Hangouts" , "http://hangouts.google.com", "hang"],
      ["Facebook" , "https://www.facebook.com/" , "fb"],
      ["Twitter" , "https://twitter.com/", "twi"]
    ]
  ],
  [ "Download",
    [
      ["ThePirateBay", "http://http://thepiratebay.se", "tpb"],
      ["T411", "http://www.t411.in/", "t411"]
    ]
  ],
  [ "Reddit",
    [
      ["LoL", "https://www.reddit.com/r/leagueoflegends/", "lol"],
      ["4chan", "https://www.reddit.com/r/4chan/", "4ch"],
      ["Monster Hunter", "https://www.reddit.com/r/MonsterHunter/", "mh"],
      ["Programmer Humour", "https://www.reddit.com/r/MonsterHunter/", "ph"]
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
      ["Hugelol", "http://hugelol.com", "hgl"],
      ["Hiddenlol", "http://hiddenlol.com", "hdl"]
    ]
  ]
]

function loadFavorites() {
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
