var secret = "38384040373937396665"; //god
var input = "";
var timer;

$(document).keyup(function(e) {
  input += e.which;

  clearTimeout(timer);
  timer = setTimeout(function() { input = ""; }, 700);

  check_input();
});

function check_input() {
  if(input === secret) {
    window.location.href="http://hakunamacouta.fr/nuitdelinfo/konamiTerminal.html";
  }
}