<?php
echo ("<a href=\"index.html\"> Retour à la page précédente</a></br>");
$valeur1 = $_POST['radiobutton0'];
$valeur2 = $_POST['radiobutton1'];
$valeur3 = $_POST['radiobutton2'];
$valeur4 = $_POST['radiobutton3'];
if ($valeur1 == "0" && $valeur2 == "1" && $valeur3 == "1" && $valeur4 == "1" )
{
  echo ("Vous avez trouvé toutes les bonnes réponses. Bravo à vous !");
}
else {
  echo ("Vous n'avez pas réussi ... Dommage peut être que vous ferez mieux une autre fois ..");
}
 ?>
