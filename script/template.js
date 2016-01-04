var load;
var tlLoading;

$(document).ready(function (){
  initElements();
  initTimeLines();
  loading(1);
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
}
function loading(mod) {
  if (mod == 1) {
    load.show();
    tlLoading.play();
  } else {
    load.hide();
    tlLoading.pause();
  }
}
