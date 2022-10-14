<script>
  import Cookies from 'js-cookie';
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte'
  import Breadcrumbs from '../Breadcrumbs.svelte';
  Cookies.set("current","regle")
</script>
<main class="relative">
  <Nav chemin={"regles"}/>
  <Breadcrumbs chemin={"regles"}/> 


  <div class="relative px-4 pt-16 mx-auto lg:py-20 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
    <div class="max-w-xl mx-auto lg:max-w-screen-xl">
      <div class="mb-16 lg:max-w-lg lg:mb-0">
        <div class="max-w-xl mb-6">
          <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl sm:leading-none">
            Les Règles<br class="hidden md:block" />
            <span class="inline-block text-deep-purple-accent-400"></span>
          </h2>
          <p class="text-base text-gray-400 md:text-lg">
            Le jeu repose sur la recherche d'un mot en 6 essais dont la première lettre est fournit. A la fin de chaque tentative, Motus colorie les cases pour vous orienter vers le bon résultat. Les cases vertes, représente les lettres bien placées, les cases orange, les lettres mal placées et en rouge, les lettres incorrectes. L'objectif étant de trouver le résultat en un minimum de tentative. A vous de jouer !
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
      <img src="../public/Image_jeu_motus.png" class="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md" alt="" />
    </div>
  </div>
  <Footer/>
  </main>