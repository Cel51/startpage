var load;
var tlLoading;
var tlHideLoading;
var website = ["google.ch","facebook.com","twitter.com","stackoverflow.com", "4chan.org"]

$(document).ready(function (){
  initElements();
  initTimeLines();
  tlLoading.play();
  runClock();

  website.forEach(function(entry){
    ping(entry,function (status) {
      console.log(status);
    });
  });

  //
  // for (var i = 0; i < website.length; i++) {
  //   console.log(website);
  //   ping(website[i],function (status) {
  //     console.log(status);
  //   });
  // }



  setTimeout(function() {
    tlLoading.pause();
    tlHideLoading.play();
  },1390);
});

function initElements() {
  load = $("#loading");
}

function initTimeLines() {
  tlLoading = new TimelineMax({repeat:-1})
  .from($(".s1"),.4,{rotation: "-=180"},"#1")
  .from($(".s2"),.5,{rotation: "-=180"},"#1")
  .from($(".s3"),.6,{rotation: "-=180"},"#1")
  .from($(".s4"),.7,{rotation: "-=180"},"#1")
  .pause();

  tlHideLoading = new TimelineMax()
  .to($(".squares"),.2,{autoAlpha: 0})
  .to($(".squares"),.45,{height: 0},"#1")
  .from($(".image"),.5,{height: 0},"#1")
  .from($(".image"),.3,{autoAlpha: 0, marginLeft: "-20"})
  .from($("#greetings-board"),.4,{autoAlpha: 0, marginTop: "-20"},"#2")
  .staggerFrom($("#greetings-board p"),.1,{autoAlpha: 0, marginLeft: "-20"},0.1)
  .from($("#network-board"),.4,{autoAlpha: 0, marginTop: "-20"})
  .pause();
}
function runClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }

    m = checkTime(m);
    s = checkTime(s);

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

    var t = setTimeout(runClock, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function ping(ip, callback) {

    this.callback = callback
    this.ip = ip;

    var _that = this;

    this.img = new Image();

    this.img.onload = function() {};
    this.img.onerror = function() {};

    this.start = new Date().getTime();
    this.img.src = "http://" + ip;
    this.timer = setTimeout(function() {}, 1500);
}
