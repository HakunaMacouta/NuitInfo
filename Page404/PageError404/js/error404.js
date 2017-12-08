window.onload = function() {
  document.getElementById('formulaire').style.visibility='hidden';
};


function myMove() {
  document.getElementById('son').innerHTML='<embed src="sons/sirene.mp3" autostart="true" loop="false" hidden="true"></embed>';
  var voiture = document.getElementById("voiture");
  var policier = document.getElementById("policier")
  var posRunVoiture = 0;
  var posRunPolicier = 0;
  var posBotPolicier = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (posRunVoiture >= 300)
    {
      if(posRunVoiture <750)
      {
        posRunVoiture++;
        posRunPolicier+=2;
        voiture.style.left = posRunVoiture + 'px';
        policier.style.left = posRunPolicier + 'px';
      }
      if (posRunPolicier == 750) {
        while(posBotPolicier !=50)
        {
          posRunPolicier ++;
          posBotPolicier ++;
          policier.style.top = posBotPolicier + 'px';
          policier.style.left = posRunPolicier + 'px';
        }

        clearInterval(id);
        document.getElementById('image').innerHTML="<img src='images/police.png'>";
        document.getElementById('texte').innerHTML="<p>WASTED</p>";
        main();
        document.getElementById('formulaire').style.visibility='visible';
      }
    } else {
      posRunVoiture++;
      voiture.style.left = posRunVoiture + 'px';
    }
  }
}

function nb_aleatoire(min, max)
{
  var nb = min + (max-min+1)*Math.random();
  return Math.floor(nb);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  await sleep(2000);
  Lancer_partie();
}


function Debut_manche(min, max, nb)
{
  var cpt = 0;    // nb de coups pour le trouver
  var saisie;     // nb tape par le joueur
  var msg = 'Vous avez une idée de la vitesse à laquelle vous rouliez ?! La limite est à ' + min + 'km/h !';
  do
  {
    saisie =prompt(msg);
    if(saisie == null)
    return 0;

    cpt++;
    if(saisie > nb)
    msg = "C'est moins";
    else
    msg = "C'est plus";
  }
  while(saisie != nb);

  return cpt;
}

function Calcul_amende(exces_vitesse)
{
  var amende;
  if(exces_vitesse<20)
  amende=68;
  else if(exces_vitesse<50)
  amende=135;
  else
  amende=1500;
  return amende;
}

function Calcul_points_perdus(exces_vitesse)
{
  var nb_points_perdus;
  if(exces_vitesse<20)
  nb_points_perdus=1;
  else if(exces_vitesse<30)
  nb_points_perdus=2;
  else if(exces_vitesse<40)
  nb_points_perdus=3;
  else if(exces_vitesse<50)
  nb_points_perdus=4;
  else
  nb_points_perdus=6;
  return nb_points_perdus;
}

function Lancer_partie()
{
  var score;      // score de la partie en cours
  var points_perdus;
  var amende;
  var limite_vitesse;
  var exces_vitesse;

  var nb = nb_aleatoire(0,3);
  switch (nb){
    case 0:
    limite_vitesse=30;
    break;
    case 1:
    limite_vitesse=50;
    break;
    case 2:
    limite_vitesse=90;
    break;
    case 3:
    limite_vitesse=130;
    break;
  }
  min=limite_vitesse;
  max=limite_vitesse+60;
  var nb_a_deviner = nb_aleatoire(min, max)+1;

  score = Debut_manche(min, max, nb_a_deviner);   // joue la manche
  if(score)
  {
  exces_vitesse = nb_a_deviner-limite_vitesse;
  amende = Calcul_amende(exces_vitesse);
  points_perdus = Calcul_points_perdus(exces_vitesse);
  alert("C'est bien ça. Vous perdez " + points_perdus + " points sur votre permis \net vous prenez une amende de " + amende + "€. \n\nÇa vous apprendra à dépasser la limite de vitesse de " + exces_vitesse +" km/h !\n");
}
  alert("Ton score est de " + score + " coups.");
  return best_score;
}
