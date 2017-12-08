var secret = "38384040373937396665"; //god
var input = "";
var timer;

$(document).keyup(function(e) {
  input += e.which;

  clearTimeout(timer);
  timer = setTimeout(function() { input = ""; }, 500);

  check_input();
});

function check_input() {
  if(input === secret) {
    window.location.href="konamiTerminal.html";
  }
}
$(document).ready(function() {
  setInterval(function() { $('#info').html('Keystroke: ' + input); }, 100);
});