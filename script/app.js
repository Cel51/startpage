var tlLoading, tlDisplay;
var username = "Cel51"
var wLocation = ["784302","784201","783382"];

$(document).ready(function (){
  init();
});

function init() {
    initGreetings();
    initWeather();
    initTimeLines();

    tlLoading.play();
    setTimeout(function() {
      tlLoading.pause();
      tlDisplay.play();
    },1390);
}
function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(username);

  initClock();
}
function initWeather() {
  wLocation.forEach(function(i, e){
      $.simpleWeather({
        zipcode: '',
        woeid: wLocation[e],
        location: '',
        unit: 'c',
        success: function(weather) {
          var weatherObj = '<p class="weather" id="'+wLocation[e]+'">'+
  					'<span class="weather-location"></span><br>'+
  					'<span class="weather-icon"></span>'+
  					'<span class="weather-temperature"></span> <br>'+
  					'<span class="weather-description"></span>'+
  				'</p>';

          $("#weather-board").append(weatherObj);
          $("#"+wLocation[e]+" .weather-location").html(weather.city+", "+weather.region);
          $("#"+wLocation[e]+" .weather-icon").html('<i class="icon-'+weather.code+'"></i>');
          $("#"+wLocation[e]+" .weather-temperature").html(weather.temp+'&deg;'+weather.units.temp);
          $("#"+wLocation[e]+" .weather-description").html(weather.currently);
        },
        error: function(error) {
          $("#"+wLocation[e]+"").html('<p>'+error+'</p>');
        }
      });
    });
}
function initTimeLines() {
  tlLoading = new TimelineMax({repeat:-1})
  .from($(".s1"),.4,{rotation: "-=180"},"#1")
  .from($(".s2"),.5,{rotation: "-=180"},"#1")
  .from($(".s3"),.6,{rotation: "-=180"},"#1")
  .from($(".s4"),.7,{rotation: "-=180"},"#1")
  .pause();

  tlDisplay = new TimelineMax()
  .to($(".squares"),.2,{autoAlpha: 0})
  .to($(".squares"),.45,{height: 0},"#1")
  .from($(".image"),.5,{height: 0},"#1")
  .from($(".image"),.3,{autoAlpha: 0, marginTop: "-20"})
  .from($("#greetings-board"),.4,{autoAlpha: 0, marginTop: "-20"})
  .from($("#weather-board"),.4,{autoAlpha: 0, marginTop: 0, marginTop: "-20"})
  .pause();
}
function initClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10)
        dd='0'+dd
    if(mm<10)
        mm='0'+mm
    if(m<10)
      m='0'+m
    if(s<10)
      s='0'+s

    $(".time-hours").html(h);
    $(".time-minutes").html(m);
    $(".time-seconds").html(s);
    $(".date-day").html(dd);
    $(".date-month").html(mm);
    $(".date-year").html(yyyy);

    if(h<12){
      $(".greetings-title").html("Good Morning");
    } else if (h>=12 && h<19){
      $(".greetings-title").html("Good Afternoon");
    } else {
      $(".greetings-title").html("Good Evening");
    }

    var t = setTimeout(initClock, 500);
}
