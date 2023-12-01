# Feed This Dragon

Au début, je voulais créer un bot capable de détecter les sprites de chaque objet et de les faire cliquer sur la page Internet ouverte.

![Alt text](request.jpg?raw=true)

Pour mettre à jour et recevoir l'état du jeu à l'instant T, nous utilisons des requêtes GET à l'URL suivante : https://feedthisdragon4.chall.malicecyber.com/api/v1

Le serveur nous renvoie des données JSON nous informant de notre avancement dans le jeu et des objets présents sur le terrain.

Pour "cliquer" sur un objet, nous envoyons une requête POST à la même URL en renseignant l'ID de l'objet sur lequel nous voulons cliquer.

Nous pouvons également acheter des objets dans le magasin pour améliorer notre personnage de la même manière.

L'automatisation de ces tâches est présente dans le fichier resolve.py.




