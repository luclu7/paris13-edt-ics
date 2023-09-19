# paris13-edt-ics
Petit outil pour générer un ICS à partir de l'EDT disponible sur l'ENT de l'Université Sorbonne Paris Nord (aka Paris 13)

## Comment l'utiliser
Ce petit script est fait en Node.js, il est donc nécessaire de l'avoir installé préalablement.

Installez les dépendances:
```sh
$ npm i
```

Pour récupérer votre EDT sous forme de JSON, il faut executer ce bout de JS sur la page [Emploi du temps](https://ent.univ-paris13.fr/applications/emploidutemps):
```js
let textblock=document.getElementsByTagName("script")[22].innerHTML; let lines = textblock.split('\n');lines.splice(0,22); lines.splice(-21); lines[0]=lines[0].substring(2); ; console.log(lines.join('\n').slice(0, -2));
```

Il suffit de copier le résultat dans la variable `events` et à lancer le script !
