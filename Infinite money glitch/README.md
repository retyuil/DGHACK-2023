# Infinite Money Glitch

Pour ce défi, on nous demande d'extraire des codes de quatre chiffres écrits à des moments aléatoires dans une vidéo.

On peut automatiser le processus de requêtes des vidéos et d'envoi des codes sur la page web du challenge.

On peut demander autant de vidéos que l'on veut, mais on doit attendre au moins 20 secondes avant de rentrer le code correspondant à la vidéo choisie.

Le seul problème restant est la lecture des codes.

Heureusement pour nous, les chiffres sont toujours de la même taille et écrits de la même manière. On peut donc faire une recherche de motif sur chaque frame de la vidéo avec une capture de chaque chiffre faite en amont.

Cette méthode fonctionne, mais elle prend environ 25 secondes pour chaque vidéo, c'est trop lent. Pour pallier à ce problème, on peut se permettre de ne regarder qu'une seule frame toutes les 120 frames, car le code reste plusieurs secondes sur l'écran.

Le script permettant de valider le défi est présent dans le fichier resolve.py.














