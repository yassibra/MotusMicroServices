<script>
    import Nav from './Nav.svelte';
    import Footer from './Footer.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';
  </script>
  
  <Nav />  
  <Breadcrumbs chemin = {"Not Found"}/> 
  <div class="flex items-center justify-center py-3">
            <div class="flex flex-col items-center py-2">
            <img class="px-4 hidden md:block" src="../src\images\Erreur 404.png" />
            <img class="md:hidden" src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png" />
            <h1 class="px-4 pt-8 pb-4 text-center dark:text-white text-5xl font-bold leading-10 text-gray-800">OOPS!</h1>
            <p class="px-4 pb-10 text-base leading-none dark:text-gray-200 text-center text-gray-600">Page inaccessible.</p>
            <a href="/"><button class="mx-4 h-10 w-44  rounded-md text-white text-base bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Retour</button></a>
        </div>
   
</div>

  
  <Footer />
  