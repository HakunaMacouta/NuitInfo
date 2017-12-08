var onGame = false;

var keyEnter = 13;


//Input event
document.getElementById('textprompt').onkeydown = function (event) {
  if (event.keyCode === keyEnter) {
    //get input
    var inputUser = document.getElementById('textprompt').value;
    //send response depending on the input
    printToTerm(responseToInpute(inputUser));
    //clear input
    document.getElementById("textprompt").value = "";
    checkOverflow();
  }
};

function printToTerm(response){
  var divSortie = document.createElement('div');
  divSortie.setAttribute("class", "anaglyph");
  divSortie.innerText = response;
  document.getElementById("screenResult").appendChild(divSortie);
}

function responseToInpute(inputUser){
  switch (inputUser) {
    case "":
      sortie = "$:~/";
      break;
    case "help":
      sortie = " 1. entrer \"./game.sh\" (Révise bien ton code de la route avant) \n" +
        "2. entrer \"delete\" et détruire ce site à jamais \n" +
        "3. entrer \"quit\" et quitter cette partie obscure du site" +
        "4. entrer \"help\" pour voir les commandes disponibles";
      break;
    case "quit":
      window.location.href = "http://hakunamacouta.fr/nuitdelinfo/";
      sortie = "";
      break;
    case "./game.sh" :
      startGame();
      sortie = "Chargement...";
      break;
    case "fin du game":
      sortie = "Vous avez quitté le jeu";
      break;
    default :
      sortie = "La commande : \"" + inputUser + "\" est introuvable";
  }
  return sortie;
}

//permet de gérer l'overflow vers le haut comme un terminal classique (mais en moins propre)
function checkOverflow() {
  var ymonitor = document.getElementById("monitor").getBoundingClientRect().y;
  var yfirstdiv = document.getElementById("screenResult").getBoundingClientRect().y;

  while (yfirstdiv - ymonitor < 0) {
    removeDiv();
    ymonitor = document.getElementById("monitor").getBoundingClientRect().y;
    yfirstdiv = document.getElementById("screenResult").getBoundingClientRect().y;
  }
}

//efface les div qui dépassent du terminal
function removeDiv() {
  document.getElementById("screenResult").removeChild(document.getElementById("screenResult").firstChild)
}

function startGame() {
  var gameContainer = document.getElementById('gameContainer');

  var buttonQuit = document.createElement("button");
  buttonQuit.setAttribute("onclick", "quitGame()");
  buttonQuit.setAttribute("id", "quitGame");
  buttonQuit.innerHTML = "X";
  gameContainer.appendChild(buttonQuit);

  var ifram = document.createElement("iframe");
  ifram.setAttribute("src", "jeuBen.html");
  ifram.setAttribute("id", "game");
  ifram.height = "600";
  ifram.width = "500";
  gameContainer.appendChild(ifram);
  onGame = true;
}

function quitGame(){
  if(onGame){
    var iframe = document.getElementById("game");
    var buttonQuit = document.getElementById("quitGame");
    var gameContainer = document.getElementById("gameContainer");
    gameContainer.removeChild(iframe);
    gameContainer.removeChild(buttonQuit);
    onGame = false;
    printToTerm(responseToInpute("fin du game"));
  }
}