<script>
  import Cookies from 'js-cookie';
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte'
  import Breadcrumbs from '../Breadcrumbs.svelte';
  Cookies.set("current","pourquoi");
</script>
<main class="relative">
  <Nav chemin={"pourquoi"}/>
  <Breadcrumbs chemin={"pourquoi"}/> 
  <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-blue-700 sm:text-4xl md:mx-auto">
          <span class="relative inline-block">
            <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
              <defs>
                <pattern id="70326c9b-4a0f-429b-9c76-792941e326d5" x="0" y="0" width=".135" height=".30">
                  <circle cx="1" cy="1" r=".7"></circle>
                </pattern>
              </defs>
              <rect fill="url(#70326c9b-4a0f-429b-9c76-792941e326d5)" width="52" height="24"></rect>
            </svg>
            <span class="relative">Pourquoi</span>
          </span>
          ce projet
        </h2>
      </div>
    </div>
    <div class="max-w-screen-xl sm:mx-auto">
      <div class="grid grid-cols-1 gap-16 row-gap-8 lg:grid-cols-2">
        <div class="space-y-8">
          <div>
            <p class="mb-4 text-xl font-medium">
              Adopter les principes d'une architecture microservice
            </p>
            <p class="text-gray-500">
              L'architecture microservices permet de déployer des applications de hautes disponibilitées tout en respectant le principe de responsabilité unique.
              L'application est divisée en plusieurs services qui interagissent entre eux par appel API en utilisant des Json Web Token.
             <br />
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">
              Se former sur de nouveaux outils 
            </p>
            <p class="text-gray-500">
              Le projet se découpe en 4 serveurs:
                <br>
                - Un serveur d'authentification (NodeJS)
                <br>
                - Un serveur front en (Svelte)
                <br>
                - Un serveur pour le jeu Motus (NodeJS)
                <br>
                - Un serveur pour le score (NodeJS)
                <br>
              <br>
              Docker a été privilégié pour le déploiement.
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">Une gestion des erreurs à surveiller</p>
            <p class="text-gray-500">
              Lorsqu'un defaut regroupe plusieurs microservices, il est nécessaire de connaitre les technologies utilisées dans chaque microservice.
            </p>
          </div>
        </div>
        <div class="space-y-8">
          <div>
            <p class="mb-4 text-xl font-medium"> Les points forts d'une architecture microservices</p>
            <p class="dark:text-gray-500 text-black-800">
              Maintenance : Le découpage d'une application complexe en microservices améliore le processus de maintenance. Le principe de responsabilité unique permet d'identifier rapidement la cause d'un problème. L'équipe spécialisé dans le developpement de ce microservice a la possibilité de mettre à jour sans suspendre l'application. 
              <br />
              <br />
              Adaptabilité : Les microservices communiquent de manière standardisée. Etant construit séparément, le service peut-être développé dans le langage de programmation le plus adapté pour répondre au mieux à sa fonction.
              <br />
              <br />
              Evolutivité :  Par son approche modulaire, il est possible d'ajouter de nouvelles fonctionnalitées sans risque d'endommager d'autres fonctionnalitées existantes sur l'application.
              <br />
              <br />
              Monitoring : A la différence d'une grande application complexe, un microservice peut être plus facilement suivi et évalué pour en améliorer les performances.
              <br />
              <br />
              Réutilisabilité : Les projet ayant des fonctionnalités communes peuvent se partager ou réutiliser un microservice.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </main>