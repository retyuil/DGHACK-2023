# Wrongsomewhere

Dans ce défi, on nous donne accès à un ransomware qui chiffre les données du répertoire dans lequel il est exécuté.

Le ransomware est un exécutable, et je décide de l'importer dans Ghidra.

En regardant la fonction "main" :

<img src="https://raw.githubusercontent.com/retyuil/DGHACK-2023/main/Wrong%20somewhere/decompiler1.PNG">
On se rend compte que le programme va lire une clé dans le registre de Windows et utilise cette clé pour chiffrer les fichiers contenus dans le répertoire de travail.

Le chiffrement/déchiffrement se lance seulement si la clé renseignée par l'utilisateur est la même que la clé du registre.

On pourrait s'embêter à trouver la clé qui est lue dans le registre, mais on peut simplement modifier l'instruction qui vérifie si l'utilisateur rentre la bonne clé.

<img src="https://raw.githubusercontent.com/retyuil/DGHACK-2023/main/Wrong%20somewhere/decompiler2.PNG">
Ensuite, on enregistre le programme patché et on l'exécute dans le dossier chiffré sur l'ordinateur de la victime. Même si on ne rentre pas la bonne clé, le programme déchiffre les fichiers du dossier, et on retrouve le flag.
