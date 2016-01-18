function initCFF() {
  cffT = $('.terminal#cff').terminal({
    "travel": {
      "connections" :function(fromLocation, toLocation, date, time) {

        var term = this;

        if(date==undefined) date = cffDate();
        if(time==undefined) time = cffTime();

        $.get("http://transport.opendata.ch/v1/connections?from="+fromLocation+"&to="+toLocation+"&date="+date+"&time="+time,
        function(data) {
          $(data.connections).each(function(index, connection){
            console.log(connection);
            term.echo("\n");term.error("Option "+index);term.echo("\n");
            term.echo("Departure : " + convertDate(connection.from.departure));
            term.echo("Arrival : " + convertDate(connection.to.arrival));
            term.echo("Duration : " + connection.duration);
            term.echo("Capacity 1st Class : "+connection.capacity1st+"/3");
            term.echo("Capacity 2nd Class : "+connection.capacity2nd+"/3");
            term.echo("\n");
          });
        });
      }
    },
    "main": function() {
          showTab("main");
          mainT.focus(true);
      },
    "sc": function() {
          if($(".terminal#sc").length == 0) {
              addTab("sc", "SC");
              initSoundcloud();
          }
          showTab("sc");
          scT.focus(true);
      },
    "cff": function() {
          if($(".terminal#cff").length == 0) {
              addTab("cff", "CFF");
              initCFF();
          }
          showTab("cff");
          cffT.focus(true);
      }
  }, {
          greetings: 'Welcome to CFF ' + username,
          name: 'CFF',
          height: 0,
          prompt: 'CFF > '
      });
}
function convertDate(date) {
  var ddate = new Date(date);
  var h = ddate.getHours();
  var m = ddate.getMinutes();

  if(h<10)
    h='0'+h;
  if(m<10)
    m='0'+m;

  return h+"h"+m+"m";
}
function cffDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10)
      dd='0'+dd
  if(mm<10)
      mm='0'+mm

  return yyyy+"-"+mm+"-"+dd;
}
function cffTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  if(m<10)
    m='0'+m

  return h+":"+m;
}
