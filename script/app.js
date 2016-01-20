var tlLoading, tlDisplay;
var username = "Cel51"
var cffT, mainT, scT;

function init() {

  $("body").backstretch("images/"+images[Math.round(Math.random()*images.length-1)],{fade: 300}, function() {console.log("onch");});
  $(".left-pannel, .mid-pannel, .right-pannel").mCustomScrollbar({
    scrollInertia: 100
  });

  initGreetings();
  initWeather();
  initTimeLines();
  initTerminal();
  initSearch();
  initFavorites();
  initSize();

  tlLoading.play();

  setTimeout(function() {
    tlLoading.pause();
    tlDisplay.play();
  }, 1210);
}
function initTerminal() {
  mainT = $('.terminal-term.main #main').terminal({
    "google": function(arg1) {
      new $.GoogleSearch().search(arg1, {}, function(data) {
        console.log(data)
      });
    },
    "f": function(arg1) {
      for(var i = 0; i < favorites.length; i++) {
        for(var j = 0; j < favorites[i][1].length; j++) {
          if(arg1 == favorites[i][1][j][2]) {
            var win = window.open(favorites[i][1][j][1], '_blank');
            win.focus();
          }
        }
      }
    },
    "main": function() {
      showTab("main");
      mainT.focus(true);
    },
    "sc": function() {
      if ($(".terminal#sc").length == 0) {
        addTab("sc", "SC");
        initSoundcloud();
      }
      showTab("sc");
      scT.focus(true);
    },
    "cff": function() {
      if ($(".terminal#cff").length == 0) {
        addTab("cff", "CFF");
        initCFF();
      }
      showTab("cff");
      cffT.focus(true);
    }
  }, {
    greetings: 'Welcome ' + username,
    name: 'main',
    height: 0,
    prompt: username + '@homepage:~$ '
  });
  mainT.focus();
}

function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(username);

  initClock();
}

function initWeather() {
  locations.forEach(function(i, e) {
    $.simpleWeather({
      zipcode: '',
      woeid: locations[e],
      location: '',
      unit: 'c',
      success: function(weather) {
        var weatherObj = '<p class="weather" id="' + locations[e] + '">' +
          '<span class="weather-location"></span><br>' +
          '<span class="weather-icon"></span>' +
          '<span class="weather-temperature"></span> <br>' +
          '<span class="weather-description"></span>' +
          '</p>';

        $("#weather-board").append(weatherObj);
        $("#" + locations[e] + " .weather-location").html(weather.city + ", " + weather.region);
        $("#" + locations[e] + " .weather-icon").html('<i class="icon-' + weather.code + '"></i>');
        $("#" + locations[e] + " .weather-temperature").html(weather.temp + '&deg;' + weather.units.temp);
        $("#" + locations[e] + " .weather-description").html(weather.currently);
      },
      error: function(error) {
        $("#" + locations[e] + "").html('<p>' + error + '</p>');
      }
    });
  });
}

function initTimeLines() {
  tlLoading = new TimelineMax({
      repeat: -1
    })
    .from($(".s1"), .4, {
      rotation: "-=180"
    }, "#1")
    .from($(".s2"), .5, {
      rotation: "-=180"
    }, "#1")
    .from($(".s3"), .6, {
      rotation: "-=180"
    }, "#1")
    .from($(".s4"), .7, {
      rotation: "-=180"
    }, "#1")
    .pause();

  tlDisplay = new TimelineMax()
    .to($(".squares"), .2, {
      autoAlpha: 0
    })
    .to($(".squares"), .05, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#greetings-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#weather-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#search-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#favorites-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#terminal-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .from($("#tabs"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .timeScale(1.2)
    .pause();
}

function initClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10)
    dd = '0' + dd
  if (mm < 10)
    mm = '0' + mm
  if (h < 10)
    h = '0' + h
  if (m < 10)
    m = '0' + m
  if (s < 10)
    s = '0' + s

  $(".time-hours").html(h);
  $(".time-minutes").html(m);
  $(".time-seconds").html(s);
  $(".date-day").html(dd);
  $(".date-month").html(mm);
  $(".date-year").html(yyyy);

  if (h < 12) {
    $(".greetings-title").html("Good Morning");
  } else if (h >= 12 && h < 19) {
    $(".greetings-title").html("Good Afternoon");
  } else {
    $(".greetings-title").html("Good Evening");
  }

  var t = setTimeout(initClock, 500);
}

function initSize() {

  $(".mid-pannel, .left-pannel, .right-pannel").height(document.body.clientHeight-20);


  var mxHeight = 0;
  $("#favorites-board .favorite").each(function(index, elem){
     if(mxHeight <= $(elem).height())
        mxHeight = $(elem).height();
  });
  $("#favorites-board .favorite").height(mxHeight);
}

function addTab(tab, name) {
  $("#tabs").append('<span id="' + tab + '" class="t-tab">' + name + '</span>');
  $("#terminal-board .terminals").append('<div class="terminal-term '+tab+'"><div id="' + tab + '"></div></div>');

  $(".t-tab").click(function() {
    showTab($(this).attr('id'));
  })
}

function showTab(tab) {
  $(".terminal-term.active").removeClass("active");
  $(".terminal-term #" + tab).parent().addClass("active");
  $("#tabs span.active").removeClass("active");
  $("#tabs span#" + tab).addClass("active");

  // $(".terminal#" + tab).css({
  //   height: $("#main-board").height() - 20
  // });
}

$(document).ready(function() {

  init();

  setTimeout(function() {
    initSize();
  }, 2500)
});

$(window).resize(function() {
  initSize();
})
