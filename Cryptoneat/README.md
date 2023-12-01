# CryptoNeat

En commençant le défi, on arrive sur une page web qui nous demande un mot de passe.

En inspectant le code source de la page, on se rend compte que le mot de passe renseigné est le bon. Alors, on charge une nouvelle page web issue d'un message déchiffré à l'aide de l'algorithme AES-CTR.

On remarque aussi que deux messages sont chiffrés : "encryptedMsg" et "encryptedMsg2". Le premier correspond au code HTML de la page contenant le flag, et l'autre n'est pas utilisé. On observe également que les deux messages chiffrés ont le même vecteur d'initialisation (IV). Sachant cela, si on connaît l'un des deux messages en clair, on peut retrouver l'autre (Propriétée du mode de chiffrement CTR cf : https://www.bibmath.net/forums/viewtopic.php?id=9095).

On trouve la ligne : exports.cryptoThanks = "Build with love, kitties and flowers"; dans le code JavaScript.

On teste si cette ligne est le message en clair (voir resolve.py), et bingo, on trouve le mot de passe de la page et donc le flag.


















