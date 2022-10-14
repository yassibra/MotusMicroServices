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
On est conscient que certains mécanismes du jeu ne fonctionnent pas parfaitement ou encore que certains traitements pourraient être largement améliorés en terme de compléxité algorithmique. Néanmoins, le but de ce projet a été de comprendre les avantages des microservices et comment facilement les déployer quand cela est nécessaire.

L'interaction entre le serveur motus et le serveur score pour update le score ne fonctionne pas dans la version dockerisé. Il faudrait mettre en place un reverse proxy pour assurer des communications tripartite de la sorte. Néanmoins le jeu et le score fonctionnent au même titre que l'authentification sécurisé par un JWT HttpOnly. 

On pourra noter que le passage d'un jwt non HttpOnly à un jwt HttpOnly a été d'une plus value car le jwt n'est plus accessible via commandes javascript. Néanmoins cette plus value est faible car sa mise en place a nécessité la modification du fonctionnement de tous les microservices -  (CORS, whitelist, etc.) - ce qui n'est pas le but d'autant plus que l'on n'est pas à l'abri de failles CSRF. 
