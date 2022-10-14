# Motus 
## Installation 
- cd ./Auth
- docker build . -t yassibra/motus-auth
- cd ./Score
- docker build . -t yassibra/motus-score
- cd ./Motus
- docker build . -t yassibra/motus-motus
- cd ./Front
- docker build . -t yassibra/motus-front
- docker run -p 3000:3000 -d yassibra/motus-front
- docker compose up -d
## Fonctionnement 
-  Connexion
![Connexion](diag1.png)
- jeu
![](diag2.png)
- score
![](diag3.png)
## Pour jouer
 - Creez votre compte      
 - Connectez vous          
 - Jouez                   
 - Consultez votre score   
![](jeuMotus.png)
## Regle du jeu 
Le jeu repose sur la recherche d'un mot en 6 essais dont la première lettre est fournit. A la fin de chaque tentative, Motus colorie les cases pour vous orienter vers le bon résultat. Les cases vertes, représente les lettres bien placées, les cases orange, les lettres mal placées et en rouge, les lettres incorrectes. L'objectif étant de trouver le résultat en un minimum de tentative. A vous de jouer !

## Axes d'améliorations
Les interactions entre les différents serveurs et le serveur de score sur docker ne fonctionne pas.La piste du reverse proxy pour rediriger les requêtes est à l'étude. Néanmoins le projet fonctionne sans docker, la authentification,le jeu et le score fonctionne.