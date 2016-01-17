function initCFF() {
  $('.terminal#cff').terminal({
    "travel": function() {

    },
  },  {
          greetings: 'Welcome ' + username,
          name: 'CFF',
          height: 0,
          prompt: username+'@CFF:~$ '
      });
}
