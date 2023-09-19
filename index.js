const { group } = require("console");
const ical = require("ical-generator");

// let textblock=document.getElementsByTagName("script")[22].innerHTML; let lines = textblock.split('\n');lines.splice(0,22); lines.splice(-21); lines[0]=lines[0].substring(2); ; console.log(lines.join('\n').slice(0, -2));

let events = [];

const calendar = ical({ name: "TD BUT GEII" });

events.forEach((item) => {
  let specsDuCours = item.title.split("\n");
  let groupe = specsDuCours[0];
  let salle = specsDuCours.find((e) => e.startsWith("Salle :"));
  if (salle != undefined) {
    salle = salle.substring(8);
  } else {
    salle = "Salle à préciser";
  }

  let matiere = specsDuCours.find((e) => e.startsWith("Matière :"));
  if (matiere != undefined) {
    matiere = matiere.substring(8);
  } else {
    matiere = "?";
  }
  //   let matiere = specsDuCours[2].substring(8);
  let prof = specsDuCours[3];

  // on regarde si c'est un TP ou pas
  let intitule =
    (/TPGroupe\(s\)*/.test(groupe) ? "[TP] " : "") + matiere + prof;

  if (intitule.startsWith(": R")) {
    intitule = intitule.substring(2);
  }

  // on ignore les cours déjà donnés dans l'autre ics
  if (
    groupe === "CMPromotion" ||
    groupe === "Promotion" ||
    groupe === "Examen EcritPromotion" ||
    groupe === "TDPromotion" ||
    groupe == "Ctrl ContinuPromotion"
  ) {
    return;
  }

  let description = `Matière : ${matiere}
Groupe: ${groupe}
Enseignant : ${prof}
Salle : ${salle}`;
  console.log(intitule);
  calendar.createEvent({
    start: new Date(item.start),
    end: new Date(item.end),
    summary: intitule,
    description: description,
    location: salle,
    timezone: "Europe/Paris",
  });
});

calendar.save("edt.ics");
